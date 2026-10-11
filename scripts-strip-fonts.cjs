const fs = require('fs');
const path = require('path');
function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) walk(fp, out);
    else if (f.endsWith('.css')) out.push(fp);
    else if (f.endsWith('.html')) out.push(fp);
  }
  return out;
}
for (const f of walk('dist')) {
  let s = fs.readFileSync(f, 'utf8');
  const before = s.length;
  s = s.replace(/@import\s+["']https?:\/\/fonts\.googleapis\.com[^"']*["'];?\s*/g, '');
  s = s.replace(/<link[^>]*fonts\.googleapis\.com[^>]*>\s*/g, '');
  if (s.length !== before) {
    fs.writeFileSync(f, s);
    console.log(`stripped google fonts from ${f}`);
  }
}
