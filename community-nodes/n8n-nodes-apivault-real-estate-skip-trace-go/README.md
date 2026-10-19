# Real Estate Skip Trace for n8n

Research public property-owner and contact evidence; missing contacts and inferred signals remain explicit. No login. Bulk export: JSON, CSV, Excel and API. PPE: from $10/1K research results; usage extra.

## Install

Install `n8n-nodes-apivault-real-estate-skip-trace-go` in Settings → Community nodes on a self-hosted n8n instance. Select your own Apify credential. Import `examples/quickstart-workflow.json`, replace the example Actor inputs and keep the workflow manual until you have reviewed the result. The template is inactive and contains no credentials.

This connector calls the hosted [Actor](https://apify.com/apivault_labs/real-estate-skip-trace-go) through the Apify API. It offers Run and Read Results, and Read Existing Run to resume without a paid duplicate. Choose Run, Rows and Diagnostics to inspect SUMMARY, ERRORS and the truncation flag. Dataset Rows emits one n8n item per downloaded row. Availability, completeness and result fields depend on the Actor.

The event cap defaults to $0.05. Review [Actor pricing](https://apify.com/apivault_labs/real-estate-skip-trace-go/pricing) before raising it; platform usage may be billed separately. Maximum Rows to Read is a download cap, not a paid collection limit. Set a result limit in Actor Input too. Start requests are never automatically retried. For failed or timed-out waiting, inspect the run in Apify before starting another.

Publication on npm makes this a community package. n8n Cloud availability depends on separate review and verification by n8n; this package does not claim verified status. No runtime dependencies are included.

[Actor inputs](https://apify.com/apivault_labs/real-estate-skip-trace-go/input) · [npm](https://www.npmjs.com/package/n8n-nodes-apivault-real-estate-skip-trace-go) · [GitHub](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-real-estate-skip-trace-go)

<!-- apivault-integrations:start -->
## Hosted Actor and integrations

- [Run Real Estate Skip Trace — No Login, Owner Phones & Emails on Apify](https://apify.com/apivault_labs/real-estate-skip-trace-go).
- [Current pricing and usage terms](https://apify.com/apivault_labs/real-estate-skip-trace-go/pricing).
- [n8n community package: n8n-nodes-apivault-real-estate-skip-trace-go](https://www.npmjs.com/package/n8n-nodes-apivault-real-estate-skip-trace-go).
- [Python client](https://github.com/apivault-labs/real-estate-skip-trace-go-python).

An Apify account and API token are required. Hosted Actor/platform charges apply. npm publication is not n8n verification or confirmation of n8n Cloud availability.
<!-- apivault-integrations:end -->
