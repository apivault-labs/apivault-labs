import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'fp5fUghbnf2ou9DSP';

export class LinkedinJobs implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "LinkedIn Jobs Scraper",
  "name": "linkedinJobs",
  "icon": {
    "light": "file:linkedinjobs.svg",
    "dark": "file:linkedinjobs.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run LinkedIn Jobs Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "LinkedIn Jobs Scraper"
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
    "displayName": "Pages to scrape",
    "name": "maxPages",
    "description": "Actor input: Pages to scrape",
    "type": "number",
    "default": 5,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 40
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
    "displayName": "Remote-only (LinkedIn filter)",
    "name": "remote",
    "description": "Actor input: Remote-only (LinkedIn filter)",
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
    "displayName": "Experience Level",
    "name": "experienceLevel",
    "description": "Actor input: Experience Level",
    "type": "options",
    "options": [
      {
        "name": "Any (default)",
        "value": "any"
      },
      {
        "name": "Internship",
        "value": "internship"
      },
      {
        "name": "Entry level",
        "value": "entry"
      },
      {
        "name": "Associate",
        "value": "associate"
      },
      {
        "name": "Mid-Senior level",
        "value": "mid_senior"
      },
      {
        "name": "Director",
        "value": "director"
      },
      {
        "name": "Executive",
        "value": "executive"
      }
    ],
    "default": "any",
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
    "name": "jobType",
    "description": "Actor input: Job Type",
    "type": "options",
    "options": [
      {
        "name": "Any (default)",
        "value": "any"
      },
      {
        "name": "Full-time",
        "value": "full_time"
      },
      {
        "name": "Part-time",
        "value": "part_time"
      },
      {
        "name": "Contract",
        "value": "contract"
      },
      {
        "name": "Temporary",
        "value": "temporary"
      },
      {
        "name": "Volunteer",
        "value": "volunteer"
      },
      {
        "name": "Internship",
        "value": "internship"
      }
    ],
    "default": "any",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Posted within",
    "name": "postedWithin",
    "description": "Actor input: Posted within",
    "type": "options",
    "options": [
      {
        "name": "Any time (default)",
        "value": "any"
      },
      {
        "name": "Past 24 hours",
        "value": "day"
      },
      {
        "name": "Past week",
        "value": "week"
      },
      {
        "name": "Past month",
        "value": "month"
      }
    ],
    "default": "any",
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
    "displayName": "Company Logo",
    "name": "extractCompanyLogo",
    "description": "Actor input: Company Logo",
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
    "displayName": "Salary (raw)",
    "name": "extractSalary",
    "description": "Actor input: Salary (raw)",
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
    "displayName": "Salary parser → USD",
    "name": "extractSalaryParse",
    "description": "Actor input: Salary parser → USD",
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
    "displayName": "Job freshness",
    "name": "extractFreshness",
    "description": "Actor input: Job freshness",
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
    "displayName": "Work mode classifier",
    "name": "extractWorkMode",
    "description": "Actor input: Work mode classifier",
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
    "displayName": "Skills extraction",
    "name": "extractSkills",
    "description": "Actor input: Skills extraction",
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
    "displayName": "Benefits parser",
    "name": "extractBenefits",
    "description": "Actor input: Benefits parser",
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
    "displayName": "Seniority normalizer",
    "name": "extractSeniority",
    "description": "Actor input: Seniority normalizer",
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
    "displayName": "Job category auto-detect",
    "name": "extractCategory",
    "description": "Actor input: Job category auto-detect",
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
    "displayName": "recruiterScore (B2B prospecting)",
    "name": "extractRecruiterScore",
    "description": "Actor input: recruiterScore (B2B prospecting)",
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
    "displayName": "Outreach assets",
    "name": "extractOutreachAssets",
    "description": "Actor input: Outreach assets",
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
    "displayName": "Diversity / DEI signals",
    "name": "extractDeiSignals",
    "description": "Actor input: Diversity / DEI signals",
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
    "displayName": "Pay transparency law detection",
    "name": "extractPayTransparencyLaw",
    "description": "Actor input: Pay transparency law detection",
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
    "displayName": "Parse location into city/state/country",
    "name": "extractLocationParts",
    "description": "Actor input: Parse location into city/state/country",
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
    "displayName": "Deep-fetch every job (full description + salary)",
    "name": "deepFetchAll",
    "description": "Actor input: Deep-fetch every job (full description + salary)",
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
    "displayName": "Deep-fetch top N companies (legacy)",
    "name": "deepFetchTopN",
    "description": "Actor input: Deep-fetch top N companies (legacy)",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 25
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
    "displayName": "Min recruiterScore filter",
    "name": "minRecruiterScore",
    "description": "Actor input: Min recruiterScore filter",
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
    "displayName": "Only jobs with disclosed salary",
    "name": "onlyWithSalary",
    "description": "Actor input: Only jobs with disclosed salary",
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
    "displayName": "Only fully-remote jobs",
    "name": "onlyRemote",
    "description": "Actor input: Only fully-remote jobs",
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
        "name": "CSV (flattened, sales-ready)",
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
    "displayName": "Write SUMMARY + TOP_HIRING_COMPANIES + TOP_JOBS to KV store",
    "name": "writeSummary",
    "description": "Actor input: Write SUMMARY + TOP_HIRING_COMPANIES + TOP_JOBS to KV store",
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
    "displayName": "TOP_HIRING_COMPANIES size",
    "name": "topCompaniesN",
    "description": "Actor input: TOP_HIRING_COMPANIES size",
    "type": "number",
    "default": 20,
    "typeOptions": {
      "minValue": 5,
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
    "displayName": "TOP_JOBS size",
    "name": "topJobsN",
    "description": "Actor input: TOP_JOBS size",
    "type": "number",
    "default": 20,
    "typeOptions": {
      "minValue": 5,
      "maxValue": 100
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
				body["remote"] = this.getNodeParameter("remote", i);
				body["experienceLevel"] = this.getNodeParameter("experienceLevel", i);
				body["jobType"] = this.getNodeParameter("jobType", i);
				body["postedWithin"] = this.getNodeParameter("postedWithin", i);
				body["extractTitle"] = this.getNodeParameter("extractTitle", i);
				body["extractCompany"] = this.getNodeParameter("extractCompany", i);
				body["extractLocation"] = this.getNodeParameter("extractLocation", i);
				body["extractJobType"] = this.getNodeParameter("extractJobType", i);
				body["extractDescription"] = this.getNodeParameter("extractDescription", i);
				body["extractDate"] = this.getNodeParameter("extractDate", i);
				body["extractCompanyLogo"] = this.getNodeParameter("extractCompanyLogo", i);
				body["extractSalary"] = this.getNodeParameter("extractSalary", i);
				body["extractSalaryParse"] = this.getNodeParameter("extractSalaryParse", i);
				body["extractFreshness"] = this.getNodeParameter("extractFreshness", i);
				body["extractWorkMode"] = this.getNodeParameter("extractWorkMode", i);
				body["extractSkills"] = this.getNodeParameter("extractSkills", i);
				body["extractBenefits"] = this.getNodeParameter("extractBenefits", i);
				body["extractSeniority"] = this.getNodeParameter("extractSeniority", i);
				body["extractCategory"] = this.getNodeParameter("extractCategory", i);
				body["extractRecruiterScore"] = this.getNodeParameter("extractRecruiterScore", i);
				body["extractOutreachAssets"] = this.getNodeParameter("extractOutreachAssets", i);
				body["extractDeiSignals"] = this.getNodeParameter("extractDeiSignals", i);
				body["extractPayTransparencyLaw"] = this.getNodeParameter("extractPayTransparencyLaw", i);
				body["extractLocationParts"] = this.getNodeParameter("extractLocationParts", i);
				body["deepFetchAll"] = this.getNodeParameter("deepFetchAll", i);
				body["deepFetchTopN"] = this.getNodeParameter("deepFetchTopN", i);
				body["deduplicateCompanies"] = this.getNodeParameter("deduplicateCompanies", i);
				body["minRecruiterScore"] = this.getNodeParameter("minRecruiterScore", i);
				body["onlyWithSalary"] = this.getNodeParameter("onlyWithSalary", i);
				body["onlyRemote"] = this.getNodeParameter("onlyRemote", i);
				body["exportFormat"] = this.getNodeParameter("exportFormat", i);
				body["writeSummary"] = this.getNodeParameter("writeSummary", i);
				body["topCompaniesN"] = this.getNodeParameter("topCompaniesN", i);
				body["topJobsN"] = this.getNodeParameter("topJobsN", i);
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
