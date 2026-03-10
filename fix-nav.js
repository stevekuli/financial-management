const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
let replacedCount = 0;

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    // 把工具箱的那行 a 标签干掉
    const regex = /<a\s+href="calculator\.html">🧮 工具箱<\/a>\s*/g;
    if (regex.test(content)) {
        content = content.replace(regex, '');
        fs.writeFileSync(f, content, 'utf8');
        replacedCount++;
        console.log('Replaced in ' + f);
    }
});
console.log('Total files modified:', replacedCount);
