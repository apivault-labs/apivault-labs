import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = '8iCyIXGoejghN22lw';

export class YcCompanies implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "YC Companies Scraper",
  "name": "ycCompanies",
  "icon": {
    "light": "file:yccompanies.svg",
    "dark": "file:yccompanies.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run YC Companies Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "YC Companies Scraper"
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
    "displayName": "Keyword search",
    "name": "query",
    "description": "Actor input: Keyword search",
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
    "displayName": "Filter by batch(es)",
    "name": "batches",
    "description": "Actor input: Filter by batch(es)",
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
    "displayName": "Filter by industry",
    "name": "industries",
    "description": "Actor input: Filter by industry",
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
    "displayName": "Filter by region",
    "name": "regions",
    "description": "Actor input: Filter by region",
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
    "displayName": "Filter by status",
    "name": "statuses",
    "description": "Actor input: Filter by status",
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
    "displayName": "Filter by tag",
    "name": "tags",
    "description": "Actor input: Filter by tag",
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
    "displayName": "Only hiring companies",
    "name": "isHiring",
    "description": "Actor input: Only hiring companies",
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
    "displayName": "Only top companies",
    "name": "topCompaniesOnly",
    "description": "Actor input: Only top companies",
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
    "displayName": "Exact company slugs (overrides search)",
    "name": "slugs",
    "description": "Actor input: Exact company slugs (overrides search)",
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
    "displayName": "Max companies to fetch",
    "name": "maxResults",
    "description": "Actor input: Max companies to fetch",
    "type": "number",
    "default": 100,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 10000
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
    "displayName": "Fetch founders + full description",
    "name": "fullDetails",
    "description": "Actor input: Fetch founders + full description",
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
    "displayName": "Industry & Subindustry",
    "name": "extractIndustry",
    "description": "Actor input: Industry & Subindustry",
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
    "displayName": "Batch",
    "name": "extractBatch",
    "description": "Actor input: Batch",
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
    "displayName": "Location",
    "name": "extractLocation",
    "description": "Actor input: Location",
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
    "displayName": "Team Size",
    "name": "extractTeamSize",
    "description": "Actor input: Team Size",
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
    "displayName": "Status & Stage",
    "name": "extractStatus",
    "description": "Actor input: Status & Stage",
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
    "displayName": "Social Links",
    "name": "extractSocials",
    "description": "Actor input: Social Links",
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
    "displayName": "Founders (fullDetails only)",
    "name": "extractFounders",
    "description": "Actor input: Founders (fullDetails only)",
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
    "displayName": "Long Description (fullDetails only)",
    "name": "extractLongDescription",
    "description": "Actor input: Long Description (fullDetails only)",
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
    "displayName": "Logo",
    "name": "extractLogo",
    "description": "Actor input: Logo",
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
    "default": 5,
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
    "displayName": "Timeout (seconds)",
    "name": "timeout",
    "description": "Actor input: Timeout (seconds)",
    "type": "number",
    "default": 30,
    "typeOptions": {
      "minValue": 5,
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
				body["query"] = this.getNodeParameter("query", i);
				{ const _v = this.getNodeParameter("batches", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["batches"] = _a; }
				{ const _v = this.getNodeParameter("industries", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["industries"] = _a; }
				{ const _v = this.getNodeParameter("regions", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["regions"] = _a; }
				{ const _v = this.getNodeParameter("statuses", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["statuses"] = _a; }
				{ const _v = this.getNodeParameter("tags", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["tags"] = _a; }
				body["isHiring"] = this.getNodeParameter("isHiring", i);
				body["topCompaniesOnly"] = this.getNodeParameter("topCompaniesOnly", i);
				{ const _v = this.getNodeParameter("slugs", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["slugs"] = _a; }
				body["maxResults"] = this.getNodeParameter("maxResults", i);
				body["fullDetails"] = this.getNodeParameter("fullDetails", i);
				body["extractIndustry"] = this.getNodeParameter("extractIndustry", i);
				body["extractBatch"] = this.getNodeParameter("extractBatch", i);
				body["extractLocation"] = this.getNodeParameter("extractLocation", i);
				body["extractTeamSize"] = this.getNodeParameter("extractTeamSize", i);
				body["extractStatus"] = this.getNodeParameter("extractStatus", i);
				body["extractSocials"] = this.getNodeParameter("extractSocials", i);
				body["extractTags"] = this.getNodeParameter("extractTags", i);
				body["extractFounders"] = this.getNodeParameter("extractFounders", i);
				body["extractLongDescription"] = this.getNodeParameter("extractLongDescription", i);
				body["extractLogo"] = this.getNodeParameter("extractLogo", i);
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
