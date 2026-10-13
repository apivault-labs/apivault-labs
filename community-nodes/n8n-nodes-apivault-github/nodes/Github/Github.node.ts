import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'HCPOl6k3LqnOVdFns';

export class Github implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "GitHub Profile Scraper & Lead Finder",
  "name": "github",
  "icon": {
    "light": "file:github.svg",
    "dark": "file:github.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run GitHub Profile Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "GitHub Profile Scraper & Lead Finder"
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
    "displayName": "GitHub Profile URLs or Usernames",
    "name": "profileUrls",
    "description": "Actor input: GitHub Profile URLs or Usernames",
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
    "displayName": "Repo URLs → extract stargazers / forkers as leads",
    "name": "repoUrls",
    "description": "Actor input: Repo URLs → extract stargazers / forkers as leads",
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
    "displayName": "Lead source (for Repo URLs)",
    "name": "repoLeadsSource",
    "description": "Actor input: Lead source (for Repo URLs)",
    "type": "options",
    "options": [
      {
        "name": "Stargazers (starred the repo)",
        "value": "stargazers"
      },
      {
        "name": "Forkers (forked the repo)",
        "value": "forkers"
      }
    ],
    "default": "stargazers",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Max leads per repo",
    "name": "maxLeadsPerRepo",
    "description": "Actor input: Max leads per repo",
    "type": "number",
    "default": 50,
    "typeOptions": {
      "minValue": 1,
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
    "displayName": "Aggregate repositories (stars, languages, top repo)",
    "name": "extractRepos",
    "description": "Actor input: Aggregate repositories (stars, languages, top repo)",
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
    "displayName": "Include full repository list",
    "name": "includeRepoList",
    "description": "Actor input: Include full repository list",
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
    "displayName": "Max repos per user",
    "name": "maxRepos",
    "description": "Actor input: Max repos per user",
    "type": "number",
    "default": 100,
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
    "displayName": "Bytes-weighted language % stats",
    "name": "includeLanguageStats",
    "description": "Actor input: Bytes-weighted language % stats",
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
    "displayName": "Social accounts (LinkedIn / X / YouTube / Mastodon …)",
    "name": "includeSocialAccounts",
    "description": "Actor input: Social accounts (LinkedIn / X / YouTube / Mastodon …)",
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
    "displayName": "Organizations",
    "name": "includeOrganizations",
    "description": "Actor input: Organizations",
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
    "displayName": "Starred repositories",
    "name": "includeStarred",
    "description": "Actor input: Starred repositories",
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
    "displayName": "Max starred repos",
    "name": "maxStarred",
    "description": "Actor input: Max starred repos",
    "type": "number",
    "default": 30,
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
    "displayName": "Profile README",
    "name": "includeReadme",
    "description": "Actor input: Profile README",
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
    "displayName": "Achievements & highlights (badges)",
    "name": "includeAchievements",
    "description": "Actor input: Achievements & highlights (badges)",
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
    "displayName": "Pinned repositories",
    "name": "includePinnedRepos",
    "description": "Actor input: Pinned repositories",
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
    "displayName": "Contributions in the last year",
    "name": "includeContributions",
    "description": "Actor input: Contributions in the last year",
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
    "displayName": "Export format",
    "name": "exportFormat",
    "description": "Actor input: Export format",
    "type": "options",
    "options": [
      {
        "name": "Default JSON (all fields)",
        "value": "default"
      },
      {
        "name": "CSV (flat, sales-ready)",
        "value": "csv"
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
    "displayName": "Lead score + tier",
    "name": "includeLeadScore",
    "description": "Actor input: Lead score + tier",
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
    "displayName": "Outreach helpers (icebreaker + best contact)",
    "name": "includeOutreach",
    "description": "Actor input: Outreach helpers (icebreaker + best contact)",
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
    "displayName": "Minimum followers",
    "name": "minFollowers",
    "description": "Actor input: Minimum followers",
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
    "displayName": "Minimum public repos",
    "name": "minRepos",
    "description": "Actor input: Minimum public repos",
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
    "displayName": "Minimum total stars",
    "name": "minStars",
    "description": "Actor input: Minimum total stars",
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
    "displayName": "Only hireable (open to work)",
    "name": "hireableOnly",
    "description": "Actor input: Only hireable (open to work)",
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
    "displayName": "Only profiles with a public email",
    "name": "withEmailOnly",
    "description": "Actor input: Only profiles with a public email",
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
    "displayName": "GitHub token (optional)",
    "name": "githubToken",
    "description": "Actor input: GitHub token (optional)",
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
    "displayName": "Max parallel requests",
    "name": "maxConcurrency",
    "description": "Actor input: Max parallel requests",
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
    "displayName": "Timeout per request (seconds)",
    "name": "timeout",
    "description": "Actor input: Timeout per request (seconds)",
    "type": "number",
    "default": 30,
    "typeOptions": {
      "minValue": 10,
      "maxValue": 120
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
    "displayName": "Retries on rate limit / error",
    "name": "maxRetries",
    "description": "Actor input: Retries on rate limit / error",
    "type": "number",
    "default": 2,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 4
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
				{ const _v = this.getNodeParameter("profileUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["profileUrls"] = _a; }
				{ const _v = this.getNodeParameter("repoUrls", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["repoUrls"] = _a; }
				body["repoLeadsSource"] = this.getNodeParameter("repoLeadsSource", i);
				body["maxLeadsPerRepo"] = this.getNodeParameter("maxLeadsPerRepo", i);
				body["extractRepos"] = this.getNodeParameter("extractRepos", i);
				body["includeRepoList"] = this.getNodeParameter("includeRepoList", i);
				body["maxRepos"] = this.getNodeParameter("maxRepos", i);
				body["includeLanguageStats"] = this.getNodeParameter("includeLanguageStats", i);
				body["includeSocialAccounts"] = this.getNodeParameter("includeSocialAccounts", i);
				body["includeOrganizations"] = this.getNodeParameter("includeOrganizations", i);
				body["includeStarred"] = this.getNodeParameter("includeStarred", i);
				body["maxStarred"] = this.getNodeParameter("maxStarred", i);
				body["includeReadme"] = this.getNodeParameter("includeReadme", i);
				body["includeAchievements"] = this.getNodeParameter("includeAchievements", i);
				body["includePinnedRepos"] = this.getNodeParameter("includePinnedRepos", i);
				body["includeContributions"] = this.getNodeParameter("includeContributions", i);
				body["exportFormat"] = this.getNodeParameter("exportFormat", i);
				body["includeLeadScore"] = this.getNodeParameter("includeLeadScore", i);
				body["includeOutreach"] = this.getNodeParameter("includeOutreach", i);
				body["minLeadScore"] = this.getNodeParameter("minLeadScore", i);
				body["minFollowers"] = this.getNodeParameter("minFollowers", i);
				body["minRepos"] = this.getNodeParameter("minRepos", i);
				body["minStars"] = this.getNodeParameter("minStars", i);
				body["hireableOnly"] = this.getNodeParameter("hireableOnly", i);
				body["withEmailOnly"] = this.getNodeParameter("withEmailOnly", i);
				body["githubToken"] = this.getNodeParameter("githubToken", i);
				body["maxConcurrency"] = this.getNodeParameter("maxConcurrency", i);
				body["timeout"] = this.getNodeParameter("timeout", i);
				body["maxRetries"] = this.getNodeParameter("maxRetries", i);
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
