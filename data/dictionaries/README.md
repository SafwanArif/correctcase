# Data Dictionary Documentation

## Standards
*   **Format**: Pure JSON arrays `["foo", "bar"]`.
*   **Strictness**: No comments allowed inside JSON files.
*   **Segmentation**:
    *   `universal`: Shared assets across all English variants.
    *   `en-US`: US-Specific assets.
    *   `en-GB`: GB-Specific assets.

## Files

### `universal/function-words.json`
*   **Purpose**: A foundational list of **Function Words** (Articles, Conjunctions, Prepositions) that are typically untreated (lowercased) in various capitalization styles.
*   **Coverage**: Includes standard English particles ("a", "the", "of", "with") shared by both US and UK dialects.

### `en-GB/sentence-case-exceptions.json`
*   **Purpose**: A list of words that must **always be capitalized**, even in Sentence Case contexts.
*   **Contents**: Proper nouns ("Android", "Google"), Acronyms ("NHS", "BBC", "NASA"), and Titles ("PhD").
*   **Usage**: The engine capitalizes these words explicitly when converting to Sentence Case.

### `en-US/compounds.json` / `en-GB/compounds.json`
*   **Purpose**: Region-specific compound word spellings.
*   **Examples**:
    *   US: `gas-station`, `zip-code`
    *   UK: `petrol-station`, `post-code`
