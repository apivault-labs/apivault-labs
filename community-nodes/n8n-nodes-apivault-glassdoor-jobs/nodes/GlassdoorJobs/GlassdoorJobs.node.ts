import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'KnFPYISvHrDkYyD6L';

export class GlassdoorJobs implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Glassdoor Jobs Scraper",
  "name": "glassdoorJobs",
  "icon": {
    "light": "file:glassdoorjobs.svg",
    "dark": "file:glassdoorjobs.svg"
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
    "name": "Glassdoor Jobs Scraper"
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
    "displayName": "Job Keywords",
    "name": "keywords",
    "description": "Job title or keywords. Examples: 'software engineer', 'product manager'.",
    "type": "string",
    "default": "",
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
    "displayName": "Location",
    "name": "location",
    "description": "City, state, country or 'Remote'.",
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
    "displayName": "Pages to scrape",
    "name": "maxPages",
    "description": "Number of result pages (each ~20-30 jobs).",
    "type": "number",
    "default": 3,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 15
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
    "displayName": "Job Title",
    "name": "extractTitle",
    "description": "Extract job title",
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
    "displayName": "Company Name",
    "name": "extractCompany",
    "description": "Extract hiring company",
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
    "displayName": "Job Location",
    "name": "extractLocation",
    "description": "Extract job location",
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
    "displayName": "Salary Estimate",
    "name": "extractSalary",
    "description": "Extract Glassdoor salary estimate",
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
    "displayName": "Company Rating",
    "name": "extractRating",
    "description": "Extract Glassdoor company rating",
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
    "displayName": "Job Type",
    "name": "extractJobType",
    "description": "Extract job type / employment type",
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
    "displayName": "Posted Date",
    "name": "extractDate",
    "description": "Extract when posted",
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
    "displayName": "Description Snippet",
    "name": "extractDescription",
    "description": "Extract job description / summary",
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
    "displayName": "Keep only one job per company",
    "name": "deduplicateCompanies",
    "description": "If enabled, only the first job from each unique company is kept.",
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
    "description": "Parallel page scrapes",
    "type": "number",
    "default": 2,
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
    "displayName": "Timeout per page (seconds)",
    "name": "timeout",
    "description": "Max wait per Glassdoor page",
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
  }
] as INodeProperties[])]
};

 async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
  const output: INodeExecutionData[] = [];
  for (let i = 0; i < this.getInputData().length; i++) {
   try {
    const body: Record<string, unknown> = this.getNodeParameter('apivaultMode', i, 'run') === 'read' ? {} : (() => {
const body: Record<string, unknown> = {};
				body["keywords"] = this.getNodeParameter("keywords", i);
				body["location"] = this.getNodeParameter("location", i);
				body["maxPages"] = this.getNodeParameter("maxPages", i);
				body["extractTitle"] = this.getNodeParameter("extractTitle", i);
				body["extractCompany"] = this.getNodeParameter("extractCompany", i);
				body["extractLocation"] = this.getNodeParameter("extractLocation", i);
				body["extractSalary"] = this.getNodeParameter("extractSalary", i);
				body["extractRating"] = this.getNodeParameter("extractRating", i);
				body["extractJobType"] = this.getNodeParameter("extractJobType", i);
				body["extractDate"] = this.getNodeParameter("extractDate", i);
				body["extractDescription"] = this.getNodeParameter("extractDescription", i);
				body["deduplicateCompanies"] = this.getNodeParameter("deduplicateCompanies", i);
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
