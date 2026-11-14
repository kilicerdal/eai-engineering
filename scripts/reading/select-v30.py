from pathlib import Path
import json,re
root=Path.cwd();cache=Path('/private/tmp/reading-v30-sources');rows=json.loads((cache/'candidates.json').read_text())
wrong={'668','746','1562','918','372','283','667','2946','222','565','220','5652','1516','1523'}
less={'883','963','700','968','967','143','122','4045','8118','176','4264','9830','805','1937','1188','1938','1715'}
selected=[r for r in rows if r['id'] not in wrong|less]
assert len(selected)==100,len(selected)
for r in selected:
 if r['id']=='18857':r['title']='A Journey to the Centre of the Earth'
 if r['id']=='164':r['title']='Twenty Thousand Leagues under the Sea'
 if r['id']=='4368':r['title']='Flappers and Philosophers';r['note']='Separate stories explore aspiration, performance, and surprising changes of circumstance.'
 r['moods']=['Curious','Reflective'] if r['genre'] in ['Essays','Science writing','Natural history','Social nonfiction','Memoir','Travel writing'] else ['Adventurous','Curious'] if r['genre'] in ['Adventure','Science fiction','Fantasy'] else ['Lighthearted','Curious'] if r['genre'] in ['Fairy tales','Stories & fables','Romance'] else ['Reflective','Unsettling']
 # The importer uses the source catalogue title separately from the editorial display title.
 r['titleDisplay']=r['title'];r['title']=r['sourceTitle']
(cache/'selected.json').write_text(json.dumps(selected,ensure_ascii=False,indent=2))
cur={r['id']:{'title':r['titleDisplay'],'genre':r['genre'],'moods':r['moods'],'note':r['note']} for r in selected}
(root/'scripts/reading/v30-curation.json').write_text(json.dumps(cur,ensure_ascii=False,indent=2))
print('Selected',len(selected))
