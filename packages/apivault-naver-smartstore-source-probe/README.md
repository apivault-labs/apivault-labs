# Naver Brand Store Scraper - Python client

Collect supported Naver Brand Store product cards with prices, stock and delivery metadata.

This client starts the hosted [Apify Actor](https://apify.com/apivault_labs/naver-smartstore-source-probe), waits for completion and downloads Dataset records. It also reads SUMMARY and ERRORS when available. Source coverage and result fields depend on the Actor.

## Install

```bash
pip install apivault-naver-smartstore-source-probe
```

## Run

Set `APIFY_TOKEN` in your environment. Replace the example values with your own valid inputs from the [Actor input form](https://apify.com/apivault_labs/naver-smartstore-source-probe/input).

```python
from apivault_naver_smartstore_source_probe import Client, WaitTimeout

client = Client()
actor_input = {
    "productUrls": [
        "https://brand.naver.com/nestlestore/products/10503912668"
    ],
    "maxItems": 1
}
result = client.run(actor_input, max_total_charge_usd=0.05, max_rows=100)
print(result.run_id, len(result.rows), result.truncated)
print(result.summary)
```

An Apify account and token are required. The package has no subscription of its own; hosted runs are billed by Apify under the Actor pricing. The event charge cap may not include platform usage. Review the [current price](https://apify.com/apivault_labs/naver-smartstore-source-probe/pricing) before changing it. `max_rows` limits the download, not the Actor collection or its charges; configure an Actor result limit too.

## Resume and diagnostics

`client.start(input)` returns a run ID; `client.wait(run_id)` and `client.result(run_id)` resume an existing run. A `WaitTimeout` exposes `run_id`. Starting a run is never automatically retried. Use an existing run ID after a connection or waiting failure to avoid duplicate paid runs. Failed and aborted runs raise `ActorError`. No-match and partial results require inspecting `summary` and `errors`; diagnostic rows must not be mistaken for useful results.

Rows can be serialized as JSON or used in your own CSV/Excel pipeline. Native Dataset exports are available in Apify. Optional integrations and credentials depend on the Actor.

[Hosted Actor](https://apify.com/apivault_labs/naver-smartstore-source-probe) | [Source](https://github.com/apivault-labs/apivault-labs/tree/main/packages/apivault-naver-smartstore-source-probe) | [PyPI](https://pypi.org/project/apivault-naver-smartstore-source-probe/)


## Related integration

[Python client](https://github.com/apivault-labs/apivault-labs/tree/main/packages/apivault-naver-smartstore-source-probe) · [PyPI](https://pypi.org/project/apivault-naver-smartstore-source-probe/) · [n8n source and workflow](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-naver-smartstore-source-probe) · [npm](https://www.npmjs.com/package/n8n-nodes-apivault-naver-smartstore-source-probe)


## Source coverage and limits

Supply supported explicit product URLs; no catalog discovery, keyword search or guaranteed coverage of all SmartStore sellers. Default hosted transport uses separately billed Korean proxy resources, in addition to Apify platform usage and delivered-product events. The event cap does not cap proxy or infrastructure usage. Source and regional refusals can occur; inspect source diagnostics. Missing optional data stays null. Reading an existing run does not recheck live stock.


## Collection and spend limits

The small example sets `maxItems` to bound paid collection. `max_rows` / Maximum Rows to Read limits only the dataset download. The event charge cap does not cap infrastructure or proxy usage. The clients do not start an automatic paid retry after a start request fails. Save the run ID and inspect that run before starting another. For source failures, inspect SUMMARY and ERRORS in Apify Console; Client.result only returns successful runs.
