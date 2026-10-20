"""Small Store Leads export. Starts once; no automatic run-creation retries."""
import argparse,json,os,time,urllib.request
from pathlib import Path
BASE="https://api.apify.com/v2/"
def request(path,token,body=None):
    req=urllib.request.Request(BASE+path,data=None if body is None else json.dumps(body).encode(),headers={"Authorization":"Bearer "+token,"Content-Type":"application/json"})
    with urllib.request.urlopen(req,timeout=90) as response:return json.load(response)
def main():
    parser=argparse.ArgumentParser();parser.add_argument("--max-items",type=int,default=10);parser.add_argument("--output",default="store-leads.json");args=parser.parse_args()
    if not 1<=args.max_items<=10:parser.error("This first-run example accepts 1 to 10 rows.")
    token=os.environ["APIFY_TOKEN"]
    run=request("acts/apivault_labs~store-leads-database/runs?build=latest&memory=512&timeout=900&maxTotalChargeUsd=0.12",token,{"storePlatforms":["shopify"],"country":["US"],"hasEmail":True,"maxItems":args.max_items})["data"]
    print("Run:",run["id"]);deadline=time.monotonic()+950
    while run["status"] not in {"SUCCEEDED","FAILED","ABORTED","TIMED-OUT"}:
        if time.monotonic()>deadline:raise RuntimeError("Polling timed out; recover this existing run, do not start again: "+run["id"])
        time.sleep(5);run=request("actor-runs/"+run["id"],token)["data"]
    if run["status"]!="SUCCEEDED":raise RuntimeError("Run failed: "+run["id"])
    summary=request("key-value-stores/"+run["defaultKeyValueStoreId"]+"/records/SUMMARY",token)
    if summary.get("failedShards") or not summary.get("success"):raise RuntimeError("Incomplete source coverage; inspect existing run: "+run["id"])
    rows=request("datasets/"+run["defaultDatasetId"]+"/items?clean=true&format=json",token)
    Path(args.output).write_text(json.dumps(rows,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print("Saved",len(rows),"rows to",args.output,"; inspect SUMMARY before using results")
if __name__=="__main__":main()
