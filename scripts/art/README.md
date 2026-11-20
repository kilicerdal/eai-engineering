# Art Room curation

The runtime collection is `data/art/paintings.json`, with local reproductions and thumbnails in `public/images/art/`. Each entry retains its image source, license link and supporting references. `portraits.json` records portrait credits; uncertain identifications remain labeled in the UI.

`selection.json` and `editorial.txt` are authored inputs. The collection scripts fetch intermediate museum/Wikimedia metadata into ignored `data/art/research.json`, `rights.json`, `portraits-research.json` and `tmp/`. These are acquisition caches, not runtime content or release files. Review the actual work, version, metadata and licensing before rebuilding a collection; a successful download alone does not verify attribution.

V1.1 adds optional looking tools, private notes, personal collections, return state and previewed backup merging. It preserves the V1 gallery key and every other learning room's storage.
