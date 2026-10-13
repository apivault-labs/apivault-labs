import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'STGjEsbNydv95Thzt';

export class SimilarwebWebsiteAnalyzer implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Similarweb Website Analyzer",
  "name": "similarwebWebsiteAnalyzer",
  "icon": {
    "light": "file:similarweb.svg",
    "dark": "file:similarweb.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Similarweb Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Similarweb Website Analyzer"
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
    "displayName": "What do you want to do?",
    "name": "mode",
    "description": "Actor input: What do you want to do?",
    "type": "options",
    "options": [
      {
        "name": "Traffic overview — fastest",
        "value": "overview"
      },
      {
        "name": "Find similar sites and competitors",
        "value": "similar_sites"
      },
      {
        "name": "Complete profile — traffic + competitors + WHOIS + tech",
        "value": "all_in_one"
      },
      {
        "name": "Compare websites side by side",
        "value": "compare"
      },
      {
        "name": "Monitor website changes",
        "value": "monitor"
      },
      {
        "name": "Build a competitive market map",
        "value": "market_map"
      },
      {
        "name": "Discover top or trending websites",
        "value": "discovery"
      }
    ],
    "default": "overview",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Domains or website URLs",
    "name": "domains",
    "description": "Actor input: Domains or website URLs",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
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
    "displayName": "Include similar sites in Overview",
    "name": "includeSimilarSites",
    "description": "Actor input: Include similar sites in Overview",
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
    "displayName": "Top organic keywords",
    "name": "includeTopKeywords",
    "description": "Actor input: Top organic keywords",
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
    "displayName": "AI / LLM referral intelligence",
    "name": "includeAiTraffic",
    "description": "Actor input: AI / LLM referral intelligence",
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
    "displayName": "Website screenshot URL",
    "name": "includeScreenshot",
    "description": "Actor input: Website screenshot URL",
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
    "displayName": "Cleaned raw data",
    "name": "includeRawData",
    "description": "Actor input: Cleaned raw data",
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
    "displayName": "Return domains with no traffic data",
    "name": "includeNoData",
    "description": "Actor input: Return domains with no traffic data",
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
    "displayName": "Return failed domains in the dataset",
    "name": "returnFailureRecords",
    "description": "Actor input: Return failed domains in the dataset",
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
    "displayName": "Monitor name",
    "name": "monitorKey",
    "description": "Actor input: Monitor name",
    "type": "string",
    "default": "my-competitors",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Monitoring depth",
    "name": "monitorDepth",
    "description": "Actor input: Monitoring depth",
    "type": "options",
    "options": [
      {
        "name": "Traffic, ranks, channels, keywords and AI",
        "value": "overview"
      },
      {
        "name": "Complete profile including competitors and technologies",
        "value": "all_in_one"
      }
    ],
    "default": "overview",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Change sensitivity",
    "name": "changeThreshold",
    "description": "Actor input: Change sensitivity",
    "type": "options",
    "options": [
      {
        "name": "Low — report small changes",
        "value": "low"
      },
      {
        "name": "Medium — recommended",
        "value": "medium"
      },
      {
        "name": "High — major changes only",
        "value": "high"
      }
    ],
    "default": "medium",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Return changed domains only",
    "name": "onlyChanges",
    "description": "Actor input: Return changed domains only",
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
    "displayName": "Competitors to add to the map",
    "name": "marketMapMaxCompetitors",
    "description": "Actor input: Competitors to add to the map",
    "type": "number",
    "default": 20,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 200
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
    "displayName": "Discovery list",
    "name": "discoveryType",
    "description": "Actor input: Discovery list",
    "type": "options",
    "options": [
      {
        "name": "Top websites by rank",
        "value": "top"
      },
      {
        "name": "Rising, falling, new and dropped websites",
        "value": "trending"
      }
    ],
    "default": "top",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Country",
    "name": "discoveryCountry",
    "description": "Actor input: Country",
    "type": "string",
    "default": "worldwide",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Category (optional)",
    "name": "discoveryCategory",
    "description": "Actor input: Category (optional)",
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
    "displayName": "Maximum discovery results",
    "name": "maxResults",
    "description": "Actor input: Maximum discovery results",
    "type": "number",
    "default": 50,
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
    "displayName": "Add full traffic metrics to discovered sites",
    "name": "enrichDiscovery",
    "description": "Actor input: Add full traffic metrics to discovered sites",
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
    "displayName": "Parallel domains",
    "name": "maxConcurrency",
    "description": "Actor input: Parallel domains",
    "type": "number",
    "default": 10,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 20
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
    "displayName": "Request timeout (seconds)",
    "name": "timeout",
    "description": "Actor input: Request timeout (seconds)",
    "type": "number",
    "default": 15,
    "typeOptions": {
      "minValue": 8,
      "maxValue": 60
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
    "displayName": "Retries per source",
    "name": "maxRetries",
    "description": "Actor input: Retries per source",
    "type": "number",
    "default": 2,
    "typeOptions": {
      "minValue": 0,
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
    "displayName": "Additional Actor Input (JSON)",
    "name": "additionalInput",
    "description": "Actor input: Additional Actor Input (JSON)",
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
				const extra = this.getNodeParameter('additionalInput', i, '{}') as string | object;
				if (extra) {
					try { Object.assign(body, typeof extra === 'string' ? JSON.parse(extra) : extra); }
					catch { throw new NodeOperationError(this.getNode(), 'Additional Actor Input must be valid JSON', { itemIndex: i }); }
				}
				body["mode"] = this.getNodeParameter("mode", i);
				{ const value = this.getNodeParameter("domains", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["domains"] = values; }
				body["includeSimilarSites"] = this.getNodeParameter("includeSimilarSites", i);
				body["includeTopKeywords"] = this.getNodeParameter("includeTopKeywords", i);
				body["includeAiTraffic"] = this.getNodeParameter("includeAiTraffic", i);
				body["includeScreenshot"] = this.getNodeParameter("includeScreenshot", i);
				body["includeRawData"] = this.getNodeParameter("includeRawData", i);
				body["includeNoData"] = this.getNodeParameter("includeNoData", i);
				body["returnFailureRecords"] = this.getNodeParameter("returnFailureRecords", i);
				body["monitorKey"] = this.getNodeParameter("monitorKey", i);
				body["monitorDepth"] = this.getNodeParameter("monitorDepth", i);
				body["changeThreshold"] = this.getNodeParameter("changeThreshold", i);
				body["onlyChanges"] = this.getNodeParameter("onlyChanges", i);
				body["marketMapMaxCompetitors"] = this.getNodeParameter("marketMapMaxCompetitors", i);
				body["discoveryType"] = this.getNodeParameter("discoveryType", i);
				body["discoveryCountry"] = this.getNodeParameter("discoveryCountry", i);
				{ const value = this.getNodeParameter("discoveryCategory", i, '') as string; if (value.trim()) body["discoveryCategory"] = value.trim(); }
				body["maxResults"] = this.getNodeParameter("maxResults", i);
				body["enrichDiscovery"] = this.getNodeParameter("enrichDiscovery", i);
				body["maxConcurrency"] = this.getNodeParameter("maxConcurrency", i);
				body["timeout"] = this.getNodeParameter("timeout", i);
				body["maxRetries"] = this.getNodeParameter("maxRetries", i);
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
