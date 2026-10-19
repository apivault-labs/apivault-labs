# Ad Library Scraper — n8n node

Calls the hosted [Apify Actor](https://apify.com/apivault_labs/ad-library-scraper-facebook-tiktok-google-ads). Requires your own Apify credential; Apify run charges apply.

Install `n8n-nodes-apivault-ad-library` through Settings → Community nodes → Install in self-hosted n8n.

## Upgrade compatibility

Existing node names, credential type and input parameter names are retained. Existing version 1 workflows keep their previous charge behavior unless an event cap is selected. New version 2 nodes default to a $0.05 event charge cap and 1,000 downloaded rows; platform usage can be charged separately. Select Read Existing Run and provide the Run ID to resume without starting a paid duplicate. Full output includes run metadata, SUMMARY and ERRORS when available. Dataset rows retain their original fields and paired input item. Actor build is latest.

Runtime dependencies: none. n8n Cloud availability requires separate n8n verification.

<!-- apivault-integrations:start -->
## Hosted Actor and integrations

- [Run Ad Library Scraper — No Login, Bulk CSV API on Apify](https://apify.com/apivault_labs/ad-library-scraper-facebook-tiktok-google-ads).
- [Current pricing and usage terms](https://apify.com/apivault_labs/ad-library-scraper-facebook-tiktok-google-ads/pricing).
- [n8n community package: n8n-nodes-apivault-ad-library](https://www.npmjs.com/package/n8n-nodes-apivault-ad-library).
- [Python client](https://github.com/apivault-labs/apivault-labs/tree/main/python-clients/apivault-ad-library-scraper-facebook-tiktok-google-ads).

An Apify account and API token are required. Hosted Actor/platform charges apply. npm publication is not n8n verification or confirmation of n8n Cloud availability.
<!-- apivault-integrations:end -->
