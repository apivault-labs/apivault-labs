import type { INodeProperties,
	IExecuteFunctions,
	IHttpRequestMethods,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError, sleep } from 'n8n-workflow';

const ACTOR_ID = 'eZFfkRpZXeYOu3OAP';
const API_BASE = 'https://api.apify.com/v2';
const TERMINAL_STATUSES = new Set(['SUCCEEDED', 'FAILED', 'ABORTED', 'TIMED-OUT']);

const splitList = (value: string): string[] =>
	value.split(/[,\n]+/).map((item) => item.trim()).filter(Boolean);

import { executionProperties, runActor, legacyRequest } from '../helpers/actorTransport';

export class LinkedinProfile implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "LinkedIn Profile Scraper",
  "name": "linkedinProfile",
  "icon": {
    "light": "file:linkedinprofile.svg",
    "dark": "file:linkedinprofile.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run LinkedIn Profile Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "LinkedIn Profile Scraper"
  },
  "inputs": [
    NodeConnectionTypes.Main
  ],
  "outputs": [
    NodeConnectionTypes.Main
  ],
  "usableAsTool": true,
  "credentials": [
    {
      "name": "apifyApi",
      "required": true
    }
  ],
  "defaultVersion": 2
,
  properties: [...executionProperties, ...([
  {
    "displayName": "LinkedIn URLs or Usernames",
    "name": "profileUrls",
    "type": "string",
    "typeOptions": {
      "rows": 6
    },
    "default": "",
    "placeholder": "https://www.linkedin.com/in/public-handle/\nsecond-handle",
    "description": "Actor input: LinkedIn URLs or Usernames",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "CRM Records",
    "name": "crmProfiles",
    "type": "fixedCollection",
    "typeOptions": {
      "multipleValues": true
    },
    "placeholder": "Add CRM Record",
    "default": {},
    "description": "Actor input: CRM Records",
    "options": [
      {
        "displayName": "Record",
        "name": "records",
        "values": [
          {
            "displayName": "LinkedIn URL or Username",
            "name": "url",
            "type": "string",
            "default": "",
            "required": true,
            "placeholder": "https://www.linkedin.com/in/public-handle/"
          },
          {
            "displayName": "Correlation ID",
            "name": "id",
            "type": "string",
            "default": "",
            "description": "Optional CRM identifier returned unchanged as inputId"
          }
        ]
      }
    ],
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Add Research Signals",
    "name": "enrich",
    "type": "boolean",
    "default": true,
    "description": "Actor input: Add Research Signals",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Output Format",
    "name": "exportFormat",
    "type": "options",
    "options": [
      {
        "name": "Full Profile (Nested JSON)",
        "value": "default"
      },
      {
        "name": "Flat Row (CSV / CRM)",
        "value": "flat"
      }
    ],
    "default": "default",
    "description": "Actor input: Output Format",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Parallel Profiles",
    "name": "maxConcurrency",
    "type": "number",
    "typeOptions": {
      "minValue": 1,
      "maxValue": 10
    },
    "default": 5,
    "description": "Actor input: Parallel Profiles",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Maximum Time per Profile (Seconds)",
    "name": "timeout",
    "type": "number",
    "typeOptions": {
      "minValue": 20,
      "maxValue": 120
    },
    "default": 60,
    "description": "Actor input: Maximum Time per Profile (Seconds)",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Run Demo When Input Is Empty",
    "name": "useDemoOnEmpty",
    "type": "boolean",
    "default": false,
    "description": "Actor input: Run Demo When Input Is Empty",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Execution",
    "name": "execution",
    "type": "collection",
    "placeholder": "Add Option",
    "default": {},
    "options": [
      {
        "displayName": "Maximum Wait (Seconds)",
        "name": "maxWaitSeconds",
        "type": "number",
        "typeOptions": {
          "minValue": 60,
          "maxValue": 1800
        },
        "default": 600,
        "description": "Maximum time n8n waits for the complete Actor run"
      },
      {
        "displayName": "Poll Interval (Seconds)",
        "name": "pollIntervalSeconds",
        "type": "number",
        "typeOptions": {
          "minValue": 2,
          "maxValue": 30
        },
        "default": 5,
        "description": "How often to check the Actor run status"
      },
      {
        "displayName": "Wait for Results",
        "name": "waitForResults",
        "type": "boolean",
        "default": true,
        "description": "Turn off to immediately return run metadata for a separate polling workflow"
      }
    ],
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  }
] as INodeProperties[])]
};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				if (this.getNodeParameter('apivaultMode', itemIndex, 'run') === 'read') {
					const results = await runActor(this, itemIndex, ACTOR_ID, {});
					for (const result of results) returnData.push({ json: result, pairedItem: { item: itemIndex } });
					continue;
				}
				const profileUrls = splitList(this.getNodeParameter('profileUrls', itemIndex, '') as string);
				const crmProfiles = this.getNodeParameter('crmProfiles', itemIndex, {}) as {
					records?: Array<{ url?: string; id?: string }>;
				};
				const profiles = (crmProfiles.records ?? []).map((record) => ({
					url: (record.url ?? '').trim(), id: (record.id ?? '').trim(),
				})).filter((record) => record.url.length > 0);
				const useDemoOnEmpty = this.getNodeParameter('useDemoOnEmpty', itemIndex, false) as boolean;
				const totalInputs = profileUrls.length + profiles.length;
				if (totalInputs === 0 && !useDemoOnEmpty) {
					throw new NodeOperationError(this.getNode(), 'Provide at least one LinkedIn profile or explicitly enable the demo', { itemIndex });
				}
				if (totalInputs > 100) {
					throw new NodeOperationError(this.getNode(), 'A run accepts at most 100 combined profile inputs', { itemIndex });
				}

				const body = {
					profileUrls,
					profiles,
					enrich: this.getNodeParameter('enrich', itemIndex, true) as boolean,
					exportFormat: this.getNodeParameter('exportFormat', itemIndex, 'default') as string,
					maxConcurrency: this.getNodeParameter('maxConcurrency', itemIndex, 5) as number,
					timeout: this.getNodeParameter('timeout', itemIndex, 60) as number,
					useDemoOnEmpty,
				};
				const execution = this.getNodeParameter('execution', itemIndex, {}) as {
					waitForResults?: boolean; maxWaitSeconds?: number; pollIntervalSeconds?: number;
				};
				const started = await legacyRequest(this, itemIndex, {
					method: 'POST' as IHttpRequestMethods, url: `${API_BASE}/acts/${ACTOR_ID}/runs`, body, json: true,
				} as IHttpRequestOptions);
				let run = started?.data ?? started;
				if (!run?.id) throw new NodeOperationError(this.getNode(), 'Apify did not return a run ID', { itemIndex });
				if (execution.waitForResults === false) {
					returnData.push({ json: run, pairedItem: { item: itemIndex } });
					continue;
				}

				const deadline = Date.now() + (execution.maxWaitSeconds ?? 600) * 1000;
				const pollMilliseconds = (execution.pollIntervalSeconds ?? 5) * 1000;
				while (!TERMINAL_STATUSES.has(run.status) && Date.now() < deadline) {
					await sleep(pollMilliseconds);
					const statusResponse = await legacyRequest(this, itemIndex, {
						method: 'GET' as IHttpRequestMethods, url: `${API_BASE}/actor-runs/${run.id}`, json: true,
					} as IHttpRequestOptions);
					run = statusResponse?.data ?? statusResponse;
				}
				if (!TERMINAL_STATUSES.has(run.status)) {
					throw new NodeOperationError(this.getNode(), `Actor run ${run.id} is still running after ${execution.maxWaitSeconds ?? 600} seconds`, { itemIndex });
				}
				if (run.status !== 'SUCCEEDED') {
					throw new NodeOperationError(this.getNode(), `Actor run ${run.id} finished with status ${run.status}`, { itemIndex });
				}
				if (!run.defaultDatasetId) {
					throw new NodeOperationError(this.getNode(), 'Completed run has no dataset ID', { itemIndex });
				}
				const response = await legacyRequest(this, itemIndex, {
					method: 'GET' as IHttpRequestMethods,
					url: `${API_BASE}/datasets/${run.defaultDatasetId}/items`,
					qs: { clean: true, format: 'json' }, json: true,
				} as IHttpRequestOptions);
				const results = Array.isArray(response) ? response : [response];
				for (const result of results) returnData.push({ json: result, pairedItem: { item: itemIndex } });
			} catch {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: 'Could not finish the Actor request. Check inputs and credentials before retrying' }, pairedItem: { item: itemIndex } });
					continue;
				}
				throw new NodeOperationError(this.getNode(), 'Could not finish the Actor request. Check inputs and credentials before retrying', { itemIndex });
			}
		}
		return [returnData];
	}
}
