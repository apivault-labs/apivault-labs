import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = '9gQOeVrfq8gbqm6ei';

export class AdLibraryScraper implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Ad Library Scraper",
  "name": "adLibraryScraper",
  "icon": {
    "light": "file:adlibrary.svg",
    "dark": "file:adlibrary.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Ad Library Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Ad Library Scraper"
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
    "displayName": "What do you want to find?",
    "name": "mode",
    "description": "Actor input: What do you want to find?",
    "type": "options",
    "options": [
      {
        "name": "Exact competitor ads",
        "value": "competitor"
      },
      {
        "name": "Keyword / product discovery",
        "value": "discovery"
      }
    ],
    "default": "competitor",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Competitor domains",
    "name": "domains",
    "description": "Actor input: Competitor domains",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
    "default": "nike.com",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "…or brand / keyword",
    "name": "searchQuery",
    "description": "Actor input: …or brand / keyword",
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
    "displayName": "…or Google advertiser IDs",
    "name": "advertiserIds",
    "description": "Actor input: …or Google advertiser IDs",
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
    "displayName": "…or Facebook Page IDs",
    "name": "metaPageIds",
    "description": "Actor input: …or Facebook Page IDs",
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
    "displayName": "Region",
    "name": "region",
    "description": "Actor input: Region",
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
    "displayName": "Only fresh ads (days)",
    "name": "startedWithinDays",
    "description": "Actor input: Only fresh ads (days)",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 365
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
    "displayName": "Advertisers per keyword",
    "name": "maxAdvertisers",
    "description": "Actor input: Advertisers per keyword",
    "type": "number",
    "default": 5,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 20
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
    "displayName": "Max ads per competitor",
    "name": "maxItems",
    "description": "Actor input: Max ads per competitor",
    "type": "number",
    "default": 100,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 10000
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
    "displayName": "Facebook & Instagram ads (Meta)",
    "name": "includeMeta",
    "description": "Actor input: Facebook & Instagram ads (Meta)",
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
    "displayName": "TikTok ads (EU/UK)",
    "name": "includeTikTok",
    "description": "Actor input: TikTok ads (EU/UK)",
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
    "displayName": "Include advertiser info",
    "name": "includeAdvertiserInfo",
    "description": "Actor input: Include advertiser info",
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
    "displayName": "Google videos: save permanent copies (slower)",
    "name": "rehostGoogleVideos",
    "description": "Actor input: Google videos: save permanent copies (slower)",
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
    "displayName": "Meta media: save permanent copies (slower)",
    "name": "rehostMetaMedia",
    "description": "Actor input: Meta media: save permanent copies (slower)",
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
    "displayName": "TikTok media: save permanent copies (slower)",
    "name": "rehostTikTokMedia",
    "description": "Actor input: TikTok media: save permanent copies (slower)",
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
    "displayName": "Max media files to save",
    "name": "maxRehostVideos",
    "description": "Actor input: Max media files to save",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0,
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
    "displayName": "Parallel competitors",
    "name": "maxConcurrency",
    "description": "Actor input: Parallel competitors",
    "type": "number",
    "default": 2,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 10
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
				body["mode"] = this.getNodeParameter("mode", i);
				{ const value = this.getNodeParameter("domains", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["domains"] = values; }
				{ const value = this.getNodeParameter("searchQuery", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["searchQuery"] = values; }
				{ const value = this.getNodeParameter("advertiserIds", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["advertiserIds"] = values; }
				{ const value = this.getNodeParameter("metaPageIds", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["metaPageIds"] = values; }
				body["region"] = this.getNodeParameter("region", i);
				body["startedWithinDays"] = this.getNodeParameter("startedWithinDays", i);
				body["maxAdvertisers"] = this.getNodeParameter("maxAdvertisers", i);
				body["maxItems"] = this.getNodeParameter("maxItems", i);
				body["includeMeta"] = this.getNodeParameter("includeMeta", i);
				body["includeTikTok"] = this.getNodeParameter("includeTikTok", i);
				body["includeAdvertiserInfo"] = this.getNodeParameter("includeAdvertiserInfo", i);
				body["rehostGoogleVideos"] = this.getNodeParameter("rehostGoogleVideos", i);
				body["rehostMetaMedia"] = this.getNodeParameter("rehostMetaMedia", i);
				body["rehostTikTokMedia"] = this.getNodeParameter("rehostTikTokMedia", i);
				body["maxRehostVideos"] = this.getNodeParameter("maxRehostVideos", i);
				body["maxConcurrency"] = this.getNodeParameter("maxConcurrency", i);
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
