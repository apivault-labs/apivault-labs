import type { IExecuteFunctions, INodeProperties, IHttpRequestOptions, IDataObject } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

const API = 'https://api.apify.com/v2';
type Options = { runId?: string; maxTotalChargeUsd?: number; maxRows?: number; output?: string };
const id = (value: unknown): string => {
	if (typeof value !== 'string' || !/^[A-Za-z0-9_-]{1,100}$/.test(value)) throw new Error('Invalid Apify identifier');
	return value;
};

export class SafeActorError extends NodeOperationError {
	readonly runId: string;
	constructor(context: IExecuteFunctions, runId: string, item: number) {
		super(context.getNode(), runId ? `Could not finish reading run ${runId}; select Read Existing Run to resume` : 'Could not start or read the Actor. Check inputs and credentials before retrying', { itemIndex: item });
		this.runId = runId;
	}
}

export const executionProperties: INodeProperties[] = [
	{ displayName: 'Run Mode', name: 'apivaultMode', type: 'options', noDataExpression: true,
		options: [{ name: 'Run Actor', value: 'run', action: 'Run the actor' }, { name: 'Read Existing Run', value: 'read', action: 'Read an existing run' }], default: 'run' },
	{ displayName: 'Execution Options', name: 'apivaultExecution', type: 'collection', placeholder: 'Add Option', default: {}, options: [
		{ displayName: 'Run ID', name: 'runId', type: 'string', default: '', description: 'Existing Apify run to resume without starting a paid duplicate' },
		{ displayName: 'Maximum Event Charge (USD)', name: 'maxTotalChargeUsd', type: 'number', default: 0.05,
			typeOptions: { minValue: 0.001, maxValue: 1000, numberPrecision: 3 }, description: 'Event charge cap. Platform usage may be billed separately.' },
		{ displayName: 'Maximum Rows to Read', name: 'maxRows', type: 'number', default: 1000,
			typeOptions: { minValue: 1, maxValue: 100000, numberPrecision: 0 }, description: 'Download cap only. Actor input limits control paid collection.' },
		{ displayName: 'Output', name: 'output', type: 'options', default: 'rows',
			options: [{ name: 'Dataset Rows', value: 'rows' }, { name: 'Run, Rows and Diagnostics', value: 'full' }], description: 'Include SUMMARY and ERRORS to inspect partial or empty results' },
	] },
];

export async function runActor(context: IExecuteFunctions, item: number, actorId: string, body: Record<string, unknown>): Promise<IDataObject[]> {
	let runId = '';
	try {
		const mode = context.getNodeParameter('apivaultMode', item, 'run') as string;
		const options = context.getNodeParameter('apivaultExecution', item, {}) as Options;
		const legacy = context.getNode().typeVersion < 2;
		const maxRows = options.maxRows ?? (legacy ? 100000 : 1000);
		if (!Number.isInteger(maxRows) || maxRows < 1 || maxRows > 100000) throw new Error('Invalid row limit');
		const request = async (requestOptions: IHttpRequestOptions) => context.helpers.httpRequestWithAuthentication.call(context, 'apifyApi', requestOptions);
		if (mode === 'run') {
			const cap = options.maxTotalChargeUsd ?? (legacy ? undefined : 0.05);
			if (cap !== undefined && (!Number.isFinite(cap) || cap <= 0 || cap > 1000)) throw new Error('Invalid event charge cap');
			// Legacy workflows retain their existing charge behavior unless a cap is selected.
			const qs: IDataObject = { build: 'latest' };
			if (cap !== undefined) qs.maxTotalChargeUsd = cap;
			// Never retry POST: a duplicate could create a second paid Actor run.
			const started = await request({ method: 'POST', url: `${API}/acts/${id(actorId)}/runs`, body: body as IDataObject, qs, json: true });
			runId = id(started?.data?.id);
		} else if (mode === 'read') runId = id(options.runId);
		else throw new Error('Unsupported run mode');
		const deadline = Date.now() + 10 * 60 * 1000;
		let run;
		while (true) {
			if (Date.now() >= deadline) throw new Error('Waiting timed out');
			const response = await request({ method: 'GET', url: `${API}/actor-runs/${runId}`, qs: { waitForFinish: 20 }, json: true });
			run = response.data;
			if (run.status === 'SUCCEEDED') break;
			if (['FAILED', 'TIMED-OUT', 'ABORTED'].includes(run.status)) throw new Error('Run did not succeed');
		}
		const datasetId = id(run.defaultDatasetId);
		const dataset = await request({ method: 'GET', url: `${API}/datasets/${datasetId}`, json: true });
		const rows: IDataObject[] = [];
		while (rows.length < maxRows) {
			const limit = Math.min(1000, maxRows - rows.length);
			const page = await request({ method: 'GET', url: `${API}/datasets/${datasetId}/items`, qs: { clean: true, offset: rows.length, limit }, json: true });
			if (!Array.isArray(page) || page.length > limit) throw new Error('Invalid Dataset response');
			rows.push(...page);
			if (page.length < limit) break;
		}
		const truncated = (dataset.data?.itemCount ?? rows.length) > rows.length;
		if (options.output === 'full') {
			const storeId = id(run.defaultKeyValueStoreId);
			const records: IDataObject = {};
			for (const key of ['SUMMARY', 'ERRORS']) {
				try { records[key] = await request({ method: 'GET', url: `${API}/key-value-stores/${storeId}/records/${key}`, json: true }); }
				catch (error) {
					const e = error as { statusCode?: number; response?: { status?: number } };
					if (e.statusCode === 404 || e.response?.status === 404) records[key] = null;
					else throw new NodeOperationError(context.getNode(), 'Diagnostics unavailable');
				}
			}
			return [{ runId, datasetId, status: run.status, rows, summary: records.SUMMARY ?? null, errors: records.ERRORS ?? null, truncated }];
		}
		return rows.map(row => ({ ...row, _apifyRunId: runId, _apifyTruncated: truncated }));
	} catch {
		const safeError: NodeOperationError = new SafeActorError(context, runId, item);
		throw safeError;
	}
}

