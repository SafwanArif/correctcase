/* eslint-disable no-console */
import path from 'path';
import { z } from 'zod';
// @ts-ignore
import fs from 'fs-extra';
import { dictionaryDatasetSchema } from '../lib/schemas/dictionary-schema';

// -----------------------------------------------------------------------------
// CORRECTCASE DATA FACTORY (2026 STANDARD)
// -----------------------------------------------------------------------------
// This script:
// 1. Reads all JSON dictionaries from /data/dictionaries
// 2. Validates them against the Zod Dual Schema
// 3. Handles Legacy Object Wrappers (e.g. { "classifiers": [...] })
// 4. Deduplicates entries (Simple strings or Elite objects)
// 5. Sorts entries alphabetically (ignoring case)
// 6. Writes clean data back to disk
// -----------------------------------------------------------------------------

const DICTIONARY_ROOT = path.join(process.cwd(), 'data', 'dictionaries');
const IGNORE_FILES = ['README.md', 'package.json', 'tsconfig.json'];

async function processFile(filePath: string) {
    const relativePath = path.relative(process.cwd(), filePath);
    console.log(`🏭 Processing: ${relativePath}`);

    try {
        const rawData = await fs.readJson(filePath);

        // 1. VALIDATE SCHEMA
        const parsed = dictionaryDatasetSchema.safeParse(rawData);

        if (!parsed.success) {
            console.error(`❌ Schema Validation Failed: ${relativePath}`);
            console.error(parsed.error.format());
            process.exit(1);
        }

        const data = parsed.data;

        // 2. NORMALIZE (Deduplicate + Sort)
        let processedData;
        let initialCount = 0;
        let finalCount = 0;

        // HANDLE LEGACY WRAPPERS (Objects containing arrays)
        let workingData: any[] = [];
        let isWrapper = false;
        let wrapperKey = '';

        if (!Array.isArray(data)) {
            // It's a wrapper object (e.g. { "classifiers": [...] })
            isWrapper = true;
            wrapperKey = Object.keys(data)[0]; // Assume single key for now
            workingData = data[wrapperKey] || [];
            initialCount = workingData.length;
        } else {
            workingData = data;
            initialCount = workingData.length;
        }

        if (workingData.length > 0 && typeof workingData[0] === 'string') {
            // PROCESSING SIMPLE LIST (Strings)
            const unique = Array.from(new Set(workingData as string[]));
            const sorted = unique.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

            if (isWrapper) {
                processedData = { [wrapperKey]: sorted };
                finalCount = sorted.length;
            } else {
                processedData = sorted;
                finalCount = sorted.length;
            }
        } else if (workingData.length > 0 && Array.isArray(workingData[0])) {
            // PROCESSING TUPLE LIST (Arrays of Strings e.g. [["ph", "pH"]])
            // Deduplicate by first element (lowercase)
            const uniqueMap = new Map();
            for (const item of workingData as string[][]) {
                if (item.length > 0) {
                    uniqueMap.set(item[0].toLowerCase(), item);
                }
            }

            const sortedTuples = Array.from(uniqueMap.values()).sort((a: any, b: any) => {
                return a[0].localeCompare(b[0], 'en', { sensitivity: 'base' });
            });

            if (isWrapper) {
                processedData = { [wrapperKey]: sortedTuples };
                finalCount = sortedTuples.length;
            } else {
                processedData = sortedTuples;
                finalCount = sortedTuples.length;
            }
        } else {
            // PROCESSING ELITE LIST (Objects)
            // Strategy: Deduplicate by unique 'key' (or normalized 'term')
            const uniqueMap = new Map();

            for (const item of workingData as any[]) {
                const uniqueKey = item.key || item.term.toLowerCase();
                if (!uniqueMap.has(uniqueKey)) {
                    uniqueMap.set(uniqueKey, item);
                }
            }

            const sortedObjects = Array.from(uniqueMap.values()).sort((a: any, b: any) => {
                const keyA = a.key || a.term.toLowerCase();
                const keyB = b.key || b.term.toLowerCase();
                return keyA.localeCompare(keyB, 'en', { sensitivity: 'base' });
            });

            if (isWrapper) {
                processedData = { [wrapperKey]: sortedObjects };
                finalCount = sortedObjects.length;
            } else {
                processedData = sortedObjects;
                finalCount = sortedObjects.length;
            }
        }

        // 3. WRITE BACK
        await fs.writeJson(filePath, processedData, { spaces: 4 });

        if (initialCount !== finalCount) {
            console.log(`   ✨ Optimized: ${initialCount} -> ${finalCount} entries (-${initialCount - finalCount})`);
        } else {
            console.log(`   ✅ Validated: ${finalCount} entries`);
        }

    } catch (error) {
        console.error(`❌ Error processing ${relativePath}:`, error);
        process.exit(1);
    }
}

async function walkDir(dir: string) {
    const files = await fs.readdir(dir);

    for (const file of files) {
        if (IGNORE_FILES.includes(file)) continue;

        const fullPath = path.join(dir, file);
        const stat = await fs.stat(fullPath);

        if (stat.isDirectory()) {
            await walkDir(fullPath);
        } else if (file.endsWith('.json')) {
            await processFile(fullPath);
        }
    }
}

async function main() {
    console.log('🏭 Starting CorrectCase Data Factory...');
    await walkDir(DICTIONARY_ROOT);
    console.log('✨ Data Factory Complete: All data assets validated & normalized.');
}

await main();
