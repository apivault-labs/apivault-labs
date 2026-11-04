const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {spawnSync} = require('node:child_process');
const root = path.resolve(__dirname,'..');
const qa = path.join(root,'.qa');
fs.mkdirSync(qa,{recursive:true});
const engine = path.join(qa,'engine/node_modules/n8n/bin/n8n');
const plan = require('../n8n-input-repair-plan.json');
const home = path.join(qa,'engine-home');
const env = {...process.env,N8N_USER_FOLDER:home,N8N_DIAGNOSTICS_ENABLED:'false',
  N8N_VERSION_NOTIFICATIONS_ENABLED:'false',N8N_ENCRYPTION_KEY:'public-fixture-key-for-isolated-ci-only',
  N8N_COMMUNITY_PACKAGES_ENABLED:'true',N8N_UNVERIFIED_PACKAGES_ENABLED:'true',
  N8N_RUNNERS_ENABLED:'false',N8N_LOG_LEVEL:'error'};
const nodesHome=path.join(home,'.n8n/nodes');
fs.mkdirSync(nodesHome,{recursive:true});
const archives=plan.map(p=>path.join(root,p.folder,`${p.package}-${p.version}.tgz`));
function command(args, localEnv=env){
  const result=spawnSync(process.execPath,[engine,...args],{env:localEnv,encoding:'utf8',timeout:180000,maxBuffer:8*1024*1024});
  assert.equal(result.status,0,(result.stdout+result.stderr).slice(-7000));
  return result.stdout;
}
const install=spawnSync('npm',['install','--prefix',nodesHome,'--ignore-scripts','--legacy-peer-deps','--no-audit','--no-fund',...archives],{encoding:'utf8',timeout:180000});
assert.equal(install.status,0,install.stderr);
// Packages have no runtime dependencies. Resolve n8n-workflow from the installed engine.
const workflowModule=path.join(qa,'engine/node_modules/n8n-workflow');
for(const p of plan){
  const packageModules=path.join(nodesHome,'node_modules',p.package,'node_modules');
  fs.mkdirSync(packageModules,{recursive:true});
  fs.symlinkSync(workflowModule,path.join(packageModules,'n8n-workflow'),'dir');
}
const workflow={id:'FunnelRepairSmoke',name:'Isolated funnel repair smoke',active:false,settings:{executionOrder:'v1'},
  nodes:[{id:'start',name:'Start',type:'n8n-nodes-base.manualTrigger',typeVersion:1,position:[0,0],parameters:{}}],
  connections:{Start:{main:[[]]}}};
for(const p of plan){
  const folder=path.join(root,p.folder);
  const meta=require(path.join(folder,'package.json'));
  const Node=Object.values(require(path.join(folder,meta.n8n.nodes[0]))).find(v=>typeof v==='function');
  const node=new Node();
  const fixture=require(path.join(folder,'test/legacy-fixture.json'));
  for(const mode of ['run','read']){
    const name=p.package+'-'+mode;
    const parameters={...fixture.parameters,apivaultMode:mode,apivaultExecution:{maxRows:1,runId:'fixtureRun'}};
    // Exercise stored obsolete settings through the actual engine as well.
    if(p.legacy!==undefined)parameters[p.parameter]=p.parameter===p.field?p.legacy:{[p.field]:p.legacy};
    workflow.nodes.push({id:name,name,type:p.package+'.'+node.description.name,typeVersion:2,position:[500,workflow.nodes.length*100],parameters,
      credentials:{apifyApi:{id:'FixtureApify',name:'Isolated fixture'}}});
    workflow.connections.Start.main[0].push({node:name,type:'main',index:0});
  }
}
fs.writeFileSync(path.join(qa,'workflow.json'),JSON.stringify([workflow]));
fs.writeFileSync(path.join(qa,'credentials.json'),JSON.stringify([{id:'FixtureApify',name:'Isolated fixture',type:'apifyApi',data:{apiToken:'fixture-only'}}]));
command(['import:credentials','--input='+path.join(qa,'credentials.json')]);
command(['import:workflow','--input='+path.join(qa,'workflow.json')]);
const trace=path.join(qa,'engine-api-trace.json');
const output=command(['execute','--id='+workflow.id,'--rawOutput'],{...env,
  NODE_OPTIONS:'--require='+path.join(__dirname,'n8n-repair-api-fixture.cjs'),
  N8N_FIXTURE_NOCK:path.join(qa,'engine/node_modules/nock'),N8N_FIXTURE_TRACE:trace});
fs.writeFileSync(path.join(qa,'engine-output.log'),output);
const start=output.indexOf('{');
const result=JSON.parse(output.slice(start));
assert(!result.data.resultData.error,JSON.stringify(result.data.resultData.error));
for(const node of workflow.nodes.slice(1)){
  const data=result.data.resultData.runData[node.name];
  assert.equal(data.length,1,node.name);
  assert.equal(data[0].data.main[0].length,1,node.name);
  assert.equal(data[0].data.main[0][0].json.fixtureRow,1,node.name);
  assert.equal(data[0].data.main[0][0].json._apifyTruncated,true,node.name);
}
const calls=JSON.parse(fs.readFileSync(trace));
assert.equal(calls.filter(c=>c.method==='POST').length,10,'Read mode must not create duplicate starts');
assert.equal(calls.filter(c=>c.method==='GET').length,20);
fs.writeFileSync(path.join(qa,'engine-receipt.json'),JSON.stringify({engine:'n8n@2.43.7',packageCount:10,executedNodes:20,rows:20,
  starts:10,resumesWithoutPost:10,transport:'synthetic Apify HTTP via nock; real n8n CLI, loader, credentials and workflow execution',status:'pass'},null,2)+'\n');
console.log('FULL_N8N_ENGINE_20_NODE_RUN_AND_RESUME_PASS');
