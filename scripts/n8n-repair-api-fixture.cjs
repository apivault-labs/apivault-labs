// Full-engine smoke tests use synthetic responses only. No Apify token is needed.
const fs = require('node:fs');
const nock = require(process.env.N8N_FIXTURE_NOCK);
const calls = [];
nock.disableNetConnect();
nock.enableNetConnect(/^(127\.0\.0\.1|localhost)(:\d+)?$/);
const api = nock('https://api.apify.com').persist();
api.post(/\/v2\/acts\/[A-Za-z0-9_-]+\/runs/).query(true).reply(function(uri,body){
  if(this.req.headers.authorization!=='Bearer fixture-only')throw new Error('Credential resolution failed');
  calls.push({method:'POST',path:uri.split('?')[0],body});
  return [201,{data:{id:'fixtureRun',status:'RUNNING'}}];
});
api.get('/v2/actor-runs/fixtureRun').query(true).reply(function(){
  if(this.req.headers.authorization!=='Bearer fixture-only')throw new Error('Credential resolution failed');
  calls.push({method:'GET',path:'/v2/actor-runs/fixtureRun'});
  return [200,{data:{id:'fixtureRun',status:'SUCCEEDED',defaultDatasetId:'fixtureDataset',defaultKeyValueStoreId:'fixtureStore'}}];
});
api.get('/v2/datasets/fixtureDataset').reply(200,{data:{itemCount:2}});
api.get('/v2/datasets/fixtureDataset/items').query(true).reply(200,[{fixtureRow:1}]);
process.on('exit',()=>{
  if(process.env.N8N_FIXTURE_TRACE)fs.writeFileSync(process.env.N8N_FIXTURE_TRACE,JSON.stringify(calls,null,2)+'\n');
});
