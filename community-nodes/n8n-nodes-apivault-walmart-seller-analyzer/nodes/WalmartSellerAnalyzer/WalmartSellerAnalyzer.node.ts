import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'wdaL1W6hgXsOrQegm';

export class WalmartSellerAnalyzer implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Walmart Seller Analyzer",
  "name": "walmartSellerAnalyzer",
  "icon": {
    "light": "file:walmartselleranalyzer.svg",
    "dark": "file:walmartselleranalyzer.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Walmart Seller Analyzer through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Walmart Seller Analyzer"
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
    "displayName": "Analysis mode",
    "name": "mode",
    "description": "Actor input: Analysis mode",
    "type": "options",
    "options": [
      {
        "name": "Seller revenue",
        "value": "seller"
      },
      {
        "name": "Product analysis",
        "value": "product"
      },
      {
        "name": "Niche opportunity",
        "value": "niche"
      }
    ],
    "default": "niche",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Walmart seller storefront URLs",
    "name": "sellerUrls",
    "description": "Actor input: Walmart seller storefront URLs",
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
    "displayName": "Walmart product URLs",
    "name": "productUrls",
    "description": "Actor input: Walmart product URLs",
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
    "displayName": "Walmart item IDs",
    "name": "productIds",
    "description": "Actor input: Walmart item IDs",
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
    "displayName": "Keywords / niches",
    "name": "searchQueries",
    "description": "Actor input: Keywords / niches",
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
    "displayName": "Products per seller",
    "name": "maxProductsPerSeller",
    "description": "Actor input: Products per seller",
    "type": "number",
    "default": 25,
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
    "displayName": "Results per keyword",
    "name": "maxResultsPerQuery",
    "description": "Actor input: Results per keyword",
    "type": "number",
    "default": 40,
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
    "displayName": "Enhanced product analysis",
    "name": "includeProductDetails",
    "description": "Actor input: Enhanced product analysis",
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
    "displayName": "Products to enrich",
    "name": "maxDetailedProducts",
    "description": "Actor input: Products to enrich",
    "type": "number",
    "default": 20,
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
    "displayName": "US ZIP code",
    "name": "postalCode",
    "description": "Actor input: US ZIP code",
    "type": "string",
    "default": "95829",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Walmart store ID (optional)",
    "name": "storeId",
    "description": "Actor input: Walmart store ID (optional)",
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
    "displayName": "Cost of goods, %",
    "name": "costOfGoodsPercent",
    "description": "Actor input: Cost of goods, %",
    "type": "number",
    "default": 30,
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
    "displayName": "Seller shipping per order",
    "name": "shippingCostPerOrderUsd",
    "description": "Actor input: Seller shipping per order",
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
    "displayName": "WFS fee per order",
    "name": "wfsFeePerOrderUsd",
    "description": "Actor input: WFS fee per order",
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
    "displayName": "Advertising cost, %",
    "name": "advertisingRatePercent",
    "description": "Actor input: Advertising cost, %",
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
    "displayName": "Refund allowance, %",
    "name": "refundRatePercent",
    "description": "Actor input: Refund allowance, %",
    "type": "number",
    "default": 2,
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
    "displayName": "Processing concurrency",
    "name": "maxConcurrency",
    "description": "Actor input: Processing concurrency",
    "type": "number",
    "default": 4,
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
    "displayName": "Proxy configuration",
    "name": "proxyConfiguration",
    "description": "Actor input: Proxy configuration",
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
				body["mode"] = this.getNodeParameter("mode", i);
				{ const _v = this.getNodeParameter("sellerUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["sellerUrls"] = _a; }
				{ const _v = this.getNodeParameter("productUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["productUrls"] = _a; }
				{ const _v = this.getNodeParameter("productIds", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["productIds"] = _a; }
				{ const _v = this.getNodeParameter("searchQueries", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["searchQueries"] = _a; }
				body["maxProductsPerSeller"] = this.getNodeParameter("maxProductsPerSeller", i);
				body["maxResultsPerQuery"] = this.getNodeParameter("maxResultsPerQuery", i);
				body["includeProductDetails"] = this.getNodeParameter("includeProductDetails", i);
				body["maxDetailedProducts"] = this.getNodeParameter("maxDetailedProducts", i);
				body["postalCode"] = this.getNodeParameter("postalCode", i);
				body["storeId"] = this.getNodeParameter("storeId", i);
				body["costOfGoodsPercent"] = this.getNodeParameter("costOfGoodsPercent", i);
				body["shippingCostPerOrderUsd"] = this.getNodeParameter("shippingCostPerOrderUsd", i);
				body["wfsFeePerOrderUsd"] = this.getNodeParameter("wfsFeePerOrderUsd", i);
				body["advertisingRatePercent"] = this.getNodeParameter("advertisingRatePercent", i);
				body["refundRatePercent"] = this.getNodeParameter("refundRatePercent", i);
				body["maxConcurrency"] = this.getNodeParameter("maxConcurrency", i);
				{ const _r = this.getNodeParameter("proxyConfiguration", i, '') as string|object; if (_r) { try { body["proxyConfiguration"] = typeof _r === 'string' ? JSON.parse(_r) : _r; } catch { throw new NodeOperationError(this.getNode(), "proxyConfiguration" + ' must be valid JSON', { itemIndex: i }); } } }
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
