import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'OKz5YMTega3ndukoB';

export class ZillowPropertyScraper implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Zillow Property Scraper",
  "name": "zillowPropertyScraper",
  "icon": {
    "light": "file:zillowscraper.svg",
    "dark": "file:zillowscraper.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Zillow Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Zillow Property Scraper"
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
    "displayName": "Zillow property URLs",
    "name": "propertyUrls",
    "description": "Actor input: Zillow property URLs",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
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
    "displayName": "Maximum paid results",
    "name": "maxResults",
    "description": "Actor input: Maximum paid results",
    "type": "number",
    "default": 25,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 100
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
    "displayName": "Address",
    "name": "extractAddress",
    "description": "Actor input: Address",
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
    "displayName": "Listing price",
    "name": "extractPrice",
    "description": "Actor input: Listing price",
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
    "displayName": "Bedrooms",
    "name": "extractBedrooms",
    "description": "Actor input: Bedrooms",
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
    "displayName": "Bathrooms",
    "name": "extractBathrooms",
    "description": "Actor input: Bathrooms",
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
    "displayName": "Square footage",
    "name": "extractSqft",
    "description": "Actor input: Square footage",
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
    "displayName": "Year built",
    "name": "extractYearBuilt",
    "description": "Actor input: Year built",
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
    "displayName": "Property type",
    "name": "extractPropertyType",
    "description": "Actor input: Property type",
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
    "displayName": "Listing description",
    "name": "extractDescription",
    "description": "Actor input: Listing description",
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
    "displayName": "Zestimate",
    "name": "extractZestimate",
    "description": "Actor input: Zestimate",
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
    "displayName": "Lot size",
    "name": "extractLotSize",
    "description": "Actor input: Lot size",
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
    "displayName": "Price per square foot",
    "name": "extractPricePerSqft",
    "description": "Actor input: Price per square foot",
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
    "displayName": "HOA fee",
    "name": "extractHOA",
    "description": "Actor input: HOA fee",
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
    "displayName": "Listing agent",
    "name": "extractAgent",
    "description": "Actor input: Listing agent",
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
    "displayName": "Brokerage",
    "name": "extractBrokerage",
    "description": "Actor input: Brokerage",
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
    "displayName": "Main listing image",
    "name": "extractImage",
    "description": "Actor input: Main listing image",
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
    "displayName": "Listing status",
    "name": "extractStatus",
    "description": "Actor input: Listing status",
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
    "displayName": "Write free run summary",
    "name": "writeSummary",
    "description": "Actor input: Write free run summary",
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
    "displayName": "Concurrency",
    "name": "maxConcurrency",
    "description": "Actor input: Concurrency",
    "type": "number",
    "default": 3,
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
    "displayName": "Timeout per property",
    "name": "timeout",
    "description": "Actor input: Timeout per property",
    "type": "number",
    "default": 90,
    "typeOptions": {
      "minValue": 30,
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
    "displayName": "Additional Actor Input (JSON)",
    "name": "additionalInput",
    "description": "Actor input: Additional Actor Input (JSON)",
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
				const extra = this.getNodeParameter('additionalInput', i, '{}') as string | object;
				if (extra) {
					try { Object.assign(body, typeof extra === 'string' ? JSON.parse(extra) : extra); }
					catch { throw new NodeOperationError(this.getNode(), 'Additional Actor Input must be valid JSON', { itemIndex: i }); }
				}
				{ const value = this.getNodeParameter("propertyUrls", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["propertyUrls"] = values; }
				body["maxResults"] = this.getNodeParameter("maxResults", i);
				body["extractAddress"] = this.getNodeParameter("extractAddress", i);
				body["extractPrice"] = this.getNodeParameter("extractPrice", i);
				body["extractBedrooms"] = this.getNodeParameter("extractBedrooms", i);
				body["extractBathrooms"] = this.getNodeParameter("extractBathrooms", i);
				body["extractSqft"] = this.getNodeParameter("extractSqft", i);
				body["extractYearBuilt"] = this.getNodeParameter("extractYearBuilt", i);
				body["extractPropertyType"] = this.getNodeParameter("extractPropertyType", i);
				body["extractDescription"] = this.getNodeParameter("extractDescription", i);
				body["extractZestimate"] = this.getNodeParameter("extractZestimate", i);
				body["extractLotSize"] = this.getNodeParameter("extractLotSize", i);
				body["extractPricePerSqft"] = this.getNodeParameter("extractPricePerSqft", i);
				body["extractHOA"] = this.getNodeParameter("extractHOA", i);
				body["extractAgent"] = this.getNodeParameter("extractAgent", i);
				body["extractBrokerage"] = this.getNodeParameter("extractBrokerage", i);
				body["extractImage"] = this.getNodeParameter("extractImage", i);
				body["extractStatus"] = this.getNodeParameter("extractStatus", i);
				body["writeSummary"] = this.getNodeParameter("writeSummary", i);
				body["maxConcurrency"] = this.getNodeParameter("maxConcurrency", i);
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
