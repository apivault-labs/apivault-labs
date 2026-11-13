const assert=require('node:assert/strict');
const {agencyRows,priceRows,jobRows}=require('./transforms.js');
const rows=agencyRows([{'Root Domain':'www.example.com',Emails:'indexed@example.com'},{'Root Domain':'example.com'}],[{domain:'example.com',status:'not_found',coverageComplete:false}], 'source','contact');
assert.equal(rows.length,1);assert.equal(rows[0].contactStatus,'not_found');assert.equal(rows[0].coverageComplete,false);
const a={success:true,variantId:1,productId:2,price:'10.00',variantAvailable:true};
let prices=priceRows([{...a,price:'12'}],[a],{runId:'r',store:'example.com'});
assert.equal(prices[0].change,'comparison_skipped');
prices=priceRows([{...a,price:'12'}],[a,{...a,variantId:3}],{runId:'r',store:'example.com',market:'US storefront',currency:'USD'});
assert.equal(prices.length,1);assert.equal(prices[0].change,'price_changed');assert(!prices.some(r=>r.change==='removed'));
assert.throws(()=>priceRows([a,a],[],{runId:'r',store:'example.com'}),/Duplicate/);
const jobs=jobRows([{success:true,jobId:'1',jobTitle:'Example'},{success:true,jobId:'1'},{success:false,jobId:'2'}],'r');
assert.equal(jobs.length,1);assert.equal(jobs[0].rowKey,'1');
const fs=require('node:fs');for(const key of ['shopify-agencies','competitor-prices','company-jobs']){
 const w=JSON.parse(fs.readFileSync(`${__dirname}/${key}/n8n.json`));assert.equal(w.active,false);
 for(const n of w.nodes)if(n.type==='n8n-nodes-base.httpRequest')assert.equal(n.retryOnFail,false);
 assert(w.nodes.some(n=>n.name==='Download CSV'));assert(w.nodes.some(n=>n.name==='Upsert by stable key'));
 const m=JSON.parse(fs.readFileSync(`${__dirname}/${key}/make.blueprint.json`));assert.equal(m.flow[1].mapper.format,'csv');
 for(const n of m.flow)assert.equal(n.parameters.__IMTCONN__,0);
}
console.log('PASS: domain join; missing evidence; price currency guard; no false removals; duplicate job keys; portable imports');
