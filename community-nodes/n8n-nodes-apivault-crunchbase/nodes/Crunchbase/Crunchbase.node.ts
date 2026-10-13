import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'keyno2C1MyBBCBTOe';

export class Crunchbase implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "🏢 Crunchbase Scraper",
  "name": "crunchbase",
  "icon": {
    "light": "file:crunchbase.svg",
    "dark": "file:crunchbase.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Crunchbase Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "🏢 Crunchbase Scraper"
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
    "displayName": "Company URLs",
    "name": "profileUrls",
    "description": "Actor input: Company URLs",
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
    "displayName": "Max Concurrency",
    "name": "maxConcurrency",
    "description": "Actor input: Max Concurrency",
    "type": "number",
    "default": 5,
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
    "default": 120,
    "typeOptions": {
      "minValue": 30,
      "maxValue": 300
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
    "displayName": "Company Name",
    "name": "extractCompanyName",
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
    "displayName": "Description",
    "name": "extractDescription",
    "description": "Actor input: Description",
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
    "displayName": "Industry / Categories",
    "name": "extractIndustry",
    "description": "Actor input: Industry / Categories",
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
    "displayName": "Email",
    "name": "extractEmail",
    "description": "Actor input: Email",
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
    "displayName": "Phone Number",
    "name": "extractPhone",
    "description": "Actor input: Phone Number",
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
    "displayName": "Crunchbase URL",
    "name": "extractProfileUrl",
    "description": "Actor input: Crunchbase URL",
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
    "displayName": "Extra Metadata",
    "name": "extractMetadata",
    "description": "Actor input: Extra Metadata",
    "type": "boolean",
    "default": true,
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
				{ const _v = this.getNodeParameter("profileUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["profileUrls"] = _a; }
				body["maxConcurrency"] = this.getNodeParameter("maxConcurrency", i);
				body["timeout"] = this.getNodeParameter("timeout", i);
				body["extractCompanyName"] = this.getNodeParameter("extractCompanyName", i);
				body["extractDescription"] = this.getNodeParameter("extractDescription", i);
				body["extractLocation"] = this.getNodeParameter("extractLocation", i);
				body["extractIndustry"] = this.getNodeParameter("extractIndustry", i);
				body["extractEmail"] = this.getNodeParameter("extractEmail", i);
				body["extractPhone"] = this.getNodeParameter("extractPhone", i);
				body["extractWebsite"] = this.getNodeParameter("extractWebsite", i);
				body["extractProfileUrl"] = this.getNodeParameter("extractProfileUrl", i);
				body["extractMetadata"] = this.getNodeParameter("extractMetadata", i);
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
