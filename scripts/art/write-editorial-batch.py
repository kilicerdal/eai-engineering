"""Split an authored editorial batch; never generates prose or changes collection IDs."""
from pathlib import Path
import sys,re
text=sys.stdin.read()
parts=re.split(r'^@@ (painters|paintings|eras|essays)/([a-z0-9-]+)\s*$',text,flags=re.M)
for i in range(1,len(parts),3):
 kind,id,body=parts[i:i+3]
 Path('data/art/editorial-v2',kind,id+'.md').write_text(body.strip()+'\n')
 print(kind+'/'+id)
