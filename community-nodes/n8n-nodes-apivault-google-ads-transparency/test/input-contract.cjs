const assert = require('node:assert/strict');
const fs = require('node:fs');
const meta = require('../package.json');
const Node = Object.values(require('../' + meta.n8n.nodes[0])).find(value => typeof value === 'function');
const node = new Node();
const spec = require('./input-spec.json');
const fixture = require('./legacy-fixture.json');
const run = {id:'run1',status:'SUCCEEDED',defaultDatasetId:'dataset1',defaultKeyValueStoreId:'store1'};

async function execute(value, version = 2, mode = 'run', fresh = false) {
  const calls = [];
  const defaults = Object.fromEntries(node.description.properties.map(p => [p.name,p.default]));
  const parameters = {...defaults, ...fixture.parameters, apivaultMode:mode, apivaultExecution:{maxRows:1,runId:'run1'}};
  if (fresh) parameters[spec.parameter] = defaults[spec.parameter];
  if (value !== undefined) parameters[spec.parameter] = spec.parameter === spec.field ? value : {[spec.field]:value};
  const context = {
    getInputData:()=>[{json:{}}],
    getNode:()=>({name:'input-regression',type:node.description.name,typeVersion:version,parameters}),
    getNodeParameter:(name,index,fallback)=>Object.hasOwn(parameters,name)?parameters[name]:fallback,
    continueOnFail:()=>false,
    helpers:{httpRequestWithAuthentication:async function(credential, options){
      assert.equal(credential,'apifyApi'); calls.push(options);
      if(options.method==='POST')return {data:run};
      if(options.url.includes('/actor-runs/'))return {data:run};
      if(options.url.endsWith('/items'))return [{fixture:true}];
      if(options.url.includes('/datasets/'))return {data:{itemCount:1}};
      throw new Error('Unexpected fixture request');
    }},
  };
  try { await node.execute.call(context); } catch(error) { error.calls=calls; throw error; }
  return calls;
}

(async()=>{
  for(const version of [1,2]){
    const legacy=await execute(spec.legacy,version);
    const body=legacy.find(c=>c.method==='POST').body;
    if(spec.field==='timeout')assert.equal(body.timeout,30);
    else assert(!Object.hasOwn(body,spec.field),'Zero must be omitted, not sent as an active filter');
    for(const value of [spec.minimum, spec.maximum ?? 100]){
      const explicit=await execute(value,version);
      assert.equal(explicit.find(c=>c.method==='POST').body[spec.field],value);
    }
    for(const value of [-1,0.5,NaN,Infinity,...(spec.maximum===null?[]:[spec.maximum+1])]){
      await assert.rejects(()=>execute(value,version),error=>!error.calls.some(c=>c.method==='POST'));
    }
    const read=await execute(-1,version,'read');
    assert(!read.some(c=>c.method==='POST'),'Reading existing run must bypass invalid stored inputs');
  }
  const fresh=await execute(undefined,2,'run',true);
  const payload=fresh.find(c=>c.method==='POST').body;
  if(spec.default===null)assert(!Object.hasOwn(payload,spec.field));
  else assert.equal(payload[spec.field],spec.default);
  if(process.env.INPUT_RECEIPT_PATH)fs.writeFileSync(process.env.INPUT_RECEIPT_PATH,JSON.stringify({package:meta.name,version:meta.version,body:payload},null,2)+'\n');
  console.log('NUMERIC_DEFAULT_LEGACY_EXPLICIT_BOUNDARIES_NO_POST_ON_INVALID_AND_READ_PASS');
})().catch(error=>{console.error(error.message);process.exitCode=1;});
