import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = '2ahDVr2hK6unhydIJ';

export class WebsiteTrafficDatabase implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Websites by Traffic Volume 2026",
  "name": "websiteTrafficDatabase",
  "icon": {
    "light": "file:websitetrafficdatabase.svg",
    "dark": "file:websitetrafficdatabase.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Website Traffic Database through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Websites by Traffic Volume 2026"
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
        "name": "Auto-detect (recommended)",
        "value": "auto"
      },
      {
        "name": "Filter by traffic",
        "value": "traffic"
      },
      {
        "name": "Top sites by global rank",
        "value": "globalRank"
      },
      {
        "name": "Look up domains",
        "value": "domains"
      },
      {
        "name": "Find similar sites",
        "value": "similarSites"
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
    "displayName": "Minimum monthly visits",
    "name": "minVisits",
    "description": "Actor input: Minimum monthly visits",
    "type": "number",
    "default": 1000,
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
    "name": "maxVisits",
    "description": "Actor input: Maximum monthly visits",
    "type": "number",
    "default": 0,
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Top sites worldwide (enter N, e.g. 100)",
    "name": "topGlobalRank",
    "description": "Actor input: Top sites worldwide (enter N, e.g. 100)",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 1
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
    "displayName": "Category contains",
    "name": "category",
    "description": "Actor input: Category contains",
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
    "displayName": "Top country (code)",
    "name": "country",
    "description": "Actor input: Top country (code)",
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
    "displayName": "Minimum search-traffic share (%)",
    "name": "minSearchShare",
    "description": "Actor input: Minimum search-traffic share (%)",
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
    "displayName": "Only sites with AI/LLM traffic",
    "name": "hasAiTraffic",
    "description": "Actor input: Only sites with AI/LLM traffic",
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
    "displayName": "Only growing sites",
    "name": "onlyGrowing",
    "description": "Actor input: Only growing sites",
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
    "displayName": "Minimum growth (%)",
    "name": "minGrowthPercent",
    "description": "Actor input: Minimum growth (%)",
    "type": "number",
    "default": 0,
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Ranks for keyword",
    "name": "keyword",
    "description": "Actor input: Ranks for keyword",
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
    "displayName": "Traffic channel",
    "name": "trafficSource",
    "description": "Actor input: Traffic channel",
    "type": "options",
    "options": [
      {
        "name": "Organic search",
        "value": "search"
      },
      {
        "name": "Direct",
        "value": "direct"
      },
      {
        "name": "Social",
        "value": "social"
      },
      {
        "name": "Referral",
        "value": "referral"
      },
      {
        "name": "Email",
        "value": "mail"
      },
      {
        "name": "Paid ads",
        "value": "ads"
      },
      {
        "name": "AI / LLM",
        "value": "ai"
      }
    ],
    "default": "search",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Minimum channel share (%)",
    "name": "minSourceShare",
    "description": "Actor input: Minimum channel share (%)",
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
    "displayName": "Maximum bounce rate (%)",
    "name": "maxBounce",
    "description": "Actor input: Maximum bounce rate (%)",
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
    "displayName": "Minimum pages per visit",
    "name": "minPagesPerVisit",
    "description": "Actor input: Minimum pages per visit",
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
    "displayName": "Minimum time on site (seconds)",
    "name": "minTimeOnSite",
    "description": "Actor input: Minimum time on site (seconds)",
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
    "displayName": "Max results",
    "name": "maxResults",
    "description": "Actor input: Max results",
    "type": "number",
    "default": 25,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 1000000
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
    "displayName": "Sort by",
    "name": "sortBy",
    "description": "Actor input: Sort by",
    "type": "options",
    "options": [
      {
        "name": "Monthly visits",
        "value": "visits"
      },
      {
        "name": "Global rank",
        "value": "global_rank"
      },
      {
        "name": "Bounce rate",
        "value": "bounce"
      },
      {
        "name": "Pages per visit",
        "value": "pages"
      },
      {
        "name": "Time on site",
        "value": "time_on_site"
      },
      {
        "name": "Category rank",
        "value": "category_rank"
      },
      {
        "name": "Country rank",
        "value": "country_rank"
      },
      {
        "name": "AI visits",
        "value": "ai_visits"
      }
    ],
    "default": "visits",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Sort order",
    "name": "sortOrder",
    "description": "Actor input: Sort order",
    "type": "options",
    "options": [
      {
        "name": "Descending (highest first)",
        "value": "desc"
      },
      {
        "name": "Ascending (lowest first)",
        "value": "asc"
      }
    ],
    "default": "desc",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Output detail",
    "name": "outputPreset",
    "description": "Actor input: Output detail",
    "type": "options",
    "options": [
      {
        "name": "Compact — AI friendly",
        "value": "compact"
      },
      {
        "name": "Outreach — recommended",
        "value": "outreach"
      },
      {
        "name": "Full — every field",
        "value": "full"
      }
    ],
    "default": "outreach",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Domains to look up",
    "name": "domains",
    "description": "Actor input: Domains to look up",
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
    "displayName": "Find competitors of this domain",
    "name": "similarTo",
    "description": "Actor input: Find competitors of this domain",
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
				body["workflow"] = this.getNodeParameter("workflow", i);
				body["minVisits"] = this.getNodeParameter("minVisits", i);
				body["maxVisits"] = this.getNodeParameter("maxVisits", i);
				body["topGlobalRank"] = this.getNodeParameter("topGlobalRank", i);
				body["category"] = this.getNodeParameter("category", i);
				body["country"] = this.getNodeParameter("country", i);
				body["minSearchShare"] = this.getNodeParameter("minSearchShare", i);
				body["hasAiTraffic"] = this.getNodeParameter("hasAiTraffic", i);
				body["onlyGrowing"] = this.getNodeParameter("onlyGrowing", i);
				body["minGrowthPercent"] = this.getNodeParameter("minGrowthPercent", i);
				body["keyword"] = this.getNodeParameter("keyword", i);
				body["trafficSource"] = this.getNodeParameter("trafficSource", i);
				body["minSourceShare"] = this.getNodeParameter("minSourceShare", i);
				body["maxBounce"] = this.getNodeParameter("maxBounce", i);
				body["minPagesPerVisit"] = this.getNodeParameter("minPagesPerVisit", i);
				body["minTimeOnSite"] = this.getNodeParameter("minTimeOnSite", i);
				body["maxResults"] = this.getNodeParameter("maxResults", i);
				body["sortBy"] = this.getNodeParameter("sortBy", i);
				body["sortOrder"] = this.getNodeParameter("sortOrder", i);
				body["outputPreset"] = this.getNodeParameter("outputPreset", i);
				{ const _v = this.getNodeParameter("domains", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["domains"] = _a; }
				body["similarTo"] = this.getNodeParameter("similarTo", i);
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
