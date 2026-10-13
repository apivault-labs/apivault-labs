import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'DQjBjw0oZNmXmxztZ';

export class Clutch implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Clutch.co Company Scraper",
  "name": "clutch",
  "icon": {
    "light": "file:clutch.svg",
    "dark": "file:clutch.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Clutch Company Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Clutch.co Company Scraper"
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
    "displayName": "Clutch Company URLs",
    "name": "companyUrls",
    "description": "Actor input: Clutch Company URLs",
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
    "displayName": "Company Name",
    "name": "extractName",
    "description": "Actor input: Company Name",
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
    "displayName": "Rating",
    "name": "extractRating",
    "description": "Actor input: Rating",
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
    "displayName": "Reviews Count",
    "name": "extractReviews",
    "description": "Actor input: Reviews Count",
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
    "displayName": "Tagline",
    "name": "extractTagline",
    "description": "Actor input: Tagline",
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
    "displayName": "Employees",
    "name": "extractEmployees",
    "description": "Actor input: Employees",
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
    "displayName": "Hourly Rate",
    "name": "extractHourlyRate",
    "description": "Actor input: Hourly Rate",
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
    "displayName": "Min Project Size",
    "name": "extractMinProject",
    "description": "Actor input: Min Project Size",
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
    "displayName": "Services",
    "name": "extractServices",
    "description": "Actor input: Services",
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
    "displayName": "Industries",
    "name": "extractIndustries",
    "description": "Actor input: Industries",
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
    "displayName": "Website",
    "name": "extractWebsite",
    "description": "Actor input: Website",
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
    "displayName": "Phone",
    "name": "extractPhone",
    "description": "Actor input: Phone",
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
    "displayName": "Logo Image",
    "name": "extractImage",
    "description": "Actor input: Logo Image",
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
    "displayName": "Timeout per company (seconds)",
    "name": "timeout",
    "description": "Actor input: Timeout per company (seconds)",
    "type": "number",
    "default": 120,
    "typeOptions": {
      "minValue": 60,
      "maxValue": 300
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
				{ const _v = this.getNodeParameter("companyUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["companyUrls"] = _a; }
				body["extractName"] = this.getNodeParameter("extractName", i);
				body["extractRating"] = this.getNodeParameter("extractRating", i);
				body["extractReviews"] = this.getNodeParameter("extractReviews", i);
				body["extractTagline"] = this.getNodeParameter("extractTagline", i);
				body["extractLocation"] = this.getNodeParameter("extractLocation", i);
				body["extractEmployees"] = this.getNodeParameter("extractEmployees", i);
				body["extractHourlyRate"] = this.getNodeParameter("extractHourlyRate", i);
				body["extractMinProject"] = this.getNodeParameter("extractMinProject", i);
				body["extractServices"] = this.getNodeParameter("extractServices", i);
				body["extractIndustries"] = this.getNodeParameter("extractIndustries", i);
				body["extractWebsite"] = this.getNodeParameter("extractWebsite", i);
				body["extractPhone"] = this.getNodeParameter("extractPhone", i);
				body["extractImage"] = this.getNodeParameter("extractImage", i);
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
