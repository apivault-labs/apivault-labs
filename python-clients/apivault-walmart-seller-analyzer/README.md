# Walmart Seller Analyzer — Python client

Analyze sampled Walmart products and seller signals; modeled sales, revenue and profit are estimates. Bulk export: JSON, CSV, Excel and API. PPE: from $2/1K product analyses; start fee, usage extra.

This client starts the hosted [Apify Actor](https://apify.com/apivault_labs/walmart-seller-revenue-product-opportunity-analyzer), waits for completion and downloads Dataset records. It also reads SUMMARY and ERRORS when available. Source coverage and result fields depend on the Actor.

## Install

```bash
pip install apivault-walmart-seller-analyzer
```

## Run

Set `APIFY_TOKEN` in your environment. Replace the example values with your own valid inputs from the [Actor input form](https://apify.com/apivault_labs/walmart-seller-revenue-product-opportunity-analyzer/input).

```python
from apivault_walmart_seller_analyzer import Client, WaitTimeout

client = Client()
actor_input = {
    "productUrls": [
        "REPLACE_WITH_YOUR_INPUT"
    ]
}
result = client.run(actor_input, max_total_charge_usd=0.05, max_rows=100)
print(result.run_id, len(result.rows), result.truncated)
print(result.summary)
```

An Apify account and token are required. The package has no subscription of its own; hosted runs are billed by Apify under the Actor pricing. The event charge cap may not include platform usage. Review the [current price](https://apify.com/apivault_labs/walmart-seller-revenue-product-opportunity-analyzer/pricing) before changing it. `max_rows` limits the download, not the Actor collection or its charges; configure an Actor result limit too.

## Resume and diagnostics

`client.start(input)` returns a run ID; `client.wait(run_id)` and `client.result(run_id)` resume an existing run. A `WaitTimeout` exposes `run_id`. Starting a run is never automatically retried. Use an existing run ID after a connection or waiting failure to avoid duplicate paid runs. Failed and aborted runs raise `ActorError`. No-match and partial results require inspecting `summary` and `errors`; diagnostic rows must not be mistaken for useful results.

Rows can be serialized as JSON or used in your own CSV/Excel pipeline. Native Dataset exports are available in Apify. Optional integrations and credentials depend on the Actor.

[Hosted Actor](https://apify.com/apivault_labs/walmart-seller-revenue-product-opportunity-analyzer) · [Source](https://github.com/apivault-labs/apivault-labs/tree/main/python-clients/apivault-walmart-seller-analyzer) · [PyPI](https://pypi.org/project/apivault-walmart-seller-analyzer/)

<!-- apivault-integrations:start -->
## Hosted Actor and integrations

- [Run Walmart Seller Analyzer — Bulk JSON & CSV API on Apify](https://apify.com/apivault_labs/walmart-seller-revenue-product-opportunity-analyzer).
- [Current pricing and usage terms](https://apify.com/apivault_labs/walmart-seller-revenue-product-opportunity-analyzer/pricing).
- [n8n community package: n8n-nodes-apivault-walmart-seller-analyzer](https://www.npmjs.com/package/n8n-nodes-apivault-walmart-seller-analyzer).
- [n8n source and usage](https://github.com/apivault-labs/n8n-nodes-apivault-walmart-seller-analyzer).
- [Python client](https://github.com/apivault-labs/walmart-seller-analyzer-python).
- [n8n source and usage](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-walmart-seller-analyzer).

An Apify account and API token are required. Hosted Actor/platform charges apply. npm publication is not n8n verification or confirmation of n8n Cloud availability.
<!-- apivault-integrations:end -->
