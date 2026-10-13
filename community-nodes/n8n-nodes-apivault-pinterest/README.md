# Pinterest Profile Scraper — n8n node

Calls the hosted [Apify Actor](https://apify.com/apivault_labs/pinterest-scraper). Requires your own Apify credential; Apify run charges apply.

Install `n8n-nodes-apivault-pinterest` through Settings → Community nodes → Install in self-hosted n8n.

## Upgrade compatibility

Existing node names, credential type and input parameter names are retained. Existing version 1 workflows keep their previous charge behavior unless an event cap is selected. New version 2 nodes default to a $0.05 event charge cap and 1,000 downloaded rows; platform usage can be charged separately. Select Read Existing Run and provide the Run ID to resume without starting a paid duplicate. Full output includes run metadata, SUMMARY and ERRORS when available. Dataset rows retain their original fields and paired input item. Actor build is latest.

Runtime dependencies: none. n8n Cloud availability requires separate n8n verification.
