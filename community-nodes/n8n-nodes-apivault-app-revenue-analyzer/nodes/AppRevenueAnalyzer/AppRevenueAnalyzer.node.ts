import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'oULtaUHKS4ya5uaSq';

export class AppRevenueAnalyzer implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Mobile App Revenue & Competitor Analyzer",
  "name": "appRevenueAnalyzer",
  "icon": {
    "light": "file:apprevenueanalyzer.svg",
    "dark": "file:apprevenueanalyzer.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run App Revenue Analyzer through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Mobile App Revenue & Competitor Analyzer"
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
    "description": "Actor input: Mode",
    "type": "options",
    "options": [
      {
        "name": "Analyze apps",
        "value": "analyze"
      },
      {
        "name": "Search by keyword (ASO)",
        "value": "search"
      }
    ],
    "default": "analyze",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Keywords (search mode)",
    "name": "searchTerms",
    "description": "Actor input: Keywords (search mode)",
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
    "displayName": "Apps per keyword",
    "name": "maxSearchResults",
    "description": "Actor input: Apps per keyword",
    "type": "number",
    "default": 25,
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
    "displayName": "Max parallel lookups",
    "name": "maxConcurrency",
    "description": "Actor input: Max parallel lookups",
    "type": "number",
    "default": 10,
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
    "displayName": "Apps",
    "name": "targets",
    "description": "Actor input: Apps",
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
    "displayName": "Store country",
    "name": "country",
    "description": "Actor input: Store country",
    "type": "string",
    "default": "us",
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
				body["mode"] = this.getNodeParameter("mode", i);
				{ const _v = this.getNodeParameter("searchTerms", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["searchTerms"] = _a; }
				body["maxSearchResults"] = this.getNodeParameter("maxSearchResults", i);
				body["maxConcurrency"] = this.getNodeParameter("maxConcurrency", i);
				{ const _v = this.getNodeParameter("targets", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["targets"] = _a; }
				body["country"] = this.getNodeParameter("country", i);
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
