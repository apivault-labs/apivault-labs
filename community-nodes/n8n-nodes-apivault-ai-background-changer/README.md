# AI Background Changer for n8n

Replace photo backgrounds from text prompts; process uploaded files, URLs or storage images. Bulk result-link export: JSON, CSV, Excel and API. PPE: $7/1K delivered photos; start fee, usage extra.

## Install

Install `n8n-nodes-apivault-ai-background-changer` in Settings → Community nodes on a self-hosted n8n instance. Select your own Apify credential. Import `examples/quickstart-workflow.json`, replace the example Actor inputs and keep the workflow manual until you have reviewed the result. The template is inactive and contains no credentials.

This connector calls the hosted [Actor](https://apify.com/apivault_labs/aI-background-changer) through the Apify API. It offers Run and Read Results, and Read Existing Run to resume without a paid duplicate. Choose Run, Rows and Diagnostics to inspect SUMMARY, ERRORS and the truncation flag. Dataset Rows emits one n8n item per downloaded row. Availability, completeness and result fields depend on the Actor.

The event cap defaults to $0.05. Review [Actor pricing](https://apify.com/apivault_labs/aI-background-changer/pricing) before raising it; platform usage may be billed separately. Maximum Rows to Read is a download cap, not a paid collection limit. Set a result limit in Actor Input too. Start requests are never automatically retried. For failed or timed-out waiting, inspect the run in Apify before starting another.

Publication on npm makes this a community package. n8n Cloud availability depends on separate review and verification by n8n; this package does not claim verified status. No runtime dependencies are included.

[Actor inputs](https://apify.com/apivault_labs/aI-background-changer/input) · [npm](https://www.npmjs.com/package/n8n-nodes-apivault-ai-background-changer) · [GitHub](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-ai-background-changer)

<!-- apivault-integrations:start -->
## Hosted Actor and integrations

- [Run AI Background Changer — Bulk Photo Editing API on Apify](https://apify.com/apivault_labs/aI-background-changer).
- [Current pricing and usage terms](https://apify.com/apivault_labs/aI-background-changer/pricing).
- [n8n community package: n8n-nodes-apivault-ai-background-changer](https://www.npmjs.com/package/n8n-nodes-apivault-ai-background-changer).
- [Python client](https://github.com/apivault-labs/apivault-labs/tree/main/python-clients/apivault-ai-background-changer).

An Apify account and API token are required. Hosted Actor/platform charges apply. npm publication is not n8n verification or confirmation of n8n Cloud availability.
<!-- apivault-integrations:end -->
