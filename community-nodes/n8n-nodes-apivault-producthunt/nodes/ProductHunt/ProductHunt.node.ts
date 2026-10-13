import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'jUWLvgRimoRidnJCK';

export class ProductHunt implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "ProductHunt Scraper",
  "name": "producthunt",
  "icon": {
    "light": "file:producthunt.svg",
    "dark": "file:producthunt.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Product Hunt Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "ProductHunt Scraper"
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
    "displayName": "Mode",
    "name": "mode",
    "description": "Actor input: Mode",
    "type": "options",
    "options": [
      {
        "name": "Product URLs — scrape specific product pages",
        "value": "urls"
      },
      {
        "name": "Daily Leaderboard — top products for a date (requires API)",
        "value": "leaderboard"
      },
      {
        "name": "Search — find products by keyword (requires API)",
        "value": "search"
      },
      {
        "name": "Maker — all products by a PH username (requires API)",
        "value": "maker"
      },
      {
        "name": "Topic — top products in a category (requires API)",
        "value": "topic"
      }
    ],
    "default": "urls",
    "required": true,
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "ProductHunt Product URLs",
    "name": "productUrls",
    "description": "Actor input: ProductHunt Product URLs",
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
    "displayName": "Date (leaderboard mode)",
    "name": "date",
    "description": "Actor input: Date (leaderboard mode)",
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
    "displayName": "Search query",
    "name": "searchQuery",
    "description": "Actor input: Search query",
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
    "displayName": "Maker username",
    "name": "makerUsername",
    "description": "Actor input: Maker username",
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
    "displayName": "Topic slug",
    "name": "topicSlug",
    "description": "Actor input: Topic slug",
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
    "displayName": "Topic sort order",
    "name": "topicOrder",
    "description": "Actor input: Topic sort order",
    "type": "options",
    "options": [
      {
        "name": "Most upvoted",
        "value": "VOTES"
      },
      {
        "name": "Newest first",
        "value": "NEWEST"
      },
      {
        "name": "Featured first",
        "value": "FEATURED"
      }
    ],
    "default": "VOTES",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Limit (leaderboard / search / maker / topic)",
    "name": "limit",
    "description": "Actor input: Limit (leaderboard / search / maker / topic)",
    "type": "number",
    "default": 50,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 500
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
    "displayName": "Include competitor analysis",
    "name": "includeCompetitorAnalysis",
    "description": "Actor input: Include competitor analysis",
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
    "displayName": "ProductHunt API Client ID (optional)",
    "name": "phClientId",
    "description": "Actor input: ProductHunt API Client ID (optional)",
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
    "displayName": "ProductHunt API Client Secret (optional)",
    "name": "phClientSecret",
    "description": "Actor input: ProductHunt API Client Secret (optional)",
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
    "displayName": "Max Concurrency",
    "name": "maxConcurrency",
    "description": "Actor input: Max Concurrency",
    "type": "number",
    "default": 3,
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
    "displayName": "Timeout per product (seconds)",
    "name": "timeout",
    "description": "Actor input: Timeout per product (seconds)",
    "type": "number",
    "default": 120,
    "typeOptions": {
      "minValue": 30,
      "maxValue": 300
    },
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
				body["mode"] = this.getNodeParameter("mode", i);
				{ const _v = this.getNodeParameter("productUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["productUrls"] = _a; }
				body["date"] = this.getNodeParameter("date", i);
				body["searchQuery"] = this.getNodeParameter("searchQuery", i);
				body["makerUsername"] = this.getNodeParameter("makerUsername", i);
				body["topicSlug"] = this.getNodeParameter("topicSlug", i);
				body["topicOrder"] = this.getNodeParameter("topicOrder", i);
				body["limit"] = this.getNodeParameter("limit", i);
				body["includeCompetitorAnalysis"] = this.getNodeParameter("includeCompetitorAnalysis", i);
				body["phClientId"] = this.getNodeParameter("phClientId", i);
				body["phClientSecret"] = this.getNodeParameter("phClientSecret", i);
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
