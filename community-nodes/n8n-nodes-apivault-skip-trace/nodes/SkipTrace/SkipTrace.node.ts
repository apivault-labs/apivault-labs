import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'gSv8lJykdzOrYycAq';

export class SkipTrace implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Skip Trace",
  "name": "skipTrace",
  "icon": {
    "light": "file:skiptrace.svg",
    "dark": "file:skiptrace.svg"
  },
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "subtitle": "={{$parameter[\"searchBy\"]}}",
  "description": "Run Skip Trace through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Skip Trace"
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
    "displayName": "Search By",
    "name": "searchBy",
    "type": "options",
    "noDataExpression": true,
    "options": [
      {
        "name": "Name",
        "value": "name",
        "description": "Find a person by full name (optionally narrowed by location)",
        "action": "Search by name"
      },
      {
        "name": "Address",
        "value": "address",
        "description": "Find people associated with a street address",
        "action": "Search by address"
      },
      {
        "name": "Phone",
        "value": "phone",
        "description": "Reverse-lookup a US phone number",
        "action": "Search by phone"
      },
      {
        "name": "Email",
        "value": "email",
        "description": "Reverse-lookup an email address you are authorized to process",
        "action": "Search by email"
      }
    ],
    "default": "name",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Name",
    "name": "query",
    "type": "string",
    "default": "",
    "required": true,
    "placeholder": "Jane Example; Springfield, IL",
    "description": "Actor input: Name",
    "displayOptions": {
      "show": {
        "searchBy": [
          "name"
        ],
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Address",
    "name": "query",
    "type": "string",
    "default": "",
    "required": true,
    "placeholder": "123 Example Ave; Springfield, IL 62704",
    "description": "Actor input: Address",
    "displayOptions": {
      "show": {
        "searchBy": [
          "address"
        ],
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Phone Number",
    "name": "query",
    "type": "string",
    "default": "",
    "required": true,
    "placeholder": "(202) 555-0182",
    "description": "Actor input: Phone Number",
    "displayOptions": {
      "show": {
        "searchBy": [
          "phone"
        ],
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Email",
    "name": "query",
    "type": "string",
    "default": "",
    "required": true,
    "placeholder": "jane@example.com",
    "description": "Actor input: Email",
    "displayOptions": {
      "show": {
        "searchBy": [
          "email"
        ],
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Output Preset",
    "name": "outputPreset",
    "type": "options",
    "options": [
      {
        "name": "Contacts (Recommended)",
        "value": "contacts",
        "description": "Compact fields for AI, CRM, and manual review"
      },
      {
        "name": "Flat Spreadsheet",
        "value": "flat",
        "description": "Spreadsheet-friendly values"
      },
      {
        "name": "Full",
        "value": "full",
        "description": "Complete public result when available"
      }
    ],
    "default": "contacts",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Max Results",
    "name": "maxResults",
    "type": "number",
    "typeOptions": {
      "minValue": 1,
      "maxValue": 1000
    },
    "default": 3,
    "description": "Actor input: Max Results",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Verify Email Deliverability",
    "name": "verifyEmails",
    "type": "boolean",
    "default": true,
    "description": "Actor input: Verify Email Deliverability",
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
const searchBy = this.getNodeParameter('searchBy', i) as string;
				const query = this.getNodeParameter('query', i) as string;
				const outputPreset = this.getNodeParameter('outputPreset', i) as string;
				const maxResults = this.getNodeParameter('maxResults', i) as number;
				const verifyEmails = this.getNodeParameter('verifyEmails', i) as boolean;
				// Map the chosen search field to the actor's input arrays.
				const body: Record<string, unknown> = {
					workflow: searchBy,
					max_results: maxResults,
					outputPreset,
					verifyEmails,
					useDemoOnEmpty: false,
				};
				if (searchBy === 'name') body.name = [query];
				else if (searchBy === 'address') body.street_citystatezip = [query];
				else if (searchBy === 'phone') body.phone_number = [query];
				else if (searchBy === 'email') body.email = [query];
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
