import type { INodeProperties, IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription  } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { executionProperties, runActor, SafeActorError } from '../helpers/actorTransport';
const ACTOR_ID = 'Dye6dvqAhddD0yzbr';

export class JobLeads implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Job Posting Lead Finder",
  "name": "jobLeads",
  "icon": {
    "light": "file:jobleads.svg",
    "dark": "file:jobleads.svg"
  },
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "subtitle": "={{$parameter[\"keywords\"]}}",
  "description": "Run Job Leads Scraper through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Job Posting Lead Finder"
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
    "displayName": "Keywords",
    "name": "keywords",
    "type": "string",
    "default": "",
    "required": true,
    "placeholder": "marketing manager",
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
    "displayName": "Location",
    "name": "location",
    "type": "string",
    "default": "",
    "placeholder": "New York, NY",
    "description": "Actor input: Location",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Sources",
    "name": "sources",
    "type": "multiOptions",
    "options": [
      {
        "name": "Indeed",
        "value": "indeed"
      },
      {
        "name": "LinkedIn",
        "value": "linkedin"
      },
      {
        "name": "Glassdoor (best effort)",
        "value": "glassdoor"
      }
    ],
    "default": [
      "indeed",
      "linkedin"
    ],
    "description": "Actor input: Sources",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Deduplicate Companies",
    "name": "deduplicateCompanies",
    "type": "boolean",
    "default": true,
    "description": "Actor input: Deduplicate Companies",
    "displayOptions": {
      "show": {
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
        "name": "Default JSON (40+ fields)",
        "value": "default"
      },
      {
        "name": "CSV (CRM-ready flat row)",
        "value": "csv"
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
    "displayName": "Filters",
    "name": "filters",
    "type": "collection",
    "placeholder": "Add Filter",
    "default": {},
    "options": [
      {
        "displayName": "Min Lead Score",
        "name": "minLeadScore",
        "type": "number",
        "typeOptions": {
          "minValue": 0,
          "maxValue": 100
        },
        "default": 0,
        "description": "Drop jobs below this leadScore (0-100)"
      },
      {
        "displayName": "Only With Salary",
        "name": "onlyWithSalary",
        "type": "boolean",
        "default": false,
        "description": "Whether to keep only jobs with a disclosed salary"
      },
      {
        "displayName": "Only Remote",
        "name": "onlyRemote",
        "type": "boolean",
        "default": false,
        "description": "Whether to keep only fully-remote jobs"
      },
      {
        "displayName": "Only Fresh This Week",
        "name": "onlyFreshThisWeek",
        "type": "boolean",
        "default": false,
        "description": "Whether to keep only jobs posted in the last 7 days"
      },
      {
        "displayName": "Only Pay-Transparency Compliant",
        "name": "onlyPayTransparencyCompliant",
        "type": "boolean",
        "default": false,
        "description": "Whether to keep only jobs in pay-transparency law states with disclosed salary"
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
        "displayName": "Write SUMMARY + Top Companies",
        "name": "writeSummary",
        "type": "boolean",
        "default": true,
        "description": "Whether to write aggregate KV records (SUMMARY + TOP_HIRING_COMPANIES + TOP_JOBS)"
      },
      {
        "displayName": "Top N",
        "name": "topN",
        "type": "number",
        "typeOptions": {
          "minValue": 5,
          "maxValue": 100
        },
        "default": 20,
        "description": "Size of the top-companies / top-jobs records"
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
const keywords = this.getNodeParameter('keywords', i) as string;
				const location = this.getNodeParameter('location', i, '') as string;
				const sources = this.getNodeParameter('sources', i, [
					'indeed',
					'linkedin',
				]) as string[];
				const deduplicateCompanies = this.getNodeParameter(
					'deduplicateCompanies',
					i,
				) as boolean;
				const exportFormat = this.getNodeParameter('exportFormat', i) as string;
				const filters = this.getNodeParameter('filters', i, {}) as {
					minLeadScore?: number;
					onlyWithSalary?: boolean;
					onlyRemote?: boolean;
					onlyFreshThisWeek?: boolean;
					onlyPayTransparencyCompliant?: boolean;
				};
				const extra = this.getNodeParameter('additionalOptions', i, {}) as {
					writeSummary?: boolean;
					topN?: number;
				};

				if (!keywords || !keywords.trim()) {
					throw new NodeOperationError(this.getNode(), 'Keywords are required', {
						itemIndex: i,
					});
				}

				const cleanSources = (sources && sources.length ? sources : ['indeed', 'linkedin']).filter(
					(s) => ['indeed', 'linkedin', 'glassdoor'].includes(s),
				);

				const body: Record<string, unknown> = {
					keywords: keywords.trim(),
					location: location || '',
					sources: cleanSources,
					deduplicateCompanies,
					exportFormat,
					minLeadScore: filters.minLeadScore ?? 0,
					onlyWithSalary: filters.onlyWithSalary ?? false,
					onlyRemote: filters.onlyRemote ?? false,
					onlyFreshThisWeek: filters.onlyFreshThisWeek ?? false,
					onlyPayTransparencyCompliant: filters.onlyPayTransparencyCompliant ?? false,
					writeSummary: extra.writeSummary ?? true,
					topN: extra.topN ?? 20,
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
