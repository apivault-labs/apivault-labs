import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'RtWF57ncDP1x48I9Z';

export class GoogleAdsTransparency implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Google Ads Transparency Scraper",
  "name": "googleAdsTransparency",
  "icon": {
    "light": "file:googleadstransparency.svg",
    "dark": "file:googleadstransparency.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Google Ads Transparency Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Google Ads Transparency Scraper"
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
    "displayName": "Search Queries",
    "name": "searchQueries",
    "description": "Actor input: Search Queries",
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
    "displayName": "Domains",
    "name": "domains",
    "description": "Actor input: Domains",
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
    "displayName": "Advertiser IDs",
    "name": "advertiserIds",
    "description": "Actor input: Advertiser IDs",
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
    "displayName": "Region Filter",
    "name": "region",
    "description": "Actor input: Region Filter",
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
    "displayName": "Max Items",
    "name": "maxItems",
    "description": "Actor input: Max Items",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 10000
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
    "displayName": "Include Ad Details",
    "name": "includeAdDetails",
    "description": "Actor input: Include Ad Details",
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
    "displayName": "Include Advertiser Info",
    "name": "includeAdvertiserInfo",
    "description": "Actor input: Include Advertiser Info",
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
    "displayName": "Include DUNS Number",
    "name": "includeDunsNumber",
    "description": "Actor input: Include DUNS Number",
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
    "displayName": "Output Fields",
    "name": "outputFields",
    "description": "Actor input: Output Fields",
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
    "displayName": "Proxy Configuration",
    "name": "proxyConfiguration",
    "description": "Actor input: Proxy Configuration",
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
				{ const _v = this.getNodeParameter("searchQueries", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["searchQueries"] = _a; }
				{ const _v = this.getNodeParameter("domains", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["domains"] = _a; }
				{ const _v = this.getNodeParameter("advertiserIds", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["advertiserIds"] = _a; }
				body["region"] = this.getNodeParameter("region", i);
				body["maxItems"] = this.getNodeParameter("maxItems", i);
				body["includeAdDetails"] = this.getNodeParameter("includeAdDetails", i);
				body["includeAdvertiserInfo"] = this.getNodeParameter("includeAdvertiserInfo", i);
				body["includeDunsNumber"] = this.getNodeParameter("includeDunsNumber", i);
				{ const _v = this.getNodeParameter("outputFields", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["outputFields"] = _a; }
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
