import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'GgG3Xran5X3zZxpRZ';

export class TechStackLookup implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "BuiltWith Alternative — Tech Stack Leads & Lookup (60M)",
  "name": "techStackLookup",
  "icon": {
    "light": "file:techstacklookup.svg",
    "dark": "file:techstacklookup.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run BuiltWith Alternative through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "BuiltWith Alternative — Tech Stack Leads & Lookup (60M)"
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
    "displayName": "🔀 What do you want to do?",
    "name": "mode",
    "description": "Actor input: 🔀 What do you want to do?",
    "type": "options",
    "options": [
      {
        "name": "🔎 Find websites by technology",
        "value": "find"
      },
      {
        "name": "🧰 Check the tech stack of my domains",
        "value": "detect"
      },
      {
        "name": "🧬 Find lookalike companies",
        "value": "lookalike"
      },
      {
        "name": "🔔 Monitor technology changes",
        "value": "monitor"
      },
      {
        "name": "📚 Browse technology catalog",
        "value": "catalog"
      }
    ],
    "default": "find",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "🌐 Domains (Detect / Lookalike / Monitor only)",
    "name": "domains",
    "description": "Actor input: 🌐 Domains (Detect / Lookalike / Monitor only)",
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
    "displayName": "⚡ Popular technology preset",
    "name": "technologyPreset",
    "description": "Actor input: ⚡ Popular technology preset",
    "type": "options",
    "options": [
      {
        "name": "Shopify",
        "value": "Shopify"
      },
      {
        "name": "Shopify Plus",
        "value": "Shopify Plus"
      },
      {
        "name": "WooCommerce",
        "value": "WooCommerce"
      },
      {
        "name": "WordPress",
        "value": "WordPress"
      },
      {
        "name": "Klaviyo",
        "value": "Klaviyo"
      },
      {
        "name": "HubSpot",
        "value": "HubSpot"
      },
      {
        "name": "Stripe",
        "value": "Stripe"
      },
      {
        "name": "PayPal",
        "value": "PayPal"
      },
      {
        "name": "Mailchimp",
        "value": "Mailchimp"
      },
      {
        "name": "Salesforce",
        "value": "Salesforce"
      },
      {
        "name": "Cloudflare",
        "value": "Cloudflare"
      },
      {
        "name": "Magento",
        "value": "Magento"
      },
      {
        "name": "BigCommerce",
        "value": "BigCommerce"
      },
      {
        "name": "Yotpo",
        "value": "Yotpo"
      },
      {
        "name": "Gorgias",
        "value": "Gorgias"
      }
    ],
    "default": "Shopify",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "🎯 Sales opportunity preset",
    "name": "opportunityPreset",
    "description": "Actor input: 🎯 Sales opportunity preset",
    "type": "options",
    "options": [
      {
        "name": "Shopify without Klaviyo",
        "value": "shopify_without_klaviyo"
      },
      {
        "name": "Klaviyo without Yotpo",
        "value": "klaviyo_without_yotpo"
      },
      {
        "name": "Mailchimp replacement prospects",
        "value": "mailchimp_replacement"
      },
      {
        "name": "WooCommerce migration prospects",
        "value": "woocommerce_migration"
      },
      {
        "name": "HubSpot without Klaviyo",
        "value": "hubspot_without_klaviyo"
      },
      {
        "name": "Stripe without PayPal",
        "value": "stripe_without_paypal"
      }
    ],
    "default": "shopify_without_klaviyo",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "✅ Technologies to include",
    "name": "technologies",
    "description": "Actor input: ✅ Technologies to include",
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
    "displayName": "🔗 Match logic",
    "name": "matchMode",
    "description": "Actor input: 🔗 Match logic",
    "type": "options",
    "options": [
      {
        "name": "⚡ Any technology (OR)",
        "value": "any"
      },
      {
        "name": "🎯 Every technology (AND)",
        "value": "all"
      }
    ],
    "default": "any",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "🚫 Technologies to exclude",
    "name": "excludeTechnologies",
    "description": "Actor input: 🚫 Technologies to exclude",
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
    "displayName": "🧩 Technology category",
    "name": "category",
    "description": "Actor input: 🧩 Technology category",
    "type": "options",
    "options": [
      {
        "name": "🌐 Any category (recommended)",
        "value": "any"
      },
      {
        "name": "🛒 Ecommerce platforms",
        "value": "ecommerce"
      },
      {
        "name": "📝 CMS & website builders",
        "value": "cms"
      },
      {
        "name": "🤝 CRM platforms",
        "value": "crm"
      },
      {
        "name": "📣 Marketing automation",
        "value": "marketing"
      },
      {
        "name": "💳 Payment tools",
        "value": "payments"
      },
      {
        "name": "☁️ Hosting providers",
        "value": "hosting"
      },
      {
        "name": "🤖 AI tools",
        "value": "ai"
      }
    ],
    "default": "any",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "🌍 Countries (ISO-2)",
    "name": "country",
    "description": "Actor input: 🌍 Countries (ISO-2)",
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
    "displayName": "🏷️ Industry / vertical",
    "name": "vertical",
    "description": "Actor input: 🏷️ Industry / vertical",
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
    "displayName": "📧 Only websites with email",
    "name": "hasEmail",
    "description": "Actor input: 📧 Only websites with email",
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
    "displayName": "📞 Only websites with phone",
    "name": "hasPhone",
    "description": "Actor input: 📞 Only websites with phone",
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
    "displayName": "🆕 First indexed within days",
    "name": "newWithinDays",
    "description": "Actor input: 🆕 First indexed within days",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 3650
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
    "displayName": "🔄 Re-indexed within days",
    "name": "lastIndexedWithinDays",
    "description": "Actor input: 🔄 Re-indexed within days",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 3650
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
    "displayName": "✅ Last confirmed within days",
    "name": "lastFoundWithinDays",
    "description": "Actor input: ✅ Last confirmed within days",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 3650
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
    "displayName": "📊 Sort results by",
    "name": "sortBy",
    "description": "Actor input: 📊 Sort results by",
    "type": "options",
    "options": [
      {
        "name": "Overall Score",
        "value": "Overall Score"
      },
      {
        "name": "Tranco",
        "value": "Tranco"
      },
      {
        "name": "Page Rank",
        "value": "Page Rank"
      },
      {
        "name": "Sales Revenue",
        "value": "Sales Revenue"
      },
      {
        "name": "Employees",
        "value": "Employees"
      },
      {
        "name": "Technology Spend",
        "value": "Technology Spend"
      },
      {
        "name": "SKU",
        "value": "SKU"
      },
      {
        "name": "Performance",
        "value": "Performance"
      },
      {
        "name": "SEO",
        "value": "SEO"
      },
      {
        "name": "First Indexed",
        "value": "First Indexed"
      },
      {
        "name": "Last Indexed",
        "value": "Last Indexed"
      },
      {
        "name": "Last Found",
        "value": "Last Found"
      }
    ],
    "default": "Overall Score",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "⬇️ Highest values first",
    "name": "sortDesc",
    "description": "Actor input: ⬇️ Highest values first",
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
    "displayName": "🧹 Remove duplicate domains",
    "name": "dedupeByDomain",
    "description": "Actor input: 🧹 Remove duplicate domains",
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
    "displayName": "📋 Output detail",
    "name": "outputPreset",
    "description": "Actor input: 📋 Output detail",
    "type": "options",
    "options": [
      {
        "name": "Recommended — essential lead fields",
        "value": "essential"
      },
      {
        "name": "Contacts only",
        "value": "contacts"
      },
      {
        "name": "Technology stack",
        "value": "tech_stack"
      },
      {
        "name": "Sales opportunity",
        "value": "opportunity"
      },
      {
        "name": "Full export — all fields",
        "value": "full"
      }
    ],
    "default": "essential",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "🔢 Preview audience size only",
    "name": "countOnly",
    "description": "Actor input: 🔢 Preview audience size only",
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
    "displayName": "📦 Maximum websites (5–50 for AI)",
    "name": "maxItems",
    "description": "Actor input: 📦 Maximum websites (5–50 for AI)",
    "type": "number",
    "default": 50,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 250000
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
    "displayName": "➡️ Offset (skip first N)",
    "name": "offset",
    "description": "Actor input: ➡️ Offset (skip first N)",
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
    "displayName": "🗂️ Custom output columns (optional)",
    "name": "columns",
    "description": "Actor input: 🗂️ Custom output columns (optional)",
    "type": "string",
    "default": "",
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
				{ const _v = this.getNodeParameter("domains", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["domains"] = _a; }
				body["technologyPreset"] = this.getNodeParameter("technologyPreset", i);
				body["opportunityPreset"] = this.getNodeParameter("opportunityPreset", i);
				{ const _v = this.getNodeParameter("technologies", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["technologies"] = _a; }
				body["matchMode"] = this.getNodeParameter("matchMode", i);
				{ const _v = this.getNodeParameter("excludeTechnologies", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["excludeTechnologies"] = _a; }
				body["category"] = this.getNodeParameter("category", i);
				{ const _v = this.getNodeParameter("country", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["country"] = _a; }
				body["vertical"] = this.getNodeParameter("vertical", i);
				body["hasEmail"] = this.getNodeParameter("hasEmail", i);
				body["hasPhone"] = this.getNodeParameter("hasPhone", i);
				body["newWithinDays"] = this.getNodeParameter("newWithinDays", i);
				body["lastIndexedWithinDays"] = this.getNodeParameter("lastIndexedWithinDays", i);
				body["lastFoundWithinDays"] = this.getNodeParameter("lastFoundWithinDays", i);
				body["sortBy"] = this.getNodeParameter("sortBy", i);
				body["sortDesc"] = this.getNodeParameter("sortDesc", i);
				body["dedupeByDomain"] = this.getNodeParameter("dedupeByDomain", i);
				body["outputPreset"] = this.getNodeParameter("outputPreset", i);
				body["countOnly"] = this.getNodeParameter("countOnly", i);
				body["maxItems"] = this.getNodeParameter("maxItems", i);
				body["offset"] = this.getNodeParameter("offset", i);
				{ const _v = this.getNodeParameter("columns", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["columns"] = _a; }
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
