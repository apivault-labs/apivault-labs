const assert = require('node:assert/strict');
const path = require('node:path');
const manifest = require('../package.json');
const exported = require(path.join('..', manifest.n8n.nodes[0]));
const NodeClass = Object.values(exported).find(v => typeof v === 'function');
const node = new NodeClass();

function context(parameters, total = 2500, status = 'SUCCEEDED') {
 const calls = [];
 const fields = node.description.properties;
 const ctx = {
  getInputData: () => [{ json: {} }],
  getNode: () => ({ name: 'Test', type: 'test', typeVersion: 1, position: [0,0], parameters: {} }),
  getNodeParameter: key => Object.hasOwn(parameters,key) ? parameters[key] : fields.find(f => f.name === key)?.default,
  continueOnFail: () => false,
  helpers: { httpRequestWithAuthentication: async function(credential, options) {
   calls.push(options);
   assert.equal(credential,'apivaultApi');
   assert.equal(new URL(options.url).origin,'https://api.apify.com');
   if (options.method === 'POST') return { data: { id: 'testRun', status: 'RUNNING' } };
   if (options.url.includes('/actor-runs/')) return { data: { id:'testRun', status, defaultDatasetId:'testDataset', defaultKeyValueStoreId:'testStore' } };
   if (options.url.endsWith('/items')) return Array.from({length: Math.min(options.qs.limit,Math.max(0,total-options.qs.offset))},(_,i)=>({row:i+options.qs.offset}));
   if (options.url.includes('/datasets/')) return { data: { itemCount:total } };
   if (options.url.endsWith('/SUMMARY')) return { status:'COMPLETED' };
   if (options.url.endsWith('/ERRORS')) return [];
   throw new Error('Unexpected test request');
  } },
 };
 return { ctx, calls };
}

(async () => {
 const first=context({operation:'run',actorInput:'{"query":"example"}',maxRows:3000,maxTotalChargeUsd:.03,output:'full'});
 const result=await node.execute.call(first.ctx);
 assert.equal(result[0][0].json.rows.length,2500);assert.equal(result[0][0].json.truncated,false);
 assert.equal(first.calls.filter(c=>c.method==='POST').length,1);assert.equal(first.calls[0].qs.maxTotalChargeUsd,.03);
 assert.deepEqual(first.calls.filter(c=>c.url.endsWith('/items')).map(c=>c.qs.offset),[0,1000,2000]);
 assert.equal(result[0][0].json.summary.status,'COMPLETED');assert.deepEqual(result[0][0].json.errors,[]);
 const resumed=context({operation:'read',runId:'testRun',maxRows:1200,output:'full'});
 const read=await node.execute.call(resumed.ctx);assert.equal(read[0][0].json.rows.length,1200);assert.equal(read[0][0].json.truncated,true);
 assert.equal(resumed.calls.filter(c=>c.method==='POST').length,0);
 const invalid=context({operation:'run',actorInput:'INVALID EXAMPLE_SECRET',maxRows:10,maxTotalChargeUsd:.03,output:'rows'});
 await assert.rejects(()=>node.execute.call(invalid.ctx),e=>!e.message.includes('EXAMPLE_SECRET'));
 assert.equal(invalid.calls.length,0);
 const failed=context({operation:'read',runId:'testRun',maxRows:10,output:'rows'},0,'FAILED');
 await assert.rejects(()=>node.execute.call(failed.ctx));assert.equal(failed.calls.filter(c=>c.method==='POST').length,0);
 console.log('NODE_CONTRACT_PASS',manifest.name);
})().catch(error=>{console.error(error.message);process.exitCode=1;});
