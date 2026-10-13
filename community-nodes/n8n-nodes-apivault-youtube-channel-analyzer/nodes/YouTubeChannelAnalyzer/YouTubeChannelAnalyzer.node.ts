import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'K09OrGifukaMjqDSH';

export class YouTubeChannelAnalyzer implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "YouTube Channel Analyzer — Earnings & Growth",
  "name": "youtubeChannelAnalyzer",
  "icon": {
    "light": "file:youtubechannelanalyzer.svg",
    "dark": "file:youtubechannelanalyzer.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run YouTube Channel Analyzer through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "YouTube Channel Analyzer — Earnings & Growth"
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
    "displayName": "Channels or videos",
    "name": "targets",
    "description": "Actor input: Channels or videos",
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
    "displayName": "Daily history depth",
    "name": "historyDays",
    "description": "Actor input: Daily history depth",
    "type": "options",
    "options": [
      {
        "name": "No daily history",
        "value": "0"
      },
      {
        "name": "7 days",
        "value": "7"
      },
      {
        "name": "14 days",
        "value": "14"
      },
      {
        "name": "28 days",
        "value": "28"
      },
      {
        "name": "90 days",
        "value": "90"
      },
      {
        "name": "365 days",
        "value": "365"
      }
    ],
    "default": "28",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Fast mode (core stats only)",
    "name": "fastMode",
    "description": "Actor input: Fast mode (core stats only)",
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
    "displayName": "Max parallel lookups",
    "name": "maxConcurrency",
    "description": "Actor input: Max parallel lookups",
    "type": "number",
    "default": 10,
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
    "displayName": "Proxy configuration (recommended for bulk)",
    "name": "proxyConfiguration",
    "description": "Actor input: Proxy configuration (recommended for bulk)",
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
				{ const _v = this.getNodeParameter("targets", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["targets"] = _a; }
				body["historyDays"] = this.getNodeParameter("historyDays", i);
				body["fastMode"] = this.getNodeParameter("fastMode", i);
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
