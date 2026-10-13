import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = '9twVh4isboNg2w6bg';

export class ShopifyAnalyzer implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Shopify Store Analyzer",
  "name": "shopifyAnalyzer",
  "icon": {
    "light": "file:shopifyanalyzer.svg",
    "dark": "file:shopifyanalyzer.svg"
  },
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "subtitle": "={{$parameter[\"storeUrls\"]}}",
  "description": "Run Shopify Store Analyzer through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Shopify Store Analyzer"
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
    "displayName": "Shopify Store URLs",
    "name": "storeUrls",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
    "default": "",
    "required": true,
    "placeholder": "https://allbirds.com",
    "description": "Actor input: Shopify Store URLs",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Competitor Comparison Report",
    "name": "generateComparison",
    "type": "boolean",
    "default": true,
    "description": "Actor input: Competitor Comparison Report",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Track Changes Between Runs",
    "name": "trackChanges",
    "type": "boolean",
    "default": true,
    "description": "Actor input: Track Changes Between Runs",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Revenue Estimate Settings",
    "name": "revenueSettings",
    "type": "collection",
    "placeholder": "Add Setting",
    "default": {},
    "options": [
      {
        "displayName": "Conversion Rate (%)",
        "name": "conversionRate",
        "type": "number",
        "typeOptions": {
          "minValue": 0.1,
          "maxValue": 10,
          "numberPrecision": 2
        },
        "default": 2.5,
        "description": "Used in revenue formula visits × CR × AOV. Industry default 2.5%. Fashion 1.5-2%, electronics 1%, impulse-buy 3-4%."
      },
      {
        "displayName": "Product Sample Size",
        "name": "productSampleSize",
        "type": "number",
        "typeOptions": {
          "minValue": 0,
          "maxValue": 2000
        },
        "default": 250,
        "description": "How many products to sample for metrics. 0 = full catalog (hard-capped at 2000 to protect memory)."
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
    "displayName": "Extraction Layers",
    "name": "extraction",
    "type": "collection",
    "placeholder": "Add Extraction Layer",
    "default": {},
    "description": "Actor input: Extraction Layers",
    "options": [
      {
        "displayName": "Products & AOV",
        "name": "extractProducts",
        "type": "boolean",
        "default": true,
        "description": "Whether to extract product count, AOV, price range, vendors, types, top tags (niche), duplicate-description ratio"
      },
      {
        "displayName": "Product Velocity",
        "name": "extractVelocity",
        "type": "boolean",
        "default": true,
        "description": "Whether to extract new products in last 7/30/90 days and oldest product date"
      },
      {
        "displayName": "Collections",
        "name": "extractCollections",
        "type": "boolean",
        "default": true,
        "description": "Whether to extract collection count and top collections"
      },
      {
        "displayName": "Sitemap Counts",
        "name": "extractSitemap",
        "type": "boolean",
        "default": true,
        "description": "Whether to extract real total pages/products/collections/blogs from sitemap.xml"
      },
      {
        "displayName": "Traffic (SimilarWeb)",
        "name": "extractTraffic",
        "type": "boolean",
        "default": true,
        "description": "Whether to extract monthly visits, ranks, bounce rate, sources, top countries, keywords"
      },
      {
        "displayName": "Revenue Estimate",
        "name": "extractRevenueEstimate",
        "type": "boolean",
        "default": true,
        "description": "Whether to estimate monthly orders + revenue + annualized figure. Requires Traffic."
      },
      {
        "displayName": "Tech Stack & Tracking IDs",
        "name": "extractTechStack",
        "type": "boolean",
        "default": true,
        "description": "Whether to detect 60+ Shopify apps (Klaviyo, Judge.me, ReCharge, Gorgias…) plus tracking IDs (GTM, GA4, FB Pixel, TikTok, Hotjar) for brand-network mapping"
      },
      {
        "displayName": "Social Links",
        "name": "extractSocials",
        "type": "boolean",
        "default": true,
        "description": "Whether to extract Instagram/Facebook/Twitter/TikTok/YouTube/Pinterest/LinkedIn handles"
      },
      {
        "displayName": "Contact Info",
        "name": "extractContact",
        "type": "boolean",
        "default": true,
        "description": "Whether to extract public emails and phones from the homepage"
      },
      {
        "displayName": "Deep Contact Crawl",
        "name": "deepContactCrawl",
        "type": "boolean",
        "default": true,
        "description": "Whether to also check the store contact / about pages for an email when the homepage shows none. Only fires when the homepage has no email, so it costs no extra time for stores that already expose contact info. Improves the best_email hit rate for lead generation."
      },
      {
        "displayName": "Shopify Meta",
        "name": "extractShopifyMeta",
        "type": "boolean",
        "default": true,
        "description": "Whether to extract myshopify handle, currency, locale, theme, Shopify Plus indicators, CDN store ID (age signal)"
      },
      {
        "displayName": "International Expansion",
        "name": "extractInternational",
        "type": "boolean",
        "default": true,
        "description": "Whether to extract hreflang languages, currency switcher, country selector, expansion score 0-100"
      },
      {
        "displayName": "Reviews Aggregate",
        "name": "extractReviewsAggregate",
        "type": "boolean",
        "default": true,
        "description": "Whether to extract Schema.org aggregateRating from the homepage"
      },
      {
        "displayName": "Active Promo / Announcement Bar",
        "name": "extractPromo",
        "type": "boolean",
        "default": true,
        "description": "Whether to extract free-shipping threshold, active promo codes, announcement bar text, current discount %"
      },
      {
        "displayName": "Derived Signals",
        "name": "extractDerivedSignals",
        "type": "boolean",
        "default": true,
        "description": "Whether to compute customer segment, marketing channel mix, dropshipper risk score with reasons"
      },
      {
        "displayName": "Brand Age (Slower)",
        "name": "extractBrandAge",
        "type": "boolean",
        "default": false,
        "description": "Whether to derive brand age + founding year from earliest Wayback snapshot + SSL cert. Off by default — these external lookups are the slowest part of a run."
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
const rawUrls = this.getNodeParameter('storeUrls', i) as string;
				const storeUrls = rawUrls
					.split(/[\n,]+/)
					.map((u) => u.trim())
					.filter((u) => u.length > 0);

				if (storeUrls.length === 0) {
					throw new NodeOperationError(
						this.getNode(),
						'At least one Shopify store URL is required',
						{ itemIndex: i },
					);
				}

				const generateComparison = this.getNodeParameter(
					'generateComparison',
					i,
					true,
				) as boolean;
				const trackChanges = this.getNodeParameter('trackChanges', i, true) as boolean;
				const revenueSettings = this.getNodeParameter('revenueSettings', i, {}) as {
					conversionRate?: number;
					productSampleSize?: number;
				};
				const extraction = this.getNodeParameter('extraction', i, {}) as Record<string, boolean>;
				const body: Record<string, unknown> = {
					storeUrls,
					generateComparison,
					trackChanges,
					conversionRate: revenueSettings.conversionRate ?? 2.5,
					productSampleSize: revenueSettings.productSampleSize ?? 250,
					// extraction layers (defaults match the actor's input schema)
					extractProducts: extraction.extractProducts ?? true,
					extractVelocity: extraction.extractVelocity ?? true,
					extractCollections: extraction.extractCollections ?? true,
					extractSitemap: extraction.extractSitemap ?? true,
					extractTraffic: extraction.extractTraffic ?? true,
					extractRevenueEstimate: extraction.extractRevenueEstimate ?? true,
					extractTechStack: extraction.extractTechStack ?? true,
					extractSocials: extraction.extractSocials ?? true,
					extractContact: extraction.extractContact ?? true,
					deepContactCrawl: extraction.deepContactCrawl ?? true,
					extractShopifyMeta: extraction.extractShopifyMeta ?? true,
					extractInternational: extraction.extractInternational ?? true,
					extractReviewsAggregate: extraction.extractReviewsAggregate ?? true,
					extractPromo: extraction.extractPromo ?? true,
					extractDerivedSignals: extraction.extractDerivedSignals ?? true,
					extractBrandAge: extraction.extractBrandAge ?? false,
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
