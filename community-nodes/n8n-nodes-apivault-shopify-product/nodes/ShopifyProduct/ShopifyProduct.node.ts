import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'JNpCUgDcPwRUrVdZj';

export class ShopifyProduct implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Shopify Product Scraper",
  "name": "shopifyProduct",
  "icon": {
    "light": "file:shopifyproduct.svg",
    "dark": "file:shopifyproduct.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Shopify Product Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Shopify Product Scraper"
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
    "displayName": "Shopify Store or Product URLs",
    "name": "storeUrls",
    "description": "Actor input: Shopify Store or Product URLs",
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
    "displayName": "Max products per store",
    "name": "maxProducts",
    "description": "Actor input: Max products per store",
    "type": "number",
    "default": 250,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 5000
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
    "displayName": "Products per page",
    "name": "perPage",
    "description": "Actor input: Products per page",
    "type": "number",
    "default": 250,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 250
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
    "displayName": "One row per variant",
    "name": "flattenVariants",
    "description": "Actor input: One row per variant",
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
    "displayName": "Only available products",
    "name": "onlyAvailable",
    "description": "Actor input: Only available products",
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
    "displayName": "Title",
    "name": "extractTitle",
    "description": "Actor input: Title",
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
    "displayName": "Vendor / Brand",
    "name": "extractVendor",
    "description": "Actor input: Vendor / Brand",
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
    "displayName": "Product Type",
    "name": "extractProductType",
    "description": "Actor input: Product Type",
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
    "displayName": "Compare-at Price",
    "name": "extractComparePrice",
    "description": "Actor input: Compare-at Price",
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
    "displayName": "SKU",
    "name": "extractSku",
    "description": "Actor input: SKU",
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
    "displayName": "Description (HTML stripped)",
    "name": "extractDescription",
    "description": "Actor input: Description (HTML stripped)",
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
    "displayName": "Tags",
    "name": "extractTags",
    "description": "Actor input: Tags",
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
    "displayName": "Image URLs",
    "name": "extractImages",
    "description": "Actor input: Image URLs",
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
    "displayName": "Variants (when not flattening)",
    "name": "extractVariants",
    "description": "Actor input: Variants (when not flattening)",
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
    "displayName": "Options",
    "name": "extractOptions",
    "description": "Actor input: Options",
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
    "displayName": "Published/Updated Dates",
    "name": "extractDates",
    "description": "Actor input: Published/Updated Dates",
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
    "displayName": "Handle / URL",
    "name": "extractHandle",
    "description": "Actor input: Handle / URL",
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
    "default": 30,
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
  }
] as INodeProperties[])]
};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const output: INodeExecutionData[] = [];
		for (let i = 0; i < this.getInputData().length; i++) {
			try {
				const body: Record<string, unknown> = this.getNodeParameter('apivaultMode', i, 'run') === 'read' ? {} : (() => {
const body: Record<string, unknown> = {};
				{ const _v = this.getNodeParameter("storeUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["storeUrls"] = _a; }
				body["maxProducts"] = this.getNodeParameter("maxProducts", i);
				body["perPage"] = this.getNodeParameter("perPage", i);
				body["flattenVariants"] = this.getNodeParameter("flattenVariants", i);
				body["onlyAvailable"] = this.getNodeParameter("onlyAvailable", i);
				body["extractTitle"] = this.getNodeParameter("extractTitle", i);
				body["extractVendor"] = this.getNodeParameter("extractVendor", i);
				body["extractProductType"] = this.getNodeParameter("extractProductType", i);
				body["extractPrice"] = this.getNodeParameter("extractPrice", i);
				body["extractComparePrice"] = this.getNodeParameter("extractComparePrice", i);
				body["extractSku"] = this.getNodeParameter("extractSku", i);
				body["extractDescription"] = this.getNodeParameter("extractDescription", i);
				body["extractTags"] = this.getNodeParameter("extractTags", i);
				body["extractImages"] = this.getNodeParameter("extractImages", i);
				body["extractVariants"] = this.getNodeParameter("extractVariants", i);
				body["extractOptions"] = this.getNodeParameter("extractOptions", i);
				body["extractDates"] = this.getNodeParameter("extractDates", i);
				body["extractHandle"] = this.getNodeParameter("extractHandle", i);
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
