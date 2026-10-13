import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'NTugGARLmEpshWq7A';

export class LocalLeadFinderPro implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Local Lead Finder Pro",
  "name": "localLeadFinderPro",
  "icon": {
    "light": "file:localleadfinderpro.svg",
    "dark": "file:localleadfinderpro.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Local Lead Finder Pro through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Local Lead Finder Pro"
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
    "displayName": "Business Category",
    "name": "category",
    "description": "Actor input: Business Category",
    "type": "string",
    "default": "plumbers",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Location",
    "name": "location",
    "description": "Actor input: Location",
    "type": "string",
    "default": "New York NY",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Website URLs (direct enrichment mode)",
    "name": "startUrls",
    "description": "Actor input: Website URLs (direct enrichment mode)",
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
    "displayName": "Pages to Scrape",
    "name": "pages",
    "description": "Actor input: Pages to Scrape",
    "type": "number",
    "default": 1,
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
    "displayName": "Only Without Website",
    "name": "onlyWithoutWebsite",
    "description": "Actor input: Only Without Website",
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
    "displayName": "Max Concurrency",
    "name": "maxConcurrency",
    "description": "Actor input: Max Concurrency",
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
    "displayName": "Timeout (seconds)",
    "name": "timeout",
    "description": "Actor input: Timeout (seconds)",
    "type": "number",
    "default": 120,
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
    "displayName": "Check websites (alive + tech stack + emails + phones)",
    "name": "enrichWebsites",
    "description": "Actor input: Check websites (alive + tech stack + emails + phones)",
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
    "displayName": "Crawl /contact + /about for more contacts",
    "name": "crawlSubpages",
    "description": "Actor input: Crawl /contact + /about for more contacts",
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
    "displayName": "Score email deliverability (free MX check)",
    "name": "verifyEmails",
    "description": "Actor input: Score email deliverability (free MX check)",
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
    "displayName": "Extract owner / decision-maker name",
    "name": "extractOwnerName",
    "description": "Actor input: Extract owner / decision-maker name",
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
    "displayName": "Generate email guesses",
    "name": "enrichEmailGuesses",
    "description": "Actor input: Generate email guesses",
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
    "displayName": "Build social search URLs",
    "name": "enrichSocialUrls",
    "description": "Actor input: Build social search URLs",
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
    "displayName": "Generate outreach pitch",
    "name": "includeOutreachPitch",
    "description": "Actor input: Generate outreach pitch",
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
    "displayName": "Detect brand age (via Wayback Machine)",
    "name": "enrichBrandAge",
    "description": "Actor input: Detect brand age (via Wayback Machine)",
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
    "displayName": "Geocode addresses (lat/lng via OpenStreetMap)",
    "name": "enrichGeocode",
    "description": "Actor input: Geocode addresses (lat/lng via OpenStreetMap)",
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
    "displayName": "Exclude corporate chains / franchises",
    "name": "excludeChains",
    "description": "Actor input: Exclude corporate chains / franchises",
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
    "displayName": "Minimum lead score (0-100)",
    "name": "minLeadScore",
    "description": "Actor input: Minimum lead score (0-100)",
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
    "displayName": "Max results (after enrichment + sorting)",
    "name": "maxResults",
    "description": "Actor input: Max results (after enrichment + sorting)",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 1000
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
    "displayName": "Export format",
    "name": "exportFormat",
    "description": "Actor input: Export format",
    "type": "options",
    "options": [
      {
        "name": "Default (full JSON record)",
        "value": "default"
      },
      {
        "name": "CSV-friendly (HubSpot/Pipedrive column names)",
        "value": "csv"
      },
      {
        "name": "Both (default + nested _csv field)",
        "value": "both"
      }
    ],
    "default": "default",
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
				{ const value = this.getNodeParameter("category", i, '') as string; if (value.trim()) body["category"] = value.trim(); }
				{ const value = this.getNodeParameter("location", i, '') as string; if (value.trim()) body["location"] = value.trim(); }
				{ const value = this.getNodeParameter("startUrls", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["startUrls"] = values; }
				body["pages"] = this.getNodeParameter("pages", i);
				body["onlyWithoutWebsite"] = this.getNodeParameter("onlyWithoutWebsite", i);
				body["maxConcurrency"] = this.getNodeParameter("maxConcurrency", i);
				body["timeout"] = this.getNodeParameter("timeout", i);
				body["enrichWebsites"] = this.getNodeParameter("enrichWebsites", i);
				body["crawlSubpages"] = this.getNodeParameter("crawlSubpages", i);
				body["verifyEmails"] = this.getNodeParameter("verifyEmails", i);
				body["extractOwnerName"] = this.getNodeParameter("extractOwnerName", i);
				body["enrichEmailGuesses"] = this.getNodeParameter("enrichEmailGuesses", i);
				body["enrichSocialUrls"] = this.getNodeParameter("enrichSocialUrls", i);
				body["includeOutreachPitch"] = this.getNodeParameter("includeOutreachPitch", i);
				body["enrichBrandAge"] = this.getNodeParameter("enrichBrandAge", i);
				body["enrichGeocode"] = this.getNodeParameter("enrichGeocode", i);
				body["excludeChains"] = this.getNodeParameter("excludeChains", i);
				body["minLeadScore"] = this.getNodeParameter("minLeadScore", i);
				body["maxResults"] = this.getNodeParameter("maxResults", i);
				body["exportFormat"] = this.getNodeParameter("exportFormat", i);
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
