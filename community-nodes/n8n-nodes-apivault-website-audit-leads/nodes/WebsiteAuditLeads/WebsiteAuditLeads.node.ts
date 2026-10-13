import type { INodeProperties,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
	IHttpRequestOptions } from 'n8n-workflow';

import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

const ACTOR_ID = '4tbFN8UyTf5qVmnLT';

import { executionProperties, runActor, legacyRequest } from '../helpers/actorTransport';

export class WebsiteAuditLeads implements INodeType {
 description: INodeTypeDescription = {
  "displayName": "Website Audit Leads",
  "name": "websiteAuditLeads",
  "icon": {
    "light": "file:websiteauditleads.svg",
    "dark": "file:websiteauditleads.svg"
  },
  "subtitle": "={{$parameter[\"apivaultMode\"]}}",
  "group": [
    "transform"
  ],
  "version": [
    1,
    2
  ],
  "description": "Run Web Design & SEO Lead Finder through the hosted Apify Actor and read its results",
  "defaults": {
    "name": "Website Audit Leads"
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
    "displayName": "Run mode",
    "name": "runMode",
    "description": "Actor input: Run mode",
    "type": "options",
    "options": [
      {
        "name": "Export Leads",
        "value": "export"
      },
      {
        "name": "Preview Audience Size",
        "value": "preview"
      }
    ],
    "default": "export",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Return",
    "name": "returnMode",
    "description": "Actor input: Return",
    "type": "options",
    "options": [
      {
        "name": "Lead Rows",
        "value": "rows"
      },
      {
        "name": "Automation Response",
        "value": "automation"
      }
    ],
    "default": "rows",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Opportunity preset",
    "name": "opportunityPreset",
    "description": "Actor input: Opportunity preset",
    "type": "options",
    "options": [
      {
        "name": "Balanced opportunities",
        "value": "balanced"
      },
      {
        "name": "Weak SEO",
        "value": "seo"
      },
      {
        "name": "Weak performance",
        "value": "performance"
      },
      {
        "name": "Weak security / best practices",
        "value": "security"
      },
      {
        "name": "Redesign candidates",
        "value": "redesign"
      },
      {
        "name": "All audited websites",
        "value": "all"
      }
    ],
    "default": "balanced",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Maximum overall score",
    "name": "overallScoreMax",
    "description": "Actor input: Maximum overall score",
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
    "displayName": "Minimum overall score",
    "name": "overallScoreMin",
    "description": "Actor input: Minimum overall score",
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
    "displayName": "Maximum SEO score",
    "name": "seoScoreMax",
    "description": "Actor input: Maximum SEO score",
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
    "displayName": "Maximum performance score",
    "name": "performanceScoreMax",
    "description": "Actor input: Maximum performance score",
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
    "displayName": "Maximum security / best-practices score",
    "name": "securityScoreMax",
    "description": "Actor input: Maximum security / best-practices score",
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
    "displayName": "Maximum accessibility score",
    "name": "accessibilityScoreMax",
    "description": "Actor input: Maximum accessibility score",
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
    "displayName": "Recommended work scope",
    "name": "auditScopes",
    "description": "Actor input: Recommended work scope",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
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
    "displayName": "Specific audit problems",
    "name": "auditIssues",
    "description": "Actor input: Specific audit problems",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
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
    "displayName": "Problem matching",
    "name": "issueMatchMode",
    "description": "Actor input: Problem matching",
    "type": "options",
    "options": [
      {
        "name": "Any selected problem",
        "value": "any"
      },
      {
        "name": "All selected problems",
        "value": "all"
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
    "displayName": "Audit confidence",
    "name": "auditConfidence",
    "description": "Actor input: Audit confidence",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
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
    "displayName": "Required contact data",
    "name": "contactRequirement",
    "description": "Actor input: Required contact data",
    "type": "options",
    "options": [
      {
        "name": "Email required",
        "value": "email"
      },
      {
        "name": "Email or phone",
        "value": "email_or_phone"
      },
      {
        "name": "Email and phone",
        "value": "both"
      },
      {
        "name": "Phone required",
        "value": "phone"
      },
      {
        "name": "Any contact availability",
        "value": "any"
      }
    ],
    "default": "email",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Countries (ISO-2)",
    "name": "country",
    "description": "Actor input: Countries (ISO-2)",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
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
    "displayName": "Industry / vertical",
    "name": "vertical",
    "description": "Actor input: Industry / vertical",
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
    "displayName": "Technologies used",
    "name": "technologies",
    "description": "Actor input: Technologies used",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
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
    "displayName": "Only sites with detected AI technology",
    "name": "hasAiTechnology",
    "description": "Actor input: Only sites with detected AI technology",
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
    "displayName": "Audited within the last N days",
    "name": "checkedWithinDays",
    "description": "Actor input: Audited within the last N days",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 3650
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
    "displayName": "Sort leads by",
    "name": "sortBy",
    "description": "Actor input: Sort leads by",
    "type": "options",
    "options": [
      {
        "name": "Overall score",
        "value": "Overall Score"
      },
      {
        "name": "SEO score",
        "value": "SEO"
      },
      {
        "name": "Performance score",
        "value": "Performance"
      },
      {
        "name": "Security / best practices",
        "value": "Best Practices"
      },
      {
        "name": "Accessibility",
        "value": "Accessibility"
      },
      {
        "name": "Sales revenue",
        "value": "Sales Revenue"
      },
      {
        "name": "Employees",
        "value": "Employees"
      },
      {
        "name": "Technology spend",
        "value": "Technology Spend"
      },
      {
        "name": "Audit date",
        "value": "Audit Checked At"
      }
    ],
    "default": "Overall Score",
    "displayOptions": {
      "show": {
        "apivaultMode": [
          "run"
        ]
      }
    }
  },
  {
    "displayName": "Highest values first",
    "name": "sortDesc",
    "description": "Actor input: Highest values first",
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
    "displayName": "Maximum leads",
    "name": "maxItems",
    "description": "Actor input: Maximum leads",
    "type": "number",
    "default": 50,
    "typeOptions": {
      "minValue": 1,
      "maxValue": 50000
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
    "displayName": "Offset",
    "name": "offset",
    "description": "Actor input: Offset",
    "type": "number",
    "default": 0,
    "typeOptions": {
      "minValue": 0,
      "maxValue": 50000
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
    "displayName": "Remove duplicate domains",
    "name": "dedupeByDomain",
    "description": "Actor input: Remove duplicate domains",
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
    "displayName": "Output columns",
    "name": "columns",
    "description": "Actor input: Output columns",
    "type": "string",
    "typeOptions": {
      "rows": 3
    },
    "default": "",
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
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		for (let i = 0; i < items.length; i++) {
			try {
				if (this.getNodeParameter('apivaultMode', i, 'run') === 'read') {
					const results = await runActor(this, i, ACTOR_ID, {});
					for (const result of results) returnData.push({ json: result, pairedItem: { item: i } });
					continue;
				}
				const body: Record<string, unknown> = {};
				const runMode = this.getNodeParameter("runMode", i) as string;
				const returnMode = this.getNodeParameter("returnMode", i) as string;
				body["runMode"] = runMode;
				body["opportunityPreset"] = this.getNodeParameter("opportunityPreset", i);
				{ const value = this.getNodeParameter("overallScoreMax", i, 0) as number; if (value !== 0) body["overallScoreMax"] = value; }
				{ const value = this.getNodeParameter("overallScoreMin", i, 0) as number; if (value !== 0) body["overallScoreMin"] = value; }
				{ const value = this.getNodeParameter("seoScoreMax", i, 0) as number; if (value !== 0) body["seoScoreMax"] = value; }
				{ const value = this.getNodeParameter("performanceScoreMax", i, 0) as number; if (value !== 0) body["performanceScoreMax"] = value; }
				{ const value = this.getNodeParameter("securityScoreMax", i, 0) as number; if (value !== 0) body["securityScoreMax"] = value; }
				{ const value = this.getNodeParameter("accessibilityScoreMax", i, 0) as number; if (value !== 0) body["accessibilityScoreMax"] = value; }
				{ const value = this.getNodeParameter("auditScopes", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["auditScopes"] = values; }
				{ const value = this.getNodeParameter("auditIssues", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["auditIssues"] = values; }
				body["issueMatchMode"] = this.getNodeParameter("issueMatchMode", i);
				{ const value = this.getNodeParameter("auditConfidence", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["auditConfidence"] = values; }
				body["contactRequirement"] = this.getNodeParameter("contactRequirement", i);
				{ const value = this.getNodeParameter("country", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["country"] = values; }
				{ const value = this.getNodeParameter("vertical", i, '') as string; if (value.trim()) body["vertical"] = value.trim(); }
				{ const value = this.getNodeParameter("technologies", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["technologies"] = values; }
				body["hasAiTechnology"] = this.getNodeParameter("hasAiTechnology", i);
				body["checkedWithinDays"] = this.getNodeParameter("checkedWithinDays", i);
				body["sortBy"] = this.getNodeParameter("sortBy", i);
				body["sortDesc"] = this.getNodeParameter("sortDesc", i);
				body["maxItems"] = this.getNodeParameter("maxItems", i);
				body["offset"] = this.getNodeParameter("offset", i);
				body["dedupeByDomain"] = this.getNodeParameter("dedupeByDomain", i);
				{ const value = this.getNodeParameter("columns", i, '') as string; const values = value.split(/[,\n]/).map((entry) => entry.trim()).filter(Boolean); if (values.length) body["columns"] = values; }
				const runOptions: IHttpRequestOptions = {
					method: 'POST' as IHttpRequestMethods,
					url: `https://api.apify.com/v2/acts/${ACTOR_ID}/runs`,
					qs: { waitForFinish: 300, memory: 512 },
					body,
					json: true,
				};
				const runResponse = await legacyRequest(this, i, runOptions) as { data?: Record<string, unknown> };
				const run = runResponse.data ?? runResponse as Record<string, unknown>;
				if (run.status !== 'SUCCEEDED') {
					throw new NodeOperationError(this.getNode(), `Actor run did not succeed (status: ${String(run.status ?? 'unknown')})`, { itemIndex: i });
				}
				let response: unknown;
				if (runMode === 'preview' || returnMode === 'automation') {
					const storeId = String(run.defaultKeyValueStoreId ?? '');
					if (!storeId) throw new NodeOperationError(this.getNode(), 'Actor run did not provide a key-value store', { itemIndex: i });
					response = await legacyRequest(this, i, {
						method: 'GET' as IHttpRequestMethods,
						url: `https://api.apify.com/v2/key-value-stores/${storeId}/records/MCP_RESPONSE`,
						json: true,
					} as IHttpRequestOptions);
				} else {
					const datasetId = String(run.defaultDatasetId ?? '');
					if (!datasetId) throw new NodeOperationError(this.getNode(), 'Actor run did not provide a Dataset', { itemIndex: i });
					response = await legacyRequest(this, i, {
						method: 'GET' as IHttpRequestMethods,
						url: `https://api.apify.com/v2/datasets/${datasetId}/items`,
						qs: { clean: true },
						json: true,
					} as IHttpRequestOptions);
				}
				const results = Array.isArray(response) ? response : [response];
				for (const result of results) returnData.push({ json: result, pairedItem: { item: i } });
			} catch {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: 'Could not finish the Actor request. Check inputs and credentials before retrying' }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeOperationError(this.getNode(), 'Could not finish the Actor request. Check inputs and credentials before retrying', { itemIndex: i });
			}
		}
		return [returnData];
	}
}
