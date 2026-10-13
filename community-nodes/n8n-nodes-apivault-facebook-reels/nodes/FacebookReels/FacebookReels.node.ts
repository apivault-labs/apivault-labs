import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = '1Jkc3gp6Y3H6dPCfe';

export class FacebookReels implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Facebook Reels & Video Scraper - MP4, Transcript, No Login",
  "name": "facebookReels",
  "icon": {
    "light": "file:facebookreels.svg",
    "dark": "file:facebookreels.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Facebook Reels Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Facebook Reels & Video Scraper - MP4, Transcript, No Login"
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
    "displayName": "What do you want to scrape?",
    "name": "workflow",
    "description": "Actor input: What do you want to scrape?",
    "type": "options",
    "options": [
      {
        "name": "Auto-detect from my inputs (recommended)",
        "value": "auto"
      },
      {
        "name": "Specific Reel or Video URLs",
        "value": "videoUrls"
      },
      {
        "name": "Search by keyword or hashtag",
        "value": "search"
      },
      {
        "name": "Scrape a Profile or Page",
        "value": "profiles"
      },
      {
        "name": "Combine two or more sources",
        "value": "combined"
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
    "displayName": "Facebook Reel / Video URLs",
    "name": "startUrls",
    "description": "Actor input: Facebook Reel / Video URLs",
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
    "displayName": "Keyword / hashtag search (optional)",
    "name": "searchQueries",
    "description": "Actor input: Keyword / hashtag search (optional)",
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
    "displayName": "Profile / Page URLs (scrape all reels)",
    "name": "profileUrls",
    "description": "Actor input: Profile / Page URLs (scrape all reels)",
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
    "displayName": "Max reels per profile",
    "name": "maxReelsPerProfile",
    "description": "Actor input: Max reels per profile",
    "type": "number",
    "default": 200,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 200
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
    "displayName": "Max results (cost cap)",
    "name": "maxResults",
    "description": "Actor input: Max results (cost cap)",
    "type": "number",
    "default": 25,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 5000
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
    "displayName": "Output detail",
    "name": "outputPreset",
    "description": "Actor input: Output detail",
    "type": "options",
    "options": [
      {
        "name": "Compact — small MCP response",
        "value": "compact"
      },
      {
        "name": "Engagement — compact plus social metrics",
        "value": "engagement"
      },
      {
        "name": "Full — every available field (legacy default)",
        "value": "full"
      }
    ],
    "default": "full",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Max cost USD (cost cap)",
    "name": "maxCostUsd",
    "description": "Actor input: Max cost USD (cost cap)",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0
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
    "displayName": "Only videos from last N days",
    "name": "sinceDays",
    "description": "Actor input: Only videos from last N days",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 3650
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
    "displayName": "Caption keyword filter",
    "name": "keywordFilter",
    "description": "Actor input: Caption keyword filter",
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
    "displayName": "Detail-page enrichment",
    "name": "enrichDetailPage",
    "description": "Actor input: Detail-page enrichment",
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
    "displayName": "Extract MP4 download URL",
    "name": "downloadMp4",
    "description": "Actor input: Extract MP4 download URL",
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
    "displayName": "Include native captions / transcript",
    "name": "includeTranscript",
    "description": "Actor input: Include native captions / transcript",
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
    "displayName": "Deduplicate",
    "name": "dedupe",
    "description": "Actor input: Deduplicate",
    "type": "boolean",
    "default": true,
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
				body["workflow"] = this.getNodeParameter("workflow", i);
				{ const _v = this.getNodeParameter("startUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["startUrls"] = _a; }
				{ const _v = this.getNodeParameter("searchQueries", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["searchQueries"] = _a; }
				{ const _v = this.getNodeParameter("profileUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["profileUrls"] = _a; }
				body["maxReelsPerProfile"] = this.getNodeParameter("maxReelsPerProfile", i);
				body["maxResults"] = this.getNodeParameter("maxResults", i);
				body["outputPreset"] = this.getNodeParameter("outputPreset", i);
				body["maxCostUsd"] = this.getNodeParameter("maxCostUsd", i);
				body["sinceDays"] = this.getNodeParameter("sinceDays", i);
				body["keywordFilter"] = this.getNodeParameter("keywordFilter", i);
				body["enrichDetailPage"] = this.getNodeParameter("enrichDetailPage", i);
				body["downloadMp4"] = this.getNodeParameter("downloadMp4", i);
				body["includeTranscript"] = this.getNodeParameter("includeTranscript", i);
				body["dedupe"] = this.getNodeParameter("dedupe", i);
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
