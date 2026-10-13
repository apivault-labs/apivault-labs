# Similarweb Scraper — Python client

Collect available Similarweb traffic and competitor signals for domains; unavailable metrics remain unknown. Bulk export: JSON, CSV, Excel and API. PPE: from $1/1K website results; usage extra.

This client starts the hosted [Apify Actor](https://apify.com/apivault_labs/similarweb-scraper), waits for completion and downloads Dataset records. It also reads SUMMARY and ERRORS when available. Source coverage and result fields depend on the Actor.

## Install

```bash
pip install apivault-similarweb-scraper
```

## Run

Set `APIFY_TOKEN` in your environment. Replace the example values with your own valid inputs from the [Actor input form](https://apify.com/apivault_labs/similarweb-scraper/input).

```python
from apivault_similarweb_scraper import Client, WaitTimeout

client = Client()
actor_input = {
    "domains": [
        "REPLACE_WITH_YOUR_INPUT"
    ],
    "maxResults": 1
}
result = client.run(actor_input, max_total_charge_usd=0.05, max_rows=100)
print(result.run_id, len(result.rows), result.truncated)
print(result.summary)
```

An Apify account and token are required. The package has no subscription of its own; hosted runs are billed by Apify under the Actor pricing. The event charge cap may not include platform usage. Review the [current price](https://apify.com/apivault_labs/similarweb-scraper/pricing) before changing it. `max_rows` limits the download, not the Actor collection or its charges; configure an Actor result limit too.

## Resume and diagnostics

`client.start(input)` returns a run ID; `client.wait(run_id)` and `client.result(run_id)` resume an existing run. A `WaitTimeout` exposes `run_id`. Starting a run is never automatically retried. Use an existing run ID after a connection or waiting failure to avoid duplicate paid runs. Failed and aborted runs raise `ActorError`. No-match and partial results require inspecting `summary` and `errors`; diagnostic rows must not be mistaken for useful results.

Rows can be serialized as JSON or used in your own CSV/Excel pipeline. Native Dataset exports are available in Apify. Optional integrations and credentials depend on the Actor.

[Hosted Actor](https://apify.com/apivault_labs/similarweb-scraper) · [Source](https://github.com/apivault-labs/apivault-labs/tree/main/python-clients/apivault-similarweb-scraper) · [PyPI](https://pypi.org/project/apivault-similarweb-scraper/)
