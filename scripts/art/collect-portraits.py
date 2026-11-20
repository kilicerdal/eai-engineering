import json,subprocess,urllib.parse,pathlib,time
root=pathlib.Path('tmp/art-portraits');root.mkdir(parents=True,exist_ok=True)
names={'leonardo':'Leonardo da Vinci','michelangelo':'Michelangelo','raphael':'Raphael','caravaggio':'Caravaggio','rembrandt':'Rembrandt','vermeer':'Johannes Vermeer','gentileschi':'Artemisia Gentileschi','goya':'Francisco Goya','turner':'J. M. W. Turner','monet':'Claude Monet','morisot':'Berthe Morisot','van-gogh':'Vincent van Gogh','cezanne':'Paul Cézanne','cassatt':'Mary Cassatt','kandinsky':'Wassily Kandinsky'}
def get(host,args):
 u='https://'+host+'/w/api.php?'+urllib.parse.urlencode({'format':'json',**args});return json.loads(subprocess.check_output(['curl','-fLsS','--max-time','35',u]))
a=get('en.wikipedia.org',{'action':'query','prop':'pageimages','piprop':'original','titles':'|'.join(names.values()),'redirects':'1'})
pathlib.Path(root/'pages.json').write_text(json.dumps(a,indent=2))
files=[]
for id,title in names.items():
 page=next((p for p in a['query']['pages'].values() if p['title']==title),None)
 if not page: continue
 src=page.get('original',{}).get('source','');f=urllib.parse.unquote(src.split('?')[0].split('/')[-1]);files.append((id,title,'File:'+f))
b=get('commons.wikimedia.org',{'action':'query','prop':'imageinfo','iiprop':'url|extmetadata','iiurlwidth':'640','titles':'|'.join(x[2] for x in files)})
pathlib.Path(root/'rights.json').write_text(json.dumps(b,indent=2));out=[]
for id,title,f in files:
 p=next((p for p in b['query']['pages'].values() if p['title'].replace('_',' ')==f.replace('_',' ')),None)
 if not p or 'imageinfo' not in p:continue
 info=p['imageinfo'][0];license=info.get('extmetadata',{}).get('LicenseShortName',{}).get('value','')
 if license not in ['Public domain','CC0']:print('REVIEW',id,license,flush=True);continue
 raw=root/id;urls=[info.get('thumburl',''),info['url'].split('?')[0]]
 ok=False
 for url in urls:
  if not url:continue
  try:subprocess.run(['curl','-fLsS','--max-time','25','--max-filesize','50000000',url,'-o',str(raw)],check=True,capture_output=True);ok=True;break
  except:pass
 if ok:out.append({'id':id,'title':title,'raw':str(raw),'source':info['descriptionurl'],'rights':license,'description':info.get('extmetadata',{}).get('ImageDescription',{}).get('value','')});print('READY',id,flush=True)
pathlib.Path('data/art/portraits-research.json').write_text(json.dumps(out,indent=2)+'\n')
