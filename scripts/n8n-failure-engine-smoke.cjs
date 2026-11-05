const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const qa=path.join(root,'.qa/failure-guidance');fs.mkdirSync(qa,{recursive:true});
const engineModules=path.join(root,'.qa/engine/node_modules');
const engine=path.join(engineModules,'n8n/bin/n8n');
const plan=require('../n8n-failure-guidance-plan.json');
const home=path.join(qa,'home');
const env={...process.env,N8N_USER_FOLDER:home,N8N_DIAGNOSTICS_ENABLED:'false',N8N_VERSION_NOTIFICATIONS_ENABLED:'false',
 N8N_ENCRYPTION_KEY:'public-isolated-fixture-key-only',N8N_COMMUNITY_PACKAGES_ENABLED:'true',N8N_UNVERIFIED_PACKAGES_ENABLED:'true',
 N8N_RUNNERS_ENABLED:'false',N8N_LOG_LEVEL:'info'};
const nodesHome=path.join(home,'.n8n/nodes');fs.mkdirSync(nodesHome,{recursive:true});
const archives=plan.map(p=>path.join(root,p.folder,`${p.package}-${p.version}.tgz`));
const install=spawnSync('npm',['install','--prefix',nodesHome,'--ignore-scripts','--legacy-peer-deps','--no-audit','--no-fund',...archives],{encoding:'utf8',timeout:240000});
assert.equal(install.status,0,install.stderr);
const modulePath=path.join(nodesHome,'node_modules/n8n-workflow');fs.symlinkSync(path.join(engineModules,'n8n-workflow'),modulePath,'dir');
function command(args,localEnv=env){
 const result=spawnSync(process.execPath,[engine,...args],{env:localEnv,encoding:'utf8',timeout:240000,maxBuffer:32*1024*1024});
 assert.equal(result.status,0,(result.stdout+result.stderr).slice(-10000));return result.stdout;
}
const workflow={id:'FunnelFailureSmoke',name:'Isolated failure guidance verification',active:false,settings:{executionOrder:'v1'},
 nodes:[{id:'start',name:'Start',type:'n8n-nodes-base.manualTrigger',typeVersion:1,position:[0,0],parameters:{}}],connections:{Start:{main:[[]]}}};
const cases=[['failedRun','FAILED'],['timedOutRun','TIMED-OUT'],['abortedRun','ABORTED'],['networkRun','NETWORK']];
for(const p of plan){
 const installed=path.join(nodesHome,'node_modules',p.package);const meta=require(path.join(installed,'package.json'));
 const Node=Object.values(require(path.join(installed,meta.n8n.nodes[0]))).find(v=>typeof v==='function');const node=new Node();
 const generic=node.description.properties.some(p=>p.name==='operation');
 for(const[id,status]of cases){
  const name=p.package+'-'+id;
  const parameters=generic?{operation:'read',runId:id,maxRows:1,output:'full'}:{apivaultMode:'read',apivaultExecution:{runId:id,maxRows:1,output:'full'}};
  const credential=node.description.credentials[0].name;
  workflow.nodes.push({id:name,name,type:p.package+'.'+node.description.name,typeVersion:generic?1:2,position:[500,workflow.nodes.length*100],parameters,
   continueOnFail:true,credentials:{[credential]:{id:credential==='apifyApi'?'FixtureLegacy':'FixtureGeneric',name:'Isolated fixture'}}});
  workflow.connections.Start.main[0].push({node:name,type:'main',index:0});
 }
}
fs.writeFileSync(path.join(qa,'workflow.json'),JSON.stringify([workflow]));
fs.writeFileSync(path.join(qa,'credentials.json'),JSON.stringify(['apifyApi','apivaultApi'].map((type,index)=>({id:index?'FixtureGeneric':'FixtureLegacy',name:'Isolated fixture',type,data:{apiToken:'fixture-only'}}))));
command(['import:credentials','--input='+path.join(qa,'credentials.json')]);
command(['import:workflow','--input='+path.join(qa,'workflow.json')]);
const trace=path.join(qa,'engine-api-trace.json');
const output=command(['execute','--id='+workflow.id,'--rawOutput'],{...env,NODE_OPTIONS:'--require='+path.join(__dirname,'n8n-failure-api-fixture.cjs'),
 N8N_FIXTURE_NOCK:path.join(engineModules,'nock'),N8N_FIXTURE_TRACE:trace});
fs.writeFileSync(path.join(qa,'engine-output.log'),output);
const start=output.indexOf('{');assert(start>=0,'No execution JSON: '+output.slice(-5000));
const result=JSON.parse(output.slice(start,output.lastIndexOf('}')+1));assert(!result.data.resultData.error,JSON.stringify(result.data.resultData.error));
for(const p of plan)for(const[id,status]of cases){
 const name=p.package+'-'+id;const data=result.data.resultData.runData[name];assert.equal(data.length,1,name);
 const row=data[0].data.main[0][0].json;assert.equal(typeof row.error,'string',name);
 assert(!row.error.includes('PRIVATE_UPSTREAM_SENTINEL'),name+' leaked private body');
 if(status==='NETWORK')assert(row.error.includes('Read Existing Run')&&row.error.includes(id),name);
 else{
  assert(row.error.includes(status),name+' missing terminal status');
  assert(row.error.includes('https://console.apify.com/view/runs/'+id),name+' missing run link');
  assert(!row.error.includes('Read Existing Run'),name+' incorrect terminal resume');
 }
}
const calls=JSON.parse(fs.readFileSync(trace));
assert.equal(calls.length,plan.length*3,'Unexpected terminal GET count');
const receipt={engine:'n8n@2.43.7',packageCount:plan.length,executedNodes:plan.length*4,terminalStatusCases:plan.length*3,networkResumeCases:plan.length,
 newActorStarts:0,status:'pass',scope:'Real n8n CLI, installed community packages, credentials and workflow. Synthetic Apify terminal responses and connection errors; no live Actor starts.'};
fs.writeFileSync(path.join(qa,'engine-receipt.json'),JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt));
