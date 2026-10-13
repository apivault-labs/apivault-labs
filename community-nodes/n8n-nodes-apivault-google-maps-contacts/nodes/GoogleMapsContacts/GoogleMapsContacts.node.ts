import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = '1j1jHccVPXZbsYZGL';

export class GoogleMapsContacts implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Google Maps Contacts",
  "name": "googleMapsContacts",
  "icon": {
    "light": "file:googlemapscontacts.svg",
    "dark": "file:googlemapscontacts.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Google Maps Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Google Maps Contacts"
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
    "displayName": "Country",
    "name": "country",
    "description": "Actor input: Country",
    "type": "string",
    "default": "us",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "City",
    "name": "city",
    "description": "Actor input: City",
    "type": "string",
    "default": "Boise",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "State / region (optional)",
    "name": "state",
    "description": "Actor input: State / region (optional)",
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
    "displayName": "Postal / ZIP code (optional)",
    "name": "postalCode",
    "description": "Actor input: Postal / ZIP code (optional)",
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
    "displayName": "Search terms / business categories",
    "name": "categories",
    "description": "Actor input: Search terms / business categories",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
    "default": "restaurant\ncafe\nbar\nbakery\nfast food restaurant\npizza restaurant\nhotel\nmotel\ndentist\ndoctor\nmedical clinic\npharmacy\nchiropractor\nphysiotherapist\npsychologist\nveterinarian\nhair salon\nbarber shop\nbeauty salon\nnail salon\nspa\nmassage therapist\nfitness center\ngym\nplumber\nelectrician\nHVAC contractor\nroofing contractor\ngeneral contractor\npainter\nlandscaper\ncleaning service\npest control service\nlocksmith\nauto repair shop\ncar dealer\nused car dealer\ntire shop\nauto body shop\ncar wash\ntowing service\ncar rental agency\nreal estate agency\nproperty management company\nmortgage broker\ninsurance agency\nlawyer\naccountant\ntax preparation service\nfinancial advisor\nmarketing agency\nadvertising agency\nweb design company\nsoftware company\nIT support service\nbusiness consultant\nemployment agency\ncoworking space\nretail store\nclothing store\nfurniture store\nelectronics store\nhardware store\nflorist\njewelry store\npet store\nschool\nday care center\ndriving school\nphotographer\nevent planner\nwedding venue\ntravel agency\nmoving company",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Custom search terms (optional)",
    "name": "customSearchTerms",
    "description": "Actor input: Custom search terms (optional)",
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
    "displayName": "Website",
    "name": "websiteFilter",
    "description": "Actor input: Website",
    "type": "options",
    "options": [
      {
        "name": "All businesses",
        "value": "any"
      },
      {
        "name": "Only without a website",
        "value": "without"
      },
      {
        "name": "Only with a website",
        "value": "with"
      }
    ],
    "default": "any",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Only businesses with a phone",
    "name": "requirePhone",
    "description": "Actor input: Only businesses with a phone",
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
    "displayName": "Only businesses without online booking",
    "name": "onlyNoBooking",
    "description": "Actor input: Only businesses without online booking",
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
    "displayName": "Only businesses open now",
    "name": "openNowOnly",
    "description": "Actor input: Only businesses open now",
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
    "displayName": "Skip closed businesses",
    "name": "skipClosedPlaces",
    "description": "Actor input: Skip closed businesses",
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
    "displayName": "Minimum rating",
    "name": "minRating",
    "description": "Actor input: Minimum rating",
    "type": "number",
    "default": 0,
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
    "displayName": "Maximum rating",
    "name": "maxRating",
    "description": "Actor input: Maximum rating",
    "type": "number",
    "default": 0,
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
    "displayName": "Minimum review count",
    "name": "minReviews",
    "description": "Actor input: Minimum review count",
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
    "displayName": "Maximum review count",
    "name": "maxReviews",
    "description": "Actor input: Maximum review count",
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
    "displayName": "Business name filter",
    "name": "nameFilter",
    "description": "Actor input: Business name filter",
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
    "displayName": "Business name matching",
    "name": "nameMatching",
    "description": "Actor input: Business name matching",
    "type": "options",
    "options": [
      {
        "name": "Contains text",
        "value": "includes"
      },
      {
        "name": "Exact name",
        "value": "exact"
      }
    ],
    "default": "includes",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Filter by Google's own category (optional)",
    "name": "googleCategoryFilter",
    "description": "Actor input: Filter by Google's own category (optional)",
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
    "displayName": "Enrich leads (email, socials, buy-intent signals)",
    "name": "enrich",
    "description": "Actor input: Enrich leads (email, socials, buy-intent signals)",
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
    "displayName": "Enrichment depth",
    "name": "enrichmentMode",
    "description": "Actor input: Enrichment depth",
    "type": "options",
    "options": [
      {
        "name": "Fast contacts",
        "value": "contacts"
      },
      {
        "name": "Full website audit",
        "value": "full"
      }
    ],
    "default": "contacts",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Verify emails",
    "name": "verifyEmails",
    "description": "Actor input: Verify emails",
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
    "displayName": "Only leads with an email",
    "name": "requireEmail",
    "description": "Actor input: Only leads with an email",
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
    "displayName": "Minimum priority score",
    "name": "minPriorityScore",
    "description": "Actor input: Minimum priority score",
    "type": "number",
    "default": 0,
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
    "displayName": "Track changes across runs (monitor mode)",
    "name": "trackChanges",
    "description": "Actor input: Track changes across runs (monitor mode)",
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
    "displayName": "Only fresh leads (new or changed)",
    "name": "onlyFresh",
    "description": "Actor input: Only fresh leads (new or changed)",
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
    "displayName": "Maximum places to extract",
    "name": "maxResults",
    "description": "Actor input: Maximum places to extract",
    "type": "number",
    "default": 5000,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 200000
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
    "displayName": "Fast mode",
    "name": "fastMode",
    "description": "Actor input: Fast mode",
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
    "displayName": "Search contact and about pages",
    "name": "deepContactPages",
    "description": "Actor input: Search contact and about pages",
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
    "displayName": "Results language (optional)",
    "name": "language",
    "description": "Actor input: Results language (optional)",
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
    "displayName": "Custom center latitude (advanced)",
    "name": "lat",
    "description": "Actor input: Custom center latitude (advanced)",
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
    "displayName": "Custom center longitude (advanced)",
    "name": "lng",
    "description": "Actor input: Custom center longitude (advanced)",
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
    "displayName": "Area span in degrees (advanced)",
    "name": "span",
    "description": "Actor input: Area span in degrees (advanced)",
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
    "displayName": "Bounding box north (advanced)",
    "name": "north",
    "description": "Actor input: Bounding box north (advanced)",
    "type": "number",
    "default": 0,
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Bounding box south (advanced)",
    "name": "south",
    "description": "Actor input: Bounding box south (advanced)",
    "type": "number",
    "default": 0,
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Bounding box east (advanced)",
    "name": "east",
    "description": "Actor input: Bounding box east (advanced)",
    "type": "number",
    "default": 0,
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Bounding box west (advanced)",
    "name": "west",
    "description": "Actor input: Bounding box west (advanced)",
    "type": "number",
    "default": 0,
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
				body["country"] = this.getNodeParameter("country", i);
				{ const value = this.getNodeParameter("city", i, '') as string; if (value.trim()) body["city"] = value.trim(); }
				{ const value = this.getNodeParameter("state", i, '') as string; if (value.trim()) body["state"] = value.trim(); }
				{ const value = this.getNodeParameter("postalCode", i, '') as string; if (value.trim()) body["postalCode"] = value.trim(); }
				{ const value = this.getNodeParameter("categories", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["categories"] = values; }
				{ const value = this.getNodeParameter("customSearchTerms", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["customSearchTerms"] = values; }
				body["websiteFilter"] = this.getNodeParameter("websiteFilter", i);
				body["requirePhone"] = this.getNodeParameter("requirePhone", i);
				body["onlyNoBooking"] = this.getNodeParameter("onlyNoBooking", i);
				body["openNowOnly"] = this.getNodeParameter("openNowOnly", i);
				body["skipClosedPlaces"] = this.getNodeParameter("skipClosedPlaces", i);
				{ const value = this.getNodeParameter("minRating", i, 0) as number; if (value !== 0) body["minRating"] = value; }
				{ const value = this.getNodeParameter("maxRating", i, 0) as number; if (value !== 0) body["maxRating"] = value; }
				{ const value = this.getNodeParameter("minReviews", i, 0) as number; if (value !== 0) body["minReviews"] = value; }
				{ const value = this.getNodeParameter("maxReviews", i, 0) as number; if (value !== 0) body["maxReviews"] = value; }
				{ const value = this.getNodeParameter("nameFilter", i, '') as string; if (value.trim()) body["nameFilter"] = value.trim(); }
				body["nameMatching"] = this.getNodeParameter("nameMatching", i);
				{ const value = this.getNodeParameter("googleCategoryFilter", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["googleCategoryFilter"] = values; }
				body["enrich"] = this.getNodeParameter("enrich", i);
				body["enrichmentMode"] = this.getNodeParameter("enrichmentMode", i);
				body["verifyEmails"] = this.getNodeParameter("verifyEmails", i);
				body["requireEmail"] = this.getNodeParameter("requireEmail", i);
				{ const value = this.getNodeParameter("minPriorityScore", i, 0) as number; if (value !== 0) body["minPriorityScore"] = value; }
				body["trackChanges"] = this.getNodeParameter("trackChanges", i);
				body["onlyFresh"] = this.getNodeParameter("onlyFresh", i);
				body["maxResults"] = this.getNodeParameter("maxResults", i);
				body["fastMode"] = this.getNodeParameter("fastMode", i);
				body["deepContactPages"] = this.getNodeParameter("deepContactPages", i);
				{ const value = this.getNodeParameter("language", i, '') as string; if (value.trim()) body["language"] = value.trim(); }
				{ const value = this.getNodeParameter("lat", i, '') as string; if (value.trim()) body["lat"] = value.trim(); }
				{ const value = this.getNodeParameter("lng", i, '') as string; if (value.trim()) body["lng"] = value.trim(); }
				{ const value = this.getNodeParameter("span", i, '') as string; if (value.trim()) body["span"] = value.trim(); }
				{ const value = this.getNodeParameter("north", i, 0) as number; if (value !== 0) body["north"] = value; }
				{ const value = this.getNodeParameter("south", i, 0) as number; if (value !== 0) body["south"] = value; }
				{ const value = this.getNodeParameter("east", i, 0) as number; if (value !== 0) body["east"] = value; }
				{ const value = this.getNodeParameter("west", i, 0) as number; if (value !== 0) body["west"] = value; }
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
