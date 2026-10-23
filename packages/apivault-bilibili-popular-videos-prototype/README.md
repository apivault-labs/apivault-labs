# Bilibili Popular Videos - Python client

Collect public Bilibili popular-feed videos, metrics and optional snapshot comparisons.

This client starts the hosted [Apify Actor](https://apify.com/apivault_labs/bilibili-popular-videos-prototype), waits for completion and downloads Dataset records. It also reads SUMMARY and ERRORS when available. Source coverage and result fields depend on the Actor.

## Install

```bash
pip install apivault-bilibili-popular-videos-prototype
```

## Run

Set `APIFY_TOKEN` in your environment. Replace the example values with your own valid inputs from the [Actor input form](https://apify.com/apivault_labs/bilibili-popular-videos-prototype/input).

```python
from apivault_bilibili_popular_videos_prototype import Client, WaitTimeout

client = Client()
actor_input = {
    "maxVideos": 5
}
result = client.run(actor_input, max_total_charge_usd=0.05, max_rows=100)
print(result.run_id, len(result.rows), result.truncated)
print(result.summary)
```

An Apify account and token are required. The package has no subscription of its own; hosted runs are billed by Apify under the Actor pricing. The event charge cap may not include platform usage. Review the [current price](https://apify.com/apivault_labs/bilibili-popular-videos-prototype/pricing) before changing it. `max_rows` limits the download, not the Actor collection or its charges; configure an Actor result limit too.

## Resume and diagnostics

`client.start(input)` returns a run ID; `client.wait(run_id)` and `client.result(run_id)` resume an existing run. A `WaitTimeout` exposes `run_id`. Starting a run is never automatically retried. Use an existing run ID after a connection or waiting failure to avoid duplicate paid runs. Failed and aborted runs raise `ActorError`. No-match and partial results require inspecting `summary` and `errors`; diagnostic rows must not be mistaken for useful results.

Rows can be serialized as JSON or used in your own CSV/Excel pipeline. Native Dataset exports are available in Apify. Optional integrations and credentials depend on the Actor.

[Hosted Actor](https://apify.com/apivault_labs/bilibili-popular-videos-prototype) | [Source](https://github.com/apivault-labs/apivault-labs/tree/main/packages/apivault-bilibili-popular-videos-prototype) | [PyPI](https://pypi.org/project/apivault-bilibili-popular-videos-prototype/)


## Related integration

[Python client](https://github.com/apivault-labs/apivault-labs/tree/main/packages/apivault-bilibili-popular-videos-prototype) · [PyPI](https://pypi.org/project/apivault-bilibili-popular-videos-prototype/) · [n8n source and workflow](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-bilibili-popular-videos-prototype) · [npm](https://www.npmjs.com/package/n8n-nodes-apivault-bilibili-popular-videos-prototype)


## Source coverage and limits

Popular feed only; no keyword search, detail scraping, comments, transcripts or complete archive. Snapshot differences are observed changes, not guaranteed stable rankings. Missing metrics remain null; negative differences remain negative. Reading a saved run does not fetch later pages; configure a new collection run explicitly.


## Collection and spend limits

The small example sets `maxVideos` to bound paid collection. `max_rows` / Maximum Rows to Read limits only the dataset download. The event charge cap does not cap infrastructure or proxy usage. The clients do not start an automatic paid retry after a start request fails. Save the run ID and inspect that run before starting another. For source failures, inspect SUMMARY and ERRORS in Apify Console; Client.result only returns successful runs.

The hosted Actor also charges an Actor Start event at USD 0.00005 per GB of configured memory, minimum one event, in addition to delivered-result events and infrastructure usage. Empty or failed runs can still incur start and resource costs.
