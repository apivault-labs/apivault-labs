import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'InYi5NI4KMb8xo5u9';

export class ShopifyFinder implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Shopify & WooCommerce Leads Database",
  "name": "shopifyFinder",
  "icon": {
    "light": "file:shopifyfinder.svg",
    "dark": "file:shopifyfinder.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Shopify Store Finder through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Shopify & WooCommerce Leads Database"
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
    "displayName": "Workflow",
    "name": "workflow",
    "description": "Actor input: Workflow",
    "type": "options",
    "options": [
      {
        "name": "Auto — preserve legacy controls",
        "value": "auto"
      },
      {
        "name": "Export matching leads",
        "value": "export"
      },
      {
        "name": "Count matches only (no Dataset rows)",
        "value": "count"
      }
    ],
    "default": "auto",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Platforms",
    "name": "platforms",
    "description": "Actor input: Platforms",
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
    "displayName": "Output preset",
    "name": "outputPreset",
    "description": "Actor input: Output preset",
    "type": "options",
    "options": [
      {
        "name": "Compact — essential lead fields",
        "value": "compact"
      },
      {
        "name": "Contacts — emails, phones and socials",
        "value": "contacts"
      },
      {
        "name": "Sales — qualification and technology",
        "value": "sales"
      },
      {
        "name": "Traffic — compact plus traffic estimates",
        "value": "traffic"
      },
      {
        "name": "Full — all 59 core fields",
        "value": "full"
      },
      {
        "name": "Custom — use Output columns below",
        "value": "custom"
      }
    ],
    "default": "custom",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Output columns",
    "name": "columns",
    "description": "Actor input: Output columns",
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
    "displayName": "Sort by",
    "name": "sortBy",
    "description": "Actor input: Sort by",
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
    "displayName": "Countries (ISO-2)",
    "name": "country",
    "description": "Actor input: Countries (ISO-2)",
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
    "displayName": "Keyword",
    "name": "keyword",
    "description": "Actor input: Keyword",
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
    "displayName": "Phone country code",
    "name": "phoneCode",
    "description": "Actor input: Phone country code",
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
    "displayName": "Extra filters (any columns)",
    "name": "filters",
    "description": "Actor input: Extra filters (any columns)",
    "type": "json",
    "default": "[]",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Only with email",
    "name": "hasEmail",
    "description": "Actor input: Only with email",
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
    "displayName": "Add website traffic data",
    "name": "includeTrafficData",
    "description": "Actor input: Add website traffic data",
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
    "displayName": "Only sites with traffic data",
    "name": "onlyWithTrafficData",
    "description": "Actor input: Only sites with traffic data",
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
    "displayName": "Minimum monthly visits",
    "name": "minMonthlyVisits",
    "description": "Actor input: Minimum monthly visits",
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
    "displayName": "Maximum monthly visits",
    "name": "maxMonthlyVisits",
    "description": "Actor input: Maximum monthly visits",
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
    "displayName": "Sort by monthly visits",
    "name": "trafficSortOrder",
    "description": "Actor input: Sort by monthly visits",
    "type": "options",
    "options": [
      {
        "name": "Do not sort by traffic",
        "value": "none"
      },
      {
        "name": "Highest traffic first",
        "value": "highest"
      },
      {
        "name": "Lowest traffic first",
        "value": "lowest"
      }
    ],
    "default": "none",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Only with phone",
    "name": "hasPhone",
    "description": "Actor input: Only with phone",
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
    "displayName": "Sort descending",
    "name": "sortDesc",
    "description": "Actor input: Sort descending",
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
    "displayName": "Deduplicate by domain",
    "name": "dedupeByDomain",
    "description": "Actor input: Deduplicate by domain",
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
    "displayName": "Count only",
    "name": "countOnly",
    "description": "Actor input: Count only",
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
    "displayName": "Max rows",
    "name": "maxItems",
    "description": "Actor input: Max rows",
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
    "displayName": "Offset (skip first N)",
    "name": "offset",
    "description": "Actor input: Offset (skip first N)",
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
				body["workflow"] = this.getNodeParameter("workflow", i);
				{ const _v = this.getNodeParameter("platforms", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["platforms"] = _a; }
				body["outputPreset"] = this.getNodeParameter("outputPreset", i);
				{ const _v = this.getNodeParameter("columns", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["columns"] = _a; }
				body["sortBy"] = this.getNodeParameter("sortBy", i);
				{ const _v = this.getNodeParameter("country", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["country"] = _a; }
				body["keyword"] = this.getNodeParameter("keyword", i);
				body["phoneCode"] = this.getNodeParameter("phoneCode", i);
				{ const _r = this.getNodeParameter("filters", i, '') as string|object; if (_r) { try { body["filters"] = typeof _r === 'string' ? JSON.parse(_r) : _r; } catch { throw new NodeOperationError(this.getNode(), "filters" + ' must be valid JSON', { itemIndex: i }); } } }
				body["hasEmail"] = this.getNodeParameter("hasEmail", i);
				body["includeTrafficData"] = this.getNodeParameter("includeTrafficData", i);
				body["onlyWithTrafficData"] = this.getNodeParameter("onlyWithTrafficData", i);
				body["minMonthlyVisits"] = this.getNodeParameter("minMonthlyVisits", i);
				body["maxMonthlyVisits"] = this.getNodeParameter("maxMonthlyVisits", i);
				body["trafficSortOrder"] = this.getNodeParameter("trafficSortOrder", i);
				body["hasPhone"] = this.getNodeParameter("hasPhone", i);
				body["sortDesc"] = this.getNodeParameter("sortDesc", i);
				body["dedupeByDomain"] = this.getNodeParameter("dedupeByDomain", i);
				body["countOnly"] = this.getNodeParameter("countOnly", i);
				body["maxItems"] = this.getNodeParameter("maxItems", i);
				body["offset"] = this.getNodeParameter("offset", i);
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
