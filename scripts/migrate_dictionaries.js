const fs = require('fs');
const path = require('path');

const convert = (src, dest) => {
    if (!fs.existsSync(src)) {
        console.error(`Source file not found: ${src}`);
        return;
    }
    let content = fs.readFileSync(src, 'utf8');
    // Extract content between new Set([ or new Set<string>([ and ]);
    const match = content.match(/new Set\s*(?:<string>)?\(\[([\s\S]*?)\]\)/);
    if (!match) {
        console.error(`Could not parse set content in ${src}`);
        return;
    }
    let arrayContent = match[1];

    // Remove comments
    arrayContent = arrayContent.replace(/\/\/.*/g, '');

    // Eval to get array
    try {
        const arr = eval(`[${arrayContent}]`);
        // Filter empty or null
        const cleanArr = arr.filter(x => x && typeof x === 'string').sort(); // Sort for consistency

        const dir = path.dirname(dest);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(dest, JSON.stringify(cleanArr, null, 2));
        console.log(`Converted ${path.basename(src)} -> ${path.relative(process.cwd(), dest)} (${cleanArr.length} items)`);
    } catch (e) {
        console.error(`Error processing ${src}: ${e.message}`);
    }
}

const root = process.cwd();
const lib = path.join(root, 'lib', 'dictionaries');
const data = path.join(root, 'data', 'dictionaries');

console.log(`Migrating dictionaries from ${lib} to ${data}...`);

// Universal
convert(path.join(lib, 'universal-compound-words.ts'), path.join(data, 'universal', 'compounds.json'));

// UK
convert(path.join(lib, 'uk-compound-words.ts'), path.join(data, 'en-GB', 'compounds.json'));
convert(path.join(lib, 'uk-acronyms.ts'), path.join(data, 'en-GB', 'acronyms.json'));

// US
convert(path.join(lib, 'us-compound-words.ts'), path.join(data, 'en-US', 'compounds.json'));
convert(path.join(lib, 'us-minor-words.ts'), path.join(data, 'en-US', 'minor.json'));

console.log('Migration complete.');
