import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'ZNpmbM1MPLrFNUJaH';

export class WoocommerceAnalyzer implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "WooCommerce Store Analyzer",
  "name": "woocommerceAnalyzer",
  "icon": {
    "light": "file:woocommerceanalyzer.svg",
    "dark": "file:woocommerceanalyzer.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run WooCommerce Store Analyzer through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "WooCommerce Store Analyzer"
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
    "displayName": "WooCommerce Store URLs",
    "name": "storeUrls",
    "description": "Actor input: WooCommerce Store URLs",
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
    "displayName": "Conversion rate for revenue estimate (%)",
    "name": "conversionRate",
    "description": "Actor input: Conversion rate for revenue estimate (%)",
    "type": "number",
    "default": 1.8,
    "typeOptions": {
      "minValue": 0.1,
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
    "displayName": "Product sample size",
    "name": "productSampleSize",
    "description": "Actor input: Product sample size",
    "type": "number",
    "default": 200,
    "typeOptions": {
      "minValue": 10,
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
    "displayName": "Products & AOV",
    "name": "extractProducts",
    "description": "Actor input: Products & AOV",
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
    "displayName": "Product velocity",
    "name": "extractVelocity",
    "description": "Actor input: Product velocity",
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
    "displayName": "Categories",
    "name": "extractCategories",
    "description": "Actor input: Categories",
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
    "displayName": "Sitemap counts",
    "name": "extractSitemap",
    "description": "Actor input: Sitemap counts",
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
    "displayName": "Traffic (SimilarWeb)",
    "name": "extractTraffic",
    "description": "Actor input: Traffic (SimilarWeb)",
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
    "displayName": "Revenue estimate",
    "name": "extractRevenueEstimate",
    "description": "Actor input: Revenue estimate",
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
    "displayName": "Tech stack & tracking IDs",
    "name": "extractTechStack",
    "description": "Actor input: Tech stack & tracking IDs",
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
    "displayName": "WP plugins from HTML",
    "name": "extractPlugins",
    "description": "Actor input: WP plugins from HTML",
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
    "displayName": "WP REST namespaces",
    "name": "extractWpNamespaces",
    "description": "Actor input: WP REST namespaces",
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
    "displayName": "Social links",
    "name": "extractSocials",
    "description": "Actor input: Social links",
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
    "displayName": "Contact info",
    "name": "extractContact",
    "description": "Actor input: Contact info",
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
    "displayName": "WP / WC meta",
    "name": "extractWpMeta",
    "description": "Actor input: WP / WC meta",
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
    "displayName": "International expansion",
    "name": "extractInternational",
    "description": "Actor input: International expansion",
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
    "displayName": "Brand age",
    "name": "extractBrandAge",
    "description": "Actor input: Brand age",
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
    "displayName": "Derived signals",
    "name": "extractDerivedSignals",
    "description": "Actor input: Derived signals",
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
    "displayName": "Catalog aggregate (collection-data)",
    "name": "extractCollectionData",
    "description": "Actor input: Catalog aggregate (collection-data)",
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
    "displayName": "Authors / admins enumeration",
    "name": "extractAuthors",
    "description": "Actor input: Authors / admins enumeration",
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
    "displayName": "Blog content velocity",
    "name": "extractBlog",
    "description": "Actor input: Blog content velocity",
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
    "displayName": "robots.txt analysis",
    "name": "extractRobots",
    "description": "Actor input: robots.txt analysis",
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
    "displayName": "Security headers",
    "name": "extractSecurityHeaders",
    "description": "Actor input: Security headers",
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
    "displayName": "DNS / hosting / email",
    "name": "extractDns",
    "description": "Actor input: DNS / hosting / email",
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
    "displayName": "Schema.org JSON-LD",
    "name": "extractSchemaOrg",
    "description": "Actor input: Schema.org JSON-LD",
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
    "displayName": "Timeout (seconds)",
    "name": "timeout",
    "description": "Actor input: Timeout (seconds)",
    "type": "number",
    "default": 30,
    "typeOptions": {
      "minValue": 10,
      "maxValue": 180
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
				body["conversionRate"] = this.getNodeParameter("conversionRate", i);
				body["productSampleSize"] = this.getNodeParameter("productSampleSize", i);
				body["extractProducts"] = this.getNodeParameter("extractProducts", i);
				body["extractVelocity"] = this.getNodeParameter("extractVelocity", i);
				body["extractCategories"] = this.getNodeParameter("extractCategories", i);
				body["extractSitemap"] = this.getNodeParameter("extractSitemap", i);
				body["extractTraffic"] = this.getNodeParameter("extractTraffic", i);
				body["extractRevenueEstimate"] = this.getNodeParameter("extractRevenueEstimate", i);
				body["extractTechStack"] = this.getNodeParameter("extractTechStack", i);
				body["extractPlugins"] = this.getNodeParameter("extractPlugins", i);
				body["extractWpNamespaces"] = this.getNodeParameter("extractWpNamespaces", i);
				body["extractSocials"] = this.getNodeParameter("extractSocials", i);
				body["extractContact"] = this.getNodeParameter("extractContact", i);
				body["extractWpMeta"] = this.getNodeParameter("extractWpMeta", i);
				body["extractInternational"] = this.getNodeParameter("extractInternational", i);
				body["extractBrandAge"] = this.getNodeParameter("extractBrandAge", i);
				body["extractDerivedSignals"] = this.getNodeParameter("extractDerivedSignals", i);
				body["extractCollectionData"] = this.getNodeParameter("extractCollectionData", i);
				body["extractAuthors"] = this.getNodeParameter("extractAuthors", i);
				body["extractBlog"] = this.getNodeParameter("extractBlog", i);
				body["extractRobots"] = this.getNodeParameter("extractRobots", i);
				body["extractSecurityHeaders"] = this.getNodeParameter("extractSecurityHeaders", i);
				body["extractDns"] = this.getNodeParameter("extractDns", i);
				body["extractSchemaOrg"] = this.getNodeParameter("extractSchemaOrg", i);
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
