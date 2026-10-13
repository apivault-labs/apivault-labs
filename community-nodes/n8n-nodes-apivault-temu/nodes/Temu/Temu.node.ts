import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = '4kqabNhJmz8CRgV5z';

export class Temu implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Temu Product Scraper",
  "name": "temu",
  "icon": {
    "light": "file:temu.svg",
    "dark": "file:temu.svg"
  },
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "subtitle": "={{$parameter[\"exportFormat\"]}}",
  "description": "Run Temu Product Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Temu Product Scraper"
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
    "displayName": "Product URLs or IDs",
    "name": "productUrls",
    "type": "string",
    "default": "",
    "required": true,
    "placeholder": "https://www.temu.com/...-g-601099527041816.html, 601099527041816",
    "description": "Actor input: Product URLs or IDs",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Export Format",
    "name": "exportFormat",
    "type": "options",
    "options": [
      {
        "name": "Default JSON (all fields)",
        "value": "default"
      },
      {
        "name": "Shopify Product CSV",
        "value": "shopify-csv"
      },
      {
        "name": "Google Merchant Feed",
        "value": "google-merchant"
      }
    ],
    "default": "default",
    "description": "Actor input: Export Format",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Retail Markup Multiplier",
    "name": "retailMarkup",
    "type": "number",
    "typeOptions": {
      "minValue": 1,
      "numberPrecision": 1
    },
    "default": 3,
    "description": "Actor input: Retail Markup Multiplier",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Filters",
    "name": "filters",
    "type": "collection",
    "placeholder": "Add Filter",
    "default": {},
    "options": [
      {
        "displayName": "Min Demand Score",
        "name": "minDemandScore",
        "type": "number",
        "typeOptions": {
          "minValue": 0,
          "maxValue": 100
        },
        "default": 0,
        "description": "Drop products below this demand score (0-100)"
      },
      {
        "displayName": "Min Hot-Product Score",
        "name": "minHotProductScore",
        "type": "number",
        "typeOptions": {
          "minValue": 0,
          "maxValue": 100
        },
        "default": 0,
        "description": "Drop products below this hotProductScore (recommend ≥55 for premium-only)"
      },
      {
        "displayName": "Only Trending",
        "name": "onlyTrending",
        "type": "boolean",
        "default": false,
        "description": "Whether to keep only products flagged isTrending (sold ≥ 10K AND rating ≥ 4.4)"
      },
      {
        "displayName": "Only Free Shipping",
        "name": "onlyFreeShipping",
        "type": "boolean",
        "default": false,
        "description": "Whether to keep only products with free shipping"
      }
    ],
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Additional Options",
    "name": "additionalOptions",
    "type": "collection",
    "placeholder": "Add Option",
    "default": {},
    "options": [
      {
        "displayName": "Write SUMMARY + TOP_PRODUCTS",
        "name": "writeSummary",
        "type": "boolean",
        "default": true,
        "description": "Whether to write aggregate KV records (SUMMARY + TOP_PRODUCTS bestseller digest)"
      },
      {
        "displayName": "Extract Variants",
        "name": "extractVariants",
        "type": "boolean",
        "default": true,
        "description": "Whether to extract variant options (color, size) — needed for full Shopify migration"
      },
      {
        "displayName": "Extract Image Gallery",
        "name": "extractImages",
        "type": "boolean",
        "default": true,
        "description": "Whether to extract all product image URLs (up to 10)"
      },
      {
        "displayName": "Extract Outreach Links",
        "name": "extractOutreachLinks",
        "type": "boolean",
        "default": true,
        "description": "Whether to build research links (AliExpress/Amazon/eBay/Google Shopping/TikTok)"
      },
      {
        "displayName": "Max Concurrency",
        "name": "maxConcurrency",
        "type": "number",
        "typeOptions": {
          "minValue": 1,
          "maxValue": 8
        },
        "default": 3,
        "description": "Parallel product scrapes (Temu is sensitive — 2-3 recommended)"
      },
      {
        "displayName": "Max Retries",
        "name": "maxRetries",
        "type": "number",
        "typeOptions": {
          "minValue": 0,
          "maxValue": 3
        },
        "default": 1,
        "description": "Retry count on transient failures"
      },
      {
        "displayName": "Timeout per Product (Seconds)",
        "name": "timeout",
        "type": "number",
        "typeOptions": {
          "minValue": 60,
          "maxValue": 300
        },
        "default": 180,
        "description": "Max wait per Temu product page"
      }
    ],
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
const raw = this.getNodeParameter('productUrls', i) as string;
				const exportFormat = this.getNodeParameter('exportFormat', i) as string;
				const retailMarkup = this.getNodeParameter('retailMarkup', i) as number;
				const filters = this.getNodeParameter('filters', i, {}) as {
					minDemandScore?: number;
					minHotProductScore?: number;
					onlyTrending?: boolean;
					onlyFreeShipping?: boolean;
				};
				const extra = this.getNodeParameter('additionalOptions', i, {}) as {
					writeSummary?: boolean;
					extractVariants?: boolean;
					extractImages?: boolean;
					extractOutreachLinks?: boolean;
					maxConcurrency?: number;
					maxRetries?: number;
					timeout?: number;
				};

				const productUrls = raw
					.split(/[,\n]/)
					.map((u) => u.trim())
					.filter((u) => u.length > 0);

				if (productUrls.length === 0) {
					throw new NodeOperationError(
						this.getNode(),
						'No valid product URLs or IDs provided',
						{ itemIndex: i },
					);
				}

				const body: Record<string, unknown> = {
					productUrls,
					exportFormat,
					retailMarkup: String(retailMarkup),
					minDemandScore: filters.minDemandScore ?? 0,
					minHotProductScore: filters.minHotProductScore ?? 0,
					onlyTrending: filters.onlyTrending ?? false,
					onlyFreeShipping: filters.onlyFreeShipping ?? false,
					writeSummary: extra.writeSummary ?? true,
					extractVariants: extra.extractVariants ?? true,
					extractImages: extra.extractImages ?? true,
					extractOutreachLinks: extra.extractOutreachLinks ?? true,
					maxConcurrency: extra.maxConcurrency ?? 3,
					maxRetries: extra.maxRetries ?? 1,
					timeout: extra.timeout ?? 180,
				};
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
