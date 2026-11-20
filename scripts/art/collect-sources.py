"""Refresh only public Art Room metadata. No credentials or existing personal data.
Wikipedia facts are linked; image reuse is gated by Wikimedia rights metadata.
"""
import json,urllib.request,urllib.parse,time,re,pathlib,sys
from bs4 import BeautifulSoup
ROOT=pathlib.Path(__file__).resolve().parents[2]
selection=json.loads((ROOT/'data/art/selection.json').read_text())
cache=ROOT/'tmp/art-research';cache.mkdir(parents=True,exist_ok=True)
def get(params,host='en.wikipedia.org'):
 url='https://'+host+'/w/api.php?'+urllib.parse.urlencode({'format':'json',**params})
 for attempt in range(4):
  try:
   with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'eAI-Art-Room-local-research/1.0 (educational collection)'}),timeout=40) as r:return json.load(r)
  except Exception:
   if attempt==3:raise
   time.sleep(2+attempt)
rows=[]
for artist,titles in selection.items():
 for index,title in enumerate(titles):
  filename=cache/(artist+'-'+str(index)+'.json')
  if filename.exists():row=json.loads(filename.read_text())
  else:
   d=get({'action':'parse','page':title,'prop':'text|displaytitle','redirects':1})
   if 'error' in d: print('MISSING',artist,index,title,flush=True);rows.append({'artist':artist,'index':index,'requested':title,'error':d['error']});continue
   p=d['parse'];soup=BeautifulSoup(p['text']['*'],'html.parser');box=soup.select_one('table.infobox');fields={}
   if box:
    for tr in box.select('tr'):
     th,td=tr.find('th'),tr.find('td')
     if th and td:fields[th.get_text(' ',strip=True)]=td.get_text(' ',strip=True)
   img=box.select_one('img') if box else None
   pic=img.get('resource','').replace('./File:','') if img else ''
   if not pic and img:
    src=img.get('src','');parts=src.split('/');pic=urllib.parse.unquote(parts[-2] if '/thumb/' in src else parts[-1])
   paragraphs=[p.get_text(' ',strip=True) for p in soup.select('div.mw-parser-output > p') if len(p.get_text(strip=True))>70][:4]
   links=list(dict.fromkeys(a.get('href') for a in soup.select('a.external') if a.get('href','').startswith('http')))
   row={'artist':artist,'index':index,'requested':title,'title':BeautifulSoup(p.get('displaytitle',p['title']),'html.parser').get_text(),'pageTitle':p['title'],'pageId':p['pageid'],'fields':fields,'file':pic,'lead':paragraphs,'externalLinks':links,'referenceUrl':'https://en.wikipedia.org/wiki/'+urllib.parse.quote(p['title'].replace(' ','_')),'retrieved':'2026-11-19'}
   filename.write_text(json.dumps(row,ensure_ascii=False,indent=2));time.sleep(.3)
  rows.append(row);print(artist,index,row.get('title'),row.get('file'),flush=True)
(ROOT/'data/art/research.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
print('COMPLETE',len(rows),flush=True)
