import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'GeHTIj4DfKqV2Zo4l';

export class Fiverr implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Fiverr Seller Scraper",
  "name": "fiverr",
  "icon": {
    "light": "file:fiverr.svg",
    "dark": "file:fiverr.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Fiverr Seller Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Fiverr Seller Scraper"
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
    "displayName": "Fiverr Seller Profile URLs",
    "name": "profileUrls",
    "description": "Actor input: Fiverr Seller Profile URLs",
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
    "displayName": "Display Name",
    "name": "extractFullName",
    "description": "Actor input: Display Name",
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
    "displayName": "Bio / Description",
    "name": "extractBio",
    "description": "Actor input: Bio / Description",
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
    "displayName": "Member Since",
    "name": "extractMemberSince",
    "description": "Actor input: Member Since",
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
    "displayName": "Response Time",
    "name": "extractResponseTime",
    "description": "Actor input: Response Time",
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
    "displayName": "Languages",
    "name": "extractLanguages",
    "description": "Actor input: Languages",
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
    "displayName": "Profile Image",
    "name": "extractProfileImage",
    "description": "Actor input: Profile Image",
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
    "displayName": "Seller Level",
    "name": "extractSellerLevel",
    "description": "Actor input: Seller Level",
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
    "displayName": "Other Metadata",
    "name": "extractMetadata",
    "description": "Actor input: Other Metadata",
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
    "displayName": "Timeout per profile (seconds)",
    "name": "timeout",
    "description": "Actor input: Timeout per profile (seconds)",
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
				{ const _v = this.getNodeParameter("profileUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["profileUrls"] = _a; }
				body["extractUsername"] = this.getNodeParameter("extractUsername", i);
				body["extractFullName"] = this.getNodeParameter("extractFullName", i);
				body["extractBio"] = this.getNodeParameter("extractBio", i);
				body["extractLocation"] = this.getNodeParameter("extractLocation", i);
				body["extractRating"] = this.getNodeParameter("extractRating", i);
				body["extractReviews"] = this.getNodeParameter("extractReviews", i);
				body["extractMemberSince"] = this.getNodeParameter("extractMemberSince", i);
				body["extractResponseTime"] = this.getNodeParameter("extractResponseTime", i);
				body["extractLanguages"] = this.getNodeParameter("extractLanguages", i);
				body["extractProfileUrl"] = this.getNodeParameter("extractProfileUrl", i);
				body["extractProfileImage"] = this.getNodeParameter("extractProfileImage", i);
				body["extractSellerLevel"] = this.getNodeParameter("extractSellerLevel", i);
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
