// Shared by downloadable imports and contract tests. All samples are bounded.
function host(value) { const name=String(value||'').trim().replace(/^https?:\/\//i,'').split(/[/?#]/)[0].toLowerCase().replace(/^www\./,'');return /^[a-z0-9.-]+(?::[0-9]+)?$/.test(name)?name.replace(/:[0-9]+$/,''):''; }
function agencyRows(leads, contacts, sourceRunId, contactRunId) {
 const byDomain=new Map(contacts.map(r=>[host(r.domain||r.website),r]));
 return [...new Map(leads.map(r=>[host(r['Root Domain']),r])).entries()].filter(([d])=>d).map(([domain,r])=>{
  const c=byDomain.get(domain)||{};
  return {rowKey:domain,domain,company:r.Company||'',country:r.Country||'',indexedEmails:r.Emails||'',observedEmails:JSON.stringify(c.emails||[]),contactPage:c.contactPageUrl||'',contactStatus:c.status||'not_checked',checkedAt:c.checkedAt||'',coverageComplete:c.coverageComplete===true,sourceRunId,contactRunId};
 });
}
function priceRows(rows, previous, context) {
 const {runId,store,market='',currency=''}=context;
 const domain=host(store); if(!domain)throw new Error('Choose a valid store URL');
 const old=new Map();
 for(const r of previous)if(r.variantId!=null){if(r.productUrl&&host(r.productUrl)!==domain)throw new Error('Previous dataset belongs to another store');old.set(String(r.variantId),r);}
 const seen=new Set();return rows.filter(r=>r.success===true&&r.variantId!=null).map(r=>{
  const id=String(r.variantId);if(seen.has(id))throw new Error('Duplicate variant ID');seen.add(id);
  const p=old.get(id);const validPrice=v=>v!==''&&v!=null&&Number.isFinite(Number(v));
  // The source omits currency. A user-confirmed, identical market/currency is required.
  const comparable=!!market&&!!currency&&p&&validPrice(p.price)&&validPrice(r.price);
  return {rowKey:[domain,market||'UNCONFIRMED',currency||'UNCONFIRMED',id].join('|'),store:domain,productId:String(r.productId||''),variantId:id,title:r.title||'',sku:r.sku||'',price:r.price??'',comparePrice:r.comparePrice??'',available:r.variantAvailable===true,currency,market,change:!p?'first_observed':!comparable?'comparison_skipped':Number(p.price)!==Number(r.price)?'price_changed':p.variantAvailable!==r.variantAvailable?'availability_changed':'unchanged',previousPrice:p?.price??'',sourceRunId:runId};
 }); // No removal inference from missing rows in a limited catalog sample.
}
function jobRows(rows, sourceRunId) {
 const byId=new Map();for(const r of rows)if(r.success===true&&r.jobId){
  const rowKey=String(r.jobId);byId.set(rowKey,{rowKey,jobId:rowKey,jobTitle:r.jobTitle||'',companyName:r.companyName||'',companySearchId:r.companySearchId||'',location:r.location||'',jobUrl:r.jobCanonicalUrl||r.jobUrl||'',firstSeenAt:r.firstSeenAt||'',postedAtIso:r.postedAtIso||'',freshnessVerified:r.freshnessVerified===true,monitorDelivery:r.monitorDelivery||'',sourceRunId});
 }return [...byId.values()];
}
// CommonJS export (n8n embeds only the functions above).
if(typeof module!=='undefined')module.exports={host,agencyRows,priceRows,jobRows};
