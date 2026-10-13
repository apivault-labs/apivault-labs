import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 't0oWsDLob7QOPxcCh';

export class Newegg implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Newegg Product Scraper",
  "name": "newegg",
  "icon": {
    "light": "file:newegg.svg",
    "dark": "file:newegg.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Newegg Product Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Newegg Product Scraper"
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
    "displayName": "Newegg Product URLs or Item IDs",
    "name": "productUrls",
    "description": "Actor input: Newegg Product URLs or Item IDs",
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
    "displayName": "Original Price",
    "name": "extractOriginalPrice",
    "description": "Actor input: Original Price",
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
    "displayName": "Brand",
    "name": "extractBrand",
    "description": "Actor input: Brand",
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
    "displayName": "Model Number",
    "name": "extractModel",
    "description": "Actor input: Model Number",
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
    "displayName": "Category",
    "name": "extractCategory",
    "description": "Actor input: Category",
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
    "displayName": "Availability",
    "name": "extractAvailability",
    "description": "Actor input: Availability",
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
    "displayName": "Seller",
    "name": "extractSeller",
    "description": "Actor input: Seller",
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
    "displayName": "Shipping Info",
    "name": "extractShipping",
    "description": "Actor input: Shipping Info",
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
    "displayName": "Description",
    "name": "extractDescription",
    "description": "Actor input: Description",
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
    "displayName": "Main Image",
    "name": "extractImage",
    "description": "Actor input: Main Image",
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
    "default": 3,
    "typeOptions": {
      "minValue": 1,
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
    "displayName": "Timeout per product (seconds)",
    "name": "timeout",
    "description": "Actor input: Timeout per product (seconds)",
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
				{ const _v = this.getNodeParameter("productUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["productUrls"] = _a; }
				body["extractTitle"] = this.getNodeParameter("extractTitle", i);
				body["extractPrice"] = this.getNodeParameter("extractPrice", i);
				body["extractOriginalPrice"] = this.getNodeParameter("extractOriginalPrice", i);
				body["extractRating"] = this.getNodeParameter("extractRating", i);
				body["extractReviewsCount"] = this.getNodeParameter("extractReviewsCount", i);
				body["extractBrand"] = this.getNodeParameter("extractBrand", i);
				body["extractModel"] = this.getNodeParameter("extractModel", i);
				body["extractCategory"] = this.getNodeParameter("extractCategory", i);
				body["extractAvailability"] = this.getNodeParameter("extractAvailability", i);
				body["extractSeller"] = this.getNodeParameter("extractSeller", i);
				body["extractShipping"] = this.getNodeParameter("extractShipping", i);
				body["extractDescription"] = this.getNodeParameter("extractDescription", i);
				body["extractImage"] = this.getNodeParameter("extractImage", i);
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
