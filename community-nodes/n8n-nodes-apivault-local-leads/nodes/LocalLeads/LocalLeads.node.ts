import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'liRuJHh5OxQH3r64Z';

export class LocalLeads implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Local Lead Finder",
  "name": "localLeads",
  "icon": {
    "light": "file:localleads.svg",
    "dark": "file:localleads.svg"
  },
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "subtitle": "={{$parameter[\"inputMode\"] === \"urls\" ? \"Enrich websites\" : $parameter[\"category\"] + \" — \" + $parameter[\"location\"]}}",
  "description": "Run Local Lead Finder through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Local Lead Finder"
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
    "displayName": "Input Mode",
    "name": "inputMode",
    "type": "options",
    "options": [
      {
        "name": "Search by Category and Location",
        "value": "search"
      },
      {
        "name": "Enrich Website URLs",
        "value": "urls"
      },
      {
        "name": "Search and Enrich Website URLs",
        "value": "both"
      }
    ],
    "default": "search",
    "description": "Actor input: Input Mode",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Business Category",
    "name": "category",
    "type": "string",
    "default": "",
    "placeholder": "plumbers",
    "description": "Actor input: Business Category",
    "displayOptions": {
      "show": {
        "inputMode": [
          "search",
          "both"
        ],
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Location",
    "name": "location",
    "type": "string",
    "default": "",
    "placeholder": "New York NY",
    "description": "Actor input: Location",
    "displayOptions": {
      "show": {
        "inputMode": [
          "search",
          "both"
        ],
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Website URLs",
    "name": "startUrls",
    "type": "string",
    "typeOptions": {
      "rows": 5
    },
    "default": "",
    "placeholder": "https://example.com\nexample.org",
    "description": "Actor input: Website URLs",
    "displayOptions": {
      "show": {
        "inputMode": [
          "urls",
          "both"
        ],
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Pages to Scrape",
    "name": "pages",
    "type": "number",
    "typeOptions": {
      "minValue": 1,
      "maxValue": 10
    },
    "default": 1,
    "description": "Actor input: Pages to Scrape",
    "displayOptions": {
      "show": {
        "inputMode": [
          "search",
          "both"
        ],
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Only Without Website",
    "name": "onlyWithoutWebsite",
    "type": "boolean",
    "default": false,
    "description": "Actor input: Only Without Website",
    "displayOptions": {
      "show": {
        "inputMode": [
          "search",
          "both"
        ],
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Export Format",
    "name": "exportFormat",
    "type": "options",
    "options": [
      {
        "name": "Default (full JSON record)",
        "value": "default"
      },
      {
        "name": "CSV-Friendly (HubSpot/Pipedrive columns)",
        "value": "csv"
      },
      {
        "name": "Both (default + nested _csv field)",
        "value": "both"
      }
    ],
    "default": "default",
    "description": "Actor input: Export Format",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Enrichment",
    "name": "enrichment",
    "type": "collection",
    "placeholder": "Add Enrichment Option",
    "default": {},
    "options": [
      {
        "displayName": "Crawl Contact and About Pages",
        "name": "crawlSubpages",
        "type": "boolean",
        "default": true,
        "description": "Whether to inspect relevant subpages when the homepage has no contact details"
      },
      {
        "displayName": "Verify Email Deliverability",
        "name": "verifyEmails",
        "type": "boolean",
        "default": true,
        "description": "Whether to score discovered emails for deliverability and select the best contact"
      },
      {
        "displayName": "Extract Owner or Decision-Maker Name",
        "name": "extractOwnerName",
        "type": "boolean",
        "default": true,
        "description": "Whether to look for a public owner, founder, or principal name"
      },
      {
        "displayName": "Check Websites (Alive + Tech Stack + Emails + Phones)",
        "name": "enrichWebsites",
        "type": "boolean",
        "default": true,
        "description": "Whether to probe each lead website for alive status, SSL, tech stack (Wix, WordPress, Shopify, Squarespace, GoDaddy, Webflow, Weebly, Joomla, Drupal, ClickFunnels, GoHighLevel), real emails and phone numbers. Adds ~1-2 sec per lead with a website."
      },
      {
        "displayName": "Generate Email Guesses",
        "name": "enrichEmailGuesses",
        "type": "boolean",
        "default": true,
        "description": "Whether to generate plausible email addresses (info@, contact@, hello@, office@) from the website domain as a fallback. Verify before sending."
      },
      {
        "displayName": "Build Social Search URLs",
        "name": "enrichSocialUrls",
        "type": "boolean",
        "default": true,
        "description": "Whether to add 1-click search links for Facebook, Instagram, LinkedIn, Google Maps and Google search"
      },
      {
        "displayName": "Generate Outreach Pitch",
        "name": "includeOutreachPitch",
        "type": "boolean",
        "default": true,
        "description": "Whether to auto-write a personalized cold-outreach opener tailored to the lead (no website / dead site / DIY builder / etc.)"
      },
      {
        "displayName": "Detect Brand Age (via Wayback Machine)",
        "name": "enrichBrandAge",
        "type": "boolean",
        "default": true,
        "description": "Whether to query the Wayback Machine for the earliest archived snapshot. An established brand (5+ years) with a dead site is a prime replacement target (+10 leadScore)."
      },
      {
        "displayName": "Geocode Addresses (lat/lng via OpenStreetMap)",
        "name": "enrichGeocode",
        "type": "boolean",
        "default": false,
        "description": "Whether to resolve every address to lat/lng via OpenStreetMap Nominatim. Off by default because it slows runs by ~1s per lead."
      }
    ],
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Filters",
    "name": "filters",
    "type": "collection",
    "placeholder": "Add Filter",
    "default": {},
    "options": [
      {
        "displayName": "Exclude Corporate Chains / Franchises",
        "name": "excludeChains",
        "type": "boolean",
        "default": false,
        "description": "Whether to drop national chains and franchises (Roto-Rooter, Aamco, Subway, Great Clips, RE/MAX, ~50 brands). Most agencies skip these."
      },
      {
        "displayName": "Minimum Lead Score",
        "name": "minLeadScore",
        "type": "number",
        "typeOptions": {
          "minValue": 0,
          "maxValue": 100
        },
        "default": 0,
        "description": "Drop leads below this composite score (0-100). Tiers: cold <35, warm 35-54, hot 55-74, on-fire 75+."
      },
      {
        "displayName": "Max Results",
        "name": "maxResults",
        "type": "number",
        "typeOptions": {
          "minValue": 0,
          "maxValue": 1000
        },
        "default": 0,
        "description": "Hard cap on returned leads, applied after lead-score sorting. 0 = no cap. Keeps cost predictable."
      }
    ],
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
const inputMode = this.getNodeParameter('inputMode', i, 'search') as string;
				const category = this.getNodeParameter('category', i, '') as string;
				const location = this.getNodeParameter('location', i, '') as string;
				const startUrlsText = this.getNodeParameter('startUrls', i, '') as string;
				const pages = this.getNodeParameter('pages', i, 1) as number;
				const onlyWithoutWebsite = this.getNodeParameter(
					'onlyWithoutWebsite',
					i,
					false,
				) as boolean;
				const exportFormat = this.getNodeParameter('exportFormat', i, 'default') as string;
				const enrichment = this.getNodeParameter('enrichment', i, {}) as {
					enrichWebsites?: boolean;
					enrichEmailGuesses?: boolean;
					enrichSocialUrls?: boolean;
					includeOutreachPitch?: boolean;
					enrichBrandAge?: boolean;
					enrichGeocode?: boolean;
					crawlSubpages?: boolean;
					verifyEmails?: boolean;
					extractOwnerName?: boolean;
				};
				const filters = this.getNodeParameter('filters', i, {}) as {
					excludeChains?: boolean;
					minLeadScore?: number;
					maxResults?: number;
				};
				const usesSearch = inputMode === 'search' || inputMode === 'both';
				const usesUrls = inputMode === 'urls' || inputMode === 'both';
				const startUrls = startUrlsText
					.split(/[\n,]+/)
					.map((url) => url.trim())
					.filter(Boolean);

				if (usesSearch && (!category || !category.trim())) {
					throw new NodeOperationError(this.getNode(), 'Business Category is required', {
						itemIndex: i,
					});
				}
				if (usesSearch && (!location || !location.trim())) {
					throw new NodeOperationError(this.getNode(), 'Location is required', {
						itemIndex: i,
					});
				}
				if (usesUrls && startUrls.length === 0) {
					throw new NodeOperationError(this.getNode(), 'At least one Website URL is required', {
						itemIndex: i,
					});
				}

				const body: Record<string, unknown> = {
					category: usesSearch ? category.trim() : '',
					location: usesSearch ? location.trim() : '',
					startUrls: usesUrls ? startUrls : [],
					pages,
					onlyWithoutWebsite,
					exportFormat,
					enrichWebsites: enrichment.enrichWebsites ?? true,
					enrichEmailGuesses: enrichment.enrichEmailGuesses ?? true,
					enrichSocialUrls: enrichment.enrichSocialUrls ?? true,
					includeOutreachPitch: enrichment.includeOutreachPitch ?? true,
					enrichBrandAge: enrichment.enrichBrandAge ?? true,
					enrichGeocode: enrichment.enrichGeocode ?? false,
					crawlSubpages: enrichment.crawlSubpages ?? true,
					verifyEmails: enrichment.verifyEmails ?? true,
					extractOwnerName: enrichment.extractOwnerName ?? true,
					excludeChains: filters.excludeChains ?? false,
					minLeadScore: filters.minLeadScore ?? 0,
					maxResults: filters.maxResults ?? 0,
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
