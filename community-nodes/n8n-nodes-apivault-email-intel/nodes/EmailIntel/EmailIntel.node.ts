import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'DufyXa26CDzS1bwa4';

export class EmailIntel implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Bulk Email Verifier & Finder - Mailbox Exists, SPF/DKIM/DMARC",
  "name": "emailIntel",
  "icon": {
    "light": "file:emailintel.svg",
    "dark": "file:emailintel.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Bulk Email Verifier & Finder through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Bulk Email Verifier & Finder - Mailbox Exists, SPF/DKIM/DMARC"
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
    "displayName": "Email addresses (to verify)",
    "name": "emails",
    "description": "Actor input: Email addresses (to verify)",
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
    "displayName": "Find emails by name + domain (optional)",
    "name": "people",
    "description": "Actor input: Find emails by name + domain (optional)",
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
    "displayName": "…or paste a list / CSV column",
    "name": "emailsText",
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
    "displayName": "…or records with extra columns (CSV passthrough)",
    "name": "records",
    "description": "Actor input: …or records with extra columns (CSV passthrough)",
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
    "displayName": "Email column name (for records)",
    "name": "emailColumn",
    "description": "Actor input: Email column name (for records)",
    "type": "string",
    "default": "email",
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
    "displayName": "Deep check: sender auth (SPF/DKIM/DMARC) + Gravatar",
    "name": "deepCheck",
    "description": "Actor input: Deep check: sender auth (SPF/DKIM/DMARC) + Gravatar",
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
    "displayName": "Live mailbox check (does the mailbox exist?)",
    "name": "verifyMailbox",
    "description": "Actor input: Live mailbox check (does the mailbox exist?)",
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
    "displayName": "Auto-fallback to proxy if the live check is blocked",
    "name": "proxyFallback",
    "description": "Actor input: Auto-fallback to proxy if the live check is blocked",
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
    "displayName": "Resolve catch-all domains (extra probe)",
    "name": "resolveCatchAll",
    "description": "Actor input: Resolve catch-all domains (extra probe)",
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
    "displayName": "Don't re-charge for emails verified in the last N days",
    "name": "cacheDays",
    "description": "Actor input: Don't re-charge for emails verified in the last N days",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 90
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
    "displayName": "Greylisting retries (convert 'unknown' to a verdict)",
    "name": "greylistRetries",
    "description": "Actor input: Greylisting retries (convert 'unknown' to a verdict)",
    "type": "number",
    "default": 1,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 5
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
    "displayName": "Greylisting retry backoff (seconds)",
    "name": "greylistBackoffSecs",
    "description": "Actor input: Greylisting retry backoff (seconds)",
    "type": "number",
    "default": 30,
    "typeOptions": {
      "minValue": 5,
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
    "displayName": "Live-check parallel workers (0 = auto)",
    "name": "mailboxConcurrency",
    "description": "Actor input: Live-check parallel workers (0 = auto)",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0,
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
    "displayName": "Auto-verify typo corrections",
    "name": "autoCorrect",
    "description": "Actor input: Auto-verify typo corrections",
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
    "displayName": "Email list file URL (CSV / TSV / text)",
    "name": "fileUrl",
    "description": "Actor input: Email list file URL (CSV / TSV / text)",
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
				{ const _v = this.getNodeParameter("emails", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["emails"] = _a; }
				{ const _r = this.getNodeParameter("people", i, '') as string|object; if (_r) { try { body["people"] = typeof _r === 'string' ? JSON.parse(_r) : _r; } catch { throw new NodeOperationError(this.getNode(), "people" + ' must be valid JSON', { itemIndex: i }); } } }
				body["emailsText"] = this.getNodeParameter("emailsText", i);
				{ const _r = this.getNodeParameter("records", i, '') as string|object; if (_r) { try { body["records"] = typeof _r === 'string' ? JSON.parse(_r) : _r; } catch { throw new NodeOperationError(this.getNode(), "records" + ' must be valid JSON', { itemIndex: i }); } } }
				body["emailColumn"] = this.getNodeParameter("emailColumn", i);
				body["checkMx"] = this.getNodeParameter("checkMx", i);
				body["deepCheck"] = this.getNodeParameter("deepCheck", i);
				body["verifyMailbox"] = this.getNodeParameter("verifyMailbox", i);
				body["proxyFallback"] = this.getNodeParameter("proxyFallback", i);
				body["resolveCatchAll"] = this.getNodeParameter("resolveCatchAll", i);
				body["deduplicate"] = this.getNodeParameter("deduplicate", i);
				body["onlyValid"] = this.getNodeParameter("onlyValid", i);
				body["onlyDeliverable"] = this.getNodeParameter("onlyDeliverable", i);
				body["dropDisposable"] = this.getNodeParameter("dropDisposable", i);
				body["dropRoleBased"] = this.getNodeParameter("dropRoleBased", i);
				body["exportFormat"] = this.getNodeParameter("exportFormat", i);
				body["cacheDays"] = this.getNodeParameter("cacheDays", i);
				body["greylistRetries"] = this.getNodeParameter("greylistRetries", i);
				body["greylistBackoffSecs"] = this.getNodeParameter("greylistBackoffSecs", i);
				body["mailboxConcurrency"] = this.getNodeParameter("mailboxConcurrency", i);
				body["autoCorrect"] = this.getNodeParameter("autoCorrect", i);
				body["fileUrl"] = this.getNodeParameter("fileUrl", i);
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
