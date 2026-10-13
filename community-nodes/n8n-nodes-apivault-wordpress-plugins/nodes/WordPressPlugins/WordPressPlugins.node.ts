import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'jT2Ip0J6yjDrefsUd';

export class WordPressPlugins implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "WordPress Plugins Scraper",
  "name": "wordpressPlugins",
  "icon": {
    "light": "file:wordpressplugins.svg",
    "dark": "file:wordpressplugins.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run WordPress Plugins Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "WordPress Plugins Scraper"
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
    "displayName": "Mode",
    "name": "mode",
    "description": "Actor input: Mode",
    "type": "options",
    "options": [
      {
        "name": "Search — keyword query",
        "value": "search"
      },
      {
        "name": "Browse — popular/new/featured/updated",
        "value": "browse"
      },
      {
        "name": "Tag — plugins by tag slug",
        "value": "tag"
      },
      {
        "name": "Author — plugins by WP.org author username",
        "value": "author"
      },
      {
        "name": "Slugs — fetch exact plugin slugs",
        "value": "slugs"
      }
    ],
    "default": "browse",
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
    "displayName": "Query",
    "name": "query",
    "description": "Actor input: Query",
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
    "displayName": "Browse category",
    "name": "browseBy",
    "description": "Actor input: Browse category",
    "type": "options",
    "options": [
      {
        "name": "Popular — by install count",
        "value": "popular"
      },
      {
        "name": "New — recently added plugins",
        "value": "new"
      },
      {
        "name": "Updated — recently updated",
        "value": "updated"
      },
      {
        "name": "Featured — curated by WordPress.org",
        "value": "featured"
      }
    ],
    "default": "popular",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Plugin slugs",
    "name": "slugs",
    "description": "Actor input: Plugin slugs",
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
    "displayName": "Max plugins to fetch",
    "name": "maxResults",
    "description": "Actor input: Max plugins to fetch",
    "type": "number",
    "default": 250,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 10000
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
    "displayName": "Fetch full details per plugin",
    "name": "fullDetails",
    "description": "Actor input: Fetch full details per plugin",
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
    "displayName": "Active Installs",
    "name": "extractInstalls",
    "description": "Actor input: Active Installs",
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
    "displayName": "Rating",
    "name": "extractRating",
    "description": "Actor input: Rating",
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
    "displayName": "Author",
    "name": "extractAuthor",
    "description": "Actor input: Author",
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
    "displayName": "Version & Compatibility",
    "name": "extractVersion",
    "description": "Actor input: Version & Compatibility",
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
    "displayName": "Dates",
    "name": "extractDates",
    "description": "Actor input: Dates",
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
    "displayName": "Tags",
    "name": "extractTags",
    "description": "Actor input: Tags",
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
    "displayName": "Support Stats",
    "name": "extractSupport",
    "description": "Actor input: Support Stats",
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
    "displayName": "Download Link & Icon",
    "name": "extractDownloadLink",
    "description": "Actor input: Download Link & Icon",
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
    "displayName": "Contributors (fullDetails only)",
    "name": "extractContributors",
    "description": "Actor input: Contributors (fullDetails only)",
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
    "displayName": "Ratings Histogram (fullDetails only)",
    "name": "extractRatingsHistogram",
    "description": "Actor input: Ratings Histogram (fullDetails only)",
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
    "default": 5,
    "typeOptions": {
      "minValue": 1,
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
    "displayName": "Timeout (seconds)",
    "name": "timeout",
    "description": "Actor input: Timeout (seconds)",
    "type": "number",
    "default": 30,
    "typeOptions": {
      "minValue": 5,
      "maxValue": 120
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
				body["mode"] = this.getNodeParameter("mode", i);
				body["query"] = this.getNodeParameter("query", i);
				body["browseBy"] = this.getNodeParameter("browseBy", i);
				{ const _v = this.getNodeParameter("slugs", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["slugs"] = _a; }
				body["maxResults"] = this.getNodeParameter("maxResults", i);
				body["fullDetails"] = this.getNodeParameter("fullDetails", i);
				body["extractInstalls"] = this.getNodeParameter("extractInstalls", i);
				body["extractRating"] = this.getNodeParameter("extractRating", i);
				body["extractAuthor"] = this.getNodeParameter("extractAuthor", i);
				body["extractVersion"] = this.getNodeParameter("extractVersion", i);
				body["extractDates"] = this.getNodeParameter("extractDates", i);
				body["extractTags"] = this.getNodeParameter("extractTags", i);
				body["extractSupport"] = this.getNodeParameter("extractSupport", i);
				body["extractDownloadLink"] = this.getNodeParameter("extractDownloadLink", i);
				body["extractContributors"] = this.getNodeParameter("extractContributors", i);
				body["extractRatingsHistogram"] = this.getNodeParameter("extractRatingsHistogram", i);
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
