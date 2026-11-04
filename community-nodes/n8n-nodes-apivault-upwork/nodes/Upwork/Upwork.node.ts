import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'L66CMnYBZ3RnJb0gb';

export class Upwork implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Upwork Job Scraper",
  "name": "upwork",
  "icon": {
    "light": "file:upwork.svg",
    "dark": "file:upwork.svg"
  },
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Upwork Job Scraper"
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
  "defaultVersion": 2,
  "subtitle": "={{$parameter[\"apivaultMode\"]}}"
,
 properties: [...executionProperties, ...([
  {
    "displayName": "Search keyword",
    "name": "searchQuery",
    "description": "Keyword / phrase to search Upwork jobs for, e.g. \"python developer\", \"logo design\", \"shopify\". Leave empty to pull the latest jobs across all categories.",
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
    "displayName": "Sort by",
    "name": "sort",
    "description": "Order of jobs returned.",
    "type": "options",
    "options": [
      {
        "name": "Newest first",
        "value": "recency"
      },
      {
        "name": "Most relevant",
        "value": "relevance"
      }
    ],
    "default": "recency",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Max jobs to return",
    "name": "maxResults",
    "description": "Hard cap on how many jobs to return (and be charged for). Upwork paginates up to ~5000.",
    "type": "number",
    "default": 100,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 5000
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
    "displayName": "Max cost (USD)",
    "name": "maxCostUsd",
    "description": "Optional hard spending cap for this run. 0 = no cost cap (only maxResults applies).",
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
    "displayName": "Job type",
    "name": "jobType",
    "description": "Keep only hourly or only fixed-price jobs.",
    "type": "options",
    "options": [
      {
        "name": "Any",
        "value": ""
      },
      {
        "name": "Hourly",
        "value": "hourly"
      },
      {
        "name": "Fixed price",
        "value": "fixed"
      }
    ],
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
    "displayName": "Experience level",
    "name": "experienceLevel",
    "description": "Keep only jobs at this experience level.",
    "type": "options",
    "options": [
      {
        "name": "Any",
        "value": ""
      },
      {
        "name": "Entry",
        "value": "Entry"
      },
      {
        "name": "Intermediate",
        "value": "Intermediate"
      },
      {
        "name": "Expert",
        "value": "Expert"
      }
    ],
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
    "displayName": "Min budget",
    "name": "minBudget",
    "description": "Only jobs whose budget (fixed price, or max hourly rate) is at least this. Empty = no minimum.",
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
    "displayName": "Required skills",
    "name": "requiredSkills",
    "description": "Keep only jobs that list at least one of these skills, e.g. [\"React\", \"Django\"]. (comma or new-line separated)",
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
    "displayName": "Urgent jobs only",
    "name": "urgentOnly",
    "description": "Keep only jobs whose title/description signals urgency (urgent, asap, deadline\u2026).",
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
    "displayName": "Min opportunity score (0-100)",
    "name": "minOpportunityScore",
    "description": "Keep only jobs scoring at or above this (well-paid, well-specified, higher-tier jobs score higher). 0 = no filter.",
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
    "displayName": "Only new jobs since last run (incremental)",
    "name": "onlyNewJobs",
    "description": "Remember jobs seen in previous runs and return only jobs that are new since then. Run on a schedule to get a clean feed of fresh jobs with no repeats.",
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
    "displayName": "Flat output (for spreadsheets / n8n / Zapier)",
    "name": "flatOutput",
    "description": "Flatten list fields (skills) into single comma-joined columns for easy CSV / Sheets mapping.",
    "type": "boolean",
    "default": false,
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
				body["searchQuery"] = this.getNodeParameter("searchQuery", i);
				body["sort"] = this.getNodeParameter("sort", i);
				body["maxResults"] = this.getNodeParameter("maxResults", i);
				body["maxCostUsd"] = this.getNodeParameter("maxCostUsd", i);
				body["jobType"] = this.getNodeParameter("jobType", i);
				body["experienceLevel"] = this.getNodeParameter("experienceLevel", i);
				body["minBudget"] = this.getNodeParameter("minBudget", i);
				{ const _v = this.getNodeParameter("requiredSkills", i, '') as string; const _a = _v.split(/[,\n]/).map(s=>s.trim()).filter(s=>s.length>0); if (_a.length) body["requiredSkills"] = _a; }
				body["urgentOnly"] = this.getNodeParameter("urgentOnly", i);
				body["minOpportunityScore"] = this.getNodeParameter("minOpportunityScore", i);
				body["onlyNewJobs"] = this.getNodeParameter("onlyNewJobs", i);
				body["flatOutput"] = this.getNodeParameter("flatOutput", i);
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
