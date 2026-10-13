import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = '7iCrjW8fqMgA950VB';

export class YoutubeBusinessEmailScraper implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "YouTube Business Email Scraper",
  "name": "youtubeBusinessEmailScraper",
  "icon": {
    "light": "file:youtubebusinessemail.svg",
    "dark": "file:youtubebusinessemail.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run YouTube Channel Email Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "YouTube Business Email Scraper"
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
    "displayName": "YouTube channels or video URLs",
    "name": "channels",
    "description": "Actor input: YouTube channels or video URLs",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
    "default": "@MrBeast\n@mkbhd\n@NetworkChuck",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Search queries (find channels by niche)",
    "name": "searchQueries",
    "description": "Actor input: Search queries (find channels by niche)",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
    "default": "",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Max channels per search query",
    "name": "maxChannelsPerQuery",
    "description": "Actor input: Max channels per search query",
    "type": "number",
    "default": 10,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 50
    },
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Only output channels with an email",
    "name": "onlyWithEmail",
    "description": "Actor input: Only output channels with an email",
    "type": "boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Only keep named/business emails (drop info@, support@ …)",
    "name": "onlyBusinessEmail",
    "description": "Actor input: Only keep named/business emails (drop info@, support@ …)",
    "type": "boolean",
    "default": false,
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Keep only these email domains",
    "name": "emailDomains",
    "description": "Actor input: Keep only these email domains",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
    "default": "",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Minimum subscribers",
    "name": "minSubscribers",
    "description": "Actor input: Minimum subscribers",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0
    },
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Find email from channel's website & social links",
    "name": "enrichFromLinks",
    "description": "Actor input: Find email from channel's website & social links",
    "type": "boolean",
    "default": true,
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Deep email lookup",
    "name": "useDeepLookup",
    "description": "Actor input: Deep email lookup",
    "type": "boolean",
    "default": true,
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Deep lookup endpoint (advanced)",
    "name": "deepLookupEndpoint",
    "description": "Actor input: Deep lookup endpoint (advanced)",
    "type": "string",
    "default": "",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Deep lookup key (advanced)",
    "name": "deepLookupApiKey",
    "description": "Actor input: Deep lookup key (advanced)",
    "type": "string",
    "default": "",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Precise subscriber count",
    "name": "preciseSubscribers",
    "description": "Actor input: Precise subscriber count",
    "type": "boolean",
    "default": true,
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Extract recent videos & activity",
    "name": "extractRecentVideos",
    "description": "Actor input: Extract recent videos & activity",
    "type": "boolean",
    "default": true,
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Max concurrency",
    "name": "maxConcurrency",
    "description": "Actor input: Max concurrency",
    "type": "number",
    "default": 40,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 100
    },
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Timeout per channel (seconds)",
    "name": "timeout",
    "description": "Actor input: Timeout per channel (seconds)",
    "type": "number",
    "default": 25,
    "typeOptions": {
      "minValue": 10,
      "maxValue": 120
    },
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Additional Actor Input (JSON)",
    "name": "additionalInput",
    "description": "Actor input: Additional Actor Input (JSON)",
    "type": "json",
    "default": "{}",
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
		const output: INodeExecutionData[] = [];
		for (let i = 0; i < this.getInputData().length; i++) {
			try {
				const body: Record<string, unknown> = this.getNodeParameter('apivaultMode', i, 'run') === 'read' ? {} : (() => {
const body: Record<string, unknown> = {};
				const extra = this.getNodeParameter('additionalInput', i, '{}') as string | object;
				if (extra) {
					try { Object.assign(body, typeof extra === 'string' ? JSON.parse(extra) : extra); }
					catch { throw new NodeOperationError(this.getNode(), 'Additional Actor Input must be valid JSON', { itemIndex: i }); }
				}
				{ const value = this.getNodeParameter("channels", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["channels"] = values; }
				{ const value = this.getNodeParameter("searchQueries", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["searchQueries"] = values; }
				body["maxChannelsPerQuery"] = this.getNodeParameter("maxChannelsPerQuery", i);
				body["onlyWithEmail"] = this.getNodeParameter("onlyWithEmail", i);
				body["onlyBusinessEmail"] = this.getNodeParameter("onlyBusinessEmail", i);
				{ const value = this.getNodeParameter("emailDomains", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["emailDomains"] = values; }
				body["minSubscribers"] = this.getNodeParameter("minSubscribers", i);
				body["enrichFromLinks"] = this.getNodeParameter("enrichFromLinks", i);
				body["useDeepLookup"] = this.getNodeParameter("useDeepLookup", i);
				{ const value = this.getNodeParameter("deepLookupEndpoint", i, '') as string; if (value.trim()) body["deepLookupEndpoint"] = value.trim(); }
				{ const value = this.getNodeParameter("deepLookupApiKey", i, '') as string; if (value.trim()) body["deepLookupApiKey"] = value.trim(); }
				body["preciseSubscribers"] = this.getNodeParameter("preciseSubscribers", i);
				body["extractRecentVideos"] = this.getNodeParameter("extractRecentVideos", i);
				body["maxConcurrency"] = this.getNodeParameter("maxConcurrency", i);
				body["timeout"] = this.getNodeParameter("timeout", i);
					return body;
				})();
				const results = await runActor(this, i, ACTOR_ID, body);
				for (const result of results) output.push({ json: result, pairedItem: { item: i } });
			} catch (error) {
				const message = error instanceof SafeActorError ? error.message : 'Could not finish the Actor request. Check inputs and credentials; use Read Existing Run if a run was already started';
				if (this.continueOnFail()) output.push({ json: { error: message }, pairedItem: { item: i } });
				else throw new NodeOperationError(this.getNode(), message, { itemIndex: i });
			}
		}
		return [output];
	}
}
