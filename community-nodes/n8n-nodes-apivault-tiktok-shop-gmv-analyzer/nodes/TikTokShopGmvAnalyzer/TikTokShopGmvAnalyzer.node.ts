import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'lyjpLaqU9YhzwDZNy';

export class TikTokShopGmvAnalyzer implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "TikTok Shop GMV Analyzer",
  "name": "tiktokShopGmvAnalyzer",
  "icon": {
    "light": "file:tiktokshopgmvanalyzer.svg",
    "dark": "file:tiktokshopgmvanalyzer.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run TikTok Shop GMV Analyzer through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "TikTok Shop GMV Analyzer"
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
        "name": "Keyword & product opportunities",
        "value": "keyword"
      },
      {
        "name": "Seller portfolio GMV",
        "value": "seller"
      },
      {
        "name": "Individual product GMV",
        "value": "product"
      },
      {
        "name": "Creator contribution ranking",
        "value": "creator"
      }
    ],
    "default": "keyword",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Product keywords",
    "name": "searchQueries",
    "description": "Actor input: Product keywords",
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
    "displayName": "TikTok Shop seller URLs or IDs",
    "name": "sellerUrls",
    "description": "Actor input: TikTok Shop seller URLs or IDs",
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
    "displayName": "TikTok Shop product URLs",
    "name": "productUrls",
    "description": "Actor input: TikTok Shop product URLs",
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
    "displayName": "TikTok Shop product IDs",
    "name": "productIds",
    "description": "Actor input: TikTok Shop product IDs",
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
    "displayName": "Creator IDs or names (optional)",
    "name": "creatorIds",
    "description": "Actor input: Creator IDs or names (optional)",
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
    "displayName": "Maximum results",
    "name": "maxItems",
    "description": "Actor input: Maximum results",
    "type": "number",
    "default": 30,
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
    "displayName": "Processing concurrency",
    "name": "maxConcurrency",
    "description": "Actor input: Processing concurrency",
    "type": "number",
    "default": 4,
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
    "displayName": "Request timeout",
    "name": "timeoutSeconds",
    "description": "Actor input: Request timeout",
    "type": "number",
    "default": 35,
    "typeOptions": {
      "minValue": 15,
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
    "displayName": "Marketplace fees, %",
    "name": "platformFeePercent",
    "description": "Actor input: Marketplace fees, %",
    "type": "number",
    "default": 6,
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
    "displayName": "Creator commission, %",
    "name": "creatorCommissionPercent",
    "description": "Actor input: Creator commission, %",
    "type": "number",
    "default": 10,
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
    "displayName": "Advertising cost, %",
    "name": "advertisingPercent",
    "description": "Actor input: Advertising cost, %",
    "type": "number",
    "default": 10,
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
    "displayName": "Shipping cost per order",
    "name": "shippingCostPerOrder",
    "description": "Actor input: Shipping cost per order",
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
				{ const _v = this.getNodeParameter("searchQueries", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["searchQueries"] = _a; }
				{ const _v = this.getNodeParameter("sellerUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["sellerUrls"] = _a; }
				{ const _v = this.getNodeParameter("productUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["productUrls"] = _a; }
				{ const _v = this.getNodeParameter("productIds", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["productIds"] = _a; }
				{ const _v = this.getNodeParameter("creatorIds", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["creatorIds"] = _a; }
				body["maxItems"] = this.getNodeParameter("maxItems", i);
				body["maxConcurrency"] = this.getNodeParameter("maxConcurrency", i);
				body["timeoutSeconds"] = this.getNodeParameter("timeoutSeconds", i);
				body["costOfGoodsPercent"] = this.getNodeParameter("costOfGoodsPercent", i);
				body["platformFeePercent"] = this.getNodeParameter("platformFeePercent", i);
				body["creatorCommissionPercent"] = this.getNodeParameter("creatorCommissionPercent", i);
				body["advertisingPercent"] = this.getNodeParameter("advertisingPercent", i);
				body["refundRatePercent"] = this.getNodeParameter("refundRatePercent", i);
				body["shippingCostPerOrder"] = this.getNodeParameter("shippingCostPerOrder", i);
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
