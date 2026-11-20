import json,urllib.request,urllib.parse,time,pathlib,re,subprocess
ROOT=pathlib.Path(__file__).resolve().parents[2]
selection=json.loads((ROOT/'data/art/selection.json').read_text())
fix={'The Annunciation (Leonardo)':'Annunciation (Leonardo)','The Creation of Eve':'Creation of Eve (Michelangelo)'}
items=[(a,i,fix.get(t,t)) for a,ts in selection.items() for i,t in enumerate(ts)]
rows=[]
for start in range(0,len(items),10):
 batch=items[start:start+10];cache=ROOT/f'tmp/art-research/batch-{start}.json'
 if cache.exists():d=json.loads(cache.read_text())
 else:
  url='https://en.wikipedia.org/w/api.php?'+urllib.parse.urlencode({'action':'query','format':'json','prop':'extracts|pageimages|revisions','exintro':1,'explaintext':1,'exlimit':10,'piprop':'original','rvprop':'content','rvslots':'main','redirects':1,'titles':'|'.join(t for _,_,t in batch)})
  for attempt in range(4):
   try:
    d=json.loads(subprocess.check_output(['curl','-fsS','--retry','2','--max-time','50',url]))
    cache.write_text(json.dumps(d,ensure_ascii=False));break
   except Exception as e:
    print('retry',start,str(e),flush=True)
    if attempt==3:raise
    time.sleep(15)
  time.sleep(3)
 pages=list(d.get('query',{}).get('pages',{}).values());redirects={v['from']:v['to'] for v in d.get('query',{}).get('redirects',[])}
 for artist,index,title in batch:
  real=redirects.get(title,title);p=next((p for p in pages if p['title']==real),{})
  if not p or 'missing' in p:rows.append({'artist':artist,'index':index,'requested':title,'error':'missing'});print('MISSING',artist,index,title,flush=True);continue
  w=p.get('revisions',[{}])[0].get('slots',{}).get('main',{}).get('*','')
  # Keep source wikitext to review precise metadata and ambiguity, not ship it to clients.
  begin=re.search(r'{{Infobox[ _]artwork',w,re.I)
  box=w
  if begin:
   depth=0;pos=begin.start()
   for token in re.finditer(r'{{|}}',w[pos:]):
    depth+=1 if token.group()=='{{' else -1
    if depth==0:box=w[pos:pos+token.end()];break
  fields={k.strip():v.strip() for k,v in re.findall(r'^\|\s*([\w ]+)\s*=\s*(.*)',box,re.M)}
  image=p.get('original',{}).get('source','');file=fields.get('image') or urllib.parse.unquote(image.split('/')[-1].split('?')[0])
  row={'artist':artist,'index':index,'requested':title,'title':p['title'],'pageTitle':p['title'],'pageId':p['pageid'],'fields':fields,'file':file,'imageOriginal':image.split('?')[0],'lead':[p.get('extract','')],'externalLinks':list(dict.fromkeys(re.findall(r'https?://[^\s<>\]{}|]+',w))),'referenceUrl':'https://en.wikipedia.org/wiki/'+urllib.parse.quote(p['title'].replace(' ','_')),'retrieved':'2026-11-19'}
  rows.append(row);print(artist,index,p['title'],flush=True)
(ROOT/'data/art/research.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
print('COMPLETE',len(rows),flush=True)
