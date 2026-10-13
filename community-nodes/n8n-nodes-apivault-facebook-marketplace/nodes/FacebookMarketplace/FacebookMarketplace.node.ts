import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'cLl2R7iBrlbR9iD8d';

export class FacebookMarketplace implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Facebook Marketplace Scraper - Listings, Prices, Sellers & Contacts (No Login)",
  "name": "facebookMarketplace",
  "icon": {
    "light": "file:facebookmarketplace.svg",
    "dark": "file:facebookmarketplace.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Facebook Marketplace Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Facebook Marketplace Scraper - Listings, Prices, Sellers & Contacts (No Login)"
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
        "name": "Search by keyword",
        "value": "search"
      },
      {
        "name": "Browse category",
        "value": "category"
      },
      {
        "name": "Direct URLs",
        "value": "urls"
      }
    ],
    "default": "search",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Search terms",
    "name": "searchTerms",
    "description": "Actor input: Search terms",
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
    "displayName": "Location",
    "name": "location",
    "description": "Actor input: Location",
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
    "displayName": "Categories",
    "name": "categories",
    "description": "Actor input: Categories",
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
    "displayName": "Listing / search URLs",
    "name": "listingUrls",
    "description": "Actor input: Listing / search URLs",
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
    "displayName": "Max items",
    "name": "maxItems",
    "description": "Actor input: Max items",
    "type": "number",
    "default": 100,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 2000
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
    "displayName": "Extract seller contacts (email / phone)",
    "name": "enrichContacts",
    "description": "Actor input: Extract seller contacts (email / phone)",
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
    "displayName": "Enrich from each listing's detail page",
    "name": "enrichDetails",
    "description": "Actor input: Enrich from each listing's detail page",
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
    "displayName": "Expand coverage (more results per term)",
    "name": "expandCoverage",
    "description": "Actor input: Expand coverage (more results per term)",
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
    "displayName": "Only new listings (incremental)",
    "name": "onlyNew",
    "description": "Actor input: Only new listings (incremental)",
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
  },
  {
    "displayName": "Min price",
    "name": "minPrice",
    "description": "Actor input: Min price",
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
    "displayName": "Max price",
    "name": "maxPrice",
    "description": "Actor input: Max price",
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
    "displayName": "Days since listed",
    "name": "daysSinceListed",
    "description": "Actor input: Days since listed",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 90
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
    "displayName": "Sort by",
    "name": "sortBy",
    "description": "Actor input: Sort by",
    "type": "options",
    "options": [
      {
        "name": "Best match",
        "value": "best_match"
      },
      {
        "name": "Newest first",
        "value": "creation_time_descend"
      },
      {
        "name": "Price: low to high",
        "value": "price_ascend"
      },
      {
        "name": "Price: high to low",
        "value": "price_descend"
      },
      {
        "name": "Distance: nearest",
        "value": "distance_ascend"
      }
    ],
    "default": "best_match",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Max retries per URL",
    "name": "maxRetries",
    "description": "Actor input: Max retries per URL",
    "type": "number",
    "default": 3,
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
    "displayName": "Max concurrency",
    "name": "maxConcurrency",
    "description": "Actor input: Max concurrency",
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
    "displayName": "Timeout per request (seconds)",
    "name": "timeout",
    "description": "Actor input: Timeout per request (seconds)",
    "type": "number",
    "default": 45,
    "typeOptions": {
      "minValue": 15,
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
    "displayName": "Use Proxy (recommended)",
    "name": "useResidentialProxy",
    "description": "Actor input: Use Proxy (recommended)",
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
    "displayName": "Proxy country code",
    "name": "proxyCountry",
    "description": "Actor input: Proxy country code",
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
    "displayName": "Debug probe",
    "name": "debug",
    "description": "Actor input: Debug probe",
    "type": "boolean",
    "default": false,
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
				{ const _v = this.getNodeParameter("searchTerms", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["searchTerms"] = _a; }
				body["location"] = this.getNodeParameter("location", i);
				{ const _v = this.getNodeParameter("categories", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["categories"] = _a; }
				{ const _v = this.getNodeParameter("listingUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["listingUrls"] = _a; }
				body["maxItems"] = this.getNodeParameter("maxItems", i);
				body["enrichContacts"] = this.getNodeParameter("enrichContacts", i);
				body["enrichDetails"] = this.getNodeParameter("enrichDetails", i);
				body["expandCoverage"] = this.getNodeParameter("expandCoverage", i);
				body["onlyNew"] = this.getNodeParameter("onlyNew", i);
				body["notifyWebhookUrl"] = this.getNodeParameter("notifyWebhookUrl", i);
				body["minPrice"] = this.getNodeParameter("minPrice", i);
				body["maxPrice"] = this.getNodeParameter("maxPrice", i);
				body["daysSinceListed"] = this.getNodeParameter("daysSinceListed", i);
				body["sortBy"] = this.getNodeParameter("sortBy", i);
				body["maxRetries"] = this.getNodeParameter("maxRetries", i);
				body["maxConcurrency"] = this.getNodeParameter("maxConcurrency", i);
				body["timeout"] = this.getNodeParameter("timeout", i);
				body["useResidentialProxy"] = this.getNodeParameter("useResidentialProxy", i);
				body["proxyCountry"] = this.getNodeParameter("proxyCountry", i);
				body["debug"] = this.getNodeParameter("debug", i);
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
