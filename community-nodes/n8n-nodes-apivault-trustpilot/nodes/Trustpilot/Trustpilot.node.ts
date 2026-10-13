import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = '1oi5wwO1HhVHXWqqw';


const list = (value: string): string[] => value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean);

export class Trustpilot implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Trustpilot Reviews & Ratings",
  "name": "trustpilot",
  "icon": {
    "light": "file:trustpilot.svg",
    "dark": "file:trustpilot.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Trustpilot Reviews Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Trustpilot Reviews & Ratings"
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
    "displayName": "Company URLs or Domains",
    "name": "startUrls",
    "type": "string",
    "typeOptions": {
      "rows": 4
    },
    "default": "",
    "description": "Actor input: Company URLs or Domains",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Company Names",
    "name": "searchTerms",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
    "default": "",
    "description": "Actor input: Company Names",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Content",
    "name": "contentMode",
    "type": "options",
    "options": [
      {
        "name": "Company Information and Reviews",
        "value": "companyInformationAndReviews"
      },
      {
        "name": "Reviews Only",
        "value": "reviews"
      },
      {
        "name": "Company Information Only",
        "value": "companyInformation"
      }
    ],
    "default": "companyInformationAndReviews",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Maximum Reviews per Company",
    "name": "maxReviews",
    "type": "number",
    "typeOptions": {
      "minValue": 0,
      "maxValue": 1000000
    },
    "default": 100,
    "description": "Actor input: Maximum Reviews per Company",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Date Range",
    "name": "dateRange",
    "type": "options",
    "options": [
      {
        "name": "All Time",
        "value": "all"
      },
      {
        "name": "Last 30 Days",
        "value": "last30days"
      },
      {
        "name": "Last 3 Months",
        "value": "last3months"
      },
      {
        "name": "Last 6 Months",
        "value": "last6months"
      },
      {
        "name": "Last 12 Months",
        "value": "last12months"
      }
    ],
    "default": "all",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Star Ratings",
    "name": "filterStars",
    "type": "multiOptions",
    "options": [
      {
        "name": "1 Star",
        "value": "1"
      },
      {
        "name": "2 Stars",
        "value": "2"
      },
      {
        "name": "3 Stars",
        "value": "3"
      },
      {
        "name": "4 Stars",
        "value": "4"
      },
      {
        "name": "5 Stars",
        "value": "5"
      }
    ],
    "default": [],
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Languages",
    "name": "filterLanguages",
    "type": "string",
    "default": "",
    "placeholder": "en, de, fr",
    "description": "Actor input: Languages",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Reviewer Countries",
    "name": "filterCountries",
    "type": "string",
    "default": "",
    "placeholder": "US, DE, GB",
    "description": "Actor input: Reviewer Countries",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Verified Reviews Only",
    "name": "verifiedOnly",
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
    "displayName": "Reviews With Company Replies Only",
    "name": "repliesOnly",
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
    "displayName": "Strict Company Name Match",
    "name": "strictNameMatch",
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
    "displayName": "Add Review Insights",
    "name": "includeReviewInsights",
    "type": "boolean",
    "default": true,
    "description": "Actor input: Add Review Insights",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Include Company Details",
    "name": "includeCompanyDetails",
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
    "displayName": "Compact Review Rows",
    "name": "compact",
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
    "displayName": "Sort Reviews",
    "name": "sortBy",
    "type": "options",
    "options": [
      {
        "name": "Auto (Most Recent)",
        "value": "auto"
      },
      {
        "name": "Most Recent",
        "value": "recency"
      },
      {
        "name": "Most Relevant",
        "value": "relevance"
      }
    ],
    "default": "auto",
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
const startUrls = list(this.getNodeParameter('startUrls', i, '') as string);
				const searchTerms = list(this.getNodeParameter('searchTerms', i, '') as string);
				if (!startUrls.length && !searchTerms.length) {
					throw new NodeOperationError(this.getNode(), 'Add at least one company URL, domain, or company name.', { itemIndex: i });
				}
				const body = {
					startUrls, searchTerms,
					contentMode: this.getNodeParameter('contentMode', i),
					maxReviews: this.getNodeParameter('maxReviews', i),
					dateRange: this.getNodeParameter('dateRange', i),
					filterStars: this.getNodeParameter('filterStars', i),
					filterLanguages: list(this.getNodeParameter('filterLanguages', i, '') as string),
					filterCountries: list(this.getNodeParameter('filterCountries', i, '') as string),
					verifiedOnly: this.getNodeParameter('verifiedOnly', i),
					repliesOnly: this.getNodeParameter('repliesOnly', i),
					strictNameMatch: this.getNodeParameter('strictNameMatch', i),
					includeReviewInsights: this.getNodeParameter('includeReviewInsights', i),
					includeCompanyDetails: this.getNodeParameter('includeCompanyDetails', i),
					compact: this.getNodeParameter('compact', i),
					sortBy: this.getNodeParameter('sortBy', i),
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
