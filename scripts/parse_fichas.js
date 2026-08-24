/* Parses medicamentos/*.md (raw PDF-extracted Guies Clíniques text) into
   clean structured JSON for data/fichas.js. Strips navigation/header/footer
   cruft, keeps clinical text verbatim (Catalan), splits into sections. */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'medicamentos');
const OUT = path.join(__dirname, '..', 'data', 'fichas.js');

const SECTION_DEFS = [
  { key: 'presentacion', re: /^Presentaci(ó|ons)[^:]*:/i },
  { key: 'propiedadesIndicaciones', re: /^Propietats\s+i\s+Indicacions\b[^:]*:/i },
  { key: 'propiedades', re: /^Propietats\b[^:]*:/i },
  { key: 'indicaciones', re: /^Indicacions\b[^:]*:/i },
  { key: 'dosis', re: /^Dosi\b[^:]*:/i },
  { key: 'contraindicaciones', re: /^Contraindicacions\b[^:]*:/i },
  { key: 'efectosSecundarios', re: /^Efectes\s+secundaris\b[^:]*:/i },
  { key: 'observaciones', re: /^Observacions\b[^:]*:/i },
  { key: 'embarazo', re: /^Embar[aà]s(\s+i\s+lact[aà]ncia)?\b[^:]*:/i },
  { key: 'lactancia', re: /^Lact[aà]ncia\b[^:]*:/i },
  { key: 'pediatria', re: /^\(\+P\)\s*(Dosi\s+pedi[aà]trica|Pediatria)\b[^:]*:/i }
];

