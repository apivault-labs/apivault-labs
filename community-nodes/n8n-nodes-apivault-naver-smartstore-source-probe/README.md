# Naver Brand Store Scraper for n8n

Collect supported Naver Brand Store product cards with prices, stock and delivery metadata.

## Install

Install `n8n-nodes-apivault-naver-smartstore-source-probe` in Settings в†’ Community nodes on a self-hosted n8n instance. Select your own Apify credential. Import `examples/quickstart-workflow.json`, replace the example Actor inputs and keep the workflow manual until you have reviewed the result. The template is inactive and contains no credentials.

This connector calls the hosted [Actor](https://apify.com/apivault_labs/naver-smartstore-source-probe) through the Apify API. It offers Run and Read Results, and Read Existing Run to resume without a paid duplicate. Choose Run, Rows and Diagnostics to inspect SUMMARY, ERRORS and the truncation flag. Dataset Rows emits one n8n item per downloaded row. Availability, completeness and result fields depend on the Actor.

The event cap defaults to $0.05. Review [Actor pricing](https://apify.com/apivault_labs/naver-smartstore-source-probe/pricing) before raising it; platform usage may be billed separately. Maximum Rows to Read is a download cap, not a paid collection limit. Set a result limit in Actor Input too. Start requests are never automatically retried. For failed or timed-out waiting, inspect the run in Apify before starting another.

Publication on npm makes this a community package. n8n Cloud availability depends on separate review and verification by n8n; this package does not claim verified status. No runtime dependencies are included.

[Actor inputs](https://apify.com/apivault_labs/naver-smartstore-source-probe/input) | [npm](https://www.npmjs.com/package/n8n-nodes-apivault-naver-smartstore-source-probe) | [GitHub](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-naver-smartstore-source-probe)


## Related integration

[Python client](https://github.com/apivault-labs/apivault-labs/tree/main/packages/apivault-naver-smartstore-source-probe) · [PyPI](https://pypi.org/project/apivault-naver-smartstore-source-probe/) · [n8n source and workflow](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-naver-smartstore-source-probe) · [npm](https://www.npmjs.com/package/n8n-nodes-apivault-naver-smartstore-source-probe)


## Source coverage and limits

Supply supported explicit product URLs; no catalog discovery, keyword search or guaranteed coverage of all SmartStore sellers. Default hosted transport uses separately billed Korean proxy resources, in addition to Apify platform usage and delivered-product events. The event cap does not cap proxy or infrastructure usage. Source and regional refusals can occur; inspect source diagnostics. Missing optional data stays null. Reading an existing run does not recheck live stock.


## Collection and spend limits

The small example sets `maxItems` to bound paid collection. `max_rows` / Maximum Rows to Read limits only the dataset download. The event charge cap does not cap infrastructure or proxy usage. The clients do not start an automatic paid retry after a start request fails. Save the run ID and inspect that run before starting another. For source failures, inspect SUMMARY and ERRORS in Apify Console; Client.result only returns successful runs.
