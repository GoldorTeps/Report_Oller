const fs = require('fs');
const path = require('path');

const dir = './reports';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
const reports = [];

for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const fm = parseFrontmatter(content);
    if (fm.title && fm.date) {
        reports.push({
            id: file.replace('.md', ''),
            title: fm.title,
            date: fm.date,
            file: `reports/${file}`,
            ...(fm.project && { project: fm.project }),
            ...(fm.type   && { type: fm.type })
        });
    }
}

reports.sort((a, b) => b.date.localeCompare(a.date));
fs.writeFileSync('manifest.json', JSON.stringify({ reports }, null, 2));
console.log(`✓ ${reports.length} reports indexados`);

function parseFrontmatter(content) {
    const m = content.match(/^---\n([\s\S]*?)\n---/);
    if (!m) return {};
    const fm = {};
    m[1].split('\n').forEach(line => {
        const i = line.indexOf(':');
        if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    });
    return fm;
}
