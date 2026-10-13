import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'cytD40IlrpTS7L6uQ';

export class IndeedJobs implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Indeed Jobs Scraper",
  "name": "indeedJobs",
  "icon": {
    "light": "file:indeedjobs.svg",
    "dark": "file:indeedjobs.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Indeed Jobs Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Indeed Jobs Scraper"
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
    "displayName": "Job Keywords",
    "name": "keywords",
    "description": "Actor input: Job Keywords",
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
    "description": "Actor input: Location",
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
    "displayName": "Indeed Country Domain",
    "name": "country",
    "description": "Actor input: Indeed Country Domain",
    "type": "options",
    "options": [
      {
        "name": "US — indeed.com",
        "value": "www"
      },
      {
        "name": "UK — uk.indeed.com",
        "value": "uk"
      },
      {
        "name": "Canada — ca.indeed.com",
        "value": "ca"
      },
      {
        "name": "Australia — au.indeed.com",
        "value": "au"
      },
      {
        "name": "Germany — de.indeed.com",
        "value": "de"
      },
      {
        "name": "France — fr.indeed.com",
        "value": "fr"
      },
      {
        "name": "Italy — it.indeed.com",
        "value": "it"
      },
      {
        "name": "Spain — es.indeed.com",
        "value": "es"
      },
      {
        "name": "Netherlands — nl.indeed.com",
        "value": "nl"
      },
      {
        "name": "India — in.indeed.com",
        "value": "in"
      },
      {
        "name": "Singapore — sg.indeed.com",
        "value": "sg"
      }
    ],
    "default": "www",
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
    "description": "Actor input: Pages to scrape",
    "type": "number",
    "default": 3,
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
    "displayName": "Sort by",
    "name": "sortBy",
    "description": "Actor input: Sort by",
    "type": "options",
    "options": [
      {
        "name": "Relevance (default)",
        "value": "relevance"
      },
      {
        "name": "Date — newest first",
        "value": "date"
      }
    ],
    "default": "date",
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
    "description": "Actor input: Job Title",
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
    "description": "Actor input: Company Name",
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
    "description": "Actor input: Job Location",
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
    "displayName": "Salary",
    "name": "extractSalary",
    "description": "Actor input: Salary",
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
    "description": "Actor input: Job Type",
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
    "description": "Actor input: Description Snippet",
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
    "description": "Actor input: Posted Date",
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
    "description": "Actor input: Company Rating",
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
    "description": "Actor input: Keep only one job per company",
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
    "default": 1,
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
    "description": "Actor input: Timeout per page (seconds)",
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
    "displayName": "Retries on transient failure",
    "name": "maxRetries",
    "description": "Actor input: Retries on transient failure",
    "type": "number",
    "default": 4,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 6
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
				body["country"] = this.getNodeParameter("country", i);
				body["maxPages"] = this.getNodeParameter("maxPages", i);
				body["sortBy"] = this.getNodeParameter("sortBy", i);
				body["extractTitle"] = this.getNodeParameter("extractTitle", i);
				body["extractCompany"] = this.getNodeParameter("extractCompany", i);
				body["extractLocation"] = this.getNodeParameter("extractLocation", i);
				body["extractSalary"] = this.getNodeParameter("extractSalary", i);
				body["extractJobType"] = this.getNodeParameter("extractJobType", i);
				body["extractDescription"] = this.getNodeParameter("extractDescription", i);
				body["extractDate"] = this.getNodeParameter("extractDate", i);
				body["extractRating"] = this.getNodeParameter("extractRating", i);
				body["deduplicateCompanies"] = this.getNodeParameter("deduplicateCompanies", i);
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
