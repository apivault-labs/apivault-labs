# Yelp Business Scraper — n8n node

Calls the hosted [Apify Actor](https://apify.com/apivault_labs/yelp-business-scraper). Requires your own Apify credential; Apify run charges apply.

Install `n8n-nodes-apivault-yelp` through Settings → Community nodes → Install in self-hosted n8n.

## Upgrade compatibility

Existing node names, credential type and input parameter names are retained. Existing version 1 workflows keep their previous charge behavior unless an event cap is selected. New version 2 nodes default to a $0.05 event charge cap and 1,000 downloaded rows; platform usage can be charged separately. Select Read Existing Run and provide the Run ID to resume without starting a paid duplicate. Full output includes run metadata, SUMMARY and ERRORS when available. Dataset rows retain their original fields and paired input item. Actor build is latest.

Runtime dependencies: none. n8n Cloud availability requires separate n8n verification.

<!-- apivault-integrations:start -->
## Hosted Actor and integrations

- [Run Yelp Business Scraper — Phones, Emails & Website Leads on Apify](https://apify.com/apivault_labs/yelp-business-scraper).
- [Current pricing and usage terms](https://apify.com/apivault_labs/yelp-business-scraper/pricing).
- [n8n community package: n8n-nodes-apivault-yelp](https://www.npmjs.com/package/n8n-nodes-apivault-yelp).
- [Python client](https://github.com/apivault-labs/apivault-labs/tree/main/python-clients/apivault-yelp-business-scraper).
- [Python client](https://github.com/apivault-labs/yelp-business-analyzer-python).
- [n8n source and usage](https://github.com/apivault-labs/n8n-nodes-apivault-yelp).

An Apify account and API token are required. Hosted Actor/platform charges apply. npm publication is not n8n verification or confirmation of n8n Cloud availability.
<!-- apivault-integrations:end -->