// Keep specialized legacy output modes (including asynchronous start and MCP_RESPONSE).
export async function legacyRequest(context: IExecuteFunctions, item: number, raw: unknown) {
	const options = raw as IHttpRequestOptions;
	const controls = context.getNodeParameter('apivaultExecution', item, {}) as Options;
	const request = async (value: IHttpRequestOptions) => context.helpers.httpRequestWithAuthentication.call(context, 'apifyApi', value);
	if (options.method === 'POST' && options.url.endsWith('/runs')) {
		const qs = { ...(options.qs ?? {}) } as IDataObject;
		const wait = qs.waitForFinish;
		delete qs.waitForFinish;
		const cap = controls.maxTotalChargeUsd ?? (context.getNode().typeVersion < 2 ? undefined : 0.05);
		if (cap !== undefined) {
			if (!Number.isFinite(cap) || cap <= 0 || cap > 1000) throw new Error('Invalid event charge cap');
			qs.maxTotalChargeUsd = cap;
		}
		const started = await request({ ...options, qs });
		if (!wait) return started;
		const runId = id(started?.data?.id);
		const deadline = Date.now() + 10 * 60 * 1000;
		while (Date.now() < deadline) {
			const result = await request({ method: 'GET', url: `${API}/actor-runs/${runId}`, qs: { waitForFinish: 20 }, json: true });
			if (result.data.status === 'SUCCEEDED') return result;
			if (['FAILED', 'TIMED-OUT', 'ABORTED'].includes(result.data.status)) throw new Error('Run did not succeed');
		}
		throw new Error('Waiting timed out');
	}
	if (options.method === 'GET' && /\/datasets\/[A-Za-z0-9_-]+\/items$/.test(options.url)) {
		const maxRows = controls.maxRows ?? (context.getNode().typeVersion < 2 ? 100000 : 1000);
		if (!Number.isInteger(maxRows) || maxRows < 1 || maxRows > 100000) throw new Error('Invalid row limit');
		const rows: IDataObject[] = [];
		while (rows.length < maxRows) {
			const limit = Math.min(1000, maxRows - rows.length);
			const page = await request({ ...options, qs: { ...(options.qs ?? {}), offset: rows.length, limit } });
			if (!Array.isArray(page) || page.length > limit) throw new Error('Invalid Dataset response');
			rows.push(...page);
			if (page.length < limit) break;
		}
		return rows;
	}
	return request(options);
}
