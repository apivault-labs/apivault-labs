import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'KXlDi1LT7eCGlCmRs';

export class AmazonReviews implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Amazon Reviews Scraper",
  "name": "amazonReviews",
  "icon": {
    "light": "file:amazonreviews.svg",
    "dark": "file:amazonreviews.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Amazon Reviews Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Amazon Reviews Scraper"
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
    "displayName": "ASINs or Amazon URLs",
    "name": "asins",
    "description": "Actor input: ASINs or Amazon URLs",
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
    "displayName": "Pages per product",
    "name": "maxPages",
    "description": "Actor input: Pages per product",
    "type": "number",
    "default": 1,
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
    "displayName": "Sort reviews by",
    "name": "sortBy",
    "description": "Actor input: Sort reviews by",
    "type": "options",
    "options": [
      {
        "name": "Most recent",
        "value": "recent"
      },
      {
        "name": "Most helpful",
        "value": "helpful"
      }
    ],
    "default": "recent",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Filter by star rating",
    "name": "filterByStar",
    "description": "Actor input: Filter by star rating",
    "type": "options",
    "options": [
      {
        "name": "All (default)",
        "value": "all_stars"
      },
      {
        "name": "5 stars only",
        "value": "five_star"
      },
      {
        "name": "4 stars only",
        "value": "four_star"
      },
      {
        "name": "3 stars only",
        "value": "three_star"
      },
      {
        "name": "2 stars only",
        "value": "two_star"
      },
      {
        "name": "1 star only",
        "value": "one_star"
      },
      {
        "name": "Critical (1-2 stars)",
        "value": "critical"
      },
      {
        "name": "Positive (4-5 stars)",
        "value": "positive"
      }
    ],
    "default": "all_stars",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Reviewer Name",
    "name": "extractReviewer",
    "description": "Actor input: Reviewer Name",
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
    "displayName": "Review Title",
    "name": "extractTitle",
    "description": "Actor input: Review Title",
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
    "displayName": "Review Date",
    "name": "extractDate",
    "description": "Actor input: Review Date",
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
    "displayName": "Review Text",
    "name": "extractText",
    "description": "Actor input: Review Text",
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
    "displayName": "Verified Purchase Flag",
    "name": "extractVerified",
    "description": "Actor input: Verified Purchase Flag",
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
    "displayName": "Helpful Count",
    "name": "extractHelpfulCount",
    "description": "Actor input: Helpful Count",
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
    "displayName": "Country",
    "name": "extractCountry",
    "description": "Actor input: Country",
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
    "displayName": "Product Variant",
    "name": "extractVariant",
    "description": "Actor input: Product Variant",
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
    "name": "extractAsinField",
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
    "default": 120,
    "typeOptions": {
      "minValue": 45,
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
				{ const _v = this.getNodeParameter("asins", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["asins"] = _a; }
				body["domain"] = this.getNodeParameter("domain", i);
				body["maxPages"] = this.getNodeParameter("maxPages", i);
				body["sortBy"] = this.getNodeParameter("sortBy", i);
				body["filterByStar"] = this.getNodeParameter("filterByStar", i);
				body["extractReviewer"] = this.getNodeParameter("extractReviewer", i);
				body["extractRating"] = this.getNodeParameter("extractRating", i);
				body["extractTitle"] = this.getNodeParameter("extractTitle", i);
				body["extractDate"] = this.getNodeParameter("extractDate", i);
				body["extractText"] = this.getNodeParameter("extractText", i);
				body["extractVerified"] = this.getNodeParameter("extractVerified", i);
				body["extractHelpfulCount"] = this.getNodeParameter("extractHelpfulCount", i);
				body["extractCountry"] = this.getNodeParameter("extractCountry", i);
				body["extractVariant"] = this.getNodeParameter("extractVariant", i);
				body["extractAsinField"] = this.getNodeParameter("extractAsinField", i);
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
