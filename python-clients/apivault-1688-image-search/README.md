# 1688 Reverse Image Search — Python client

Find 1688 and Taobao product matches from photos; compare returned prices and suppliers. Bulk export: JSON, CSV, Excel and API. PPE: from $3.25/1K successful photo searches; usage extra.

This client starts the hosted [Apify Actor](https://apify.com/apivault_labs/1688-image-search), waits for completion and downloads Dataset records. It also reads SUMMARY and ERRORS when available. Source coverage and result fields depend on the Actor.

## Install

```bash
pip install apivault-1688-image-search
```

## Run

Set `APIFY_TOKEN` in your environment. Replace the example values with your own valid inputs from the [Actor input form](https://apify.com/apivault_labs/1688-image-search/input).

```python
from apivault_1688_image_search import Client, WaitTimeout

client = Client()
actor_input = {
    "maxResults": 1
}
result = client.run(actor_input, max_total_charge_usd=0.05, max_rows=100)
print(result.run_id, len(result.rows), result.truncated)
print(result.summary)
```

An Apify account and token are required. The package has no subscription of its own; hosted runs are billed by Apify under the Actor pricing. The event charge cap may not include platform usage. Review the [current price](https://apify.com/apivault_labs/1688-image-search/pricing) before changing it. `max_rows` limits the download, not the Actor collection or its charges; configure an Actor result limit too.

## Resume and diagnostics

`client.start(input)` returns a run ID; `client.wait(run_id)` and `client.result(run_id)` resume an existing run. A `WaitTimeout` exposes `run_id`. Starting a run is never automatically retried. Use an existing run ID after a connection or waiting failure to avoid duplicate paid runs. Failed and aborted runs raise `ActorError`. No-match and partial results require inspecting `summary` and `errors`; diagnostic rows must not be mistaken for useful results.

Rows can be serialized as JSON or used in your own CSV/Excel pipeline. Native Dataset exports are available in Apify. Optional integrations and credentials depend on the Actor.

[Hosted Actor](https://apify.com/apivault_labs/1688-image-search) · [Source](https://github.com/apivault-labs/apivault-labs/tree/main/python-clients/apivault-1688-image-search) · [PyPI](https://pypi.org/project/apivault-1688-image-search/)

<!-- apivault-integrations:start -->
## Hosted Actor and integrations

- [Run 1688 Reverse Image Search — Bulk Taobao API on Apify](https://apify.com/apivault_labs/1688-image-search).
- [Current pricing and usage terms](https://apify.com/apivault_labs/1688-image-search/pricing).
- [n8n community package: n8n-nodes-apivault-1688-image-search](https://www.npmjs.com/package/n8n-nodes-apivault-1688-image-search).
- [n8n source and usage](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-1688-image-search).

An Apify account and API token are required. Hosted Actor/platform charges apply. npm publication is not n8n verification or confirmation of n8n Cloud availability.
<!-- apivault-integrations:end -->
