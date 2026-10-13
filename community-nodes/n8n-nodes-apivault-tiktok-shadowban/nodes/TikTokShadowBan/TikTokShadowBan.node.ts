import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'vZk3HQH4gPVykC9dC';

export class TikTokShadowBan implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "TikTok Shadow Ban Checker",
  "name": "tikTokShadowBan",
  "icon": {
    "light": "file:tiktokshadowban.svg",
    "dark": "file:tiktokshadowban.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run TikTok Shadow Ban Checker through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "TikTok Shadow Ban Checker"
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
    "displayName": "Video URLs",
    "name": "urls",
    "type": "string",
    "default": "",
    "required": true,
    "placeholder": "https://www.tiktok.com/@tiktok/video/7480279424202575159",
    "description": "Actor input: Video URLs",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Proxy Country",
    "name": "proxyCountry",
    "type": "string",
    "default": "US",
    "placeholder": "US",
    "description": "Actor input: Proxy Country",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Include Recommendations",
    "name": "includeRecommendations",
    "type": "boolean",
    "default": true,
    "description": "Actor input: Include Recommendations",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Include Batch Summary",
    "name": "includeSummary",
    "type": "boolean",
    "default": false,
    "description": "Actor input: Include Batch Summary",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Max Retries",
    "name": "maxRetries",
    "type": "number",
    "typeOptions": {
      "minValue": 1,
      "maxValue": 10
    },
    "default": 5,
    "description": "Actor input: Max Retries",
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
const raw = this.getNodeParameter('urls', i) as string;
				const proxyCountry = this.getNodeParameter('proxyCountry', i) as string;
				const includeRecommendations = this.getNodeParameter(
					'includeRecommendations',
					i,
				) as boolean;
				const includeSummary = this.getNodeParameter('includeSummary', i) as boolean;
				const maxRetries = this.getNodeParameter('maxRetries', i) as number;

				const urls = raw
					.split(/[\s,]+/)
					.map((u) => u.trim())
					.filter((u) => u.length > 0);

				if (urls.length === 0) {
					throw new NodeOperationError(
						this.getNode(),
						'No valid TikTok video URLs provided',
						{ itemIndex: i },
					);
				}

				const body = {
					urls,
					includeSummary,
					includeRecommendations,
					maxRetries,
					proxyCountry: (proxyCountry || 'US').trim().toUpperCase(),
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
