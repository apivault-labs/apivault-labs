import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'qNLn4Fof28aCF0R9K';

export class AppDeveloperLeads implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "App Developer Leads",
  "name": "appDeveloperLeads",
  "icon": {
    "light": "file:appdeveloperleads.svg",
    "dark": "file:appdeveloperleads.svg"
  },
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "subtitle": "={{$parameter[\"store\"]}} · {{$parameter[\"tier\"]}}",
  "description": "Run App Developer Leads through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "App Developer Leads"
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
    "displayName": "Store",
    "name": "store",
    "type": "options",
    "options": [
      {
        "name": "Google Play (most emails)",
        "value": "googleplay"
      },
      {
        "name": "Apple App Store",
        "value": "appstore"
      },
      {
        "name": "Chrome Web Store (extensions)",
        "value": "chrome"
      },
      {
        "name": "Firefox Add-ons",
        "value": "firefox"
      },
      {
        "name": "Microsoft Store (Windows apps)",
        "value": "msstore"
      },
      {
        "name": "VS Code Marketplace (dev tools)",
        "value": "vscode"
      },
      {
        "name": "Both mobile stores (Play + App Store)",
        "value": "both"
      },
      {
        "name": "All stores",
        "value": "all"
      }
    ],
    "default": "googleplay",
    "description": "Actor input: Store",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Keywords",
    "name": "keywords",
    "type": "string",
    "default": "",
    "required": true,
    "placeholder": "meditation, habit tracker, crm",
    "description": "Actor input: Keywords",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Apps per Keyword",
    "name": "maxAppsPerQuery",
    "type": "number",
    "typeOptions": {
      "minValue": 1,
      "maxValue": 10000
    },
    "default": 50,
    "description": "Actor input: Apps per Keyword",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Plan",
    "name": "tier",
    "type": "options",
    "options": [
      {
        "name": "Basic — $4 / 1,000",
        "value": "basic"
      },
      {
        "name": "Premium — $8 / 1,000 (tech stack, socials, more emails)",
        "value": "premium"
      }
    ],
    "default": "basic",
    "description": "Actor input: Plan",
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
        "displayName": "Country",
        "name": "country",
        "type": "string",
        "default": "us",
        "description": "Two-letter store country code (us, gb, de, …)"
      },
      {
        "displayName": "Min Installs (Google Play)",
        "name": "minInstalls",
        "type": "number",
        "typeOptions": {
          "minValue": 0
        },
        "default": 0,
        "description": "Keep only apps with at least this many installs (0 = no limit)"
      },
      {
        "displayName": "Min Rating",
        "name": "minRating",
        "type": "number",
        "typeOptions": {
          "minValue": 0,
          "maxValue": 5
        },
        "default": 0,
        "description": "Keep only apps rated at least this (0-5, 0 = no limit)"
      },
      {
        "displayName": "Company Size",
        "name": "companySize",
        "type": "options",
        "options": [
          {
            "name": "Any size",
            "value": "any"
          },
          {
            "name": "Indie (small, <100K installs)",
            "value": "indie"
          },
          {
            "name": "Large (1M+ installs)",
            "value": "large"
          }
        ],
        "default": "any",
        "description": "Filter by developer size (based on install volume)"
      },
      {
        "displayName": "Only Apps With an Email",
        "name": "requireEmail",
        "type": "boolean",
        "default": false,
        "description": "Whether to skip apps where no email was found (skipped apps are not charged)"
      },
      {
        "displayName": "Only Apps Without a Website",
        "name": "onlyWithoutWebsite",
        "type": "boolean",
        "default": false,
        "description": "Whether to keep only makers with no website (great if you sell web design/development)"
      },
      {
        "displayName": "Only Actively-Maintained Apps",
        "name": "onlyActiveApps",
        "type": "boolean",
        "default": false,
        "description": "Whether to skip abandoned apps (not updated in ~18+ months). Active developers reply more."
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
    "displayName": "Additional Options",
    "name": "additionalOptions",
    "type": "collection",
    "placeholder": "Add Option",
    "default": {},
    "options": [
      {
        "displayName": "One Row per Company",
        "name": "dedupeByCompany",
        "type": "boolean",
        "default": true,
        "description": "Whether to show each company once with its apps grouped (off = one row per app)"
      },
      {
        "displayName": "Add Outreach Opening Line",
        "name": "addIcebreaker",
        "type": "boolean",
        "default": false,
        "description": "Whether to generate a personalized cold-email opener per lead (no AI key needed)"
      },
      {
        "displayName": "Verify Email Domain (MX)",
        "name": "verifyEmail",
        "type": "boolean",
        "default": false,
        "description": "Whether to check that the email domain can receive mail (DNS MX, no email sent)"
      },
      {
        "displayName": "Find More Emails on Website",
        "name": "includeWebsiteEmails",
        "type": "boolean",
        "default": false,
        "description": "Whether to visit each company website to find extra emails (slower)"
      },
      {
        "displayName": "Detect Website Tech Stack",
        "name": "detectTech",
        "type": "boolean",
        "default": false,
        "description": "Whether to detect tools the website uses (Shopify, WordPress, Stripe, …). Slower."
      },
      {
        "displayName": "Max Concurrency",
        "name": "maxConcurrency",
        "type": "number",
        "typeOptions": {
          "minValue": 1,
          "maxValue": 15
        },
        "default": 8,
        "description": "Parallel requests (higher = faster but hits the stores harder)"
      },
      {
        "displayName": "Max Run Time (Seconds)",
        "name": "runBudgetSecs",
        "type": "number",
        "typeOptions": {
          "minValue": 0,
          "maxValue": 3600
        },
        "default": 600,
        "description": "Safety cap for the whole run (0 = disable). Returns what it has when reached."
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
const store = this.getNodeParameter('store', i) as string;
				const rawKeywords = this.getNodeParameter('keywords', i) as string;
				const maxAppsPerQuery = this.getNodeParameter('maxAppsPerQuery', i) as number;
				const tier = this.getNodeParameter('tier', i) as string;
				const filters = this.getNodeParameter('filters', i, {}) as {
					country?: string;
					minInstalls?: number;
					minRating?: number;
					companySize?: string;
					requireEmail?: boolean;
					onlyWithoutWebsite?: boolean;
					onlyActiveApps?: boolean;
				};
				const extra = this.getNodeParameter('additionalOptions', i, {}) as {
					dedupeByCompany?: boolean;
					addIcebreaker?: boolean;
					verifyEmail?: boolean;
					includeWebsiteEmails?: boolean;
					detectTech?: boolean;
					maxConcurrency?: number;
					runBudgetSecs?: number;
				};

				const keywords = rawKeywords
					.split(/[,\n]/)
					.map((k) => k.trim())
					.filter((k) => k.length > 0);

				if (keywords.length === 0) {
					throw new NodeOperationError(this.getNode(), 'No keywords provided', { itemIndex: i });
				}

				const body: Record<string, unknown> = {
					store,
					keywords,
					maxAppsPerQuery,
					tier,
					country: filters.country ?? 'us',
					minInstalls: filters.minInstalls ?? 0,
					minRating: filters.minRating ?? 0,
					companySize: filters.companySize ?? 'any',
					requireEmail: filters.requireEmail ?? false,
					onlyWithoutWebsite: filters.onlyWithoutWebsite ?? false,
					onlyActiveApps: filters.onlyActiveApps ?? false,
					dedupeByCompany: extra.dedupeByCompany ?? true,
					addIcebreaker: extra.addIcebreaker ?? false,
					verifyEmail: extra.verifyEmail ?? false,
					includeWebsiteEmails: extra.includeWebsiteEmails ?? false,
					detectTech: extra.detectTech ?? false,
					maxConcurrency: extra.maxConcurrency ?? 8,
					runBudgetSecs: extra.runBudgetSecs ?? 600,
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
