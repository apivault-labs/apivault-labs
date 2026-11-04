import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'Mp57DQfkhayPSf3TK';

export class ImageGenerator implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "AI Image Generator - 7 Models, Text to Image",
  "name": "imageGenerator",
  "icon": {
    "light": "file:imagegenerator.svg",
    "dark": "file:imagegenerator.svg"
  },
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run the hosted Apify Actor and read its results",
  "defaults": {
    "name": "AI Image Generator - 7 Models, Text to Image"
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
  "defaultVersion": 2,
  "subtitle": "={{$parameter[\"apivaultMode\"]}}"
,
 properties: [...executionProperties, ...([
  {
    "displayName": "Prompt",
    "name": "prompt",
    "description": "Text description of the image to generate \u2014 or, when editing a photo, what to change.",
    "type": "string",
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
    "displayName": "Image to edit (optional)",
    "name": "imageUrl",
    "description": "Optional. URL of a photo to edit (image-to-image). Leave empty to generate from text only. Best with Nano Banana or Qwen Image.",
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
    "displayName": "Model",
    "name": "model",
    "description": "AI model to use for generation.",
    "type": "options",
    "options": [
      {
        "name": "Minimax Image 01 \u2014 fast drafts (1K only)",
        "value": "minimax-image-01"
      },
      {
        "name": "GPT Image 1.5 \u2014 versatile (1K, 2K)",
        "value": "gpt-image-1-5"
      },
      {
        "name": "Seedream 4 \u2014 reliable (1K, 2K, 4K)",
        "value": "seedream-4"
      },
      {
        "name": "Nano Banana \u2014 consistent subjects (1K, 2K, 4K)",
        "value": "nano-banana"
      },
      {
        "name": "Nano Banana 2 Lite \u2014 sharp details, recommended (1K, 2K, 4K)",
        "value": "nano-2-lite"
      },
      {
        "name": "Gempix 2 \u2014 vibrant colors (1K, 2K, 4K)",
        "value": "gempix-2"
      },
      {
        "name": "Qwen Image \u2014 text rendering (1K, 2K)",
        "value": "qwen-image"
      }
    ],
    "default": "nano-2-lite",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Aspect Ratio",
    "name": "aspectRatio",
    "description": "Image aspect ratio.",
    "type": "options",
    "options": [
      {
        "name": "1:1 (Square)",
        "value": "1:1"
      },
      {
        "name": "16:9 (Landscape)",
        "value": "16:9"
      },
      {
        "name": "9:16 (Portrait)",
        "value": "9:16"
      },
      {
        "name": "4:3",
        "value": "4:3"
      },
      {
        "name": "3:4",
        "value": "3:4"
      },
      {
        "name": "3:2",
        "value": "3:2"
      },
      {
        "name": "2:3",
        "value": "2:3"
      },
      {
        "name": "5:4",
        "value": "5:4"
      },
      {
        "name": "4:5",
        "value": "4:5"
      },
      {
        "name": "21:9 (Ultrawide)",
        "value": "21:9"
      }
    ],
    "default": "1:1",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Resolution",
    "name": "resolution",
    "description": "Output resolution. Supported levels are shown next to each model name above. If a model does not support the chosen level, the closest available one is delivered and the exact size is reported in the output.",
    "type": "options",
    "options": [
      {
        "name": "1K (standard, fastest)",
        "value": "1K"
      },
      {
        "name": "2K (higher detail)",
        "value": "2K"
      },
      {
        "name": "4K (maximum detail)",
        "value": "4K"
      }
    ],
    "default": "1K",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Number of Images",
    "name": "numImages",
    "description": "How many images to generate per prompt (each counts as 1 result).",
    "type": "options",
    "options": [
      {
        "name": "1 image",
        "value": "1"
      },
      {
        "name": "2 images",
        "value": "2"
      },
      {
        "name": "4 images",
        "value": "4"
      }
    ],
    "default": "1",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Custom Proxy URL",
    "name": "customProxyUrl",
    "description": "Optional proxy for generation requests. Format: http://user:pass@host:port (sticky session recommended).",
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
    "displayName": "Max wait per image (seconds)",
    "name": "timeout",
    "description": "Total time budget per image, including any retries and fallbacks. If exceeded, that image is skipped (you are not charged for it).",
    "type": "number",
    "default": 120,
    "typeOptions": {
      "minValue": 60,
      "maxValue": 300
    },
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
				body["prompt"] = this.getNodeParameter("prompt", i);
				body["imageUrl"] = this.getNodeParameter("imageUrl", i);
				body["model"] = this.getNodeParameter("model", i);
				body["aspectRatio"] = this.getNodeParameter("aspectRatio", i);
				body["resolution"] = this.getNodeParameter("resolution", i);
				body["numImages"] = this.getNodeParameter("numImages", i);
				body["customProxyUrl"] = this.getNodeParameter("customProxyUrl", i);
				body["timeout"] = this.getNodeParameter("timeout", i);
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
