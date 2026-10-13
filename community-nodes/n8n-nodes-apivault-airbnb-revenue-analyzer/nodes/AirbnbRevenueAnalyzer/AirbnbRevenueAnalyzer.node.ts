import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'wVemIrVEggLe7FC7j';

export class AirbnbRevenueAnalyzer implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Airbnb Revenue, Occupancy & ROI Analyzer",
  "name": "airbnbRevenueAnalyzer",
  "icon": {
    "light": "file:airbnbrevenueanalyzer.svg",
    "dark": "file:airbnbrevenueanalyzer.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Airbnb Revenue & ROI Analyzer through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Airbnb Revenue, Occupancy & ROI Analyzer"
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
    "displayName": "Analysis mode",
    "name": "mode",
    "description": "Actor input: Analysis mode",
    "type": "options",
    "options": [
      {
        "name": "Listing URLs",
        "value": "listing"
      },
      {
        "name": "Market comparables",
        "value": "market"
      }
    ],
    "default": "listing",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Airbnb listing URLs or room IDs",
    "name": "listingUrls",
    "description": "Actor input: Airbnb listing URLs or room IDs",
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
    "displayName": "Market location",
    "name": "searchLocation",
    "description": "Actor input: Market location",
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
    "displayName": "Maximum comparable listings",
    "name": "maxComparableListings",
    "description": "Actor input: Maximum comparable listings",
    "type": "number",
    "default": 10,
    "typeOptions": {
      "minValue": 3,
      "maxValue": 20
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
    "displayName": "Minimum bedrooms",
    "name": "searchBedrooms",
    "description": "Actor input: Minimum bedrooms",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 20
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
    "displayName": "Guests",
    "name": "searchGuests",
    "description": "Actor input: Guests",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 30
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
    "displayName": "Forward calendar months",
    "name": "calendarMonths",
    "description": "Actor input: Forward calendar months",
    "type": "number",
    "default": 6,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 12
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
    "displayName": "Currency",
    "name": "currency",
    "description": "Actor input: Currency",
    "type": "string",
    "default": "USD",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Nightly rate override",
    "name": "nightlyRateOverride",
    "description": "Actor input: Nightly rate override",
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
    "displayName": "Blocked nights that are bookings, %",
    "name": "bookingShareOfBlockedPercent",
    "description": "Actor input: Blocked nights that are bookings, %",
    "type": "number",
    "default": 75,
    "typeOptions": {
      "minValue": 0,
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
    "displayName": "Average stay length",
    "name": "averageStayNights",
    "description": "Actor input: Average stay length",
    "type": "number",
    "default": 3,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 365
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
    "displayName": "Cleaning fee charged per stay",
    "name": "cleaningFeeRevenuePerStay",
    "description": "Actor input: Cleaning fee charged per stay",
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
    "displayName": "Cleaning cost per stay",
    "name": "cleaningCostPerStay",
    "description": "Actor input: Cleaning cost per stay",
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
    "displayName": "Platform fee, %",
    "name": "platformFeePercent",
    "description": "Actor input: Platform fee, %",
    "type": "number",
    "default": 3,
    "typeOptions": {
      "minValue": 0,
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
    "displayName": "Property management, %",
    "name": "managementFeePercent",
    "description": "Actor input: Property management, %",
    "type": "number",
    "default": 15,
    "typeOptions": {
      "minValue": 0,
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
    "displayName": "Maintenance reserve, %",
    "name": "maintenancePercent",
    "description": "Actor input: Maintenance reserve, %",
    "type": "number",
    "default": 5,
    "typeOptions": {
      "minValue": 0,
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
    "displayName": "Utilities per month",
    "name": "utilitiesMonthly",
    "description": "Actor input: Utilities per month",
    "type": "number",
    "default": 300,
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
    "displayName": "Insurance per year",
    "name": "insuranceAnnual",
    "description": "Actor input: Insurance per year",
    "type": "number",
    "default": 1500,
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
    "displayName": "Property tax per year",
    "name": "propertyTaxAnnual",
    "description": "Actor input: Property tax per year",
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
    "displayName": "HOA per month",
    "name": "hoaMonthly",
    "description": "Actor input: HOA per month",
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
    "displayName": "Mortgage payment per month",
    "name": "mortgageMonthly",
    "description": "Actor input: Mortgage payment per month",
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
    "displayName": "Purchase price",
    "name": "purchasePrice",
    "description": "Actor input: Purchase price",
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
    "displayName": "Down payment, %",
    "name": "downPaymentPercent",
    "description": "Actor input: Down payment, %",
    "type": "number",
    "default": 20,
    "typeOptions": {
      "minValue": 0,
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
    "displayName": "Closing costs",
    "name": "closingCosts",
    "description": "Actor input: Closing costs",
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
    "displayName": "Furnishing and startup costs",
    "name": "furnishingCosts",
    "description": "Actor input: Furnishing and startup costs",
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
    "displayName": "Add CSV-friendly projection rows",
    "name": "emitProjectionRows",
    "description": "Actor input: Add CSV-friendly projection rows",
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
    "displayName": "Previous analysis snapshots",
    "name": "previousSnapshots",
    "description": "Actor input: Previous analysis snapshots",
    "type": "json",
    "default": "[]",
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
    "default": 3,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 8
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
				body["mode"] = this.getNodeParameter("mode", i);
				{ const _v = this.getNodeParameter("listingUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["listingUrls"] = _a; }
				body["searchLocation"] = this.getNodeParameter("searchLocation", i);
				body["maxComparableListings"] = this.getNodeParameter("maxComparableListings", i);
				body["searchBedrooms"] = this.getNodeParameter("searchBedrooms", i);
				body["searchGuests"] = this.getNodeParameter("searchGuests", i);
				body["calendarMonths"] = this.getNodeParameter("calendarMonths", i);
				body["currency"] = this.getNodeParameter("currency", i);
				body["nightlyRateOverride"] = this.getNodeParameter("nightlyRateOverride", i);
				body["bookingShareOfBlockedPercent"] = this.getNodeParameter("bookingShareOfBlockedPercent", i);
				body["averageStayNights"] = this.getNodeParameter("averageStayNights", i);
				body["cleaningFeeRevenuePerStay"] = this.getNodeParameter("cleaningFeeRevenuePerStay", i);
				body["cleaningCostPerStay"] = this.getNodeParameter("cleaningCostPerStay", i);
				body["platformFeePercent"] = this.getNodeParameter("platformFeePercent", i);
				body["managementFeePercent"] = this.getNodeParameter("managementFeePercent", i);
				body["maintenancePercent"] = this.getNodeParameter("maintenancePercent", i);
				body["utilitiesMonthly"] = this.getNodeParameter("utilitiesMonthly", i);
				body["insuranceAnnual"] = this.getNodeParameter("insuranceAnnual", i);
				body["propertyTaxAnnual"] = this.getNodeParameter("propertyTaxAnnual", i);
				body["hoaMonthly"] = this.getNodeParameter("hoaMonthly", i);
				body["mortgageMonthly"] = this.getNodeParameter("mortgageMonthly", i);
				body["purchasePrice"] = this.getNodeParameter("purchasePrice", i);
				body["downPaymentPercent"] = this.getNodeParameter("downPaymentPercent", i);
				body["closingCosts"] = this.getNodeParameter("closingCosts", i);
				body["furnishingCosts"] = this.getNodeParameter("furnishingCosts", i);
				body["emitProjectionRows"] = this.getNodeParameter("emitProjectionRows", i);
				{ const _r = this.getNodeParameter("previousSnapshots", i, '') as string|object; if (_r) { try { body["previousSnapshots"] = typeof _r === 'string' ? JSON.parse(_r) : _r; } catch { throw new NodeOperationError(this.getNode(), "previousSnapshots" + ' must be valid JSON', { itemIndex: i }); } } }
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
