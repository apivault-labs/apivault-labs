import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

const ACTOR_ID = 'AHdDQLHk0r0omhAMX';
const API = 'https://api.apify.com/v2';

export class ApivaultTennisAbstractBulkScraper implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Tennis Abstract Scraper',
		name: 'apivaultTennisAbstractBulkScraper',
		icon: { light: 'file:apivault.svg', dark: 'file:apivault.svg' },
		subtitle: '={{$parameter["operation"]}}',
		group: ['transform'],
		version: 1,
		description: 'Run Tennis Abstract Scraper on Apify and read results and diagnostics',
		defaults: { name: 'Tennis Abstract Scraper' },
		inputs: [NodeConnectionTypes.Main], outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [{ name: 'apivaultApi', required: true }],
		properties: [
			{ displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
				options: [
					{ name: 'Run and Read Results', value: 'run', action: 'Run and read results' },
					{ name: 'Read Existing Run', value: 'read', action: 'Read an existing run' },
				], default: 'run' },
			{ displayName: 'Actor Input', name: 'actorInput', type: 'json', default: '{\n  "players": [\n    "Iga Swiatek"\n  ],\n  "maxResults": 3\n}',
				description: 'Public input fields from the linked Actor. Replace example values with your own inputs.',
				displayOptions: { show: { operation: ['run'] } } },
			{ displayName: 'Run ID', name: 'runId', type: 'string', default: '',
				description: 'Existing Apify run to read without starting a paid duplicate', displayOptions: { show: { operation: ['read'] } } },
			{ displayName: 'Maximum Event Charge (USD)', name: 'maxTotalChargeUsd', type: 'number', default: 0.05,
				typeOptions: { minValue: 0.001, maxValue: 1000, numberPrecision: 3 },
				description: 'Event charge cap. Platform usage may be billed separately. Review Actor pricing before increasing',
				displayOptions: { show: { operation: ['run'] } } },
			{ displayName: 'Maximum Rows to Read', name: 'maxRows', type: 'number', default: 1000,
				typeOptions: { minValue: 1, maxValue: 100000, numberPrecision: 0 },
				description: 'Download cap only. Use Actor inputs and the event charge cap to limit paid collection.' },
			{ displayName: 'Output', name: 'output', type: 'options', default: 'rows',
				options: [{ name: 'Dataset Rows', value: 'rows' }, { name: 'Run, Rows and Diagnostics', value: 'full' }],
				description: 'Include SUMMARY and ERRORS when reviewing partial or empty results' },
		],
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const output: INodeExecutionData[] = [];
		const items = this.getInputData();
		const validId = (id: unknown): string => {
			if (typeof id !== 'string' || !/^[A-Za-z0-9_-]{1,100}$/.test(id)) throw new NodeOperationError(this.getNode(), 'Invalid Apify identifier');
			return id;
		};
		for (let i = 0; i < items.length; i++) {
			let runId = '';
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				const maxRows = this.getNodeParameter('maxRows', i) as number;
				if (!Number.isInteger(maxRows) || maxRows < 1 || maxRows > 100000) throw new NodeOperationError(this.getNode(), 'Maximum rows must be from 1 to 100000');
				if (operation === 'run') {
					const raw = this.getNodeParameter('actorInput', i);
					const body = typeof raw === 'string' ? JSON.parse(raw) : raw;
					if (!body || typeof body !== 'object' || Array.isArray(body)) throw new NodeOperationError(this.getNode(), 'Actor Input must be a JSON object');
					const cap = this.getNodeParameter('maxTotalChargeUsd', i) as number;
					if (!Number.isFinite(cap) || cap <= 0 || cap > 1000) throw new NodeOperationError(this.getNode(), 'Use a positive event charge cap up to 1000 USD');
					// POST is intentionally never retried: it could start a paid duplicate.
					const started = await this.helpers.httpRequestWithAuthentication.call(this, 'apivaultApi', {
						method: 'POST', url: `${API}/acts/${ACTOR_ID}/runs`, body, json: true,
						qs: { build: 'latest', maxTotalChargeUsd: cap, timeout: 300 },
					});
					runId = validId(started?.data?.id);
				} else if (operation === 'read') {
					runId = validId(this.getNodeParameter('runId', i) as string);
				} else throw new NodeOperationError(this.getNode(), 'Unsupported operation');
				const deadline = Date.now() + 10 * 60 * 1000;
				let run;
				while (true) {
					if (Date.now() >= deadline) throw new NodeOperationError(this.getNode(), `Waiting timed out; use Read Existing Run for ${runId}`);
					const response = await this.helpers.httpRequestWithAuthentication.call(this, 'apivaultApi', {
						method: 'GET', url: `${API}/actor-runs/${runId}`, qs: { waitForFinish: 20 }, json: true,
					});
					run = response.data;
					if (run.status === 'SUCCEEDED') break;
					if (['FAILED', 'TIMED-OUT', 'ABORTED'].includes(run.status)) throw new NodeOperationError(this.getNode(), `Run ${runId} ended with status ${run.status}`);
				}
				const datasetId = validId(run.defaultDatasetId);
				const dataset = await this.helpers.httpRequestWithAuthentication.call(this, 'apivaultApi', { method: 'GET', url: `${API}/datasets/${datasetId}`, json: true });
				const rows: Array<Record<string, unknown>> = [];
				while (rows.length < maxRows) {
					const limit = Math.min(1000, maxRows - rows.length);
					const page = await this.helpers.httpRequestWithAuthentication.call(this, 'apivaultApi', {
						method: 'GET', url: `${API}/datasets/${datasetId}/items`, qs: { clean: true, offset: rows.length, limit }, json: true,
					});
					if (!Array.isArray(page) || page.length > limit) throw new NodeOperationError(this.getNode(), 'Unexpected Dataset response');
					rows.push(...page);
					if (page.length < limit) break;
				}
				const truncated = (dataset.data?.itemCount ?? rows.length) > rows.length;
				if (this.getNodeParameter('output', i) === 'full') {
					const storeId = validId(run.defaultKeyValueStoreId);
					const records: Record<string, unknown> = {};
					for (const key of ['SUMMARY', 'ERRORS']) {
						try {
							records[key] = await this.helpers.httpRequestWithAuthentication.call(this, 'apivaultApi', { method: 'GET', url: `${API}/key-value-stores/${storeId}/records/${key}`, json: true });
						} catch (error) {
							const e = error as { statusCode?: number; response?: { status?: number } };
							if (e.statusCode === 404 || e.response?.status === 404) records[key] = null;
							else throw new NodeOperationError(this.getNode(), `Run ${runId} completed but ${key} could not be read`);
						}
					}
					output.push({ json: { runId, datasetId, keyValueStoreId: storeId, status: run.status, rows, summary: records.SUMMARY ?? null, errors: records.ERRORS ?? null, truncated }, pairedItem: { item: i } });
				} else {
					for (const row of rows) output.push({ json: { ...row, _apifyRunId: runId, _apifyTruncated: truncated }, pairedItem: { item: i } });
				}
			} catch {
				// Avoid copying raw upstream bodies, headers or private input into errors.
				const message = runId ? `Could not finish reading run ${runId}; inspect it in Apify and resume with Read Existing Run` : 'Could not start or read the Actor. Check inputs, credentials and Console before retrying';
				if (this.continueOnFail()) output.push({ json: { error: message, runId: runId || null }, pairedItem: { item: i } });
				else throw new NodeOperationError(this.getNode(), message, { itemIndex: i });
			}
		}
		return [output];
	}
}
