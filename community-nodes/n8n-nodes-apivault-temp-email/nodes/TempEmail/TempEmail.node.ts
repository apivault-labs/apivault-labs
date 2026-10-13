import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'r6y7sasrtRGGjTkwy';

export class TempEmail implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Temp Email",
  "name": "tempEmail",
  "icon": {
    "light": "file:tempemail.svg",
    "dark": "file:tempemail.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Temp Email API through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Temp Email"
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
    "displayName": "Action",
    "name": "action",
    "description": "Actor input: Action",
    "type": "options",
    "options": [
      {
        "name": "Create a new inbox",
        "value": "create"
      },
      {
        "name": "Read an existing inbox",
        "value": "read"
      }
    ],
    "default": "create",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Domain",
    "name": "domain",
    "description": "Actor input: Domain",
    "type": "options",
    "options": [
      {
        "name": "Auto - random address (fastest, recommended)",
        "value": "auto"
      },
      {
        "name": "@swagpapa.com",
        "value": "swagpapa.com"
      },
      {
        "name": "@rulersonline.com",
        "value": "rulersonline.com"
      },
      {
        "name": "@besttempmail.com",
        "value": "besttempmail.com"
      },
      {
        "name": "@deepmails.org",
        "value": "deepmails.org"
      },
      {
        "name": "@embassybase.com",
        "value": "embassybase.com"
      },
      {
        "name": "@justdefinition.com",
        "value": "justdefinition.com"
      },
      {
        "name": "@gongjua.com",
        "value": "gongjua.com"
      },
      {
        "name": "@123mails.org",
        "value": "123mails.org"
      },
      {
        "name": "Gmail alias - dot trick (a.b.c@gmail.com)",
        "value": "gmail-dot"
      },
      {
        "name": "Gmail alias - plus trick (abc+tag@gmail.com)",
        "value": "gmail-plus"
      },
      {
        "name": "Googlemail alias (a.bc@googlemail.com)",
        "value": "googlemail"
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
    "displayName": "Username (optional)",
    "name": "username",
    "description": "Actor input: Username (optional)",
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
    "displayName": "Number of inboxes",
    "name": "count",
    "description": "Actor input: Number of inboxes",
    "type": "number",
    "default": 1,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 25
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
    "displayName": "Fall back to Auto if a branded inbox fails",
    "name": "allowFallback",
    "description": "Actor input: Fall back to Auto if a branded inbox fails",
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
    "displayName": "Inbox address",
    "name": "address",
    "description": "Actor input: Inbox address",
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
    "displayName": "Multiple inboxes (optional)",
    "name": "inboxes",
    "description": "Actor input: Multiple inboxes (optional)",
    "type": "json",
    "default": "[]",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Inbox key (optional for branded/Gmail)",
    "name": "key",
    "description": "Actor input: Inbox key (optional for branded/Gmail)",
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
    "displayName": "Inbox password (optional)",
    "name": "password",
    "description": "Actor input: Inbox password (optional)",
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
    "displayName": "Max wait for mail (seconds)",
    "name": "waitTimeout",
    "description": "Actor input: Max wait for mail (seconds)",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0,
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
    "displayName": "Poll interval (seconds)",
    "name": "pollInterval",
    "description": "Actor input: Poll interval (seconds)",
    "type": "number",
    "default": 6,
    "typeOptions": {
      "minValue": 2,
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
    "displayName": "Match sender (optional)",
    "name": "matchFrom",
    "description": "Actor input: Match sender (optional)",
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
    "displayName": "Match subject (optional)",
    "name": "matchSubject",
    "description": "Actor input: Match subject (optional)",
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
    "displayName": "Match keyword in body (optional)",
    "name": "matchKeyword",
    "description": "Actor input: Match keyword in body (optional)",
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
    "displayName": "Only unread messages",
    "name": "onlyUnseen",
    "description": "Actor input: Only unread messages",
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
    "displayName": "Only mail that arrives after this run starts",
    "name": "waitForNew",
    "description": "Actor input: Only mail that arrives after this run starts",
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
    "displayName": "Return only the newest message",
    "name": "latestOnly",
    "description": "Actor input: Return only the newest message",
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
    "displayName": "Max messages to return",
    "name": "maxMessages",
    "description": "Actor input: Max messages to return",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0,
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
    "displayName": "Extract OTP / verification codes",
    "name": "extractCodes",
    "description": "Actor input: Extract OTP / verification codes",
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
    "displayName": "Include full message body",
    "name": "includeBody",
    "description": "Actor input: Include full message body",
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
    "displayName": "Min OTP code length",
    "name": "codeMinLength",
    "description": "Actor input: Min OTP code length",
    "type": "number",
    "default": 4,
    "typeOptions": {
      "minValue": 3,
      "maxValue": 12
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
    "displayName": "Max OTP code length",
    "name": "codeMaxLength",
    "description": "Actor input: Max OTP code length",
    "type": "number",
    "default": 8,
    "typeOptions": {
      "minValue": 3,
      "maxValue": 12
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
    "displayName": "Custom code pattern (optional)",
    "name": "codeRegex",
    "description": "Actor input: Custom code pattern (optional)",
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
    "displayName": "Include raw EML & headers",
    "name": "includeRaw",
    "description": "Actor input: Include raw EML & headers",
    "type": "boolean",
    "default": false,
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
				body["action"] = this.getNodeParameter("action", i);
				body["domain"] = this.getNodeParameter("domain", i);
				body["username"] = this.getNodeParameter("username", i);
				body["count"] = this.getNodeParameter("count", i);
				body["allowFallback"] = this.getNodeParameter("allowFallback", i);
				body["address"] = this.getNodeParameter("address", i);
				{ const _r = this.getNodeParameter("inboxes", i, '') as string|object; if (_r) { try { body["inboxes"] = typeof _r === 'string' ? JSON.parse(_r) : _r; } catch { throw new NodeOperationError(this.getNode(), "inboxes" + ' must be valid JSON', { itemIndex: i }); } } }
				body["key"] = this.getNodeParameter("key", i);
				body["password"] = this.getNodeParameter("password", i);
				body["waitTimeout"] = this.getNodeParameter("waitTimeout", i);
				body["pollInterval"] = this.getNodeParameter("pollInterval", i);
				body["matchFrom"] = this.getNodeParameter("matchFrom", i);
				body["matchSubject"] = this.getNodeParameter("matchSubject", i);
				body["matchKeyword"] = this.getNodeParameter("matchKeyword", i);
				body["onlyUnseen"] = this.getNodeParameter("onlyUnseen", i);
				body["waitForNew"] = this.getNodeParameter("waitForNew", i);
				body["latestOnly"] = this.getNodeParameter("latestOnly", i);
				body["maxMessages"] = this.getNodeParameter("maxMessages", i);
				body["extractCodes"] = this.getNodeParameter("extractCodes", i);
				body["includeBody"] = this.getNodeParameter("includeBody", i);
				body["codeMinLength"] = this.getNodeParameter("codeMinLength", i);
				body["codeMaxLength"] = this.getNodeParameter("codeMaxLength", i);
				body["codeRegex"] = this.getNodeParameter("codeRegex", i);
				body["includeRaw"] = this.getNodeParameter("includeRaw", i);
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
