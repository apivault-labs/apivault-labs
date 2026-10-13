import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'kE7o9mTpb1AQaKlpP';

export class Maigret implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Maigret Username OSINT",
  "name": "maigret",
  "icon": {
    "light": "file:maigret.svg",
    "dark": "file:maigret.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Username Search through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Maigret Username OSINT"
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
    "displayName": "Usernames",
    "name": "usernames",
    "description": "Actor input: Usernames",
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
    "displayName": "Number of sites to check",
    "name": "topSites",
    "description": "Actor input: Number of sites to check",
    "type": "number",
    "default": 500,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 3000
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
    "displayName": "Include only these tags",
    "name": "tags",
    "description": "Actor input: Include only these tags",
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
    "displayName": "Exclude these tags",
    "name": "excludeTags",
    "description": "Actor input: Exclude these tags",
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
    "displayName": "Specific site names only",
    "name": "sites",
    "description": "Actor input: Specific site names only",
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
    "displayName": "Extract profile data (names, bio, IDs)",
    "name": "extractData",
    "description": "Actor input: Extract profile data (names, bio, IDs)",
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
    "displayName": "Deep enrichment (premium tier — $15/1K)",
    "name": "deepEnrichment",
    "description": "Actor input: Deep enrichment (premium tier — $15/1K)",
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
    "displayName": "Recursive search on discovered identifiers",
    "name": "recursiveSearch",
    "description": "Actor input: Recursive search on discovered identifiers",
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
    "displayName": "Include 'not found' sites in dataset",
    "name": "includeNotFound",
    "description": "Actor input: Include 'not found' sites in dataset",
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
    "displayName": "Also emit one record per found profile",
    "name": "perSiteRecords",
    "description": "Actor input: Also emit one record per found profile",
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
    "displayName": "Export format",
    "name": "exportFormat",
    "description": "Actor input: Export format",
    "type": "options",
    "options": [
      {
        "name": "Default JSON",
        "value": "default"
      },
      {
        "name": "Flat CSV (found profiles)",
        "value": "csv"
      }
    ],
    "default": "default",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Per-request timeout (seconds)",
    "name": "timeout",
    "description": "Actor input: Per-request timeout (seconds)",
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
  },
  {
    "displayName": "Max parallel connections",
    "name": "maxConnections",
    "description": "Actor input: Max parallel connections",
    "type": "number",
    "default": 50,
    "typeOptions": {
      "minValue": 1,
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
    "displayName": "Max billed profiles per username (0 = no limit)",
    "name": "maxProfilesPerUsername",
    "description": "Actor input: Max billed profiles per username (0 = no limit)",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 3000
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
    "displayName": "Whole-run time budget (seconds)",
    "name": "runBudgetSecs",
    "description": "Actor input: Whole-run time budget (seconds)",
    "type": "number",
    "default": 900,
    "typeOptions": {
      "minValue": 60,
      "maxValue": 3600
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
    "displayName": "Custom proxy URL (optional)",
    "name": "proxyUrl",
    "description": "Actor input: Custom proxy URL (optional)",
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
				{ const _v = this.getNodeParameter("usernames", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["usernames"] = _a; }
				body["topSites"] = this.getNodeParameter("topSites", i);
				{ const _v = this.getNodeParameter("tags", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["tags"] = _a; }
				{ const _v = this.getNodeParameter("excludeTags", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["excludeTags"] = _a; }
				{ const _v = this.getNodeParameter("sites", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["sites"] = _a; }
				body["extractData"] = this.getNodeParameter("extractData", i);
				body["deepEnrichment"] = this.getNodeParameter("deepEnrichment", i);
				body["recursiveSearch"] = this.getNodeParameter("recursiveSearch", i);
				body["includeNotFound"] = this.getNodeParameter("includeNotFound", i);
				body["perSiteRecords"] = this.getNodeParameter("perSiteRecords", i);
				body["exportFormat"] = this.getNodeParameter("exportFormat", i);
				body["timeout"] = this.getNodeParameter("timeout", i);
				body["maxConnections"] = this.getNodeParameter("maxConnections", i);
				body["maxProfilesPerUsername"] = this.getNodeParameter("maxProfilesPerUsername", i);
				body["runBudgetSecs"] = this.getNodeParameter("runBudgetSecs", i);
				body["proxyUrl"] = this.getNodeParameter("proxyUrl", i);
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
