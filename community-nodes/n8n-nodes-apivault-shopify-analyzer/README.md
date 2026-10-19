# Shopify Store Analyzer — n8n node

Calls the hosted [Apify Actor](https://apify.com/apivault_labs/shopify-store-analyzer). Requires your own Apify credential; Apify run charges apply.

Install `n8n-nodes-apivault-shopify-analyzer` through Settings → Community nodes → Install in self-hosted n8n.

## Upgrade compatibility

Existing node names, credential type and input parameter names are retained. Existing version 1 workflows keep their previous charge behavior unless an event cap is selected. New version 2 nodes default to a $0.05 event charge cap and 1,000 downloaded rows; platform usage can be charged separately. Select Read Existing Run and provide the Run ID to resume without starting a paid duplicate. Full output includes run metadata, SUMMARY and ERRORS when available. Dataset rows retain their original fields and paired input item. Actor build is latest.

Runtime dependencies: none. n8n Cloud availability requires separate n8n verification.

## Related clients

- [Apify Actor and current input/pricing](https://apify.com/apivault_labs/shopify-store-analyzer)
- [Install this community node from npm](https://www.npmjs.com/package/n8n-nodes-apivault-shopify-analyzer)
- [Python SDK source and examples](https://github.com/apivault-labs/shopify-store-analyzer-python)
- [Python package on PyPI](https://pypi.org/project/shopify-store-analyzer/)

The published Python SDK 0.1.0 covers URL analysis. Use the Actor API for discovery, presets and newer options. npm publication does not establish n8n Cloud verification.

<!-- apivault-integrations:start -->
## Hosted Actor and integrations

- [Run Shopify Store Analyzer — No Login, Apps, Emails & Phones on Apify](https://apify.com/apivault_labs/shopify-store-analyzer).
- [Current pricing and usage terms](https://apify.com/apivault_labs/shopify-store-analyzer/pricing).
- [n8n community package: n8n-nodes-apivault-shopify-analyzer](https://www.npmjs.com/package/n8n-nodes-apivault-shopify-analyzer).
- [n8n source and usage](https://github.com/apivault-labs/n8n-nodes-apivault-shopify-analyzer).
- [Python client](https://github.com/apivault-labs/shopify-store-analyzer-python).

An Apify account and API token are required. Hosted Actor/platform charges apply. npm publication is not n8n verification or confirmation of n8n Cloud availability.
<!-- apivault-integrations:end -->
