import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'DufyXa26CDzS1bwa4';

export class EmailVerifier implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Email Verifier & Finder",
  "name": "emailVerifier",
  "icon": {
    "light": "file:emailverifier.svg",
    "dark": "file:emailverifier.svg"
  },
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "subtitle": "={{$parameter[\"mode\"]}}",
  "description": "Run Bulk Email Verifier & Finder through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Email Verifier & Finder"
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
    "displayName": "Mode",
    "name": "mode",
    "type": "options",
    "options": [
      {
        "name": "Verify emails",
        "value": "verify"
      },
      {
        "name": "Find emails by name + domain",
        "value": "find"
      }
    ],
    "default": "verify",
    "description": "Actor input: Mode",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Emails",
    "name": "emails",
    "type": "string",
    "default": "",
    "required": true,
    "displayOptions": {
      "show": {
        "mode": [
          "verify"
        ],
        "apivaultMode": [
          "run"
        ]
      }
    },
    "placeholder": "john.doe@acme.com, info@apify.com",
    "description": "Actor input: Emails"
  },
  {
    "displayName": "People (JSON)",
    "name": "people",
    "type": "json",
    "default": "[\n  { \"name\": \"John Doe\", \"domain\": \"acme.com\" }\n]",
    "required": true,
    "displayOptions": {
      "show": {
        "mode": [
          "find"
        ],
        "apivaultMode": [
          "run"
        ]
      }
    },
    "description": "Actor input: People (JSON)"
  },
  {
    "displayName": "Options",
    "name": "options",
    "type": "collection",
    "placeholder": "Add Option",
    "default": {},
    "options": [
      {
        "displayName": "Live Mailbox Check",
        "name": "verifyMailbox",
        "type": "boolean",
        "default": true,
        "description": "Whether to confirm at the mail server that the mailbox accepts mail (the real existence check; paced ~1/sec)"
      },
      {
        "displayName": "Check MX / Domain Deliverability",
        "name": "checkMx",
        "type": "boolean",
        "default": true,
        "description": "Whether to look up MX records over DNS to confirm the domain can receive mail"
      },
      {
        "displayName": "Deep Check (SPF/DKIM/DMARC + Gravatar)",
        "name": "deepCheck",
        "type": "boolean",
        "default": true,
        "description": "Whether to audit sender authentication and a public Gravatar identity signal"
      },
      {
        "displayName": "Resolve Catch-All Domains",
        "name": "resolveCatchAll",
        "type": "boolean",
        "default": true,
        "description": "Whether to probe a fake address on catch-all domains to upgrade real addresses to valid"
      },
      {
        "displayName": "Auto Proxy Fallback",
        "name": "proxyFallback",
        "type": "boolean",
        "default": true,
        "description": "Whether to switch to a datacenter proxy if the live check gets blocked"
      },
      {
        "displayName": "De-duplicate",
        "name": "deduplicate",
        "type": "boolean",
        "default": true,
        "description": "Whether to remove duplicate addresses (Gmail dots/+tags normalized)"
      },
      {
        "displayName": "Only Deliverable",
        "name": "onlyDeliverable",
        "type": "boolean",
        "default": false,
        "description": "Whether to keep only valid/risky addresses (drop undeliverable)"
      },
      {
        "displayName": "Drop Disposable",
        "name": "dropDisposable",
        "type": "boolean",
        "default": false,
        "description": "Whether to remove throwaway-mailbox domains"
      },
      {
        "displayName": "Drop Role-Based",
        "name": "dropRoleBased",
        "type": "boolean",
        "default": false,
        "description": "Whether to remove group mailboxes (info@, sales@, support@)"
      },
      {
        "displayName": "Export Format",
        "name": "exportFormat",
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
        "description": "Shape of each output record"
      }
    ],
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
const mode = this.getNodeParameter('mode', i) as string;
				const opts = this.getNodeParameter('options', i, {}) as Record<string, unknown>;

				const body: Record<string, unknown> = {
					checkMx: opts.checkMx ?? true,
					deepCheck: opts.deepCheck ?? true,
					verifyMailbox: opts.verifyMailbox ?? true,
					proxyFallback: opts.proxyFallback ?? true,
					resolveCatchAll: opts.resolveCatchAll ?? true,
					deduplicate: opts.deduplicate ?? true,
					onlyDeliverable: opts.onlyDeliverable ?? false,
					dropDisposable: opts.dropDisposable ?? false,
					dropRoleBased: opts.dropRoleBased ?? false,
					exportFormat: opts.exportFormat ?? 'default',
				};

				if (mode === 'find') {
					const peopleRaw = this.getNodeParameter('people', i) as string | object;
					let people: unknown;
					try {
						people = typeof peopleRaw === 'string' ? JSON.parse(peopleRaw) : peopleRaw;
					} catch {
						throw new NodeOperationError(this.getNode(), 'People must be valid JSON array', { itemIndex: i });
					}
					body.people = people;
				} else {
					const raw = this.getNodeParameter('emails', i) as string;
					const emails = raw
						.split(/[,\n;]/)
						.map((e) => e.trim())
						.filter((e) => e.length > 0);
					if (emails.length === 0) {
						throw new NodeOperationError(this.getNode(), 'No emails provided', { itemIndex: i });
					}
					body.emails = emails;
				}
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