function clean(raw, drugName) {
  // strip Private Use Area codepoints (leaked embedded-font glyph refs from PDF extraction)
  raw = raw.replace(/[-]/g, '');
  let lines = raw.split('\n');
  const out = [];
  let altoRiesgo = false;
  let fuente = null;

  for (let line of lines) {
    const t = line.trim();
    if (t === '') { out.push(''); continue; }
    if (/^\d{1,2}\/\d{1,2}\/\d{2,4},\s*\d{1,2}:\d{2}(\s*Guies Clíniques)?$/.test(t)) continue;
    if (t === 'Guies Clíniques') continue;
    if (t === '/') continue;
    if (t === 'Cercar paraula...') continue;
    if (/^v\d+\.\d+\.\d+$/.test(t)) continue;
    if (/^\(V\.\d+\)\s*\d{1,2}\/\d{1,2}\/\d{4}$/.test(t)) continue;
    if (/^https:\/\/guiescliniques\.sem\.gencat\.cat\//.test(t)) { fuente = t; continue; }
    if (/^\d{1,2}\/\d{1,2}$/.test(t)) continue; // page counter "1/1", "1/2"
    if (t.toLowerCase() === drugName.toLowerCase()) continue; // repeated title
    if (/^Medicament d[’']alt risc$/i.test(t)) { altoRiesgo = true; continue; }
    // markdown-table artifacts from header cruft (date/title/alt-risc wrapped in a leaked
    // table row) — these never carry digits, unlike genuine weight/dose tables further down
    if (/^\|/.test(t)) {
      if (/^\|[\s|\-]+\|?$/.test(t)) continue; // separator or empty row
      if (/\d{1,2}\/\d{1,2}\/\d{2,4}.*Guies Clíniques/.test(t)) continue;
      if (/Medicament d[’']alt risc/i.test(t)) { altoRiesgo = true; continue; }
      const cellsOnly = t.replace(/^\||\|$/g, '');
      if (cellsOnly.split('|').map(c => c.trim()).filter(Boolean).every(c => c.toLowerCase() === drugName.toLowerCase())) continue;
    }
    out.push(line);
  }

  // collapse 2+ blank lines to 1
  let text = out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  return { text, altoRiesgo, fuente };
}

function splitSections(text) {
  // find all header matches with position
  const matches = [];
  const lines = text.split('\n');
  let pos = 0;
  const lineStarts = [];
  for (const l of lines) { lineStarts.push(pos); pos += l.length + 1; }

  lines.forEach((line, i) => {
    const t = line.trim();
    for (const def of SECTION_DEFS) {
      if (def.re.test(t)) {
        matches.push({ key: def.key, lineIndex: i, headerText: t });
        break;
      }
    }
  });

  if (matches.length === 0) return { sections: {}, intro: text.trim() };

  const sections = {};
  const intro = lines.slice(0, matches[0].lineIndex).join('\n').trim();

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const endLine = i + 1 < matches.length ? matches[i + 1].lineIndex : lines.length;
    const headerLine = lines[m.lineIndex];
    // strip the label itself from the first line, keep any trailing text on that line
    const afterLabel = headerLine.replace(SECTION_DEFS.find(d => d.key === m.key).re, '').trim();
    const bodyLines = lines.slice(m.lineIndex + 1, endLine);
    let body = (afterLabel ? afterLabel + '\n' : '') + bodyLines.join('\n');
    body = body.replace(/\n{2,}/g, '\n').split('\n').map(l => l.trim()).filter(Boolean).join('\n');
    // normalize bullets
    body = body.replace(/^[●]\s*/gm, '• ').replace(/^o\s{2,}/gm, '   ◦ ');
    if (sections[m.key]) sections[m.key] += '\n' + body; else sections[m.key] = body;
  }
  return { sections, intro };
}

function jsEscape(s) {
  return JSON.stringify(s == null ? '' : s);
}

// Known PDF-extraction OCR corruption at page/column breaks: exact trailing
// fragment sequences to strip (verified manually against source — these are
// garbled duplicates of already-captured text, not new information).
const GARBAGE_SUFFIXES = {
  'Adrenalina': { dosis: ['d 4/5 i', 'd l di', 'di à i', 't h', 'ió', 'd', 'fi', 'l', 'i'] },
  'Amiodarona': { observaciones: ['l', 'i'] },
  'Sulfat de magnesi': { efectosSecundarios: ['d', 'fl', 't d l bl', 'ió d', 'tò i', 'id', 'ió', 'b', 't', 'f', 'l', 'l', 'i'] },
  'Clorur de sodi 7,5 %': { observaciones: ['Preparació de', 'A partir de', 'Vol'] },
  'Insulina': { dosis: ['At', 'ió! Aj', 't', 'l', 'it', 't d’i', 'li', 'l b l', 'i', 'i', 'i', 'l', 'l', 'ü', 't t', 'l'] }
};

function stripKnownGarbage(name, sections) {
  const cfg = GARBAGE_SUFFIXES[name];
  if (!cfg) return sections;
  for (const [key, suffixLines] of Object.entries(cfg)) {
    if (!sections[key]) continue;
    let lines = sections[key].split('\n').filter(l => l.trim() !== '');
    const tail = lines.slice(-suffixLines.length).map(l => l.trim());
    if (JSON.stringify(tail) === JSON.stringify(suffixLines)) {
      lines = lines.slice(0, -suffixLines.length);
      sections[key] = lines.join('\n').trim();
      if (!sections[key]) delete sections[key];
    }
  }
  return sections;
}

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.md')).sort();
const entries = [];

for (const file of files) {
  const name = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
  const { text, altoRiesgo, fuente } = clean(raw, name);
  let { sections, intro } = splitSections(text);
  sections = stripKnownGarbage(name, sections);

  let subtitulo = null, alerta = null;
  intro = intro.trim();
  if (intro) {
    if (intro.includes('\r') || intro.length > 60) {
      alerta = intro.replace(/\r\n/g, ' ').replace(/\s{2,}/g, ' ').trim();
    } else {
      subtitulo = intro;
    }
  }

  entries.push({ file, name, altoRiesgo, fuente, subtitulo, alerta, sections });
}

// Write a JSON dump for inspection first
fs.writeFileSync(path.join(__dirname, 'fichas_parsed.json'), JSON.stringify(entries, null, 2), 'utf8');
console.log('Parsed', entries.length, 'fichas ->', path.join(__dirname, 'fichas_parsed.json'));

// quality report: how many have each section, how many look suspicious (very short sections, orphan intro)
const secCounts = {};
let noSections = 0;
for (const e of entries) {
  const keys = Object.keys(e.sections);
  if (keys.length === 0) noSections++;
  keys.forEach(k => secCounts[k] = (secCounts[k] || 0) + 1);
}
console.log('Section coverage:', secCounts);
console.log('Entries with NO sections detected:', noSections);
if (noSections) console.log(entries.filter(e => Object.keys(e.sections).length === 0).map(e => e.name));
