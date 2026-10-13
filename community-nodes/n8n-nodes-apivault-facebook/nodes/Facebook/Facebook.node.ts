import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'NZ2v1fqLfaN2UBYIx';


const splitList = (raw: string): string[] =>

			(raw || '')

				.split(/[\n,]+/)

				.map((s) => s.trim())

				.filter((s) => s.length > 0);

export class Facebook implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Facebook Profile & Posts Scraper",
  "name": "facebook",
  "icon": {
    "light": "file:facebook.svg",
    "dark": "file:facebook.svg"
  },
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "subtitle": "={{$parameter[\"mode\"]}}",
  "description": "Run Facebook Profile & Posts Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Facebook Profile & Posts Scraper"
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
    "type": "options",
    "options": [
      {
        "name": "Profiles / Pages",
        "value": "profiles"
      },
      {
        "name": "Profiles / Pages + Recent Posts",
        "value": "profilesAndPosts"
      },
      {
        "name": "Search by Keyword",
        "value": "search"
      }
    ],
    "default": "profiles",
    "description": "Actor input: Mode",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Facebook Profile / Page URLs",
    "name": "profileUrls",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
    "default": "",
    "placeholder": "https://www.facebook.com/NASA",
    "description": "Actor input: Facebook Profile / Page URLs",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Search Keywords",
    "name": "searchKeywords",
    "type": "string",
    "typeOptions": {
      "rows": 2
    },
    "default": "",
    "placeholder": "pizza restaurant chicago",
    "description": "Actor input: Search Keywords",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Search Location",
    "name": "searchLocation",
    "type": "string",
    "default": "",
    "placeholder": "New York",
    "description": "Actor input: Search Location",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Posts",
    "name": "postOptions",
    "type": "collection",
    "placeholder": "Add Posts Option",
    "default": {},
    "options": [
      {
        "displayName": "Also Scrape Recent Posts",
        "name": "scrapePosts",
        "type": "boolean",
        "default": false,
        "description": "Whether to also pull recent public posts (text, permalink, publication time, reactions, comments and shares when exposed). Emitted as extra rows with type=post. Billed per post."
      },
      {
        "displayName": "Max Posts per Page",
        "name": "maxPosts",
        "type": "number",
        "typeOptions": {
          "minValue": 1,
          "maxValue": 500
        },
        "default": 25,
        "description": "Cap on posts saved per page when scraping posts is on"
      },
      {
        "displayName": "Posts From Date",
        "name": "postsSince",
        "type": "dateTime",
        "default": "",
        "description": "Inclusive start date for posts. Takes precedence over the relative-days filter."
      },
      {
        "displayName": "Posts Until Date",
        "name": "postsUntil",
        "type": "dateTime",
        "default": "",
        "description": "Inclusive end date for posts"
      },
      {
        "displayName": "Posts: Only Last N Days",
        "name": "sinceDays",
        "type": "number",
        "typeOptions": {
          "minValue": 0,
          "maxValue": 3650
        },
        "default": 0,
        "description": "Keep only posts created within the last N days. 0 = no date filter."
      },
      {
        "displayName": "Posts: Keyword Filter",
        "name": "postKeyword",
        "type": "string",
        "default": "",
        "description": "Keep only posts whose text contains this keyword (case-insensitive)"
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
    "displayName": "Contact Enrichment",
    "name": "contactOptions",
    "type": "collection",
    "placeholder": "Add Contact Option",
    "default": {},
    "options": [
      {
        "displayName": "Find Emails via Website Fallback",
        "name": "enrichEmailViaGoogle",
        "type": "boolean",
        "default": true,
        "description": "Whether to visit the page's linked website and extract an email when the Facebook page exposes none"
      },
      {
        "displayName": "Email Domain Filter",
        "name": "emailDomains",
        "type": "string",
        "default": "",
        "placeholder": "gmail.com, yourcompany.com",
        "description": "Keep only emails on these domains. Separate multiple with a comma. Empty = keep all emails."
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
const profileUrls = splitList(this.getNodeParameter('profileUrls', i, '') as string);
				const searchKeywords = splitList(this.getNodeParameter('searchKeywords', i, '') as string);
				const searchLocation = (this.getNodeParameter('searchLocation', i, '') as string).trim();
				const mode = this.getNodeParameter('mode', i, 'profiles') as string;

				if (profileUrls.length === 0 && searchKeywords.length === 0) {
					throw new NodeOperationError(
						this.getNode(),
						'Provide at least one Facebook profile/page URL or a search keyword',
						{ itemIndex: i },
					);
				}

				const postOptions = this.getNodeParameter('postOptions', i, {}) as {
					scrapePosts?: boolean;
					maxPosts?: number;
					postsSince?: string;
					postsUntil?: string;
					sinceDays?: number;
					postKeyword?: string;
				};
				const contactOptions = this.getNodeParameter('contactOptions', i, {}) as {
					enrichEmailViaGoogle?: boolean;
					emailDomains?: string;
				};
				const body: Record<string, unknown> = {
					mode,
					enrichEmailViaGoogle: contactOptions.enrichEmailViaGoogle ?? true,
					scrapePosts: mode === 'profilesAndPosts' || (postOptions.scrapePosts ?? false),
				};

				if (profileUrls.length > 0) body.profileUrls = profileUrls;
				if (searchKeywords.length > 0) {
					body.searchKeywords = searchKeywords;
					if (searchLocation) body.searchLocation = searchLocation;
				}

				if (body.scrapePosts) {
					body.maxPosts = postOptions.maxPosts ?? 25;
					if (postOptions.postsSince) body.postsSince = postOptions.postsSince;
					if (postOptions.postsUntil) body.postsUntil = postOptions.postsUntil;
					if (!postOptions.postsSince && postOptions.sinceDays) body.sinceDays = postOptions.sinceDays;
					if (postOptions.postKeyword) body.postKeyword = postOptions.postKeyword.trim();
				}

				const emailDomains = splitList(contactOptions.emailDomains ?? '');
				if (emailDomains.length > 0) body.emailDomains = emailDomains;
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
