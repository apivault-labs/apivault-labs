# Facebook Marketplace Scraper - Listings, Prices, Sellers & Contacts (No Login) — n8n node

Calls the hosted [Apify Actor](https://apify.com/apivault_labs/facebook-marketplace-scraper). Requires your own Apify credential; Apify run charges apply.

Install `n8n-nodes-apivault-facebook-marketplace` through Settings → Community nodes → Install in self-hosted n8n.

## Upgrade compatibility

Existing node names, credential type and input parameter names are retained. Existing version 1 workflows keep their previous charge behavior unless an event cap is selected. New version 2 nodes default to a $0.05 event charge cap and 1,000 downloaded rows; platform usage can be charged separately. Select Read Existing Run and provide the Run ID to resume without starting a paid duplicate. Full output includes run metadata, SUMMARY and ERRORS when available. Dataset rows retain their original fields and paired input item. Actor build is latest.

Runtime dependencies: none. n8n Cloud availability requires separate n8n verification.

<!-- apivault-integrations:start -->
## Hosted Actor and integrations

- [Run Facebook Marketplace Scraper — Bulk CSV API on Apify](https://apify.com/apivault_labs/facebook-marketplace-scraper).
- [Current pricing and usage terms](https://apify.com/apivault_labs/facebook-marketplace-scraper/pricing).
- [n8n community package: n8n-nodes-apivault-facebook-marketplace](https://www.npmjs.com/package/n8n-nodes-apivault-facebook-marketplace).
- [Python client](https://github.com/apivault-labs/apivault-labs/tree/main/python-clients/apivault-facebook-marketplace-scraper).

An Apify account and API token are required. Hosted Actor/platform charges apply. npm publication is not n8n verification or confirmation of n8n Cloud availability.
<!-- apivault-integrations:end -->

## 0.2.1 input compatibility

An existing zero `daysSinceListed` is omitted from the Actor input. This keeps optional filters off or uses the Actor default limit. Positive explicit values remain unchanged.

## 0.2.2 failure guidance

FAILED, TIMED-OUT and ABORTED runs now report their final status and link to the exact run in Apify Console. Inspect the cause before starting another run. If reading fails because of a connection or Dataset error, keep the Run ID and use Read Existing Run to continue reading without a paid duplicate. No start request is automatically retried.
