const assert = require('node:assert/strict');
const fs = require('node:fs');
const meta = require('../package.json');
const Node = Object.values(require('../' + meta.n8n.nodes[0])).find(value => typeof value === 'function');
const node = new Node();
const fixture = require('./legacy-fixture.json');
const run = { id: 'run1', status: 'SUCCEEDED', defaultDatasetId: 'dataset1', defaultKeyValueStoreId: 'store1' };
assert.equal(node.description.name, fixture.nodeName);
assert.deepEqual(node.description.credentials, fixture.credentials);
for (const name of Object.keys(fixture.parameters)) assert(node.description.properties.some(property => property.name === name), 'Removed legacy field: ' + name);

function context(version, overrides = {}, total = 2500) {
  const calls = [];
  const defaults = Object.fromEntries(node.description.properties.map(property => [property.name, property.default]));
  const params = { ...defaults, ...fixture.parameters, ...overrides };
  return {
    calls, params,
    getInputData: () => [{ json: {} }],
    getNode: () => ({ name: 'contract', type: node.description.name, typeVersion: version, parameters: params }),
    getNodeParameter: (name, _index, fallback) => Object.hasOwn(params, name) ? params[name] : fallback,
    continueOnFail: () => false,
    helpers: { httpRequestWithAuthentication: async function (credential, options) {
      assert.equal(credential, 'apifyApi'); calls.push(options);
      if (options.method === 'POST') return { data: run };
      if (options.url.includes('/actor-runs/')) return { data: run };
      if (options.url.endsWith('/datasets/dataset1')) return { data: { itemCount: total } };
      if (options.url.endsWith('/items')) {
        const start = options.qs?.offset ?? 0;
        const limit = options.qs?.limit ?? 1000;
        assert(limit <= 1000);
        return Array.from({ length: Math.max(0, Math.min(limit, total - start)) }, (_, index) => ({ resultIndex: start + index }));
      }
      if (options.url.endsWith('/SUMMARY')) return { count: total };
      if (options.url.endsWith('/ERRORS')) throw Object.assign(new Error('Missing optional record'), { statusCode: 404 });
      if (options.url.endsWith('/MCP_RESPONSE')) return { preview: true, total };
      throw new Error('Unexpected mock request');
    } },
  };
}

(async () => {
  const legacy = context(1);
  const oldResult = await node.execute.call(legacy);
  const start = legacy.calls.find(call => call.method === 'POST');
  assert(start, 'Legacy start missing');
  for (const [key, value] of Object.entries(fixture.body)) assert.deepEqual(start.body[key], value, 'Legacy input changed: ' + key);
  assert.equal(start.qs?.maxTotalChargeUsd, undefined, 'Legacy charge behavior changed');
  assert(oldResult[0].length > 0);

  const read = context(2, { apivaultMode: 'read', apivaultExecution: { runId: 'run1', maxRows: 1200 } });
  const resumed = await node.execute.call(read);
  assert.equal(read.calls.filter(call => call.method === 'POST').length, 0);
  assert.equal(resumed[0].length, 1200);
  assert.equal(resumed[0][1199].json.resultIndex, 1199);
  assert.equal(resumed[0][0].json._apifyTruncated, true);
  assert.deepEqual(resumed[0][0].pairedItem, { item: 0 });

  const modern = context(2, { apivaultMode: 'run', apivaultExecution: { maxRows: 10 } }, 10);
  await node.execute.call(modern);
  assert.equal(modern.calls.filter(call => call.method === 'POST').length, 1);
  assert.equal(modern.calls.find(call => call.method === 'POST').qs.maxTotalChargeUsd, 0.05);

  const full = context(2, { apivaultMode: 'read', apivaultExecution: { runId: 'run1', output: 'full', maxRows: 2500 } });
  const details = await node.execute.call(full);
  assert.equal(details[0][0].json.rows.length, 2500);
  assert.equal(details[0][0].json.truncated, false);
  assert.deepEqual(details[0][0].json.summary, { count: 2500 });
  assert.equal(details[0][0].json.errors, null);

  const failed = context(2, { apivaultMode: 'read', apivaultExecution: { runId: 'run1' } });
  failed.continueOnFail = () => true;
  failed.helpers.httpRequestWithAuthentication = async () => { throw new Error('PRIVATE_TEST_SENTINEL'); };
  const failure = await node.execute.call(failed);
  assert(!JSON.stringify(failure).includes('PRIVATE_TEST_SENTINEL'));
  console.log('LEGACY_IDENTITY_INPUT_CAP_RESUME_PAGINATION_DIAGNOSTICS_AND_ERROR_CONTRACT_PASS');
})().catch(error => { console.error(error.message); process.exitCode = 1; });
