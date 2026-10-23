# Google News Search for n8n

Collect Google News headlines, publishers, publication dates and article links.

## Install

Install `n8n-nodes-apivault-google-news-search` in Settings в†’ Community nodes on a self-hosted n8n instance. Select your own Apify credential. Import `examples/quickstart-workflow.json`, replace the example Actor inputs and keep the workflow manual until you have reviewed the result. The template is inactive and contains no credentials.

This connector calls the hosted [Actor](https://apify.com/apivault_labs/google-news-search) through the Apify API. It offers Run and Read Results, and Read Existing Run to resume without a paid duplicate. Choose Run, Rows and Diagnostics to inspect SUMMARY, ERRORS and the truncation flag. Dataset Rows emits one n8n item per downloaded row. Availability, completeness and result fields depend on the Actor.

The event cap defaults to $0.05. Review [Actor pricing](https://apify.com/apivault_labs/google-news-search/pricing) before raising it; platform usage may be billed separately. Maximum Rows to Read is a download cap, not a paid collection limit. Set a result limit in Actor Input too. Start requests are never automatically retried. For failed or timed-out waiting, inspect the run in Apify before starting another.

Publication on npm makes this a community package. n8n Cloud availability depends on separate review and verification by n8n; this package does not claim verified status. No runtime dependencies are included.

[Actor inputs](https://apify.com/apivault_labs/google-news-search/input) | [npm](https://www.npmjs.com/package/n8n-nodes-apivault-google-news-search) | [GitHub](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-google-news-search)


## Related integration

[Python client](https://github.com/apivault-labs/apivault-labs/tree/main/packages/apivault-google-news-search) · [PyPI](https://pypi.org/project/apivault-google-news-search/) · [n8n source and workflow](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-google-news-search) · [npm](https://www.npmjs.com/package/n8n-nodes-apivault-google-news-search)


## Source coverage and limits

News feeds are bounded snapshots. Daily mode and optional article text use the hosted Actor settings and can increase resources. Neither mode guarantees a complete archive. Repeat runs can bill the same delivered article again. Keep your own articleId-based history for monitoring.
