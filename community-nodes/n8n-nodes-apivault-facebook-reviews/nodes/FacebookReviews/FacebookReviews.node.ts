import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'I2YiRhMLCqC9Yer8Q';

export class FacebookReviews implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Facebook Reviews Scraper - Ratings, Sentiment, No Login",
  "name": "facebookReviews",
  "icon": {
    "light": "file:facebookreviews.svg",
    "dark": "file:facebookreviews.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Facebook Reviews Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Facebook Reviews Scraper - Ratings, Sentiment, No Login"
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
    "displayName": "Facebook Page URLs",
    "name": "startUrls",
    "description": "Actor input: Facebook Page URLs",
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
    "displayName": "Keyword search (optional)",
    "name": "searchQueries",
    "description": "Actor input: Keyword search (optional)",
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
    "displayName": "Max reviews per page",
    "name": "maxReviewsPerPage",
    "description": "Actor input: Max reviews per page",
    "type": "number",
    "default": 50,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 1000
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
    "displayName": "Max results (cost cap)",
    "name": "maxResults",
    "description": "Actor input: Max results (cost cap)",
    "type": "number",
    "default": 500,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 50000
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
    "displayName": "Max cost USD (cost cap)",
    "name": "maxCostUsd",
    "description": "Actor input: Max cost USD (cost cap)",
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
    "displayName": "Only reviews from last N days",
    "name": "sinceDays",
    "description": "Actor input: Only reviews from last N days",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 3650
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
    "displayName": "Review text keyword filter",
    "name": "keywordFilter",
    "description": "Actor input: Review text keyword filter",
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
    "displayName": "Incremental — only new reviews",
    "name": "onlyNewSinceLastRun",
    "description": "Actor input: Incremental — only new reviews",
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
    "displayName": "AI sentiment analysis",
    "name": "analyzeSentiment",
    "description": "Actor input: AI sentiment analysis",
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
    "displayName": "Extract page contact (email / phone)",
    "name": "enrichPageContacts",
    "description": "Actor input: Extract page contact (email / phone)",
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
    "displayName": "Include review photos",
    "name": "includeMedia",
    "description": "Actor input: Include review photos",
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
    "displayName": "Timeout per page (seconds)",
    "name": "timeout",
    "description": "Actor input: Timeout per page (seconds)",
    "type": "number",
    "default": 45,
    "typeOptions": {
      "minValue": 15,
      "maxValue": 180
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
    "displayName": "Max retries per page",
    "name": "maxRetries",
    "description": "Actor input: Max retries per page",
    "type": "number",
    "default": 2,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 8
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
    "displayName": "Allow Proxy fallback (recommended)",
    "name": "useResidentialProxy",
    "description": "Actor input: Allow Proxy fallback (recommended)",
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
    "displayName": "Proxy country code (geo-targeting)",
    "name": "proxyCountry",
    "description": "Actor input: Proxy country code (geo-targeting)",
    "type": "string",
    "default": "US",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Deduplicate",
    "name": "dedupe",
    "description": "Actor input: Deduplicate",
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
    "displayName": "Real-time webhook URL",
    "name": "notifyWebhookUrl",
    "description": "Actor input: Real-time webhook URL",
    "type": "string",
    "default": "",
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
				{ const _v = this.getNodeParameter("startUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["startUrls"] = _a; }
				{ const _v = this.getNodeParameter("searchQueries", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["searchQueries"] = _a; }
				body["maxReviewsPerPage"] = this.getNodeParameter("maxReviewsPerPage", i);
				body["maxResults"] = this.getNodeParameter("maxResults", i);
				body["maxCostUsd"] = this.getNodeParameter("maxCostUsd", i);
				body["sinceDays"] = this.getNodeParameter("sinceDays", i);
				body["keywordFilter"] = this.getNodeParameter("keywordFilter", i);
				body["onlyNewSinceLastRun"] = this.getNodeParameter("onlyNewSinceLastRun", i);
				body["analyzeSentiment"] = this.getNodeParameter("analyzeSentiment", i);
				body["enrichPageContacts"] = this.getNodeParameter("enrichPageContacts", i);
				body["includeMedia"] = this.getNodeParameter("includeMedia", i);
				body["maxConcurrency"] = this.getNodeParameter("maxConcurrency", i);
				body["timeout"] = this.getNodeParameter("timeout", i);
				body["maxRetries"] = this.getNodeParameter("maxRetries", i);
				body["useResidentialProxy"] = this.getNodeParameter("useResidentialProxy", i);
				body["proxyCountry"] = this.getNodeParameter("proxyCountry", i);
				body["dedupe"] = this.getNodeParameter("dedupe", i);
				body["notifyWebhookUrl"] = this.getNodeParameter("notifyWebhookUrl", i);
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
