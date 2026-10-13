import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'ruSZXZxIolTyGCeqQ';

export class DomainIntelligence implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Domain Intelligence",
  "name": "domainIntelligence",
  "icon": {
    "light": "file:domainintelligence.svg",
    "dark": "file:domainintelligence.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run WHOIS & DNS Lookup through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Domain Intelligence"
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
    "displayName": "Domains",
    "name": "domains",
    "type": "string",
    "default": "",
    "required": true,
    "placeholder": "apify.com, github.com",
    "description": "Actor input: Domains",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Lookups",
    "name": "lookups",
    "type": "collection",
    "placeholder": "Add Option",
    "default": {},
    "options": [
      {
        "displayName": "WHOIS Data",
        "name": "extractWhois",
        "type": "boolean",
        "default": true,
        "description": "Whether to fetch registrar, creation/expiration dates and owner (RDAP)"
      },
      {
        "displayName": "DNS Records",
        "name": "extractDns",
        "type": "boolean",
        "default": true,
        "description": "Whether to fetch A, AAAA, MX, NS, TXT, CNAME via DNS-over-HTTPS"
      },
      {
        "displayName": "SSL Certificates",
        "name": "extractSsl",
        "type": "boolean",
        "default": true,
        "description": "Whether to fetch the SSL certificate chain from crt.sh"
      },
      {
        "displayName": "Subdomains",
        "name": "extractSubdomains",
        "type": "boolean",
        "default": true,
        "description": "Whether to discover subdomains from SSL certificate history"
      },
      {
        "displayName": "HTTP Response Headers",
        "name": "extractHttp",
        "type": "boolean",
        "default": true,
        "description": "Whether to fetch the homepage and record response/security headers and redirects"
      },
      {
        "displayName": "Max Concurrency",
        "name": "maxConcurrency",
        "type": "number",
        "typeOptions": {
          "minValue": 1,
          "maxValue": 20
        },
        "default": 5,
        "description": "Parallel domain lookups"
      },
      {
        "displayName": "Timeout per Lookup (Seconds)",
        "name": "timeout",
        "type": "number",
        "typeOptions": {
          "minValue": 5,
          "maxValue": 60
        },
        "default": 15,
        "description": "Timeout per individual API call"
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
const raw = this.getNodeParameter('domains', i) as string;
				const lookups = this.getNodeParameter('lookups', i, {}) as Record<string, unknown>;

				const domains = raw
					.split(/[,\n]/)
					.map((d) => d.trim())
					.filter((d) => d.length > 0);
				if (domains.length === 0) {
					throw new NodeOperationError(this.getNode(), 'No domains provided', { itemIndex: i });
				}

				const body: Record<string, unknown> = {
					domains,
					extractWhois: lookups.extractWhois ?? true,
					extractDns: lookups.extractDns ?? true,
					extractSsl: lookups.extractSsl ?? true,
					extractSubdomains: lookups.extractSubdomains ?? true,
					extractHttp: lookups.extractHttp ?? true,
					maxConcurrency: lookups.maxConcurrency ?? 5,
					timeout: lookups.timeout ?? 15,
				};
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
