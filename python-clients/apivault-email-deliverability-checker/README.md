# Bulk Email Verifier & Finder — Python client

Check email and sender-auth signals or generate finder candidates; unknown mailbox status stays explicit. No login. Bulk export: JSON, CSV, Excel and API. PPE: from $0.4/1K email verification results; start fee, usage extra; mode rates differ.

This client starts the hosted [Apify Actor](https://apify.com/apivault_labs/email-deliverability-checker), waits for completion and downloads Dataset records. It also reads SUMMARY and ERRORS when available. Source coverage and result fields depend on the Actor.

## Install

```bash
pip install apivault-email-deliverability-checker
```

## Run

Set `APIFY_TOKEN` in your environment. Replace the example values with your own valid inputs from the [Actor input form](https://apify.com/apivault_labs/email-deliverability-checker/input).

```python
from apivault_email_deliverability_checker import Client, WaitTimeout

client = Client()
actor_input = {
    "emails": [
        "REPLACE_WITH_YOUR_INPUT"
    ]
}
result = client.run(actor_input, max_total_charge_usd=0.05, max_rows=100)
print(result.run_id, len(result.rows), result.truncated)
print(result.summary)
```

An Apify account and token are required. The package has no subscription of its own; hosted runs are billed by Apify under the Actor pricing. The event charge cap may not include platform usage. Review the [current price](https://apify.com/apivault_labs/email-deliverability-checker/pricing) before changing it. `max_rows` limits the download, not the Actor collection or its charges; configure an Actor result limit too.

## Resume and diagnostics

`client.start(input)` returns a run ID; `client.wait(run_id)` and `client.result(run_id)` resume an existing run. A `WaitTimeout` exposes `run_id`. Starting a run is never automatically retried. Use an existing run ID after a connection or waiting failure to avoid duplicate paid runs. Failed and aborted runs raise `ActorError`. No-match and partial results require inspecting `summary` and `errors`; diagnostic rows must not be mistaken for useful results.

Rows can be serialized as JSON or used in your own CSV/Excel pipeline. Native Dataset exports are available in Apify. Optional integrations and credentials depend on the Actor.

[Hosted Actor](https://apify.com/apivault_labs/email-deliverability-checker) · [Source](https://github.com/apivault-labs/apivault-labs/tree/main/python-clients/apivault-email-deliverability-checker) · [PyPI](https://pypi.org/project/apivault-email-deliverability-checker/)

<!-- apivault-integrations:start -->
## Hosted Actor and integrations

- [Run Bulk Email Verifier & Finder — No Login, CSV API on Apify](https://apify.com/apivault_labs/email-deliverability-checker).
- [Current pricing and usage terms](https://apify.com/apivault_labs/email-deliverability-checker/pricing).
- [n8n community package: n8n-nodes-apivault-email-intel](https://www.npmjs.com/package/n8n-nodes-apivault-email-intel).
- [n8n community package: n8n-nodes-apivault-email-verifier](https://www.npmjs.com/package/n8n-nodes-apivault-email-verifier).
- [n8n source and usage](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-email-intel).
- [n8n source and usage](https://github.com/apivault-labs/apivault-labs/tree/main/community-nodes/n8n-nodes-apivault-email-verifier).

An Apify account and API token are required. Hosted Actor/platform charges apply. npm publication is not n8n verification or confirmation of n8n Cloud availability.
<!-- apivault-integrations:end -->
