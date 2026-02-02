export interface SeoSection {
    title: string;
    content: string[]; // Paradgrahs
}

export interface SeoFaq {
    question: string;
    answer: string;
}

export interface SeoData {
    h2: string; // Main Guide Title
    intro: string;
    sections: {
        h3: string;
        content: string; // HTML-safe string or markdown-lite
    }[];
    faq: SeoFaq[];
}

export const SEO_CONTENT: Record<string, SeoData> = {
    "us-title-case": {
        h2: "The Definitive Guide to US Title Case Capitalization",
        intro: "Converting text to Title Case for US publications requires adhering to specific style guides like AP, APA, Chicago, and MLA. Unlike sentence case, where only the first word is capitalized, US Title Case involves capitalizing all &apos;major&apos; words while keeping &apos;minor&apos; words lowercase.",
        sections: [
            {
                h3: "Which Words Should Be Capitalized?",
                content:
                    "In standard US Title Case, you must capitalize the first and last word of the title, regardless of their part of speech. Additionally, capitalize all nouns, pronouns, verbs, adjectives, and adverbs. This includes short verbs like &apos;Is&apos;, &apos;Are&apos;, and &apos;Be&apos;.",
            },
            {
                h3: "Handling Function Words (Prepositions & Conjunctions)",
                content:
                    "The most common error in Title Case is incorrectly capitalizing short prepositions (e.g., &apos;in&apos;, &apos;on&apos;, &apos;at&apos;) and coordinating conjunctions (e.g., &apos;and&apos;, &apos;but&apos;, &apos;for&apos;). Our tool automatically detects these based on your selected style guide (Chicago vs. AP) and keeps them lowercase unless they are the first or last word.",
            },
            {
                h3: "The 'iTunes' and 'eBay' Exception",
                content:
                    "Modern brand names often defy standard grammar rules. Words like &apos;iPhone&apos;, &apos;eBay&apos;, and &apos;iTunes&apos; start with a lowercase letter even when they appear at the start of a sentence in some contexts. CorrectCase preserves these brand-specific casing rules to ensure your text looks professional and technically accurate.",
            },
        ],
        faq: [
            {
                question: "Should I capitalize 'Is' in a title?",
                answer: "Yes. 'Is' is a verb (a form of 'to be'). All verbs, no matter how short, are capitalized in Title Case.",
            },
            {
                question: "What is the difference between AP and Chicago style?",
                answer: "The main difference lies in how they handle prepositions. AP style lowercases prepositions of three letters or fewer, while Chicago style lowercases all prepositions regardless of length (unless emphasized). Our tool defaults to a robust hybrid standard accepted by most digital publishers.",
            },
        ],
    },
    "uk-sentence-case": {
        h2: "British English Sentence Case Standards (Gov.uk & Oxford)",
        intro: "Sentence case is the standard for UK government (Gov.uk), BBC, and Oxford academic writing. It maximizes readability by treating the heading like a standard sentence: only the first word and proper nouns (names, places, brands) are capitalized.",
        sections: [
            {
                h3: "Why Use Sentence Case?",
                content:
                    "Sentence case is easier to read than Title Case because the shape of the words is more distinctive. It also avoids the ambiguity of deciding which words are 'major' or 'minor'. This style is mandatory for most modern UI design systems and British digital content.",
            },
            {
                h3: "Proper Nouns in British English",
                content:
                    "While sentence case implies lowercase, you must retain capitalization for Proper Nouns. This includes names (London, John), days (Monday), months (January), and brands (Microsoft). Our US/UK converter intelligently detects these entities and prevents them from being lowercased.",
            },
        ],
        faq: [
            {
                question: "Does sentence case capitalize the first word after a colon?",
                answer: "In British English, the word after a colon is usually lowercase unless it is a proper noun or starts a complete sentence that requires emphasis. However, specific style guides vary.",
            },
        ],
    },
    hyphenate: {
        h2: "Smart Hyphenation: Grammatical vs. Hard Hyphens",
        intro: "Removing hyphens from text isn't just about deleting the '-' character. It requires distinguishing between 'hard hyphens' (grammatically necessary, e.g., 'half-baked') and 'soft hyphens' (line breaks from PDF copies).",
        sections: [
            {
                h3: "Cleaning Text from PDFs",
                content:
                    "When you copy text from a PDF or a narrow column, words are often split with a hyphen/newline. Pasting this into a document leaves ugly broken words (e.g., 'bro- ken'). Our Smart Unhyphenator reconnects these words while analyzing the context to preserve actual compound words.",
            },
        ],
        faq: [
            {
                question: "Will this tool remove hyphens from words like 'co-operate'?",
                answer: "No. Our intelligent engine checks a dictionary of known hyphenated words. If a word like 'co-operate' or 'mother-in-law' is found, the hyphen is preserved. Only line-break hyphens are removed.",
            },
        ],
    },
};
