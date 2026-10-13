import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = '4fIOUrPVR5B8w8bhu';

export class WatermarkRemover implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "AI Watermark Remover",
  "name": "watermarkRemover",
  "icon": {
    "light": "file:watermarkremover.svg",
    "dark": "file:watermarkremover.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run AI Watermark Remover through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "AI Watermark Remover"
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
    "displayName": "Image URLs or Base64",
    "name": "imageUrls",
    "description": "Actor input: Image URLs or Base64",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
    "default": "",
    "required": true,
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Timeout (seconds)",
    "name": "timeout",
    "description": "Actor input: Timeout (seconds)",
    "type": "number",
    "default": 120,
    "typeOptions": {
      "minValue": 30,
      "maxValue": 180
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
    "displayName": "Max Concurrency",
    "name": "maxConcurrency",
    "description": "Actor input: Max Concurrency",
    "type": "number",
    "default": 2,
    "typeOptions": {
      "minValue": 1,
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
    "displayName": "Custom proxy (optional)",
    "name": "customProxyUrl",
    "description": "Actor input: Custom proxy (optional)",
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
				{
					// Split per line. A data URI (data:image/...;base64,...) contains a
					// comma, so never comma-split those — only comma-split plain URLs.
					const _raw = this.getNodeParameter("imageUrls", i, '') as string;
					const _a: string[] = [];
					for (const line of _raw.split(/\n/)) {
						const t = line.trim();
						if (!t) continue;
						if (t.toLowerCase().startsWith('data:')) { _a.push(t); }
						else { for (const part of t.split(',')) { const p = part.trim(); if (p) _a.push(p); } }
					}
					if (_a.length) body["imageUrls"] = _a;
				}
				body["timeout"] = this.getNodeParameter("timeout", i);
				body["maxConcurrency"] = this.getNodeParameter("maxConcurrency", i);
				body["customProxyUrl"] = this.getNodeParameter("customProxyUrl", i);
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
