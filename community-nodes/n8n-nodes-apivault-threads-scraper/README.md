# Threads Scraper for n8n

Collect accessible public Threads posts, profiles and keyword observations.

## Install

Install `n8n-nodes-apivault-threads-scraper` in Settings в†’ Community nodes on a self-hosted n8n instance. Select your own Apify credential. Import `examples/quickstart-workflow.json`, replace the example Actor inputs and keep the workflow manual until you have reviewed the result. The template is inactive and contains no credentials.

This connector calls the hosted [Actor](https://apify.com/apivault_labs/threads-scraper) through the Apify API. It offers Run and Read Results, and Read Existing Run to resume without a paid duplicate. Choose Run, Rows and Diagnostics to inspect SUMMARY, ERRORS and the truncation flag. Dataset Rows emits one n8n item per downloaded row. Availability, completeness and result fields depend on the Actor.

The event cap defaults to $0.05. Review [Actor pricing](https://apify.com/apivault_labs/threads-scraper/pricing) before raising it; platform usage may be billed separately. Maximum Rows to Read is a download cap, not a paid collection limit. Set a result limit in Actor Input too. Start requests are never automatically retried. For failed or timed-out waiting, inspect the run in Apify before starting another.

Publication on npm makes this a community package. n8n Cloud availability depends on separate review and verification by n8n; this package does not claim verified status. No runtime dependencies are included.

[Actor inputs](https://apify.com/apivault_labs/threads-scraper/input) | [npm](https://www.npmjs.com/package/n8n-nodes-apivault-threads-scraper) | [GitHub](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-threads-scraper)


## Related integration

[Python client](https://github.com/apivault-labs/apivault-labs/tree/main/packages/apivault-threads-scraper) · [PyPI](https://pypi.org/project/apivault-threads-scraper/) · [n8n source and workflow](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-threads-scraper) · [npm](https://www.npmjs.com/package/n8n-nodes-apivault-threads-scraper)


## Source coverage and limits

Public initial page only; no full archive, fetched pagination or complete reply tree. Unknown metrics remain null. Direct requests can fail with source rate limits; the connector does not automatically enable separately billed proxy traffic. Inspect SUMMARY and ERRORS in Apify Console after failed or partial source runs; Client.result only returns successful runs.
