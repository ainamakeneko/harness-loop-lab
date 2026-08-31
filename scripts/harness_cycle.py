#!/usr/bin/env python3
from __future__ import annotations
import argparse, json
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4
ROOT = Path(__file__).resolve().parents[1]
RUNS = ROOT / "docs" / "runs"
ALLOWED = {"verification_failure","human_intervention","requirement_miss","unnecessary_change","agent_wandering","other"}
def now(): return datetime.now(timezone.utc).isoformat()
def path(run): return RUNS / f"{run}.json"
def load(run):
    p=path(run)
    if not p.exists(): raise SystemExit(f"Unknown run ID: {run}")
    return json.loads(p.read_text(encoding="utf-8"))
def save(data):
    RUNS.mkdir(parents=True,exist_ok=True)
    path(data["run_id"]).write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
def start(_):
    run=datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")+"-"+uuid4().hex[:6]
    save({"run_id":run,"started_at":now(),"finished_at":None,"status":"running","events":[]}); print(run)
def event(a):
    if a.kind not in ALLOWED: raise SystemExit("Invalid kind")
    d=load(a.run); d["events"].append({"at":now(),"kind":a.kind,"detail":a.detail}); save(d); print(f"Recorded {a.kind}")
def finish(a):
    d=load(a.run); d["finished_at"]=now(); d["status"]="finished"; save(d); print(f"Finished {a.run} with {len(d['events'])} event(s)")
def main():
    p=argparse.ArgumentParser(); s=p.add_subparsers(dest="command",required=True)
    q=s.add_parser("start"); q.set_defaults(func=start)
    q=s.add_parser("event"); q.add_argument("--run",required=True); q.add_argument("--kind",required=True); q.add_argument("--detail",required=True); q.set_defaults(func=event)
    q=s.add_parser("finish"); q.add_argument("--run",required=True); q.set_defaults(func=finish)
    a=p.parse_args(); a.func(a)
if __name__ == "__main__": main()
