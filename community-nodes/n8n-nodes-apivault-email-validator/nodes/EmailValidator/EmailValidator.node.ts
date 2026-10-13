import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'dyhXl9P3lmQfVN1VA';

export class EmailValidator implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Email Validator",
  "name": "emailValidator",
  "icon": {
    "light": "file:emailvalidator.svg",
    "dark": "file:emailvalidator.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Email Validator through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Email Validator"
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
    "displayName": "Email addresses",
    "name": "emails",
    "description": "Actor input: Email addresses",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
    "default": "john.doe@gmail.com\ninfo@apify.com\ntest@gmial.con\nuser@mailinator.com\nbad email@@example",
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
    "name": "emailsText",
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
    "displayName": "…or upload a CSV/TXT file",
    "name": "emailsFile",
    "description": "Actor input: …or upload a CSV/TXT file",
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
    "displayName": "Email Finder — find an address from name + domain",
    "name": "findEmails",
    "description": "Actor input: Email Finder — find an address from name + domain",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
    "default": "Elon Musk, tesla.com\nBill Gates @ microsoft.com",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Check domain deliverability (MX / DNS)",
    "name": "checkMx",
    "description": "Actor input: Check domain deliverability (MX / DNS)",
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
    "displayName": "Live SMTP mailbox check (verify inbox + catch-all)",
    "name": "smtpVerification",
    "description": "Actor input: Live SMTP mailbox check (verify inbox + catch-all)",
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
    "displayName": "Proxy for SMTP verification",
    "name": "proxyUrl",
    "description": "Actor input: Proxy for SMTP verification",
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
    "displayName": "Proxy sessions to rotate",
    "name": "proxySessions",
    "description": "Actor input: Proxy sessions to rotate",
    "type": "number",
    "default": 8,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 30
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
    "displayName": "SMTP timeout (seconds)",
    "name": "smtpTimeout",
    "description": "Actor input: SMTP timeout (seconds)",
    "type": "number",
    "default": 10,
    "typeOptions": {
      "minValue": 4,
      "maxValue": 30
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
    "displayName": "Use full disposable-domain list (18k+ domains)",
    "name": "freshDisposableList",
    "description": "Actor input: Use full disposable-domain list (18k+ domains)",
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
    "displayName": "De-duplicate addresses",
    "name": "deduplicate",
    "description": "Actor input: De-duplicate addresses",
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
    "displayName": "Return only syntactically valid emails",
    "name": "onlyValid",
    "description": "Actor input: Return only syntactically valid emails",
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
    "displayName": "Return only deliverable emails",
    "name": "onlyDeliverable",
    "description": "Actor input: Return only deliverable emails",
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
    "displayName": "Drop disposable / throwaway emails",
    "name": "dropDisposable",
    "description": "Actor input: Drop disposable / throwaway emails",
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
    "displayName": "Drop role-based emails",
    "name": "dropRoleBased",
    "description": "Actor input: Drop role-based emails",
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
				{ const value = this.getNodeParameter("emails", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["emails"] = values; }
				{ const value = this.getNodeParameter("emailsText", i, '') as string; if (value.trim()) body["emailsText"] = value.trim(); }
				{ const value = this.getNodeParameter("emailsFile", i, '') as string; if (value.trim()) body["emailsFile"] = value.trim(); }
				{ const value = this.getNodeParameter("findEmails", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["findEmails"] = values; }
				body["checkMx"] = this.getNodeParameter("checkMx", i);
				body["smtpVerification"] = this.getNodeParameter("smtpVerification", i);
				{ const value = this.getNodeParameter("proxyUrl", i, '') as string; if (value.trim()) body["proxyUrl"] = value.trim(); }
				body["proxySessions"] = this.getNodeParameter("proxySessions", i);
				body["smtpTimeout"] = this.getNodeParameter("smtpTimeout", i);
				body["freshDisposableList"] = this.getNodeParameter("freshDisposableList", i);
				body["deduplicate"] = this.getNodeParameter("deduplicate", i);
				body["onlyValid"] = this.getNodeParameter("onlyValid", i);
				body["onlyDeliverable"] = this.getNodeParameter("onlyDeliverable", i);
				body["dropDisposable"] = this.getNodeParameter("dropDisposable", i);
				body["dropRoleBased"] = this.getNodeParameter("dropRoleBased", i);
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
