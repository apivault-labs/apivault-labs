import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'AhU85DNr5MagE9Bib';

export class AmazonBestsellers implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Amazon Bestsellers Scraper",
  "name": "amazonBestsellers",
  "icon": {
    "light": "file:amazonbestsellers.svg",
    "dark": "file:amazonbestsellers.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Amazon Bestsellers Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Amazon Bestsellers Scraper"
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
    "displayName": "Amazon Bestsellers URLs",
    "name": "categoryUrls",
    "description": "Actor input: Amazon Bestsellers URLs",
    "type": "string",
    "default": "",
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
    "displayName": "Amazon domain",
    "name": "domain",
    "description": "Actor input: Amazon domain",
    "type": "options",
    "options": [
      {
        "name": "US — amazon.com",
        "value": "amazon.com"
      },
      {
        "name": "UK — amazon.co.uk",
        "value": "amazon.co.uk"
      },
      {
        "name": "Germany — amazon.de",
        "value": "amazon.de"
      },
      {
        "name": "France — amazon.fr",
        "value": "amazon.fr"
      },
      {
        "name": "Italy — amazon.it",
        "value": "amazon.it"
      },
      {
        "name": "Spain — amazon.es",
        "value": "amazon.es"
      },
      {
        "name": "Canada — amazon.ca",
        "value": "amazon.ca"
      },
      {
        "name": "Australia — amazon.com.au",
        "value": "amazon.com.au"
      },
      {
        "name": "Japan — amazon.co.jp",
        "value": "amazon.co.jp"
      },
      {
        "name": "India — amazon.in",
        "value": "amazon.in"
      },
      {
        "name": "Mexico — amazon.com.mx",
        "value": "amazon.com.mx"
      },
      {
        "name": "Brazil — amazon.com.br",
        "value": "amazon.com.br"
      }
    ],
    "default": "amazon.com",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Pages per category",
    "name": "maxPages",
    "description": "Actor input: Pages per category",
    "type": "number",
    "default": 2,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 2
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
    "displayName": "Rank",
    "name": "extractRank",
    "description": "Actor input: Rank",
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
    "displayName": "Product Title",
    "name": "extractTitle",
    "description": "Actor input: Product Title",
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
    "displayName": "Price",
    "name": "extractPrice",
    "description": "Actor input: Price",
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
    "displayName": "Rating",
    "name": "extractRating",
    "description": "Actor input: Rating",
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
    "displayName": "Reviews Count",
    "name": "extractReviewsCount",
    "description": "Actor input: Reviews Count",
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
    "displayName": "ASIN",
    "name": "extractAsin",
    "description": "Actor input: ASIN",
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
    "displayName": "Product URL",
    "name": "extractProductUrl",
    "description": "Actor input: Product URL",
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
    "displayName": "Product Image",
    "name": "extractImage",
    "description": "Actor input: Product Image",
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
    "displayName": "Category Name",
    "name": "extractCategoryName",
    "description": "Actor input: Category Name",
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
    "displayName": "Max Concurrency",
    "name": "maxConcurrency",
    "description": "Actor input: Max Concurrency",
    "type": "number",
    "default": 2,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 5
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
    "default": 180,
    "typeOptions": {
      "minValue": 60,
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
				{ const _v = this.getNodeParameter("categoryUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["categoryUrls"] = _a; }
				body["domain"] = this.getNodeParameter("domain", i);
				body["maxPages"] = this.getNodeParameter("maxPages", i);
				body["extractRank"] = this.getNodeParameter("extractRank", i);
				body["extractTitle"] = this.getNodeParameter("extractTitle", i);
				body["extractPrice"] = this.getNodeParameter("extractPrice", i);
				body["extractRating"] = this.getNodeParameter("extractRating", i);
				body["extractReviewsCount"] = this.getNodeParameter("extractReviewsCount", i);
				body["extractAsin"] = this.getNodeParameter("extractAsin", i);
				body["extractProductUrl"] = this.getNodeParameter("extractProductUrl", i);
				body["extractImage"] = this.getNodeParameter("extractImage", i);
				body["extractCategoryName"] = this.getNodeParameter("extractCategoryName", i);
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
