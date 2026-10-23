# Substack Archive Scraper - Python client

Collect public Substack archive posts, dates, URLs and optional public article text.

This client starts the hosted [Apify Actor](https://apify.com/apivault_labs/substack-archive-scraper), waits for completion and downloads Dataset records. It also reads SUMMARY and ERRORS when available. Source coverage and result fields depend on the Actor.

## Install

```bash
pip install apivault-substack-archive-scraper
```

## Run

Set `APIFY_TOKEN` in your environment. Replace the example values with your own valid inputs from the [Actor input form](https://apify.com/apivault_labs/substack-archive-scraper/input).

```python
from apivault_substack_archive_scraper import Client, WaitTimeout

client = Client()
actor_input = {
    "urls": [
        "https://www.experimental-history.com"
    ],
    "maxItems": 5
}
result = client.run(actor_input, max_total_charge_usd=0.05, max_rows=100)
print(result.run_id, len(result.rows), result.truncated)
print(result.summary)
```

An Apify account and token are required. The package has no subscription of its own; hosted runs are billed by Apify under the Actor pricing. The event charge cap may not include platform usage. Review the [current price](https://apify.com/apivault_labs/substack-archive-scraper/pricing) before changing it. `max_rows` limits the download, not the Actor collection or its charges; configure an Actor result limit too.

## Resume and diagnostics

`client.start(input)` returns a run ID; `client.wait(run_id)` and `client.result(run_id)` resume an existing run. A `WaitTimeout` exposes `run_id`. Starting a run is never automatically retried. Use an existing run ID after a connection or waiting failure to avoid duplicate paid runs. Failed and aborted runs raise `ActorError`. No-match and partial results require inspecting `summary` and `errors`; diagnostic rows must not be mistaken for useful results.

Rows can be serialized as JSON or used in your own CSV/Excel pipeline. Native Dataset exports are available in Apify. Optional integrations and credentials depend on the Actor.

[Hosted Actor](https://apify.com/apivault_labs/substack-archive-scraper) | [Source](https://github.com/apivault-labs/apivault-labs/tree/main/packages/apivault-substack-archive-scraper) | [PyPI](https://pypi.org/project/apivault-substack-archive-scraper/)


## Related integration

[Python client](https://github.com/apivault-labs/apivault-labs/tree/main/packages/apivault-substack-archive-scraper) · [PyPI](https://pypi.org/project/apivault-substack-archive-scraper/) · [n8n source and workflow](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-substack-archive-scraper) · [npm](https://www.npmjs.com/package/n8n-nodes-apivault-substack-archive-scraper)


## Source coverage and limits

Public archives and explicit post URLs only. Paid posts provide metadata and a short preview; no subscriber content, login or paywall bypass. Inspect source diagnostics and continuation limits. Reading a saved run does not continue the archive; copy continuation inputs into a new separately billed run.


## Collection and spend limits

The small example sets `maxItems` to bound paid collection. `max_rows` / Maximum Rows to Read limits only the dataset download. The event charge cap does not cap infrastructure or proxy usage. The clients do not start an automatic paid retry after a start request fails. Save the run ID and inspect that run before starting another. For source failures, inspect SUMMARY and ERRORS in Apify Console; Client.result only returns successful runs.

The hosted Actor also charges an Actor Start event at USD 0.00005 per GB of configured memory, minimum one event, in addition to delivered-result events and infrastructure usage. Empty or failed runs can still incur start and resource costs.
