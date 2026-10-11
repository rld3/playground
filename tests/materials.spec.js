import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
test('all cited excerpts match retained primary documents and file hashes',()=>{
 const context={window:{}};vm.runInNewContext(readFileSync('public/paypal-data.js','utf8'),context);const seed=context.window.PAYPAL_EARNINGS;
 const texts=['release','10q'].map(n=>readFileSync(`public/materials/paypal-q2-2026-${n}.txt`,'utf8'));
 const evidence=[...seed.metrics,...seed.facts,...seed.agendas,...seed.risks].map(x=>x.evidence).concat(Object.values(seed.lensEvidence).flat());
 for(const e of evidence)expect(texts[e.index]).toContain(e.text);
 for(const m of JSON.parse(readFileSync('public/materials/manifest.json','utf8')))expect(createHash('sha256').update(readFileSync('public/materials/'+m.file)).digest('hex')).toBe(m.sha256);
 // Independently reconcile key GAAP comparatives to the 10-Q, not just the release.
 expect(texts[1]).toContain('Net revenues $ 8,682 $ 8,288');
 expect(texts[1]).toContain('Diluted $ 1.25 $ 1.29');
 expect(texts[1]).toContain('Operating income 1,427 1,504');
});
