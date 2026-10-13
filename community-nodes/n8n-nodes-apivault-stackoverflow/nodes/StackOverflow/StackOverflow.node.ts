import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'I2ZH6abZW68mjgh01';

export class StackOverflow implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "StackOverflow Scraper",
  "name": "stackoverflow",
  "icon": {
    "light": "file:stackoverflow.svg",
    "dark": "file:stackoverflow.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Stack Overflow Profile Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "StackOverflow Scraper"
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
    "displayName": "Stack Overflow Profile URLs",
    "name": "profileUrls",
    "description": "Actor input: Stack Overflow Profile URLs",
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
    "displayName": "Username",
    "name": "extractUsername",
    "description": "Actor input: Username",
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
    "displayName": "Full Name",
    "name": "extractFullName",
    "description": "Actor input: Full Name",
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
    "displayName": "Bio / About",
    "name": "extractBio",
    "description": "Actor input: Bio / About",
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
    "displayName": "Reputation / Reach",
    "name": "extractFollowers",
    "description": "Actor input: Reputation / Reach",
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
    "displayName": "Answer / Question Count",
    "name": "extractPosts",
    "description": "Actor input: Answer / Question Count",
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
    "displayName": "Profile URL",
    "name": "extractProfileUrl",
    "description": "Actor input: Profile URL",
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
    "displayName": "Website / Blog",
    "name": "extractWebsite",
    "description": "Actor input: Website / Blog",
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
    "displayName": "Category / Specialization",
    "name": "extractCategory",
    "description": "Actor input: Category / Specialization",
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
    "displayName": "Other Metadata (badges, member since, tags)",
    "name": "extractMetadata",
    "description": "Actor input: Other Metadata (badges, member since, tags)",
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
    "displayName": "Timeout per profile (seconds)",
    "name": "timeout",
    "description": "Actor input: Timeout per profile (seconds)",
    "type": "number",
    "default": 90,
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
				body["extractUsername"] = this.getNodeParameter("extractUsername", i);
				body["extractFullName"] = this.getNodeParameter("extractFullName", i);
				body["extractBio"] = this.getNodeParameter("extractBio", i);
				body["extractLocation"] = this.getNodeParameter("extractLocation", i);
				body["extractFollowers"] = this.getNodeParameter("extractFollowers", i);
				body["extractPosts"] = this.getNodeParameter("extractPosts", i);
				body["extractProfileUrl"] = this.getNodeParameter("extractProfileUrl", i);
				body["extractEmail"] = this.getNodeParameter("extractEmail", i);
				body["extractWebsite"] = this.getNodeParameter("extractWebsite", i);
				body["extractCategory"] = this.getNodeParameter("extractCategory", i);
				body["extractMetadata"] = this.getNodeParameter("extractMetadata", i);
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
