/**
 * UK & Global Acronyms Dictionary
 * 
 * A set of acronyms that should ALWAYS be fully capitalized in Sentence Case.
 * Includes Government, Medical, Tech, and Corporate sectors.
 */

export const UK_ACRONYMS = new Set([
    // Government & Public Sector
    'NHS', 'BBC', 'UK', 'USA', 'EU', 'NATO', 'UN', 'HMRC', 'GP', 'A&E',
    'MP', 'PM', 'VAT', 'NI', 'ID', 'DVLA', 'TfL', 'MOD', 'Department for Work and Pensions', // Wait, strict acronyms usually? Keep simple.

    // Tech & Business
    'CEO', 'CTO', 'CFO', 'CMO', 'COO', 'CIO', 'CISO', 'VP', 'SVP', 'EVP',
    'HR', 'PR', 'IT', 'R&D', 'B2B', 'B2C', 'SaaS', 'API', 'SDK', 'IDE',
    'JSON', 'XML', 'HTML', 'CSS', 'JS', 'TS', 'SQL', 'AWS', 'GCP', 'Azure',
    'SEO', 'SEM', 'ROI', 'KPI', 'OKR', 'CTA', 'USP', 'MVP', 'POC', 'ETA',
    'FYI', 'TBA', 'TBC', 'DIY', 'FAQ', 'Q&A', 'P&L', 'IPO', 'M&A', 'LLC', 'Ltd', 'Inc',

    // Medical / Scientific
    'DNA', 'RNA', 'MRI', 'CT', 'ICU', 'GP', 'PPE', 'WHO', 'CDC', 'NASA', 'ESA',

    // Education & Qualifications
    'PhD', 'MBA', 'MSc', 'BSc', 'BA', 'MA', 'MD', 'GCSE', 'A-Level', 'UCAS',

    // General
    'TV', 'PC', 'Mac', 'iOS', 'Android', 'USB', 'Wi-Fi', 'AI', 'ML', 'LLM',
    'PDF', 'JPEG', 'PNG', 'GIF', 'SVG', 'MP4', 'MP3', 'CV', 'Resume'
]);
