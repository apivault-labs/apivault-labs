import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'vPgMVzqiBbxqsPQDl';

export class WhatsappDataLookup implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "WhatsApp Data Lookup",
  "name": "whatsappDataLookup",
  "icon": {
    "light": "file:whatsapplookup.svg",
    "dark": "file:whatsapplookup.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run WhatsApp Number Lookup through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "WhatsApp Data Lookup"
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
    "displayName": "Phone numbers",
    "name": "phoneNumbers",
    "description": "Actor input: Phone numbers",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
    "default": "+14155238886\n+442071838750\n+5511991234567\n+919876543210",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "…or paste a list / CSV column",
    "name": "numbersText",
    "description": "Actor input: …or paste a list / CSV column",
    "type": "string",
    "default": "",
    "typeOptions": {
      "rows": 3
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
    "displayName": "…or upload a CSV / TXT file",
    "name": "fileUrl",
    "description": "Actor input: …or upload a CSV / TXT file",
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
    "displayName": "Default country (for numbers without +)",
    "name": "defaultCountry",
    "description": "Actor input: Default country (for numbers without +)",
    "type": "string",
    "default": "US",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Business / about enrichment",
    "name": "businessEnrichment",
    "description": "Actor input: Business / about enrichment",
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
    "displayName": "Return only valid numbers (deprecated)",
    "name": "onlyValid",
    "description": "Actor input: Return only valid numbers (deprecated)",
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
    "displayName": "Return only WhatsApp-registered numbers (deprecated)",
    "name": "onlyWhatsappRegistered",
    "description": "Actor input: Return only WhatsApp-registered numbers (deprecated)",
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
    "displayName": "Concurrency",
    "name": "concurrency",
    "description": "Actor input: Concurrency",
    "type": "number",
    "default": 10,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 50
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
    "displayName": "Per-request timeout (seconds)",
    "name": "timeoutSeconds",
    "description": "Actor input: Per-request timeout (seconds)",
    "type": "number",
    "default": 20,
    "typeOptions": {
      "minValue": 10,
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
    "displayName": "Export format",
    "name": "exportFormat",
    "description": "Actor input: Export format",
    "type": "options",
    "options": [
      {
        "name": "Default (full JSON)",
        "value": "default"
      },
      {
        "name": "CSV-friendly columns",
        "value": "csv"
      },
      {
        "name": "Both",
        "value": "both"
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
				{ const value = this.getNodeParameter("phoneNumbers", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["phoneNumbers"] = values; }
				{ const value = this.getNodeParameter("numbersText", i, '') as string; if (value.trim()) body["numbersText"] = value.trim(); }
				{ const value = this.getNodeParameter("fileUrl", i, '') as string; if (value.trim()) body["fileUrl"] = value.trim(); }
				body["defaultCountry"] = this.getNodeParameter("defaultCountry", i);
				body["businessEnrichment"] = this.getNodeParameter("businessEnrichment", i);
				body["onlyValid"] = this.getNodeParameter("onlyValid", i);
				body["onlyWhatsappRegistered"] = this.getNodeParameter("onlyWhatsappRegistered", i);
				body["concurrency"] = this.getNodeParameter("concurrency", i);
				body["timeoutSeconds"] = this.getNodeParameter("timeoutSeconds", i);
				body["exportFormat"] = this.getNodeParameter("exportFormat", i);
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
