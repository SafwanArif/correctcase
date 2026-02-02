import axios from 'axios';
import { prompt } from 'enquirer';
import chalk from 'chalk';
// @ts-ignore
import fs from 'fs-extra';
/* eslint-disable no-console */
import path from 'path';
import { execSync } from 'child_process';

/* eslint-disable no-console */

// -----------------------------------------------------------------------------
// ANTIGRAVITY RESEARCH ASSISTANT (2026)
// -----------------------------------------------------------------------------
// AI-Lite tool to expand your dictionary ecosystem using the Datamuse API.
// Features: Gap Analysis, Duplicate Detection, Auto-Ingestion.
// -----------------------------------------------------------------------------

const API_BASE = 'https://api.datamuse.com/words';
const DICT_ROOT = path.join(process.cwd(), 'data', 'dictionaries');

// Mapping of "Topics" to file paths
const DATASETS = {
    'Compounds': path.join(DICT_ROOT, 'universal', 'compounds.json'),
    'Acronyms': path.join(DICT_ROOT, 'universal', 'acronyms.json'),
    'Brands': path.join(DICT_ROOT, 'universal', 'brands.json'),
    'Locations': path.join(DICT_ROOT, 'universal', 'locations.json'),
    'Names': path.join(DICT_ROOT, 'universal', 'names.json'),
};

type DatasetKey = keyof typeof DATASETS;

async function loadDataset(key: DatasetKey): Promise<Set<string>> {
    const filePath = DATASETS[key];
    if (!fs.existsSync(filePath)) return new Set();

    const data = await fs.readJson(filePath);

    // Handle different schema types via "Dual Schema" logic
    if (Array.isArray(data)) {
        if (data.length > 0 && typeof data[0] === 'string') {
            return new Set(data.map((w: string) => w.toLowerCase()));
        }
        // Handle objects (EliteEntry) - extract keys/terms
        return new Set(data.map((w: any) => String(w.key || w.term).toLowerCase()));
    }

    // Handle Legacy Wrappers
    const wrapperKey = Object.keys(data)[0];
    const list = (data as any)[wrapperKey] || [];
    if (Array.isArray(list) && typeof list[0] === 'string') {
        return new Set(list.map((w: string) => w.toLowerCase()));
    }

    return new Set();
}

async function searchDatamuse(params: Record<string, string>) {
    try {
        const response = await axios.get(API_BASE, { params });
        return response.data; // [{ word: 'foo', score: 123 }, ...]
    } catch (error) {
        console.error(chalk.red('❌ API Error check internet connection.'));
        return [];
    }
}

async function mainMenu() {
    console.clear();
    console.log(chalk.bold.cyan(`
  🧪 ANTIGRAVITY RESEARCH ASSISTANT v1.0
  ======================================
  `));

    const action = await prompt<{ choice: string }>({
        type: 'select',
        name: 'choice',
        message: 'What would you like to research?',
        choices: [
            'Find Synonyms (Gap Analysis)',
            'Find Related Words (Topic)',
            'Find Words Starting With... (Prefix)',
            'Find Words Ending With... (Suffix)',
            'Exit'
        ]
    });

    if (action.choice === 'Exit') process.exit(0);

    await handleSearch(action.choice);
}

async function handleSearch(type: string) {
    let params: Record<string, string> = { max: '50' };
    let targetDataset: DatasetKey = 'Compounds'; // Default

    // 1. Get User Input
    if (type.includes('Synonyms')) {
        const { word } = await prompt<{ word: string }>({ type: 'input', name: 'word', message: 'Enter target word (e.g. "email"):' });
        params = { rel_syn: word, max: '50' };
    } else if (type.includes('Related')) {
        const { topic } = await prompt<{ topic: string }>({ type: 'input', name: 'topic', message: 'Enter topic (e.g. "space"):' });
        params = { ml: topic, max: '50' };
    } else if (type.includes('Prefix')) {
        const { pfx } = await prompt<{ pfx: string }>({ type: 'input', name: 'pfx', message: 'Enter prefix (e.g. "anti-"):' });
        params = { sp: `${pfx}*`, max: '50' };
    } else if (type.includes('Suffix')) {
        const { sfx } = await prompt<{ sfx: string }>({ type: 'input', name: 'sfx', message: 'Enter suffix (e.g. "*box"):' });
        params = { sp: `*${sfx}`, max: '50' };
    }

    // 2. Select Target Dataset
    const { dataset } = await prompt<{ dataset: string }>({
        type: 'select',
        name: 'dataset',
        message: 'Add valid candidates to which dictionary?',
        choices: Object.keys(DATASETS)
    });
    targetDataset = dataset as DatasetKey;

    // 3. Execute Search
    console.log(chalk.yellow(`\n🔍 Scanning Datamuse database...`));
    const results = await searchDatamuse(params);

    if (results.length === 0) {
        console.log(chalk.red('No results found.'));
        return setTimeout(mainMenu, 2000);
    }

    // 4. Cross-Reference (Duplicate Detection)
    console.log(chalk.blue(`📚 checking against ${targetDataset} database...`));
    const existingSet = await loadDataset(targetDataset);

    const choices = results.map((item: any) => {
        const exists = existingSet.has(item.word.toLowerCase());
        const label = exists ? chalk.gray(`${item.word} (Existing)`) : chalk.green(`${item.word} (NEW!)`);
        return {
            name: item.word,
            message: label,
            disabled: exists ? 'Already in DB' : false
        };
    });

    // 5. User Selection
    const { selection } = await prompt<{ selection: string[] }>({
        type: 'multiselect',
        name: 'selection',
        message: 'Select words to ADD (Space to select, Enter to confirm):',
        choices: choices
    });

    if (selection.length === 0) {
        console.log(chalk.yellow('No words selected.'));
        return setTimeout(mainMenu, 1500);
    }

    // 6. Ingestion (One-Click Add)
    await addToDataset(targetDataset, selection);

    // 7. Loop
    const { loop } = await prompt<{ loop: boolean }>({ type: 'confirm', name: 'loop', message: 'Search again?' });
    if (loop) mainMenu();
    else process.exit(0);
}

async function addToDataset(datasetKey: DatasetKey, newWords: string[]) {
    const filePath = DATASETS[datasetKey];
    const rawData = await fs.readJson(filePath);
    let updatedData = rawData;

    // Append Logic (Simple Append, relying on Data Factory to sort later)
    if (Array.isArray(rawData)) {
        // Assume simple string array for now as we are adding "research" words
        // usage: generic word lists
        updatedData = [...rawData, ...newWords];
    } else {
        // Handle Wrapper
        const key = Object.keys(rawData)[0];
        if (Array.isArray(rawData[key])) {
            rawData[key].push(...newWords);
        }
    }

    await fs.writeJson(filePath, updatedData, { spaces: 4 });
    console.log(chalk.bold.green(`\n✅ Added ${newWords.length} words to ${datasetKey}!`));

    // 8. Auto-Build
    console.log(chalk.gray('⚙️ Running Data Factory to sort & validate...'));
    try {
        execSync('npm run data:build', { stdio: 'inherit' });
        console.log(chalk.bold.green('✨ Database Optimized.'));
    } catch (err: unknown) {
        console.error(chalk.red('❌ Build failed. Please check the data manually.'));
    }
}

// Start
await mainMenu();
