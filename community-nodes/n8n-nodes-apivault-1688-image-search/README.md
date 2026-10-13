# 1688 Reverse Image Search for n8n

Find 1688 and Taobao product matches from photos; compare returned prices and suppliers. Bulk export: JSON, CSV, Excel and API. PPE: from $3.25/1K successful photo searches; usage extra.

## Install

Install `n8n-nodes-apivault-1688-image-search` in Settings → Community nodes on a self-hosted n8n instance. Select your own Apify credential. Import `examples/quickstart-workflow.json`, replace the example Actor inputs and keep the workflow manual until you have reviewed the result. The template is inactive and contains no credentials.

This connector calls the hosted [Actor](https://apify.com/apivault_labs/1688-image-search) through the Apify API. It offers Run and Read Results, and Read Existing Run to resume without a paid duplicate. Choose Run, Rows and Diagnostics to inspect SUMMARY, ERRORS and the truncation flag. Dataset Rows emits one n8n item per downloaded row. Availability, completeness and result fields depend on the Actor.

The event cap defaults to $0.05. Review [Actor pricing](https://apify.com/apivault_labs/1688-image-search/pricing) before raising it; platform usage may be billed separately. Maximum Rows to Read is a download cap, not a paid collection limit. Set a result limit in Actor Input too. Start requests are never automatically retried. For failed or timed-out waiting, inspect the run in Apify before starting another.

Publication on npm makes this a community package. n8n Cloud availability depends on separate review and verification by n8n; this package does not claim verified status. No runtime dependencies are included.

[Actor inputs](https://apify.com/apivault_labs/1688-image-search/input) · [npm](https://www.npmjs.com/package/n8n-nodes-apivault-1688-image-search) · [GitHub](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-1688-image-search)
