# Bilibili Popular Videos for n8n

Collect public Bilibili popular-feed videos, metrics and optional snapshot comparisons.

## Install

Install `n8n-nodes-apivault-bilibili-popular-videos-prototype` in Settings в†’ Community nodes on a self-hosted n8n instance. Select your own Apify credential. Import `examples/quickstart-workflow.json`, replace the example Actor inputs and keep the workflow manual until you have reviewed the result. The template is inactive and contains no credentials.

This connector calls the hosted [Actor](https://apify.com/apivault_labs/bilibili-popular-videos-prototype) through the Apify API. It offers Run and Read Results, and Read Existing Run to resume without a paid duplicate. Choose Run, Rows and Diagnostics to inspect SUMMARY, ERRORS and the truncation flag. Dataset Rows emits one n8n item per downloaded row. Availability, completeness and result fields depend on the Actor.

The event cap defaults to $0.05. Review [Actor pricing](https://apify.com/apivault_labs/bilibili-popular-videos-prototype/pricing) before raising it; platform usage may be billed separately. Maximum Rows to Read is a download cap, not a paid collection limit. Set a result limit in Actor Input too. Start requests are never automatically retried. For failed or timed-out waiting, inspect the run in Apify before starting another.

Publication on npm makes this a community package. n8n Cloud availability depends on separate review and verification by n8n; this package does not claim verified status. No runtime dependencies are included.

[Actor inputs](https://apify.com/apivault_labs/bilibili-popular-videos-prototype/input) | [npm](https://www.npmjs.com/package/n8n-nodes-apivault-bilibili-popular-videos-prototype) | [GitHub](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-bilibili-popular-videos-prototype)


## Related integration

[Python client](https://github.com/apivault-labs/apivault-labs/tree/main/packages/apivault-bilibili-popular-videos-prototype) · [PyPI](https://pypi.org/project/apivault-bilibili-popular-videos-prototype/) · [n8n source and workflow](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-bilibili-popular-videos-prototype) · [npm](https://www.npmjs.com/package/n8n-nodes-apivault-bilibili-popular-videos-prototype)


## Source coverage and limits

Popular feed only; no keyword search, detail scraping, comments, transcripts or complete archive. Snapshot differences are observed changes, not guaranteed stable rankings. Missing metrics remain null; negative differences remain negative. Reading a saved run does not fetch later pages; configure a new collection run explicitly.


## Collection and spend limits

The small example sets `maxVideos` to bound paid collection. `max_rows` / Maximum Rows to Read limits only the dataset download. The event charge cap does not cap infrastructure or proxy usage. The clients do not start an automatic paid retry after a start request fails. Save the run ID and inspect that run before starting another. For source failures, inspect SUMMARY and ERRORS in Apify Console; Client.result only returns successful runs.

The hosted Actor also charges an Actor Start event at USD 0.00005 per GB of configured memory, minimum one event, in addition to delivered-result events and infrastructure usage. Empty or failed runs can still incur start and resource costs.
