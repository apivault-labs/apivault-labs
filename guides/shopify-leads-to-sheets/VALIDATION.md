# Validation scope — 16 October 2026

This page separates the hosted Actor check, workflow logic checks and connected delivery.

| Check | Result |
|---|---|
| Exact sample input on production `0.17.5` | 10 unique US records; all had stored email and phone values and Shopify in the stored platform field |
| Paid result events | 10 for that owner-funded sample; not a customer sale |
| Workflow logic checks | 15 checks passed: capped input, recovery skips paid start, terminal states, source failure handling, no silent truncation, domain mapping, CSV safety and RAW Sheets configuration |
| Fresh local n8n import and recovery-to-CSV execution | Passed in isolated n8n 2.43.7 on Windows: public template and QA copy imported; same-run recovery prepared 10 unique records and generated shopify-contact-leads.csv. The paid Start Actor node was replaced by an unconditional error in the QA copy and was not executed. No Google Sheets write was executed. |
| Real Google Sheets OAuth / write | Not performed; users connect their own Google account and spreadsheet |

The real sample is small and owner-funded. Its 10/10 contact-field coverage is not a promise for other audiences. Stored contacts and technology fields are not current website, phone or mailbox verification. The illustrative CSV and walkthrough do not disclose customer data.

No automatic schedule is included. No embedded credentials, customer account data or scraper implementation are published. A manual execution with `resumeRunId` reads the saved run; clearing that value permits a new paid start.

Primary references: [n8n HTTP Request](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/), [n8n CLI](https://docs.n8n.io/hosting/cli-commands/), [Google Sheets node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/), [hosted Actor](https://apify.com/apivault_labs/website-leads-database).
