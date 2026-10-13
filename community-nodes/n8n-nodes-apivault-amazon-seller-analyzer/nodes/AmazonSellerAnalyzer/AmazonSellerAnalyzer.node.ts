import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'NFIKGWdTAHRznHrUZ';

export class AmazonSellerAnalyzer implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Amazon Seller Analyzer",
  "name": "amazonSellerAnalyzer",
  "icon": {
    "light": "file:amazonselleranalyzer.svg",
    "dark": "file:amazonselleranalyzer.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Amazon Seller Analyzer through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Amazon Seller Analyzer"
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
    "displayName": "Seller profile URLs",
    "name": "sellerUrls",
    "description": "Actor input: Seller profile URLs",
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
    "displayName": "Seller IDs",
    "name": "sellerIds",
    "description": "Actor input: Seller IDs",
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
    "displayName": "Amazon marketplace",
    "name": "marketplace",
    "description": "Actor input: Amazon marketplace",
    "type": "options",
    "options": [
      {
        "name": "United States (amazon.com)",
        "value": "us"
      },
      {
        "name": "United Kingdom (amazon.co.uk)",
        "value": "uk"
      },
      {
        "name": "Germany (amazon.de)",
        "value": "de"
      },
      {
        "name": "France (amazon.fr)",
        "value": "fr"
      },
      {
        "name": "Spain (amazon.es)",
        "value": "es"
      },
      {
        "name": "Italy (amazon.it)",
        "value": "it"
      },
      {
        "name": "Canada (amazon.ca)",
        "value": "ca"
      },
      {
        "name": "Mexico (amazon.com.mx)",
        "value": "mx"
      },
      {
        "name": "India (amazon.in)",
        "value": "in"
      }
    ],
    "default": "us",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Products per seller",
    "name": "maxProductsPerSeller",
    "description": "Actor input: Products per seller",
    "type": "number",
    "default": 10,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 500
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
    "displayName": "Inspect offers and Buy Box",
    "name": "includeOffers",
    "description": "Actor input: Inspect offers and Buy Box",
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
    "displayName": "Track changes between runs",
    "name": "trackStrategy",
    "description": "Actor input: Track changes between runs",
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
    "displayName": "Processing concurrency",
    "name": "maxConcurrency",
    "description": "Actor input: Processing concurrency",
    "type": "number",
    "default": 4,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 4
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
    "displayName": "Proxy configuration",
    "name": "proxyConfiguration",
    "description": "Actor input: Proxy configuration",
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
				{ const _v = this.getNodeParameter("sellerUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["sellerUrls"] = _a; }
				{ const _v = this.getNodeParameter("sellerIds", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["sellerIds"] = _a; }
				body["marketplace"] = this.getNodeParameter("marketplace", i);
				body["maxProductsPerSeller"] = this.getNodeParameter("maxProductsPerSeller", i);
				body["includeOffers"] = this.getNodeParameter("includeOffers", i);
				body["trackStrategy"] = this.getNodeParameter("trackStrategy", i);
				body["maxConcurrency"] = this.getNodeParameter("maxConcurrency", i);
				{ const _r = this.getNodeParameter("proxyConfiguration", i, '') as string|object; if (_r) { try { body["proxyConfiguration"] = typeof _r === 'string' ? JSON.parse(_r) : _r; } catch { throw new NodeOperationError(this.getNode(), "proxyConfiguration" + ' must be valid JSON', { itemIndex: i }); } } }
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
