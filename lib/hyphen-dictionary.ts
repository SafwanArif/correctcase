/**
 * CorrectCase Hyphen Dictionary
 *
 * A curated set of common British English compound words that should remain hyphenated
 * when converting from URL/Snake case back to Sentence case.
 *
 * Source: Derived from common English usage and style guides (Oxford/Cambridge).
 */

export const COMPOUND_WORDS = new Set<string>([
    // A
    'able-bodied', 'absent-minded', 'ad-hoc', 'add-on', 'after-effects', 'after-thought', 'air-conditioned', 'all-out', 'all-rounder', 'anti-climax', 'anti-clockwise', 'anti-hero', 'anti-virus', 'art-house', 'audio-visual', 'awe-inspiring',
    // B
    'back-to-back', 'bad-tempered', 'brand-new', 'break-down', 'break-in', 'break-up', 'brick-and-mortar', 'brother-in-law', 'built-in', 'bulls-eye', 'business-like', 'by-product',
    // C
    'call-center', 'call-centre', 'carry-on', 'catch-22', 'check-in', 'check-out', 'check-up', 'clean-cut', 'close-up', 'co-author', 'co-education', 'co-executor', 'co-exist', 'co-finance', 'co-founder', 'co-habit', 'co-operate', 'co-operation', 'co-operative', 'co-ordinanate', 'co-ordination', 'co-owner', 'co-pilot', 'co-produce', 'co-sign', 'co-star', 'co-worker', 'co-writer', 'cold-blooded', 'colour-blind', 'copy-paste', 'cost-effective', 'count-down', 'counter-attack', 'counter-argument', 'cover-up', 'cross-examination', 'cross-reference', 'custom-built', 'custom-made', 'cut-off',
    // D
    'daughter-in-law', 'day-to-day', 'dead-end', 'deep-fried', 'deep-sea', 'double-check', 'double-click', 'drive-in', 'drive-through', 'drive-thru', 'drop-in', 'drop-out', 'dry-clean',
    // E
    'e-book', 'e-commerce', 'e-learning', 'e-mail', 'e-reader', 'empty-handed', 'end-to-end', 'end-user', 'en-route', 'ex-husband', 'ex-wife', 'ex-president', 'eye-catching', 'eye-opener', 'eye-witness',
    // F
    'face-to-face', 'fact-check', 'far-fetched', 'far-off', 'far-reaching', 'father-in-law', 'fee-simple', 'field-trip', 'fill-in', 'first-aid', 'first-class', 'first-hand', 'first-rate', 'five-star', 'follow-up', 'free-for-all', 'free-range', 'free-standing', 'full-time',
    // G
    'get-together', 'go-ahead', 'good-looking', 'good-natured', 'great-grandfather', 'great-grandmother', 'ground-breaking', 'grown-up',
    // H
    'half-baked', 'half-hearted', 'half-hour', 'half-mast', 'half-price', 'half-sister', 'half-time', 'half-way', 'half-yearly', 'hand-held', 'hand-made', 'hand-picked', 'hands-free', 'hands-on', 'hard-headed', 'hard-working', 'have-not', 'haz-mat', 'head-on', 'heart-attack', 'heavy-duty', 'high-end', 'high-tech', 'high-level', 'home-made', 'hot-dog', 'house-warming',
    // I
    'ice-cream', 'ill-advised', 'ill-fated', 'ill-treated', 'in-depth', 'in-house', 'in-law', 'inner-city', 'inside-out',
    // J
    'jet-lag', 'job-hunt',
    // K
    'know-how', 'know-it-all',
    // L
    'laid-back', 'land-mine', 'last-minute', 'left-handed', 'life-size', 'life-style', 'light-hearted', 'like-minded', 'line-up', 'log-in', 'log-on', 'log-out', 'long-distance', 'long-standing', 'long-term', 'look-alike', 'look-out', 'low-key',
    // M
    'make-over', 'make-up', 'man-made', 'mass-produced', 'matter-of-fact', 'merry-go-round', 'mid-air', 'mid-day', 'mid-term', 'mid-way', 'middle-aged', 'middle-class', 'mixed-up', 'mother-in-law', 'multi-purpose',
    // N
    'narrow-minded', 'near-by', 'never-ending', 'newly-wed', 'next-door', 'no-go', 'no-one', 'non-profit', 'non-stop', 'north-east', 'north-west', 'not-for-profit',
    // O
    'off-line', 'off-peak', 'off-putting', 'off-road', 'off-set', 'off-shore', 'off-side', 'old-fashioned', 'on-going', 'on-line', 'on-screen', 'one-sided', 'one-way', 'open-ended', 'open-minded', 'out-of-date', 'over-the-counter',
    // P
    'part-time', 'passer-by', 'pay-as-you-go', 'peer-to-peer', 'pen-pal', 'pick-up', 'point-blank', 'pop-up', 'post-box', 'post-code', 'post-mortem', 'post-office', 'pre-existing', 'pre-paid', 'pro-active', 'pullover', 'push-up',
    // Q
    'quick-witted',
    // R
    'read-only', 'ready-made', 'real-time', 'record-breaking', 'red-handed', 're-admit', 're-assess', 're-do', 're-election', 're-enter', 're-evaluate', 're-examine', 're-hash', 're-hire', 're-invest', 're-issue', 're-live', 're-open', 're-scheduling', 're-sent', 're-start', 're-think', 're-use', 're-visit', 're-write', 'right-handed', 'ring-tone', 'roll-call', 'roll-out', 'round-trip', 'run-down', 'runner-up',
    // S
    'safe-keeping', 'second-hand', 'second-rate', 'self-assured', 'self-centered', 'self-confidence', 'self-conscious', 'self-control', 'self-defence', 'self-destruct', 'self-doubt', 'self-employed', 'self-esteem', 'self-explanatory', 'self-help', 'self-interest', 'self-made', 'self-pity', 'self-portrait', 'self-respect', 'self-righteous', 'self-service', 'self-study', 'self-sufficient', 'semi-circle', 'semi-colon', 'semi-final', 'short-term', 'side-effect', 'sign-in', 'sign-up', 'single-minded', 'sister-in-law', 'sit-ups', 'six-pack', 'slow-motion', 'so-called', 'soft-spoken', 'son-in-law', 'south-east', 'south-west', 'stand-by', 'stand-out', 'stand-up', 'start-up', 'state-of-the-art', 'step-brother', 'step-father', 'step-mother', 'step-sister', 'straight-forward', 'strong-minded', 'sugar-free', 'sun-bathe', 'sun-glasses',
    // T
    't-shirt', 'take-off', 'take-out', 'take-over', 'tax-free', 'team-mate', 'team-work', 'tear-gas', 'tell-tale', 'thin-skinned', 'third-party', 'thought-provoking', 'time-consuming', 'time-out', 'tip-off', 'to-do', 'toll-free', 'top-secret', 'touch-screen', 'trade-in', 'trade-off', 'tried-and-tested', 'tumble-dry', 'two-way',
    // U
    'u-turn', 'under-estimate', 'up-and-coming', 'up-market', 'up-to-date', 'user-friendly',
    // V
    'vice-president', 'voice-mail', 'voice-over',
    // W
    'walk-in', 'warm-up', 'washing-machine', 'web-site', 'well-being', 'well-done', 'well-known', 'well-off', 'well-read', 'white-collar', 'wi-fi', 'wide-spread', 'window-shopping', 'word-of-mouth', 'worn-out', 'write-off',
    // X
    'x-ray',
    // Y
    'year-book', 'year-round',
    // Z
    'zig-zag'
]);
