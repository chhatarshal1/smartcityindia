import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
const [chipPath,cachePath]=process.argv.slice(2);
if(!chipPath||!cachePath)throw new Error('Usage: node scripts/import-previews.mjs /path/to/chip.html /path/to/cache.html');
const chip=readFileSync(chipPath,'utf8'),cache=readFileSync(cachePath,'utf8');
const bridge='<script src="/previews/embed-bridge.js"></script>';
const chipEmbed=chip.replace('How a chip is made — Anatomy','How a chip is made — Smart City India').replace('</head>','<style>main{padding:24px;max-width:1100px}main>h1,main>.intro,main>.eyebrow{display:none}.explanation{min-height:130px}.note{font-size:11px}</style></head>').replace('</body>',bridge+'</body>');
writeFileSync(resolve('public/previews/chip-making.html'),chipEmbed.replace('FIG. 02 · MAGNIFIED MODEL','FIG. 01 · MAGNIFIED MODEL'));
const cacheEmbed=cache.replace('<style>', '<meta charset="utf-8"><title>The nearby copy — Smart City India</title><style>')+bridge;
writeFileSync(resolve('public/previews/cache.html'),cacheEmbed.replace('FIG. 01','FIG. 02'));
function svgOf(html){return html.match(/<svg\b[\s\S]*?<\/svg>/)[0]}
function stylesOf(html){return [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join('\n')}
let svg=svgOf(chip).replace(/class="iso-svg"/,'class="iso iso-svg" data-theme="light"').replace(/<g data-scene="(\d+)"(?: style="display:none")?>/g,(_,n)=>`<g data-scene="${n}"${n==='8'?'':' style="display:none"'}>`);
svg=svg.replace(/(<svg[^>]*>)/,`$1<style>${stylesOf(chip)} .iso{--film:#a4bbc9;--resist:#c8b7de;--copper:#c39460;--ink:#252b2a} .iso-svg{overflow:visible}</style>`);
writeFileSync(resolve('public/images/chip.svg'),svg.replace(/data-(arrive|beam)>/g,'data-$1="">'));
let csv=svgOf(cache).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" id="cache-lesson" ');
csv=csv.replace(/(<svg[^>]*>)/,`$1<style>${stylesOf(cache)} #cache-lesson{--foreground:#344235;--background:#fafafa;--muted:#eee;--viz-series-1:#247e65}</style>`);
writeFileSync(resolve('public/images/cache.svg'),csv);
console.log('Imported both standalone previews and illustration thumbnails.');
