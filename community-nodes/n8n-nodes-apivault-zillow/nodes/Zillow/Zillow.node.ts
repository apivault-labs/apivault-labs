import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'CdbhjHqAHX4gP4FUh';

export class Zillow implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Zillow Property Scraper",
  "name": "zillow",
  "icon": {
    "light": "file:zillow.svg",
    "dark": "file:zillow.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Zillow Property Details Scraper through the hosted Apify Actor and read its results",
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
    "displayName": "Zillow Property URLs",
    "name": "propertyUrls",
    "description": "Actor input: Zillow Property URLs",
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
    "displayName": "Price",
    "name": "extractPrice",
    "description": "Actor input: Price",
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
    "displayName": "Square Feet",
    "name": "extractSqft",
    "description": "Actor input: Square Feet",
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
    "displayName": "Year Built",
    "name": "extractYearBuilt",
    "description": "Actor input: Year Built",
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
    "displayName": "Property Type",
    "name": "extractPropertyType",
    "description": "Actor input: Property Type",
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
    "displayName": "Description",
    "name": "extractDescription",
    "description": "Actor input: Description",
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
    "displayName": "Lot Size",
    "name": "extractLotSize",
    "description": "Actor input: Lot Size",
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
    "displayName": "Price per Sqft",
    "name": "extractPricePerSqft",
    "description": "Actor input: Price per Sqft",
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
    "displayName": "HOA Fee",
    "name": "extractHOA",
    "description": "Actor input: HOA Fee",
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
    "displayName": "Listing Agent",
    "name": "extractAgent",
    "description": "Actor input: Listing Agent",
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
    "displayName": "Listing Image",
    "name": "extractImage",
    "description": "Actor input: Listing Image",
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
    "displayName": "Listing Status",
    "name": "extractStatus",
    "description": "Actor input: Listing Status",
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
    "displayName": "Max Concurrency",
    "name": "maxConcurrency",
    "description": "Actor input: Max Concurrency",
    "type": "number",
    "default": 3,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 10
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
    "displayName": "Timeout per property (seconds)",
    "name": "timeout",
    "description": "Actor input: Timeout per property (seconds)",
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
  }
] as INodeProperties[])]
};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const output: INodeExecutionData[] = [];
		for (let i = 0; i < this.getInputData().length; i++) {
			try {
				const body: Record<string, unknown> = this.getNodeParameter('apivaultMode', i, 'run') === 'read' ? {} : (() => {
const body: Record<string, unknown> = {};
				{ const _v = this.getNodeParameter("propertyUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["propertyUrls"] = _a; }
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
