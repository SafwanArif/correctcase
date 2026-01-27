import Dexie, { type EntityTable } from 'dexie';

interface HistoryItem {
    id: number;
    text: string;
    timestamp: Date;
    mode?: string; // e.g., 'sentence-case', 'raw'
}

// Initialise Database
const db = new Dexie('CorrectCaseDB') as Dexie & {
    history: EntityTable<HistoryItem, 'id'>;
};

// Define Schema
db.version(1).stores({
    history: '++id, timestamp, mode' // Primary key and indexed props
});

export type { HistoryItem };
export { db };

/**
 * Adds an item to the history, respecting a limit.
 * @param text The text content to save.
 * @param mode The mode or context of the text.
 */
export async function addToHistory(text: string, mode: string = 'raw'): Promise<void> {
    if (!text.trim()) return;

    try {
        await db.transaction('rw', db.history, async () => {
            // Add new item
            await db.history.add({
                text,
                timestamp: new Date(),
                mode
            });

            // Optional: Maintain a limit (e.g., keep last 50 items) - "Garbage Collection"
            const count = await db.history.count();
            const LIMIT = 50;
            if (count > LIMIT) {
                const keysToDelete = await db.history.orderBy('timestamp').limit(count - LIMIT).primaryKeys();
                await db.history.bulkDelete(keysToDelete);
            }
        });
    } catch (error) {
        // Silent fail for quota exceeded or private mode
        console.warn('CorrectCase: Failed to save history.', error);
    }
}
