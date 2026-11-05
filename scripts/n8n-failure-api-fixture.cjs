const fs=require('node:fs');
const nock=require(process.env.N8N_FIXTURE_NOCK);
const calls=[];
nock.disableNetConnect();
nock.enableNetConnect(/^(127\.0\.0\.1|localhost)(:\d+)?$/);
const statuses={failedRun:'FAILED',timedOutRun:'TIMED-OUT',abortedRun:'ABORTED'};
nock('https://api.apify.com').persist().get(/\/v2\/actor-runs\/(failedRun|timedOutRun|abortedRun)/).query(true).reply(function(uri){
  if(this.req.headers.authorization!=='Bearer fixture-only')throw new Error('Credential resolution failed');
  const id=uri.match(/actor-runs\/([^?]+)/)[1];
  calls.push({method:'GET',id,status:statuses[id]});
  return[200,{data:{id,status:statuses[id],statusMessage:'PRIVATE_UPSTREAM_SENTINEL'}}];
});
nock('https://api.apify.com').persist().get('/v2/actor-runs/networkRun').query(true)
  .replyWithError(Object.assign(new Error('PRIVATE_UPSTREAM_SENTINEL'),{code:'ECONNRESET'}));
process.on('exit',()=>{
 if(process.env.N8N_FIXTURE_TRACE)fs.writeFileSync(process.env.N8N_FIXTURE_TRACE,JSON.stringify(calls,null,2)+'\n');
});
