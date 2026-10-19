"""pip install apify-client; set your own APIFY_TOKEN. Charges apply."""
import os
from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])
run = client.actor("apivault_labs/shopify-store-leads-scraper").call(
    run_input={"searchTerms": ["organic coffee"], "maxStores": 3, "requireEmail": True},
    max_total_charge_usd=0.05,
)
print(client.key_value_store(run["defaultKeyValueStoreId"]).get_record("SUMMARY"))
print(client.key_value_store(run["defaultKeyValueStoreId"]).get_record("ERRORS"))
for row in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(row)
