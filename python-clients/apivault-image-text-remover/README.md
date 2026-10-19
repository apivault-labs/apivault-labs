# Image Text Remover — Python client

Remove text overlays from uploaded photos or image URLs; download edited images and result links. Bulk result-link export: JSON, CSV, Excel and API. PPE: $10/1K image results; start fee, usage extra.

This client starts the hosted [Apify Actor](https://apify.com/apivault_labs/image-text-remover), waits for completion and downloads Dataset records. It also reads SUMMARY and ERRORS when available. Source coverage and result fields depend on the Actor.

## Install

```bash
pip install apivault-image-text-remover
```

## Run

Set `APIFY_TOKEN` in your environment. Replace the example values with your own valid inputs from the [Actor input form](https://apify.com/apivault_labs/image-text-remover/input).

```python
from apivault_image_text_remover import Client, WaitTimeout

client = Client()
actor_input = {
    "imageUrls": [
        "REPLACE_WITH_YOUR_INPUT"
    ]
}
result = client.run(actor_input, max_total_charge_usd=0.05, max_rows=100)
print(result.run_id, len(result.rows), result.truncated)
print(result.summary)
```

An Apify account and token are required. The package has no subscription of its own; hosted runs are billed by Apify under the Actor pricing. The event charge cap may not include platform usage. Review the [current price](https://apify.com/apivault_labs/image-text-remover/pricing) before changing it. `max_rows` limits the download, not the Actor collection or its charges; configure an Actor result limit too.

## Resume and diagnostics

`client.start(input)` returns a run ID; `client.wait(run_id)` and `client.result(run_id)` resume an existing run. A `WaitTimeout` exposes `run_id`. Starting a run is never automatically retried. Use an existing run ID after a connection or waiting failure to avoid duplicate paid runs. Failed and aborted runs raise `ActorError`. No-match and partial results require inspecting `summary` and `errors`; diagnostic rows must not be mistaken for useful results.

Rows can be serialized as JSON or used in your own CSV/Excel pipeline. Native Dataset exports are available in Apify. Optional integrations and credentials depend on the Actor.

[Hosted Actor](https://apify.com/apivault_labs/image-text-remover) · [Source](https://github.com/apivault-labs/apivault-labs/tree/main/python-clients/apivault-image-text-remover) · [PyPI](https://pypi.org/project/apivault-image-text-remover/)

<!-- apivault-integrations:start -->
## Hosted Actor and integrations

- [Run Image Text Remover — Bulk Photo Editing API on Apify](https://apify.com/apivault_labs/image-text-remover).
- [Current pricing and usage terms](https://apify.com/apivault_labs/image-text-remover/pricing).
- [n8n community package: n8n-nodes-apivault-image-text-remover](https://www.npmjs.com/package/n8n-nodes-apivault-image-text-remover).
- [n8n source and usage](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-image-text-remover).

An Apify account and API token are required. Hosted Actor/platform charges apply. npm publication is not n8n verification or confirmation of n8n Cloud availability.
<!-- apivault-integrations:end -->
