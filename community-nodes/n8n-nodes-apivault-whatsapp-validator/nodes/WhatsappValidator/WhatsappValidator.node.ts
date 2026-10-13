import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'LP2X15E8c4ebfnPRC';

export class WhatsappValidator implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "WhatsApp Number Validator",
  "name": "whatsappValidator",
  "icon": {
    "light": "file:whatsappvalidator.svg",
    "dark": "file:whatsappvalidator.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run WhatsApp Number Validator through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "WhatsApp Number Validator"
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
        "name": "Auto-detect / merge both",
        "value": "auto"
      },
      {
        "name": "Number list only",
        "value": "list"
      },
      {
        "name": "Pasted text or CSV column only",
        "value": "text"
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
    "displayName": "Phone numbers",
    "name": "phoneNumbers",
    "description": "Actor input: Phone numbers",
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
    "displayName": "…or paste a list / CSV column",
    "name": "numbersText",
    "description": "Actor input: …or paste a list / CSV column",
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
    "displayName": "Output preset",
    "name": "outputPreset",
    "description": "Actor input: Output preset",
    "type": "options",
    "options": [
      {
        "name": "Full JSON (recommended for AI)",
        "value": "full"
      },
      {
        "name": "CSV-friendly",
        "value": "csv"
      },
      {
        "name": "Full JSON + CSV fields",
        "value": "both"
      }
    ],
    "default": "full",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Legacy export format override",
    "name": "exportFormat",
    "description": "Actor input: Legacy export format override",
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
				{ const _v = this.getNodeParameter("phoneNumbers", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["phoneNumbers"] = _a; }
				body["numbersText"] = this.getNodeParameter("numbersText", i);
				body["defaultCountry"] = this.getNodeParameter("defaultCountry", i);
				body["outputPreset"] = this.getNodeParameter("outputPreset", i);
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
