import json,pathlib,urllib.parse,subprocess,time
root=pathlib.Path(__file__).resolve().parents[2];rows=json.loads((root/'data/art/research.json').read_text());result=[]
for n in range(0,len(rows),20):
 titles=['File:'+r['file'].replace('_',' ') for r in rows[n:n+20]]
 url='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode({'action':'query','format':'json','prop':'imageinfo','iiprop':'url|size|extmetadata','iiurlwidth':1280,'redirects':1,'titles':'|'.join(titles)})
 cache=root/f'tmp/art-research/rights-{n}.json'
 if cache.exists():d=json.loads(cache.read_text())
 else:
  d=json.loads(subprocess.check_output(['curl','-fsS','--retry','2','--max-time','60',url]));cache.write_text(json.dumps(d,ensure_ascii=False));time.sleep(4)
 result.extend(d.get('query',{}).get('pages',{}).values())
(root/'data/art/rights.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
for r in result:
 if not r.get('imageinfo'):print('MISSING',r['title'])
print('IMAGES',sum(bool(r.get('imageinfo')) for r in result))
