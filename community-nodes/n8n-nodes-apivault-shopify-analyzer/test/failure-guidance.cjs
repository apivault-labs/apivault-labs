const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const meta = require('../package.json');
const Node = Object.values(require(path.join('..',meta.n8n.nodes[0]))).find(v=>typeof v==='function');
const node = new Node();
const generic = node.description.properties.some(p=>p.name==='operation');
const fixtureFile = path.join(__dirname,'legacy-fixture.json');
const fixture = fs.existsSync(fixtureFile)?require(fixtureFile).parameters:{};
const secret = 'PRIVATE_UPSTREAM_SENTINEL';

async function attempt(mode,status,continueOnFail=false){
 const calls=[];
 const defaults=Object.fromEntries(node.description.properties.map(p=>[p.name,p.default]));
 const parameters={...defaults,...fixture};
 if(generic)Object.assign(parameters,{operation:mode,runId:'testRun',actorInput:'{}',maxRows:1,maxTotalChargeUsd:0.03,output:'full'});
 else Object.assign(parameters,{execution:{pollIntervalSeconds:0.001},apivaultMode:mode,apivaultExecution:{runId:'testRun',maxRows:1,maxTotalChargeUsd:0.03,output:'full'}});
 const request=async function(credential,options){
  calls.push(options);
  if(options.method==='POST'){
   if(status==='START_NETWORK')throw new Error(secret);
   return {data:{id:'testRun',status:'RUNNING'}};
  }
  if(options.url.includes('/actor-runs/')){
   if(status==='NETWORK')throw new Error(secret);
   return {data:{id:'testRun',status,statusMessage:secret,defaultDatasetId:'testDataset',defaultKeyValueStoreId:'testStore'}};
  }
  throw new Error('Unexpected fixture call');
 };
 const context={getInputData:()=>[{json:{}}],getNode:()=>({name:'FailureContract',type:node.description.name,typeVersion:2,parameters}),
  getNodeParameter:(name,index,fallback)=>Object.hasOwn(parameters,name)?parameters[name]:fallback,continueOnFail:()=>continueOnFail,
  helpers:{httpRequestWithAuthentication:request,requestWithAuthentication:request}};
 let message;
 try {const result=await node.execute.call(context);assert(continueOnFail,'Expected an exception');message=result[0][0].json.error;}
 catch(error){message=error.message;}
 assert.equal(calls.filter(c=>c.method==='POST').length,mode==='run'?1:0,'Unexpected start count');
 assert(!message.includes(secret),'Private upstream error leaked');
 if(['FAILED','TIMED-OUT','ABORTED'].includes(status)){
  assert(message.includes(status),'Terminal status missing: '+message);
  assert(message.includes('https://console.apify.com/view/runs/testRun'),'Run diagnostic link missing');
  assert(!message.includes('Read Existing Run'),'Finished run should not suggest resuming');
 }else if(status==='NETWORK'){
  assert(message.includes('testRun')&&message.includes('Read Existing Run'),'Connection failure must retain the run and reading action');
 }else{
  assert(message.includes('Apify Console'),'Ambiguous start must direct user to reconcile Console');
 }
 return calls;
}

(async()=>{
 for(const mode of ['run','read'])for(const status of ['FAILED','TIMED-OUT','ABORTED','NETWORK'])for(const keepGoing of [false,true])await attempt(mode,status,keepGoing);
 for(const keepGoing of [false,true])await attempt('run','START_NETWORK',keepGoing);
 console.log('TERMINAL_STATUS_NETWORK_RESUME_AMBIGUOUS_START_NO_RETRY_SAFE_ERRORS_PASS',meta.name);
})().catch(error=>{console.error(error.message);process.exitCode=1;});
