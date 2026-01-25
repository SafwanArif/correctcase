/**
 * CorrectCase Hyphen Dictionary
 *
 * A curated set of common British English compound words.
 * Consolidated list for maximum coverage (~2000+ words).
 */

export const COMPOUND_WORDS = new Set<string>([
    // User requested & Common Multi-part
    'mother-in-law', 'father-in-law', 'brother-in-law', 'sister-in-law',
    'son-in-law', 'daughter-in-law', 'editor-in-chief', 'merry-go-round',
    'forget-me-not', 'lily-of-the-valley', 'jack-in-the-box', 'state-of-the-art',
    'up-to-date', 'day-to-day', 'face-to-face', 'one-to-one', 'step-by-step',

    // Prefixes (Re-, Co-, De-, Ex-)
    're-enter', 're-educate', 're-examine', 're-evaluate', 're-elect',
    'co-exist', 'co-existence', 'co-author', 'co-founder', 'co-operate', 'co-operation',
    'de-ice', 'de-icer', 'de-escalate', 'de-brief', 'de-activate',
    'x-ray', 'u-turn', 'u-boat', 't-shirt', 'v-neck', 'g-string', 'e-mail',

    // Developer & Tech (Gap Analysis)
    'back-end', 'front-end', 'full-stack', 'open-source', 'real-time', 'use-case',
    'plug-and-play', 'sign-in', 'sign-up', 'log-in', 'wi-fi', 'high-tech',
    'off-line', 'on-line', 'know-how',

    // Business & SaaS (Gap Analysis)
    'first-class', 'high-level', 'in-depth', 'long-term', 'short-term',
    'non-profit', 'self-employed', 'third-party', 'user-friendly',
    'man-made', 'mind-set',

    // Missing Alphabet Gaps (F-O, S-V)
    'far-fetched', 'free-range', 'half-hearted', 'hard-core',
    'life-size', 'long-distance', 'one-way',
    'self-control', 'self-esteem', 'semi-final', 'second-hand', 'top-heavy',
    'vice-president',

    // A (Modern Additions)
    'A-list', 'A-lister', 'A-road', 'A-star',
    'access-control', 'accident-free', 'account-holder', 'active-duty',
    'ad-block', 'ad-blocker', 'ad-break', 'ad-free', 'add-to-cart',
    'admin-rights', 'advance-booking', 'age-appropriate', 'age-verification',
    'agri-business', 'agri-tech', 'aid-worker', 'air-ambulance', 'air-con',
    'air-corridor', 'air-defence', 'air-dry', 'air-fryer', 'air-guitar',
    'air-passenger', 'air-quality', 'air-taxi', 'air-traffic-control',
    'alcohol-free', 'all-hands', 'all-in-one', 'all-new', 'all-or-nothing',
    'all-terrain', 'alpha-male', 'alt-click', 'alt-key', 'alt-right', 'always-on',
    'anchor-text', 'angel-investor', 'animal-welfare',
    'anti-bullying', 'anti-fraud', 'anti-malware', 'anti-money-laundering',
    'anti-phishing', 'anti-piracy', 'anti-scam', 'anti-slip', 'anti-spam',
    'anti-spyware', 'anti-tamper',
    'api-key', 'app-store', 'apple-picking', 'arms-control', 'arms-race',
    'art-dealer', 'art-history', 'artificial-intelligence', 'asset-management',
    'asset-stripping', 'assisted-suicide', 'at-risk', 'at-sea',
    'audio-guide', 'audit-trail',
    'auto-detect', 'auto-enrollment', 'auto-fill', 'auto-play', 'auto-renew',
    'auto-reply', 'auto-save', 'auto-suggest', 'auto-update',
    'award-winning', 'away-day', 'away-game', 'away-goal', 'away-match',

    // A
    'a-frame', 'a-level', 'abide-by', 'able-bodied', 'above-board', 'above-mentioned', 'absent-minded', 'accident-prone',
    'accounts-payable', 'accounts-receivable', 'acid-free', 'acid-test', 'acting-out', 'action-packed', 'ad-hoc', 'ad-infinitum',
    'ad-lib', 'add-in', 'add-on', 'add-up', 'admin-level', 'after-all', 'after-birth', 'after-burner', 'after-care',
    'after-effect', 'after-effects', 'after-glow', 'after-hours', 'after-image', 'after-life', 'after-market', 'after-math',
    'after-noon', 'after-sales', 'after-shave', 'after-shock', 'after-taste', 'after-thought', 'age-group', 'age-limit',
    'age-old', 'agony-aunt', 'aide-de-camp', 'aide-memoire', 'air-bag', 'air-base', 'air-bed', 'air-brake', 'air-brush',
    'air-bus', 'air-condition', 'air-conditioned', 'air-conditioner', 'air-conditioning', 'air-cooled', 'air-cover',
    'air-craft', 'air-crew', 'air-cushion', 'air-drop', 'air-fare', 'air-field', 'air-flow', 'air-force', 'air-frame',
    'air-freight', 'air-gun', 'air-head', 'air-hostess', 'air-lane', 'air-lift', 'air-line', 'air-liner', 'air-lock',
    'air-mail', 'air-man', 'air-marshal', 'air-mile', 'air-miss', 'air-pocket', 'air-pollutant', 'air-pollution', 'air-port',
    'air-power', 'air-pressure', 'air-pump', 'air-raid', 'air-rifle', 'air-sac', 'air-sea', 'air-shaft', 'air-ship', 'air-show',
    'air-sick', 'air-sickness', 'air-space', 'air-speed', 'air-spray', 'air-stream', 'air-strike', 'air-strip', 'air-tight',
    'air-time', 'air-to-air', 'air-to-ground', 'air-to-surface', 'air-traffic', 'air-wave', 'air-way', 'air-worthy',
    'alarm-clock', 'all-american', 'all-around', 'all-clear', 'all-comers', 'all-consuming', 'all-day', 'all-embracing',
    'all-fours', 'all-important', 'all-in', 'all-inclusive', 'all-knowing', 'all-night', 'all-nighter', 'all-out', 'all-over',
    'all-party', 'all-pervading', 'all-powerful', 'all-purpose', 'all-round', 'all-rounder', 'all-seeing', 'all-star',
    'all-ticket', 'all-time', 'all-weather', 'alley-way', 'also-ran', 'alter-ego', 'amber-light', 'anchor-man', 'angle-grinder',
    'angle-park', 'animal-rights', 'ankle-deep', 'answering-machine', 'ante-chamber', 'ante-natal', 'ante-room', 'anti-abortion',
    'anti-aging', 'anti-aircraft', 'anti-american', 'anti-apartheid', 'anti-bacterial', 'anti-ballistic', 'anti-bias',
    'anti-body', 'anti-british', 'anti-cancer', 'anti-capitalist', 'anti-christ', 'anti-climax', 'anti-clockwise',
    'anti-coagulant', 'anti-communist', 'anti-competitive', 'anti-corruption', 'anti-cyclone', 'anti-democratic',
    'anti-depressant', 'anti-dumping', 'anti-establishment', 'anti-fascist', 'anti-freeze', 'anti-fungal', 'anti-glare',
    'anti-government', 'anti-gravity', 'anti-hero', 'anti-histamine', 'anti-inflammatory', 'anti-lock', 'anti-malaria',
    'anti-matter', 'anti-missile', 'anti-nazi', 'anti-noise', 'anti-nuclear', 'anti-oxidant', 'anti-perspirant',
    'anti-personnel', 'anti-pollution', 'anti-poverty', 'anti-racism', 'anti-racist', 'anti-road', 'anti-semitic',
    'anti-semitism', 'anti-skid', 'anti-slavery', 'anti-smoking', 'anti-social', 'anti-static', 'anti-tank', 'anti-terrorism',
    'anti-terrorist', 'anti-theft', 'anti-trust', 'anti-venom', 'anti-viral', 'anti-virus', 'anti-vivisection', 'anti-war',
    'anti-wrinkle', 'apple-cart', 'apple-crumble', 'apple-pie', 'apple-sauce', 'apron-strings', 'arch-bishop', 'arch-deacon',
    'arch-diocese', 'arch-duke', 'arch-enemy', 'arch-rival', 'arch-way', 'area-code', 'arm-band', 'arm-chair', 'arm-hole',
    'arm-lock', 'arm-pit', 'arm-rest', 'arm-wrestle', 'arms-length', 'army-surplus', 'art-deco', 'art-director', 'art-form',
    'art-gallery', 'art-house', 'art-lover', 'art-nouveau', 'art-school', 'art-work', 'as-is', 'ash-can', 'ash-tray',
    'assembly-line', 'assembly-point', 'assistant-director', 'at-home', 'atomic-bomb', 'audio-book', 'audio-frequency',
    'audio-tape', 'audio-typist', 'audio-visual', 'audio-visuals', 'aunt-sally', 'auto-change', 'auto-clave', 'auto-complete',
    'auto-correct', 'auto-crat', 'auto-cue', 'auto-didact', 'auto-focus', 'auto-graph', 'auto-immune', 'auto-immunity',
    'auto-maker', 'auto-mate', 'auto-matic', 'auto-mobile', 'auto-pilot', 'auto-route', 'auto-strada', 'auto-suggestion',
    'avant-garde', 'awe-inspiring', 'awe-struck', 'awful-looking', 'axe-head', 'axe-man', 'axis-power',
    // B (Modern & Tech Supplement)
    'B-movie', 'B-road',
    'baby-bump', 'baby-face', 'baby-step', 'baby-wipe',
    'back-channel', 'back-end', 'back-fill', 'back-link', 'back-office',
    'back-pay', 'back-story', 'back-tax',
    'bad-ass', 'bad-hair-day',
    'bail-out', 'ball-boy', 'ball-girl', 'ball-park',
    'ban-hammer', 'banana-skin', 'band-mate', 'band-width', // (Optional: modern usage often bandwidth)
    'bank-holiday', 'bank-transfer', 'banner-blindness',
    'bar-chart', 'bar-code', 'bar-magnet', 'bare-bones', 'barrier-cream',
    'base-camp', 'base-jump', 'base-layer', 'base-line', 'base-rate',
    'basket-case', 'bat-signal', 'bath-bomb', 'bath-robe', 'bath-towel',
    'battle-hardened', 'battle-plan', 'battle-ready', 'battle-ship',
    'bean-bag', 'bean-counter', 'bear-hug', 'bear-market',
    'beat-box', 'bed-head', 'bed-linen', 'bed-pan', 'bed-post', 'bed-rest', 'bed-sit', 'bed-sitter',
    'beer-belly', 'beer-garden', 'beer-goggles',
    'bell-end', 'belly-button', 'belly-dance', 'belly-flop', 'belly-laugh',
    'bench-mark', 'bench-press', 'bench-test',
    'best-before', 'best-case', 'best-kept', 'best-practice',
    'beta-blocker', 'beta-male', 'beta-release', 'beta-test', 'beta-version',
    'big-bang', 'big-brother', 'big-data', 'big-hitting', 'big-picture', 'big-screen', 'big-ticket',
    'bin-bag', 'bin-man', 'binge-drink', 'binge-eat', 'binge-watch', 'binge-watching',
    'bio-degradable', 'bio-diesel', 'bio-diversity', 'bio-fuel', 'bio-hazard', 'bio-pic', 'bio-security', 'bio-tech',
    'bird-bath', 'bird-brain', 'bird-feed', 'bird-song', 'bird-table', 'bird-watcher', 'bird-watching',
    'birth-certificate', 'birth-mark', 'birth-mother', 'birth-parent',
    'bit-map', 'bit-part', 'bit-rate', 'bit-torrent',
    'black-belt', 'black-cab', 'black-hat', 'black-market', 'black-tie',
    'blank-cheque', 'blanket-ban',
    'blind-copy', 'blind-spot', 'block-chain', 'block-vote',
    'blog-post', 'blood-donor', 'blood-group', 'blood-line', 'blood-sport', 'blood-sugar', 'blood-test', 'blood-type',
    'blow-dry', 'blow-hole', 'blow-torch',
    'blue-chip', 'blue-sky', 'blue-tooth', // (Strictly Bluetooth, but good for safety)
    'boarding-pass', 'boat-house', 'boat-neck', 'boat-race',
    'body-bag', 'body-blow', 'body-builder', 'body-building', 'body-cam', 'body-check',
    'body-clock', 'body-double', 'body-image', 'body-language', 'body-odour', 'body-piercing',
    'boil-wash', 'boiler-suit', 'bomb-disposal', 'bomb-scare', 'bone-china', 'bone-marrow',
    'book-binding', 'book-deal', 'book-end', 'book-fair', 'book-signing', 'book-store', 'book-token',
    'boom-town', 'boot-camp', 'boot-cut', 'boot-disk', 'boot-loader', 'boot-sale', 'boot-up',
    'bot-net', 'bottle-feed', 'bottle-green', 'bottom-feeder', 'bottom-up',
    'bounce-back', 'bouncy-castle',
    'bow-legged', 'bow-window',
    'box-fresh', 'box-room', 'box-set', 'boxing-day', 'boxing-glove', 'boxing-ring',
    'brain-cell', 'brain-dead', 'brain-drain', 'brain-freeze', 'brain-power', 'brain-teaser', 'brain-wash',
    'brand-awareness', 'brand-equity', 'brand-identity', 'brand-image', 'brand-leader', 'brand-loyalty', 'brand-manager', 'brand-value',
    'bread-bin', 'bread-board', 'bread-knife', 'bread-line',
    'break-dancing', 'break-point',
    'breast-stroke', 'breath-test',
    'brick-bat', 'brick-work',
    'bridal-gown', 'bridal-suite', 'bride-to-be',
    'broad-band', 'broad-bean', 'broad-cast', 'broad-minded', // (Legacy: often one word now)
    'brown-field', 'brown-nose', 'brown-sugar', 'browse-wrap', 'browser-based',
    'bubble-bath', 'bubble-wrap', 'bucket-hat', 'bucket-list', 'bucket-load',
    'budget-cut', 'buffer-zone',
    'bug-bounty', 'bug-fix', 'bug-report', 'bug-zapper',
    'build-quality',
    'bull-bar', 'bull-doze', 'bull-dozer', 'bull-market', 'bull-ring', 'bull-shit',
    'bullet-point', 'bullet-proof', 'bullet-train',
    'bum-bag', // (Classic UK term)
    'bumper-car', 'bumper-sticker', 'bumper-to-bumper',
    'bunk-bed',
    'burn-in', 'burn-out', 'burn-rate',
    'bus-driver', 'bus-lane', 'bus-load', 'bus-route', 'bus-shelter', 'bus-station', 'bus-ticket',
    'business-class', 'business-man', 'business-model', 'business-plan', 'business-woman',
    'busy-work',
    'buy-back', 'buy-in', 'buy-out', 'buy-to-let',
    'buzz-cut', 'buzz-word',
    'by-pass', 'by-poll', 'byte-code',

    // B
    'baby-boom', 'baby-boomer', 'baby-carriage', 'baby-sat', 'baby-sit', 'baby-sitter', 'baby-sitting', 'back-ache',
    'back-bencher', 'back-biting', 'back-bone', 'back-breaking', 'back-burner', 'back-catalogue', 'back-chat', 'back-date',
    'back-door', 'back-drop', 'back-fire', 'back-ground', 'back-handed', 'back-lash', 'back-log', 'back-pack', 'back-pedal',
    'back-room', 'back-seat', 'back-slapping', 'back-stage', 'back-street', 'back-to-back', 'back-track', 'back-up',
    'bad-mannered', 'bad-mouth', 'bad-tempered', 'bag-pipes', 'ball-point', 'band-aid', 'band-wagon', 'bare-faced', 'bare-foot',
    'base-ball', 'battle-cry', 'battle-field', 'battle-ground', 'bean-bag', 'bear-hug', 'beauty-contest', 'bed-and-breakfast',
    'bed-clothes', 'bed-ridden', 'bed-room', 'bed-side', 'bed-spread', 'bed-time', 'bee-hive', 'beer-mat', 'bell-bottoms',
    'best-known', 'best-seller', 'best-selling', 'bi-annual', 'bi-centenary', 'bi-cycle', 'bi-focal', 'bi-lateral',
    'bi-lingual', 'bi-monthly', 'bi-partisan', 'bi-ped', 'bi-plane', 'bi-polar', 'bi-sexual', 'bi-valve', 'bi-weekly',
    'big-head', 'big-headed', 'big-hearted', 'big-name', 'big-shot', 'big-time', 'big-wig', 'bird-box', 'bird-cage',
    'bird-flu', 'birth-control', 'birth-day', 'birth-place', 'birth-rate', 'birth-right', 'bit-part', 'bite-size',
    'bite-sized', 'black-and-white', 'black-ball', 'black-berry', 'black-bird', 'black-board', 'black-box', 'black-eye',
    'black-guard', 'black-hole', 'black-list', 'black-mail', 'black-out', 'black-smith', 'blind-date', 'blind-fold',
    'blind-spot', 'blood-bath', 'blood-pressure', 'blood-red', 'blood-shed', 'blood-shot', 'blood-stained', 'blood-stream',
    'blood-thirsty', 'blood-vessel', 'blow-dry', 'blow-job', 'blow-lamp', 'blow-out', 'blow-pipe', 'blow-torch', 'blow-up',
    'blue-bell', 'blue-berry', 'blue-bottle', 'blue-collar', 'blue-print', 'board-game', 'board-room', 'boarding-card',
    'boarding-house', 'boarding-pass', 'boarding-school', 'body-guard', 'body-work', 'bog-standard', 'boiling-point',
    'bomb-shell', 'bone-dry', 'bone-idle', 'book-case', 'book-club', 'book-end', 'book-keeper', 'book-maker', 'book-mark',
    'book-shelf', 'book-shop', 'book-stall', 'book-worm', 'boom-box', 'boot-lace', 'border-line', 'bottle-neck', 'bottle-opener',
    'bottom-line', 'bow-tie', 'box-office', 'boy-cott', 'boy-friend', 'brain-child', 'brain-damage', 'brain-storm',
    'brain-wash', 'brain-wave', 'brand-name', 'brand-new', 'bread-and-butter', 'bread-bin', 'bread-crumb', 'bread-winner',
    'break-away', 'break-dance', 'break-down', 'break-even', 'break-in', 'break-neck', 'break-out', 'break-through',
    'break-up', 'breast-feed', 'brick-and-mortar', 'brick-layer', 'bride-groom', 'brides-maid', 'brief-case', 'bright-eyed',
    'broad-minded', 'broad-sheet', 'broad-side', 'broken-down', 'broken-hearted', 'brother-in-law', 'bubble-gum', 'bucket-list',
    'bug-bear', 'build-up', 'built-in', 'built-up', 'bulls-eye', 'bullet-point', 'bullet-proof', 'bungee-jump', 'burn-out',
    'bus-stop', 'business-like', 'busy-body', 'butter-cup', 'butter-fingers', 'butter-fly', 'butter-milk', 'butter-scotch',
    'button-hole', 'by-election', 'by-gone', 'by-law', 'by-line', 'by-pass', 'by-product', 'by-stander', 'by-way', 'by-word',
    // C (Modern & Tech Supplement)
    'C-section', 'C-suite',
    'cab-driver', 'cabinet-maker', 'cable-car', 'cable-knit', 'cable-tie', 'cage-free',
    'call-forwarding', 'call-out', 'call-sheet', 'call-sign', 'call-to-action', // (Marketing Critical)
    'camera-phone', 'camera-shy',
    'camp-bed', 'camp-site',
    'can-do', 'candy-floss', // (UK specific - US is cotton candy)
    'cap-sleeve',
    'car-bomb', 'car-boot', 'car-boot-sale', // (UK specific)
    'car-ferry', 'car-hire', 'car-jacking', 'car-pool', 'car-port', 'car-seat', 'car-share', 'car-sharing', 'car-sick', 'car-wash',
    'carbon-copy', 'carbon-credit', 'carbon-dating', 'carbon-fiber', 'carbon-fibre', 'carbon-footprint', 'carbon-monoxide', 'carbon-neutral', 'carbon-offset', 'carbon-tax',
    'card-holder', 'card-index', 'card-reader', 'card-sharp', 'card-table',
    'care-assistant', 'care-giver', 'care-home', 'care-label', 'care-worker',
    'career-best', 'career-high', 'career-path',
    'cargo-pants', 'cargo-ship',
    'carpet-bagger', 'carpet-bomb',
    'carrier-bag',
    'carry-all', 'carry-case', 'carry-cot', 'carry-forward', 'carry-on',
    'cart-horse',
    'case-by-case', 'case-file', 'case-hardened', 'case-load', 'case-manager', 'case-sensitive', // (Dev Critical)
    'case-worker',
    'cash-back', 'cash-cow', 'cash-crop', 'cash-desk', 'cash-dispenser', 'cash-flow', 'cash-in-hand',
    'cash-machine', 'cash-point', // (UK Essential)
    'cash-price', 'cash-register', 'cash-rich', 'cash-strapped',
    'cast-away', 'cast-member', 'cast-off', 'casting-vote',
    'casualty-ward',
    'cat-flap', 'cat-nap', 'cat-sitter',
    'catch-all', 'catch-phrase', 'catch-up',
    'cattle-class', 'cattle-prod',
    'cease-and-desist',
    'cell-phone', 'cell-tower',
    'central-bank', 'central-locking', 'central-processing-unit',
    'chain-mail', 'chain-store',
    'change-log', 'change-management', 'change-over',
    'channel-hop', 'channel-surf',
    'character-building', 'character-set',
    'charge-hand', 'charge-sheet',
    'charity-shop',
    'chart-topper', 'chart-topping',
    'chat-bot', 'chat-line', 'chat-up',
    'cheat-sheet',
    'check-box', // (UI Critical)
    'check-digit', 'check-sum',
    'cheek-bone',
    'cheer-lead',
    'cherry-pick', 'cherry-picker',
    'chewing-tobacco',
    'child-abuse', 'child-benefit', 'child-labour', 'child-lock', 'child-minder', 'child-seat', 'child-support',
    'chili-con-carne', 'chilled-out',
    'chip-and-pin', 'chip-board', 'chip-set', 'chip-shop', // (UK Essential)
    'choc-ice',
    'choke-hold', 'choke-point',
    'city-break', 'city-centre', 'city-limit',
    'civil-engineer', 'civil-engineering', 'civil-partnership',
    'class-action', 'class-war',
    'clean-eating', 'clean-room', 'clean-up',
    'clear-way',
    'click-and-collect', // (UK Retail Critical)
    'click-bait', 'click-through', 'click-stream', 'click-wrap',
    'client-base', 'client-facing', 'client-server', 'client-side', // (Dev Critical - Your branding uses this!)
    'climate-denier', 'climate-strike',
    'cling-film', // (UK specific)
    'clip-art', 'clip-on',
    'clock-face', 'clock-speed', 'clock-tower',
    'close-call', 'close-combat', 'close-coupled', 'close-fitting', 'close-range', 'close-up',
    'closed-caption', 'closed-loop', 'closed-shop',
    'clothes-hanger', 'clothes-peg',
    'cloud-based', 'cloud-burst', 'cloud-computing', 'cloud-cover', 'cloud-cuckoo', 'cloud-native', // (SaaS Critical)
    'club-sandwich',
    'clue-less',
    'co-dependent', 'co-driver', 'co-feature', 'co-finance', 'co-habit', 'co-head', 'co-host', 'co-location', 'co-occur', 'co-own', 'co-payment', 'co-pilot', 'co-production', 'co-sponsor', 'co-star', 'co-worker', 'co-write',
    'coal-face', 'coal-fired', 'coal-hole', 'coal-scuttle', 'coal-tit',
    'coast-to-coast',
    'cock-fight', 'cock-sure',
    'cocoa-bean', 'cocoa-powder',
    'code-base', 'code-breaking', 'code-name', 'code-red', 'code-review', 'code-share', 'code-word',
    'coffee-grinder', 'coffee-morning',
    'cold-boot', 'cold-call', 'cold-case', 'cold-cuts', 'cold-press', 'cold-shoulder', 'cold-snap', 'cold-storage', 'cold-sweat', 'cold-turkey',
    'colour-blind', 'colour-code', 'colour-coded', 'colour-supplement',
    'combat-ready',
    'combined-cycle',
    'comfort-eating',
    'command-line', 'command-post',
    'commercial-break',
    'common-room',
    'community-based', 'community-led', 'community-service',
    'compact-disc', // (Missing spelling variant)
    'company-car',
    'computer-generated', 'computer-readable',
    'confidence-boost',
    'conflict-free', 'conflict-resolution',
    'contact-details', 'contact-tracing',
    'container-grown',
    'content-aware', 'content-creator', 'content-farm', 'content-management', 'content-marketing', 'content-provider',
    'control-freak', 'control-panel', 'control-room',
    'cookie-cutter', 'cookie-dough', 'cookie-jar',
    'cool-bag', 'cool-box', 'cool-down',
    'copy-cat', 'copy-desk', 'copy-edit', 'copy-editor', 'copy-paste', 'copy-protection', 'copy-read', 'copy-right', 'copy-writer', 'copy-writing',
    'cord-cutter',
    'corner-flag', 'corner-kick', 'corner-shop', // (UK Essential)
    'cost-benefit', 'cost-center', 'cost-cutting', 'cost-effective', 'cost-efficient', 'cost-of-living', 'cost-plus', 'cost-push', 'cost-saving',
    'cotton-bud', 'cotton-picking', 'cotton-reel',
    'couch-surf',
    'count-down', 'count-up',
    'country-dance', 'country-music',
    'court-martial', 'court-order', 'court-shoe',
    'cover-all', 'cover-charge', 'cover-drive', 'cover-girl', 'cover-mount', 'cover-price', 'cover-shoot', 'cover-story', 'cover-up', 'cover-version',
    'cow-bell', 'cow-pat',
    'crab-stick',
    'crack-down', 'crack-head',
    'cradle-snatch',
    'crash-course', 'crash-dive', 'crash-dummy', 'crash-land', 'crash-mat', 'crash-pad', 'crash-test',
    'crawl-space',
    'creative-commons',
    'credit-check', 'credit-control', 'credit-crunch', 'credit-history', 'credit-limit', 'credit-note', 'credit-rating', 'credit-risk', 'credit-score', 'credit-squeeze', 'credit-union', 'credit-worthy',
    'crime-scene', 'crime-wave',
    'crisis-management',
    'crop-circle', 'crop-dust', 'crop-rotation',
    'cross-bar', 'cross-bench', 'cross-border', 'cross-breed', 'cross-channel', 'cross-check', 'cross-contamination', 'cross-cultural', 'cross-dress', 'cross-examine', 'cross-fertilize', 'cross-fire', 'cross-hatch', 'cross-legged', 'cross-over', 'cross-party', 'cross-platform', 'cross-ply', 'cross-pollinate', 'cross-post', 'cross-purpose', 'cross-question', 'cross-reference', 'cross-sell', 'cross-site', 'cross-stitch', 'cross-street', 'cross-wind', 'cross-wire',
    'crow-feet', 'crow-flies',
    'crowd-control', 'crowd-fund', 'crowd-funding', 'crowd-pleaser', 'crowd-puller', 'crowd-source', 'crowd-sourcing', 'crowd-surf',
    'cruise-control', 'cruise-liner', 'cruise-ship',
    'crypto-currency', 'crypto-graphy',
    'crystal-ball', 'crystal-gaze',
    'cup-final', 'cup-tie', 'cup-winner',
    'curry-comb', 'curry-house',
    'customer-base', 'customer-facing', 'customer-focused', 'customer-service',
    'cut-and-dry', 'cut-and-paste', 'cut-back', 'cut-glass', 'cut-off', 'cut-out', 'cut-price', 'cut-throat',
    'cyber-attack', 'cyber-bully', 'cyber-bullying', 'cyber-cafe', 'cyber-crime', 'cyber-criminal', 'cyber-monday', 'cyber-punk', 'cyber-security', 'cyber-sex', 'cyber-space', 'cyber-squat', 'cyber-terrorism', 'cyber-war',

    // C
    'call-back', 'call-box', 'call-center', 'call-centre', 'call-girl', 'call-up', 'camera-man', 'camera-ready', 'camp-fire',
    'can-opener', 'candle-light', 'candle-stick', 'car-boot', 'car-park', 'carbon-date', 'carbon-free', 'carbon-neutral',
    'care-free', 'care-taker', 'care-worn', 'carpet-sweeper', 'carry-cot', 'carry-on', 'carry-out', 'cart-wheel', 'case-history',
    'case-law', 'case-study', 'cash-flow', 'cast-iron', 'cast-off', 'cat-burglar', 'cat-call', 'cat-walk', 'catch-22',
    'catch-phrase', 'catch-up', 'cattle-grid', 'cause-way', 'cave-man', 'cd-rom', 'cease-fire', 'ceiling-fan', 'center-forward',
    'central-heating', 'chain-gang', 'chain-reaction', 'chain-saw', 'chain-smoke', 'chair-lift', 'chair-man', 'chair-person',
    'chair-woman', 'change-over', 'character-actor', 'charge-card', 'chat-room', 'chat-show', 'check-book', 'check-in',
    'check-list', 'check-mate', 'check-out', 'check-point', 'check-up', 'cheer-leader', 'cheese-burger', 'cheese-cake',
    'chef-d\'oeuvre', 'chess-board', 'chewing-gum', 'chick-pea', 'chicken-pox', 'chief-justice', 'child-bearing', 'child-birth',
    'child-care', 'child-friendly', 'child-hood', 'child-like', 'child-mind', 'child-proof', 'chili-powder', 'chimney-pot',
    'chimney-sweep', 'chin-wag', 'chip-pan', 'chock-a-block', 'chock-full', 'chopping-board', 'chow-mein', 'christmas-box',
    'christmas-card', 'christmas-day', 'christmas-eve', 'christmas-tree', 'city-slicker', 'city-state', 'civil-rights',
    'civil-servant', 'civil-service', 'civil-war', 'class-mate', 'class-room', 'class-war', 'clean-cut', 'clean-shaven',
    'clear-cut', 'clear-headed', 'clear-out', 'clear-sighted', 'clear-up', 'cliff-hanger', 'climate-change', 'cling-film',
    'clip-art', 'clip-board', 'cloak-room', 'clock-wise', 'clock-work', 'close-knit', 'close-up', 'closed-circuit',
    'clothes-horse', 'clothes-line', 'clothes-peg', 'cloud-burst', 'club-class', 'club-foot', 'club-house', 'co-author',
    'co-driver', 'co-ed', 'co-education', 'co-exist', 'co-existence', 'co-finance', 'co-founder', 'co-habit', 'co-habitation',
    'co-heir', 'co-host', 'co-operate', 'co-operation', 'co-operative', 'co-ordinate', 'co-ordination', 'co-ordinator',
    'co-own', 'co-owner', 'co-ownership', 'co-pilot', 'co-produce', 'co-producer', 'co-production', 'co-respondent', 'co-sign',
    'co-signatory', 'co-star', 'co-worker', 'co-write', 'co-writer', 'coal-field', 'coal-mine', 'coal-miner', 'coast-guard',
    'coast-line', 'coat-hanger', 'cob-web', 'cock-pit', 'cock-tail', 'cock-up', 'cocoa-butter', 'coffee-bar', 'coffee-bean',
    'coffee-break', 'coffee-cup', 'coffee-house', 'coffee-maker', 'coffee-pot', 'coffee-shop', 'coffee-table', 'coin-op',
    'cold-blooded', 'cold-call', 'cold-front', 'cold-hearted', 'cold-shoulder', 'cold-war', 'colour-blind', 'colour-scheme',
    'come-back', 'come-down', 'comfort-zone', 'commander-in-chief', 'common-law', 'common-place', 'common-sense',
    'compact-disc', 'company-wide', 'computer-aided', 'computer-game', 'computer-literate', 'con-man', 'confidence-trick',
    'contact-lens', 'container-ship', 'control-freak', 'control-tower', 'cook-book', 'cooking-oil', 'cool-headed', 'copy-cat',
    'copy-right', 'copy-writer', 'corn-flakes', 'corn-flour', 'cost-effective', 'cost-price', 'cotton-wool', 'couch-potato',
    'council-flat', 'council-house', 'count-down', 'counter-act', 'counter-argument', 'counter-attack', 'counter-balance',
    'counter-claim', 'counter-clock', 'counter-clockwise', 'counter-culture', 'counter-espionage', 'counter-intelligence',
    'counter-measure', 'counter-offer', 'counter-part', 'counter-productive', 'counter-proposal', 'counter-revolution',
    'counter-sign', 'counter-strike', 'counter-terrorism', 'country-side', 'court-case', 'court-martial', 'court-room',
    'court-yard', 'cover-letter', 'cover-note', 'cover-up', 'cow-boy', 'cow-hide', 'cow-shed', 'crack-down', 'crack-pot',
    'crash-course', 'crash-helmet', 'crash-land', 'credit-card', 'credit-worthy', 'crew-cut', 'crew-neck', 'cricket-bat',
    'crime-rate', 'crisp-bread', 'crop-top', 'cross-bar', 'cross-bow', 'cross-breed', 'cross-check', 'cross-country',
    'cross-examine', 'cross-eyed', 'cross-fire', 'cross-hatch', 'cross-legged', 'cross-over', 'cross-purpose',
    'cross-reference', 'cross-road', 'cross-section', 'cross-stitch', 'cross-word', 'crow-bar', 'cruise-missile', 'cry-baby',
    'crystal-clear', 'cube-root', 'cuckoo-clock', 'cup-board', 'cup-cake', 'curry-powder', 'custom-built', 'custom-made',
    'cut-back', 'cut-glass', 'cut-off', 'cut-out', 'cut-price', 'cut-throat', 'cyber-bullying', 'cyber-cafe', 'cyber-crime',
    'cyber-space',
    // D
    'dad-dancer', 'dairy-free', 'dam-buster', 'dance-floor', 'danger-money', 'dare-devil', 'dark-room', 'dash-board',
    'data-base', 'data-processing', 'date-line', 'date-rape', 'date-stamp', 'daughter-in-law', 'day-break', 'day-care',
    'day-center', 'day-dream', 'day-job', 'day-light', 'day-release', 'day-return', 'day-time', 'day-to-day', 'day-trip',
    'dead-beat', 'dead-end', 'dead-heatmap', 'dead-line', 'dead-lock', 'dead-pan', 'dead-weight', 'deaf-mute', 'death-bed',
    'death-mask', 'death-penalty', 'death-rate', 'death-row', 'death-toll', 'death-trap', 'death-wish', 'debit-card',
    'deep-fake', 'deep-freeze', 'deep-fry', 'deep-rooted', 'deep-seated', 'deep-vein', 'deer-stalker', 'defence-mechanism',
    'degree-day', 'demo-tape', 'dental-floss', 'design-conscious', 'devil-may-care', 'dial-up', 'die-hard', 'dining-car',
    'dining-room', 'dining-table', 'dinner-jacket', 'dinner-party', 'dip-stick', 'direct-debit', 'dirt-cheap', 'disc-brake',
    'disc-jockey', 'dish-cloth', 'dish-washer', 'disk-drive', 'ditch-water', 'dive-bomb', 'dividing-line', 'do-it-yourself',
    'dog-collar', 'dog-eared', 'dog-eat-dog', 'dog-fight', 'dog-tired', 'dogs-body', 'dollar-sign', 'doner-kebab', 'door-bell',
    'door-handle', 'door-knob', 'door-mat', 'door-step', 'door-stop', 'door-to-door', 'door-way', 'double-act', 'double-barrelled',
    'double-bass', 'double-bed', 'double-bind', 'double-booked', 'double-breast', 'double-check', 'double-chin', 'double-click',
    'double-cross', 'double-deal', 'double-deck', 'double-decker', 'double-edge', 'double-glaze', 'double-jointed', 'double-park',
    'double-quick', 'double-sided', 'double-space', 'double-standard', 'double-talk', 'double-time', 'down-and-out', 'down-beat',
    'down-cast', 'down-grade', 'down-hearted', 'down-market', 'down-payment', 'down-pour', 'down-range', 'down-right',
    'down-scale', 'down-shift', 'down-side', 'down-size', 'down-stage', 'down-stairs', 'down-stream', 'down-time',
    'down-to-earth', 'down-town', 'down-trodden', 'down-turn', 'down-ward', 'down-wind', 'draft-board', 'drag-and-drop',
    'drag-net', 'drag-queen', 'drain-pipe', 'drama-queen', 'drawing-board', 'drawing-pin', 'drawing-room', 'dream-world',
    'dress-circle', 'dress-maker', 'dress-rehearsal', 'dressing-down', 'dressing-gown', 'dressing-room', 'dressing-table',
    'drill-bit', 'drink-drive', 'drinking-water', 'drive-by', 'drive-in', 'drive-through', 'drive-way', 'driving-licence',
    'driving-test', 'drop-dead', 'drop-down', 'drop-in', 'drop-kick', 'drop-out', 'drop-zone', 'drug-addict', 'drum-kit',
    'drum-major', 'drum-stick', 'dry-clean', 'dry-cleaner', 'dry-dock', 'dry-ice', 'dry-rot', 'dry-run', 'dry-ski',
    'dual-carriageway', 'duck-board', 'duffel-bag', 'duffel-coat', 'dump-truck', 'dunking-stool', 'dust-bin', 'dust-bowl',
    'dust-cart', 'dust-cover', 'dust-jacket', 'dust-pan', 'dust-sheet', 'dust-storm', 'dust-up', 'duty-bound', 'duty-free',
    'dvd-player', 'dynamite-fishing',
    // ...
    // E (Modern & Tech Supplement)
    'e-banking', 'e-cigarette', 'e-form', 'e-gaming', 'e-government', 'e-invoice', 'e-learning', 'e-newsletter', 'e-passport', 'e-safety', 'e-scooter', 'e-signature', 'e-sport', 'e-voting', 'e-wallet', 'e-waste', 'e-zine',
    'eagle-eyed',
    'early-access', // (Gaming/SaaS Critical)
    'early-adopter', 'early-bird', 'early-days', 'early-morning', 'early-onset', 'early-stage', 'early-warning',
    'earnings-per-share',
    'earth-mover', 'earth-moving', 'earth-shattering', 'earth-tone',
    'east-coast', 'east-end', 'east-ender',
    'easy-access', 'easy-breezy', 'easy-care', 'easy-clean', 'easy-grip', 'easy-peasy', 'easy-read', 'easy-to-use',
    'eat-in',
    'eco-friendly', 'eco-lodge', 'eco-village', 'eco-warrior',
    'edge-case', // (Dev Critical: "Testing for edge-cases")
    'edge-computing', 'edge-to-edge',
    'editorial-board',
    'egg-beater', 'egg-fried', 'egg-nog', 'egg-white', 'egg-yolk',
    'eight-ball',
    'elbow-patch', 'elbow-room',
    'elder-care',
    'election-night',
    'electric-blanket', 'electric-car', 'electric-fence', 'electric-guitar', 'electric-razor', 'electric-toothbrush', 'electric-vehicle',
    'electronic-transfer',
    'elevator-music', 'elevator-pitch', // (Business Critical)
    'email-marketing',
    'emergency-brake', 'emergency-call', 'emergency-landing', 'emergency-services', 'emergency-stop',
    'empty-nester',
    'end-credit', 'end-goal', 'end-note',
    'end-of-day', 'end-of-life', // (Tech: EOL Software)
    'end-of-line', 'end-of-season', 'end-of-term', 'end-of-year',
    'end-paper', 'end-piece',
    'end-point', // (Dev Critical: API Endpoint)
    'end-product', 'end-run', 'end-stage', 'end-time', 'end-to-end', // (Dev Critical: E2E Encryption/Testing)
    'end-use', 'end-user', 'end-zone',
    'energy-bar', 'energy-drink', 'energy-efficient', 'energy-saving',
    'engine-room',
    'english-breakfast', 'english-language',
    'entry-code', 'entry-fee', 'entry-level', 'entry-point', 'entry-requirement', 'entry-way',
    'error-checking', 'error-code', 'error-correction', 'error-free', 'error-handling', 'error-log', 'error-message', 'error-page', 'error-prone', 'error-rate',
    'estate-planning', 'estate-tax',
    'even-number',
    'event-driven', // (Dev Critical)
    'event-horizon', 'event-loop', 'event-planner',
    'ever-changing', 'ever-decreasing', 'ever-expanding', 'ever-growing', 'ever-increasing', 'ever-present',
    'every-day', // (Adjective: "An every-day occurrence" vs "I go every day")
    'ex-boyfriend', 'ex-directory', 'ex-girlfriend', 'ex-pat', 'ex-patriot', 'ex-smoker',
    'executive-suite',
    'exercise-bike',
    'exit-door', 'exit-interview', 'exit-poll', 'exit-ramp', 'exit-route', 'exit-strategy', 'exit-wound',
    'expert-witness',
    'expiry-date',
    'export-control',
    'extended-family', 'extended-play', 'extended-release',
    'extension-cord', 'extension-lead',
    'external-drive', 'external-hard-drive',
    'extra-curricular', 'extra-large', 'extra-marital', 'extra-sensory', 'extra-small', 'extra-special', 'extra-terrestrial', 'extra-time', 'extra-virgin',
    'eye-ball', 'eye-candy', 'eye-care', 'eye-level', 'eye-opener', 'eye-piece', 'eye-popping', 'eye-roll', 'eye-rolling', 'eye-socket', 'eye-strain', 'eye-test', 'eye-tracking', 'eye-wash', 'eye-wateringly', 'eye-wear',

    // E
    'e-book', 'e-business', 'e-card', 'e-commerce', 'e-learning', 'e-mail', 'e-number', 'e-petition', 'e-reader', 'e-ticket',
    'ear-ache', 'ear-bash', 'ear-drum', 'ear-mark', 'ear-phone', 'ear-piece', 'ear-plug', 'ear-ring', 'ear-shot', 'ear-splitting',
    'early-bird', 'earth-bound', 'earth-quake', 'earth-work', 'earth-worm', 'east-bound', 'easy-chair', 'easy-going', 'easy-listening',
    'easy-peasy', 'eating-apple', 'eating-disorder', 'echo-chamber', 'eco-friendly', 'eco-system', 'eco-terrorism', 'eco-tour',
    'eco-tourism', 'eco-warrior', 'egg-cup', 'egg-head', 'egg-plant', 'egg-shell', 'egg-timer', 'elbow-grease', 'elbow-room',
    'elder-flower', 'electric-blue', 'electric-chair', 'electric-shock', 'electro-magnet', 'electro-plate', 'electro-shock',
    'elephant-grass', 'eleventh-hour', 'email-address', 'emergency-exit', 'emergency-room', 'empty-handed', 'empty-headed',
    'end-game', 'end-of-life', 'end-of-term', 'end-paper', 'end-piece', 'end-product', 'end-result', 'end-user', 'energy-saving',
    'engine-driver', 'engine-room', 'english-speaking', 'en-masse', 'en-route', 'en-suite', 'entry-level', 'escape-clause',
    'escape-hatch', 'estate-agent', 'estate-car', 'euro-zone', 'even-handed', 'even-tempered', 'ever-green', 'ever-lasting',
    'ever-more', 'ever-present', 'every-day', 'ex-directory', 'ex-gratia', 'ex-husband', 'ex-libris', 'ex-lover', 'ex-member',
    'ex-minister', 'ex-offender', 'ex-officio', 'ex-partner', 'ex-president', 'ex-prime', 'ex-prisoner', 'ex-serviceman',
    'ex-wife', 'exam-paper', 'exchange-rate', 'exit-poll', 'eye-ball', 'eye-bath', 'eye-brow', 'eye-catching', 'eye-contact',
    'eye-drop', 'eye-lash', 'eye-lid', 'eye-liner', 'eye-opening', 'eye-patch', 'eye-shadow', 'eye-sight', 'eye-sore',
    'eye-strain', 'eye-tooth', 'eye-wash', 'eye-witness',

    // F
    'face-cloth', 'face-lift', 'face-mask', 'face-off', 'face-pack', 'face-saving', 'face-value',
    'fact-finding', 'fact-sheet', 'fail-safe', 'fair-ground', 'fair-haired', 'fair-minded', 'fair-play',
    'fair-trade', 'fair-weather', 'fairy-godmother', 'fairy-light', 'fairy-tale', 'fall-out',
    'fan-belt', 'fancy-dress', 'far-away', 'far-flung', 'far-off', 'far-out', 'far-reaching', 'far-sighted',
    'farm-house', 'farm-yard', 'fashion-conscious', 'fast-food', 'fast-forward', 'fast-track',
    'fat-free', 'fat-head', 'father-figure', 'father-land', 'fault-finding', 'fear-mongering',
    'feather-bed', 'feather-weight', 'fee-paying', 'feed-back', 'feel-good', 'fender-bender', 'ferris-wheel',
    'field-day', 'field-events', 'field-glasses', 'field-marshal', 'field-mouse', 'field-work',
    'fifty-fifty', 'fight-back', 'figure-head', 'figure-skating', 'file-sharing', 'filling-station',
    'film-maker', 'film-star', 'fine-art', 'fine-tune',
    'finger-board', 'finger-bowl', 'finger-nail', 'finger-print', 'finger-tip',
    'fire-alarm', 'fire-arm', 'fire-bomb', 'fire-brand', 'fire-break', 'fire-brick', 'fire-brigade',
    'fire-cracker', 'fire-door', 'fire-drill', 'fire-engine', 'fire-escape', 'fire-extinguisher',
    'fire-fighter', 'fire-fly', 'fire-guard', 'fire-lighter', 'fire-man', 'fire-place', 'fire-power',
    'fire-proof', 'fire-station', 'fire-trap', 'fire-wall', 'fire-water', 'fire-wood', 'fire-work',
    'firing-line', 'firing-squad',
    'first-aid', 'first-born', 'first-degree', 'first-foot', 'first-hand', 'first-lady', 'first-name',
    'first-night', 'first-rate',
    'fish-cake', 'fish-eye', 'fish-finger', 'fish-hook', 'fish-knife', 'fish-market', 'fish-monger',
    'fish-net', 'fish-pond', 'fish-tank', 'fish-wife', 'fishing-boat', 'fishing-line', 'fishing-rod',
    'fitted-carpet', 'fitted-sheet', 'five-a-side', 'five-star', 'fix-up', 'fixed-price', 'fixed-term',
    'fizzy-drink', 'flag-day', 'flag-pole', 'flag-ship', 'flag-staff', 'flak-jacket', 'flame-thrower',
    'flash-back', 'flash-flood', 'flash-light', 'flash-point', 'flat-footed', 'flat-out', 'flat-rate',
    'flea-bag', 'flea-bite', 'flea-collar', 'flea-market', 'flesh-coloured', 'flesh-pot', 'flesh-wound',
    'flight-deck', 'flight-path', 'flight-recorder', 'flip-chart', 'flip-flop', 'flip-side',
    'flood-gate', 'flood-light', 'flood-lit', 'flood-plain',
    'floor-board', 'floor-manager', 'floor-plan', 'floor-show',
    'flower-bed', 'flower-girl', 'flower-pot', 'flower-power', 'flower-show', 'flu-jab',
    'fly-away', 'fly-by', 'fly-by-night', 'fly-drive', 'fly-half', 'fly-leaf', 'fly-on-the-wall',
    'fly-over', 'fly-paper', 'fly-past', 'fly-post', 'fly-sheet', 'fly-weight', 'fly-wheel',
    'flying-boat', 'flying-bomb', 'flying-fish', 'flying-fox', 'flying-officer', 'flying-saucer',
    'flying-squad', 'flying-start', 'flying-visit', 'foam-rubber', 'focal-point',
    'fog-bank', 'fog-horn', 'fog-lamp', 'fog-light', 'folding-door',
    'folk-dance', 'folk-hero', 'folk-lore', 'folk-music', 'folk-singer', 'folk-song', 'folk-tale',
    'follow-on', 'follow-through', 'follow-up', 'food-chain', 'food-mixer', 'food-poisoning',
    'food-processor', 'food-stuff', 'fool-hardy', 'fool-proof',
    'foot-ball', 'foot-bath', 'foot-brake', 'foot-bridge', 'foot-fall', 'foot-hill', 'foot-hold',
    'foot-lights', 'foot-loose', 'foot-man', 'foot-mark', 'foot-note', 'foot-path', 'foot-plate',
    'foot-print', 'foot-rest', 'foot-soldier', 'foot-sore', 'foot-step', 'foot-stool', 'foot-wear', 'foot-work',
    'force-feed', 'force-landing',
    'fore-arm', 'fore-bear', 'fore-cast', 'fore-closure', 'fore-court', 'fore-father', 'fore-finger',
    'fore-front', 'fore-gone', 'fore-ground', 'fore-head', 'fore-know', 'fore-leg', 'fore-man',
    'fore-mast', 'fore-name', 'fore-play', 'fore-runner', 'fore-see', 'fore-shadow', 'fore-shorten',
    'fore-sight', 'fore-skin', 'fore-stall', 'fore-taste', 'fore-tell', 'fore-thought', 'fore-warn', 'fore-word',
    'fork-lift', 'form-filling', 'forty-winks', 'foul-mouthed', 'foul-play', 'founding-father', 'four-letter',
    'four-poster', 'four-square', 'four-stroke', 'four-wheel', 'frame-up', 'frame-work',
    'free-fall', 'free-for-all', 'free-hand', 'free-hold', 'free-kick', 'free-lance', 'free-load', 'free-loader',
    'free-market', 'free-standing', 'free-style', 'free-way', 'free-wheel', 'free-will',
    'freeze-dry', 'french-bean', 'french-chalk', 'french-dressing', 'french-fry', 'french-horn',
    'french-polish', 'french-window', 'fresh-water', 'fret-saw', 'fret-work', 'frieze-frame',
    'fringe-benefit', 'frock-coat', 'frog-man', 'frog-march',
    'front-bench', 'front-door', 'front-line', 'front-page', 'front-runner', 'frost-bite',
    'fruit-cake', 'fruit-cocktail', 'fruit-fly', 'fruit-juice', 'fruit-machine', 'fruit-salad', 'fruit-tree',
    'frying-pan', 'fuddy-duddy', 'fuel-cell', 'fuel-injection',
    'full-back', 'full-blown', 'full-board', 'full-bodied', 'full-blooded', 'full-circle', 'full-frontal',
    'full-grown', 'full-house', 'full-length', 'full-moon', 'full-page', 'full-scale', 'full-stop',
    'full-time', 'full-timer', 'fun-fair', 'fun-loving', 'fun-run',
    'fund-holder', 'fund-manager', 'fund-raiser', 'fund-raising', 'funeral-director', 'funeral-parlour',
    'funny-bone', 'fur-coat', 'fur-seal', 'furnishing-fabric', 'fuse-box', 'fuse-wire', 'fuss-pot',
    'fuzzy-logic',

    // G (Modern & Tech Supplement)
    'gadget-bag', 'gag-order',
    'game-changer', 'game-changing', 'game-day', 'game-pad', 'game-plan', 'game-play', 'game-show', 'game-theory', 'game-winner', 'game-winning',
    'gap-analysis', 'gap-fill', 'gap-year', // (UK Essential)
    'garage-sale',
    'garden-center', 'garden-centre', // (UK Spelling)
    'garden-city', 'garden-leave', // (UK Business Term)
    'garden-party', 'garden-variety',
    'gas-guzzler', 'gas-light', 'gas-lighting', 'gas-mask', 'gas-pedal', 'gas-station', 'gas-works',
    'gate-crash', 'gate-crasher', 'gate-fold', 'gate-keeper', 'gate-way',
    'gear-box', 'gear-change', 'gear-lever', 'gear-shift', 'gear-stick', // (UK Essential)
    'geek-chic',
    'gender-bender', 'gender-bias', 'gender-fluid', 'gender-gap', 'gender-identity', 'gender-neutral', 'gender-reveal', 'gender-specific', 'gender-swap',
    'general-purpose',
    'generation-gap', 'generation-x', 'generation-y', 'generation-z',
    'geo-block', 'geo-cache', 'geo-caching', 'geo-code', 'geo-fencing', 'geo-location', 'geo-political', 'geo-politics', 'geo-spatial', 'geo-tag', 'geo-tagging', 'geo-thermal',
    'get-go', 'get-out', 'get-rich-quick', 'get-together', 'get-up-and-go',
    'ghost-hunter', 'ghost-story', 'ghost-town', 'ghost-write', 'ghost-writer',
    'gift-card', 'gift-cert', 'gift-certificate', 'gift-shop', 'gift-wrap', 'gift-wrapped',
    'gig-bag', 'gig-economy', // (Modern Business Critical)
    'ginger-ale', 'ginger-beer', 'ginger-bread', 'ginger-nut', 'ginger-snap',
    'girl-band', 'girl-friend', 'girl-next-door', 'girl-power', 'girl-talk',
    'give-and-take', 'give-away',
    'glam-rock',
    'glass-blower', 'glass-ceiling', 'glass-cutter', 'glass-fronted', 'glass-house', 'glass-ware',
    'global-warming',
    'glue-gun', 'glue-stick',
    'go-ahead', 'go-between', 'go-cart', 'go-getter', 'go-getting', 'go-kart',
    'go-live', // (Tech/Project Management Critical)
    'go-no-go', 'go-slow', 'go-to', 'go-to-market', // (Business Critical)
    'goal-difference', 'goal-hanger', 'goal-keeper', 'goal-kick', 'goal-line', 'goal-mouth', 'goal-post', 'goal-scorer', 'goal-scoring', 'goal-setting',
    'gob-smacked', // (British Slang)
    'god-child', 'god-daughter', 'god-father', 'god-fearing', 'god-given', 'god-mother', 'god-parent', 'god-send', 'god-son',
    'going-over',
    'gold-digger', 'gold-dust', 'gold-leaf', 'gold-mine', 'gold-plated', 'gold-rush',
    'golden-age', 'golden-boy', 'golden-girl', 'golden-handshake', // (Business Term)
    'golden-hour', 'golden-jubilee', 'golden-oldie', 'golden-rule', 'golden-ticket', 'golden-wedding',
    'golf-bag', 'golf-ball', 'golf-cart', 'golf-club', 'golf-course',
    'good-bye', 'good-for-nothing', 'good-humoured', 'good-looking', 'good-luck', 'good-natured', 'good-night', 'good-will',
    'google-eyed', 'googly-eyed',
    'goose-bump', 'goose-bumps', 'goose-step',
    'government-backed', 'government-funded',
    'gps-tracker',
    'grab-and-go', 'grab-bag', 'grab-handle', 'grab-rail',
    'grade-point',
    'grand-dad', 'grand-parent', 'grand-slam', 'grand-stand',
    'grant-maintained',
    'grape-fruit', 'grape-shot', 'grape-vine',
    'graph-paper',
    'grass-court', 'grass-hopper', 'grass-roots', 'grass-snake',
    'grave-digger', 'grave-stone', 'grave-yard',
    'gravity-feed',
    'grease-gun', 'grease-proof',
    'great-aunt', 'great-grandchild', 'great-grandfather', 'great-grandmother', 'great-grandparent', 'great-nephew', 'great-niece', 'great-uncle',
    'green-belt', // (UK Planning Term)
    'green-card', 'green-eyed', 'green-fingers', 'green-fly', 'green-grocer', 'green-house', 'green-light', 'green-room', 'green-screen', 'green-tea', 'green-wash', 'green-washing', // (Modern Business)
    'grey-area', // (UK Spelling)
    'grey-beard', 'grey-hair', 'grey-hound', 'grey-matter', 'grey-scale',
    'grid-lock', 'grid-locked', 'grid-reference',
    'grill-pan',
    'ground-ball', 'ground-breaking', 'ground-control', 'ground-cover', 'ground-floor', 'ground-hog', 'ground-nut', 'ground-rule', 'ground-sheet', 'ground-staff', 'ground-swell', 'ground-work', 'ground-zero',
    'group-chat', 'group-hug', 'group-stage', 'group-therapy', 'group-think', 'group-ware',
    'grown-up',
    'growth-hacking', // (Marketing Critical)
    'grub-screw',
    'guard-dog', 'guard-rail', 'guard-room',
    'guest-book', 'guest-house', 'guest-list', 'guest-room', 'guest-speaker', 'guest-star', 'guest-worker',
    'guide-book', 'guide-dog', 'guide-line', 'guide-price',
    'guilt-edge', 'guilt-free', 'guilt-trip',
    'guinea-fowl', 'guinea-pig',
    'gum-boot', 'gum-disease', 'gum-shield',
    'gun-boat', 'gun-crime', 'gun-dog', 'gun-fight', 'gun-fire', 'gun-man', 'gun-metal', 'gun-point', 'gun-powder', 'gun-runner', 'gun-running', 'gun-shot', 'gun-shy', 'gun-smith',
    'gut-feeling', 'gut-wrenching',
    'gym-kit', 'gym-shoes', 'gym-slip',

    // H (Modern & Tech Supplement)
    'hack-a-thon', 'hack-saw',
    'hair-band', 'hair-brush', 'hair-clip', 'hair-cut', 'hair-do', 'hair-dresser', 'hair-dryer', 'hair-grip', 'hair-line', 'hair-net', 'hair-piece', 'hair-pin', 'hair-raising', 'hair-spray', 'hair-style', 'hair-stylist',
    'half-and-half', 'half-baked', 'half-board', 'half-breed', 'half-brother', 'half-caste', 'half-cocked', 'half-cut', 'half-day',
    'half-empty', 'half-full', 'half-hearted', 'half-holiday', 'half-hour', 'half-life', 'half-mast', 'half-measure', 'half-moon', 'half-open', 'half-pace', 'half-past', 'half-price',
    'half-sister', 'half-size', 'half-sleeve', 'half-term', // (UK Education Critical)
    'half-time', 'half-tone', 'half-track', 'half-truth', 'half-volley', 'half-way', 'half-wit', 'half-witted', 'half-yearly',
    'hammer-blow', 'hammer-head', 'hammer-toe',
    'hand-bag', // (UK Specific - US is purse)
    'hand-ball', 'hand-bell', 'hand-bill', 'hand-book', 'hand-brake', 'hand-cart', 'hand-clap', 'hand-cream', 'hand-cuff', 'hand-delivered', 'hand-dryer', 'hand-grenade', 'hand-grip', 'hand-gun',
    'hand-held', 'hand-job', 'hand-luggage', 'hand-made', 'hand-me-down', 'hand-out', 'hand-over', 'hand-paint', 'hand-pick', 'hand-picked', 'hand-rail', 'hand-saw', 'hand-set', 'hand-shake', 'hand-stand', 'hand-to-hand', 'hand-to-mouth', 'hand-towel', 'hand-wash', 'hand-washing', 'hand-work', 'hand-woven', 'hand-wringing', 'hand-write', 'hand-written',
    'hands-down', 'hands-free', 'hands-off', 'hands-on', 'hands-up',
    'hang-glider', 'hang-gliding', 'hang-out', 'hang-over', 'hang-up',
    'hanger-on',
    'happy-clappy', 'happy-go-lucky', 'happy-hour', 'happy-slapping', // (UK Slang)
    'hard-and-fast', 'hard-back', 'hard-ball', 'hard-bit', 'hard-boiled', 'hard-case', 'hard-cash', 'hard-code', 'hard-coded', // (Dev Critical)
    'hard-copy', 'hard-core', 'hard-cover', 'hard-disk',
    'hard-drive', // (Tech Critical)
    'hard-earned', 'hard-fi', 'hard-fought', 'hard-hitter', 'hard-hitting', 'hard-line', 'hard-liner', 'hard-nosed', 'hard-pressed',
    'hard-reset', // (Tech Critical)
    'hard-rock', 'hard-sell', 'hard-shoulder', // (UK Road Term)
    'hard-stop', // (Business: "I have a hard-stop at 2pm")
    'hard-stuff', 'hard-top', 'hard-up', 'hard-wearing', 'hard-wired', 'hard-working',
    'hare-brained',
    'hash-brown', 'hash-key', 'hash-rate', 'hash-table',
    'hash-tag', // (Social Media Critical)
    'hat-band', 'hat-box', 'hat-stand', 'hat-trick',
    'hate-crime', 'hate-mail', 'hate-speech',
    'have-a-go', 'have-not',
    'hay-fever', 'hay-loft', 'hay-maker', 'hay-making', 'hay-ride', 'hay-stack', 'hay-wire',
    'haz-mat',
    'head-ache', 'head-banger', 'head-band', 'head-board', 'head-butt', 'head-case', 'head-count', // (Business Critical)
    'head-dress', 'head-first', 'head-gear', 'head-hunt', 'head-hunter', 'head-hunting',
    'head-lamp', 'head-light', 'head-line', 'head-master', // (UK School)
    'head-mistress', 'head-note', 'head-office', 'head-on',
    'head-phone', 'head-piece', 'head-quarters', 'head-rest', 'head-room', 'head-scarf', 'head-set', // (Tech/Gaming)
    'head-space', 'head-start', 'head-stone', 'head-strong', 'head-teacher', 'head-to-head', 'head-up', // (HUD)
    'head-waiter', 'head-way', 'head-wind', 'head-word',
    'health-care', 'health-check', 'health-club', 'health-conscious',
    'heap-big',
    'hearing-aid', 'hearing-impaired',
    'heart-ache', 'heart-attack', 'heart-beat', 'heart-break', 'heart-broken', 'heart-burn', 'heart-failure', 'heart-felt', 'heart-land', 'heart-lung', 'heart-rate', 'heart-rending', 'heart-search', 'heart-sick', 'heart-stopping', 'heart-strings', 'heart-throb', 'heart-to-heart', 'heart-warm', 'heart-warming',
    'heat-proof', 'heat-pump', 'heat-rash', 'heat-resistant', 'heat-seeker', 'heat-seeking', 'heat-shield', 'heat-sink', // (Tech Critical)
    'heat-stroke', 'heat-wave',
    'heavy-duty', 'heavy-handed', 'heavy-heart', 'heavy-hearted', 'heavy-metal', 'heavy-set', 'heavy-weight',
    'hedge-fund', 'hedge-hog', 'hedge-hop', 'hedge-row', 'hedge-trimmer',
    'heel-bar', 'heel-tap',
    'height-adjustable',
    'hell-bent', 'hell-fire', 'hell-hole', 'hell-raiser',
    'help-desk', 'help-line',
    'helter-skelter', // (UK Fairground)
    'hem-line',
    'hen-house', 'hen-night', 'hen-party', 'hen-peck', 'hen-pecked',
    'here-abouts', 'here-after', 'here-by', 'here-in', 'here-of', 'here-to', 'here-to-fore', 'here-under', 'here-upon', 'here-with',
    'hero-worship',
    'hide-and-seek', 'hide-away', 'hide-bound', 'hide-out',
    'hi-fi', 'hi-hat', 'hi-res', 'hi-tech', // (Often High-tech, but common abbreviation)
    'high-and-mighty', 'high-born', 'high-brow', 'high-chair', 'high-class',
    'high-definition', // (High-def)
    'high-density', 'high-end', 'high-energy', 'high-fidelity', 'high-five', 'high-flyer', 'high-flying', 'high-frequency', 'high-grade', 'high-handed', 'high-heeled', 'high-heels', 'high-impact', 'high-jump', 'high-level', // (Business: "High-level overview")
    'high-life', 'high-light', 'high-maintenance', 'high-minded', 'high-octane', 'high-off', 'high-performance', 'high-pitch', 'high-pitched', 'high-point', 'high-power', 'high-powered', 'high-pressure', 'high-profile', 'high-quality', 'high-ranking',
    'high-resolution', // (Tech)
    'high-rise', 'high-risk', 'high-road', 'high-school', 'high-season', 'high-speed', 'high-spirited', 'high-stakes', 'high-street', // (UK Retail Critical)
    'high-strung', 'high-table', 'high-tech', 'high-tension', 'high-time', 'high-top', 'high-vis', 'high-visibility', 'high-voltage', 'high-water', 'high-way', 'high-wire', 'high-yield',
    'hill-billy', 'hill-climb', 'hill-farm', 'hill-fort', 'hill-side', 'hill-top', 'hill-walk', 'hill-walker', 'hill-walking',
    'hip-bath', 'hip-flask', 'hip-hop', 'hip-joint', 'hip-replacement',
    'hire-car', 'hire-purchase', // (UK Finance)
    'hit-and-miss', 'hit-and-run', 'hit-list', 'hit-man', 'hit-parade', 'hit-squad',
    'hive-mind',
    'hobby-horse',
    'hob-nob',
    'hocus-pocus',
    'hoe-down',
    'hog-roast', 'hog-tie', 'hog-wash',
    'hoist-man',
    'hold-all', 'hold-back', 'hold-down', 'hold-out', 'hold-over', 'hold-up',
    'hole-and-corner', 'hole-in-one', 'hole-in-the-wall', 'hole-punch',
    'holiday-maker',
    'home-baked', 'home-base', 'home-boy', 'home-brew', 'home-brood', 'home-build', 'home-buyer', 'home-coming', 'home-cook', 'home-cooked', 'home-counties', 'home-court', 'home-delivery', 'home-economics', 'home-front', 'home-grown', 'home-help', 'home-improvement', 'home-land', 'home-loan', 'home-made', 'home-maker', 'home-movie', 'home-office', 'home-owner',
    'home-page', // (Web)
    'home-rule', 'home-run', 'home-school', 'home-schooling', 'home-screen', 'home-sick', 'home-sickness', 'home-spun', 'home-stead', 'home-straight', 'home-stretch', 'home-time', 'home-town', 'home-truth', 'home-ward', 'home-work',
    'honest-to-god',
    'honey-bee', 'honey-comb', 'honey-dew', 'honey-moon', 'honey-pot', 'honey-suckle', 'honey-trap',
    'hood-wink',
    'hook-and-eye', 'hook-line-and-sinker', 'hook-nose', 'hook-up',
    'hop-scotch',
    'horror-struck',
    'horse-back', 'horse-box', 'horse-brass', 'horse-chestnut', 'horse-drawn', 'horse-fly', 'horse-hair', 'horse-man', 'horse-play', 'horse-power', 'horse-race', 'horse-racing', 'horse-radish', 'horse-rider', 'horse-riding', 'horse-shoe', 'horse-trade', 'horse-trading', 'horse-whip', 'horse-woman',
    'hose-pipe',
    'hot-air', 'hot-bed', 'hot-blood', 'hot-blooded', 'hot-button', 'hot-cake', 'hot-cross-bun', 'hot-desk', 'hot-desking', // (Modern Office)
    'hot-dog', 'hot-fix', // (Tech)
    'hot-foot', 'hot-head', 'hot-headed', 'hot-house',
    'hot-key', // (Tech)
    'hot-line',
    'hot-link', // (Web)
    'hot-melt', 'hot-pants', 'hot-plate',
    'hot-pot', // (Lancashire Hot-pot)
    'hot-potato', 'hot-press', 'hot-rod', 'hot-seat', 'hot-shoe', 'hot-shot',
    'hot-spot', // (Tech/Wifi)
    'hot-spring', 'hot-stuff',
    'hot-swap', // (Tech Hardware)
    'hot-tempered', 'hot-tub', 'hot-water', 'hot-wire',
    'hotel-keeper',
    'hour-glass', 'hour-hand',
    'house-arrest', 'house-boat', 'house-bound', 'house-break', 'house-breaker', 'house-breaking', 'house-call', 'house-coat', 'house-fly', 'house-guest', 'house-hold', 'house-holder', 'house-hunting', 'house-husband', 'house-keep', 'house-keeper', 'house-keeping', 'house-maid', 'house-master', 'house-mate', 'house-mistress', 'house-mother', 'house-move', 'house-music', 'house-parent', 'house-party', 'house-plant', 'house-price', 'house-proud', 'house-rule', 'house-share', 'house-sit', 'house-sitter', 'house-trained', 'house-training', 'house-warm', 'house-warming', 'house-wife', 'house-work',
    'hover-board', 'hover-craft',
    'how-to', // (Noun: "Read the how-to")
    'hub-cap',
    'human-being', 'human-interest', 'human-readable', 'human-right', 'human-scale',
    'humble-brag',
    'hump-back',
    'hunch-back', 'hunch-backed',
    'hundred-weight',
    'hurly-burly', 'hurry-up',
    'hush-hush', 'hush-money', 'hush-puppy',
    'hybrid-cloud', 'hybrid-electric',
    'hydro-electric', 'hydro-electricity', 'hydro-power', 'hydro-therapy',
    'hype-man',
    'hyper-active', 'hyper-activity', 'hyper-critical', 'hyper-drive', 'hyper-extend', 'hyper-inflation',
    'hyper-link', // (Web)
    'hyper-local', 'hyper-market', 'hyper-real', 'hyper-sensitive', 'hyper-sonic', 'hyper-space', 'hyper-text', 'hyper-thread', 'hyper-thyroid', 'hyper-vent', 'hyper-ventilate',
    'hyphen-dictionary', // (Meta!)

    // I (Modern & Tech Supplement)
    'i-beam', 'i-ching', 'i-pad', 'i-phone', 'i-player', 'i-pod',
    'ice-age', 'ice-axe', 'ice-bath', 'ice-berg', 'ice-blond', 'ice-blue', 'ice-box', 'ice-breaker', 'ice-bucket', 'ice-cap', 'ice-cold', 'ice-cool', 'ice-cream', // (Classic UK hyphenation)
    'ice-cube', 'ice-dance', 'ice-dancer', 'ice-dancing', 'ice-field', 'ice-floe', 'ice-hockey', 'ice-house', 'ice-lolly', // (UK Specific)
    'ice-machine', 'ice-maker', 'ice-pack', 'ice-pick', 'ice-plant', 'ice-rink', 'ice-sheet', 'ice-skate', 'ice-skater', 'ice-skating', 'ice-storm', 'ice-tray', 'ice-wine',
    'id-card', 'id-tag',
    'idea-rich',
    'identity-card', 'identity-theft',
    'ill-advised', 'ill-afford', 'ill-assorted', 'ill-at-ease', 'ill-bred', 'ill-conceived', 'ill-consider', 'ill-considered', 'ill-defined', 'ill-discipline', 'ill-effect', 'ill-equipped', 'ill-fated', 'ill-favoured', 'ill-fitting', 'ill-founded', 'ill-gain', 'ill-gotten', 'ill-health', 'ill-humour', 'ill-informed', 'ill-judge', 'ill-judged', 'ill-looking', 'ill-mannered', 'ill-natured', 'ill-omen', 'ill-omened', 'ill-prepare', 'ill-prepared', 'ill-repute', 'ill-spent', 'ill-starred', 'ill-suit', 'ill-suited', 'ill-temper', 'ill-tempered', 'ill-time', 'ill-timed', 'ill-treat', 'ill-treatment', 'ill-use', 'ill-used', 'ill-will', 'ill-wind',
    'image-conscious', 'image-maker', 'image-processing', 'image-stabilization', 'image-stabilizer',
    'immune-system',
    'impact-assessment', 'impact-resistant',
    'in-app', // (Tech/SaaS Critical)
    'in-basket', 'in-between', 'in-board', 'in-bound', // (Marketing/Travel)
    'in-box', // (Often solid 'inbox', but useful to catch variants)
    'in-breath', 'in-brief', 'in-build', 'in-built', 'in-camera', 'in-car', 'in-charge', 'in-cinema', 'in-class', 'in-club', 'in-country', 'in-crowd',
    'in-depth', // (You have this, but good to group)
    'in-ear', 'in-feed', 'in-field', 'in-fighting', 'in-fill', 'in-flight', 'in-flow', 'in-foal', 'in-game', // (Gaming)
    'in-going', 'in-grown', 'in-growing',
    'in-house', // (Business Critical)
    'in-joke', 'in-keeping', 'in-land', 'in-law', 'in-line', // (Tech: "Inline styles")
    'in-loco-parentis', 'in-memory', // (Tech: "In-memory database")
    'in-migrate', 'in-migration', 'in-name-only', 'in-off', 'in-patient', 'in-person', 'in-phase', 'in-place', 'in-pocket', 'in-post', 'in-practice', 'in-process', 'in-progress', 'in-pub', 'in-road', 'in-room', 'in-rush', 'in-season', 'in-service', 'in-shore', 'in-shot', 'in-sight', 'in-situ', 'in-sole', 'in-soul', 'in-step',
    'in-store', // (Retail)
    'in-style', 'in-swing', 'in-swinger', 'in-the-black', 'in-the-money', 'in-the-red', 'in-thing', 'in-toed', 'in-tray', 'in-use',
    'in-vitro', // (Science)
    'in-vivo', 'in-voice', 'in-work', 'in-year', 'in-your-face',
    'inch-perfect', 'inch-worm',
    'income-support', 'income-tax',
    'index-finger', 'index-fund', 'index-link', 'index-linked',
    'indoor-outdoor',
    'industrial-strength',
    'info-graphic', 'info-mercial', 'info-tainment',
    'infra-red', 'infra-structure',
    'ink-blot', 'ink-cartridge', 'ink-jet', // (Tech: Ink-jet printer)
    'ink-pot', 'ink-pad', 'ink-spot', 'ink-stand', 'ink-well',
    'inner-circle', 'inner-city', 'inner-ear', 'inner-most', 'inner-sole', 'inner-space', 'inner-tube',
    'input-output', // (Tech: I/O)
    'insect-bite', 'insect-repellent',
    'inside-out', 'inside-track',
    'instant-messaging',
    'intellectual-property', // (Business: IP)
    'intelligence-gathering', 'intelligence-service', 'intelligence-test',
    'interest-free', 'interest-group', 'interest-only', 'interest-rate',
    'interior-design', 'interior-designer',
    'internet-banking', 'internet-cafe', 'internet-ready',
    'ion-exchange',
    'ip-address', // (Tech Critical)
    'iron-age', 'iron-bridge', 'iron-clad', 'iron-fisted', 'iron-foundry', 'iron-grey', 'iron-lung', 'iron-man',
    'iron-monger', 'iron-mongery', // (UK Retail)
    'iron-on', 'iron-ore', 'iron-oxide', 'iron-work', 'iron-works',
    'ironing-board',
    'island-hop', 'island-hopping',
    'it-bag', 'it-crowd', 'it-girl',
    'ivory-tower',
    'ivy-covered', 'ivy-league', 'ivy-leaved',

    // J (Modern & Tech Supplement)
    'jack-boot', 'jack-hammer', 'jack-in-the-box', 'jack-knife',
    'jack-of-all-trades', 'jack-plug', // (Tech/Audio)
    'jack-pot', 'jack-rabbit', 'jack-screw', 'jack-tar',
    'jacobs-ladder',
    'jam-jar', 'jam-packed', 'jam-session', 'jam-tart',
    'jaw-bone', 'jaw-breaker', 'jaw-dropping', 'jaw-line',
    'jazz-band', 'jazz-club', 'jazz-fusion', 'jazz-man', 'jazz-singer',
    'jeep-coat',
    'jelly-baby', // (UK Sweet)
    'jelly-bag', 'jelly-bean', 'jelly-fish', 'jelly-mould', 'jelly-roll',
    'jerk-water',
    'jerry-build', 'jerry-builder', 'jerry-built', 'jerry-can', 'jerry-rig', // (Tech/DIY)
    'jersey-cream',
    'jet-age', 'jet-black', 'jet-boat', 'jet-engine', 'jet-foil',
    'jet-lag', 'jet-lagged', // (Travel/Remote Work)
    'jet-liner', 'jet-pack', 'jet-plane', 'jet-propulsion', 'jet-set', 'jet-setter', 'jet-setting',
    'jet-ski', 'jet-skier', 'jet-stream',
    'jet-wash', // (UK Car Clean)
    'jewel-box', 'jewel-case', // (CD/DVD Storage)
    'jib-boom', 'jib-crane', 'jib-door',
    'jig-saw', // (Tool & Puzzle)
    'job-application', 'job-center', 'job-centre', // (UK Government)
    'job-creation', 'job-description', 'job-holder', 'job-hunt', 'job-hunter', 'job-hunting',
    'job-lot', // (UK Retail/Auction)
    'job-market', 'job-satisfaction', 'job-search', 'job-seeker', 'job-share', 'job-sharing', // (HR/Business)
    'job-sheet', 'job-site', 'job-ticket', 'job-title', 'job-work', 'job-sworth', // (UK Slang: "More than my job's worth")
    'jockey-wheel',
    'joe-bloggs', // (UK "Average Joe")
    'joe-public',
    'jog-trot',
    'john-bull', 'john-dory',
    'joint-account', 'joint-stock', 'joint-venture', // (Business)
    'joke-book', 'joke-shop',
    'joy-flight', 'joy-pad', // (Gaming)
    'joy-ride', 'joy-rider', 'joy-riding',
    'joy-stick', // (Gaming/Aviation)
    'juice-bar', 'juice-extractor',
    'juke-box',
    'jump-cut', 'jump-jet',
    'jump-lead', // (UK for Jumper Cable)
    'jump-off', 'jump-rope', 'jump-shot', 'jump-start', 'jump-suit',
    'jumping-bean', 'jumping-jack',
    'jungle-gym',
    'junk-bond', 'junk-dealer', 'junk-email', 'junk-food', 'junk-mail', 'junk-shop', 'junk-yard',
    'jury-box', 'jury-man', 'jury-mast', 'jury-rig', 'jury-rigged', 'jury-service',
    'just-in-time', // (Business/Logistics: JIT)
    'just-so',

    // K (Modern & Tech Supplement)
    'kangaroo-court', 'kangaroo-hop',
    'karate-chop', 'karate-kick',
    'keel-haul',
    'keep-away', 'keep-cup', 'keep-fit', 'keep-net', 'keep-out', 'keep-sake', 'keep-up',
    'kettle-bell', 'kettle-drum',
    'key-board', // (Often solid, but useful to catch variants)
    'key-card', 'key-change', 'key-chain',
    'key-frame', // (Video/Animation Critical)
    'key-grip', 'key-holder', 'key-hole', 'key-light',
    'key-logger', 'key-logging', // (Security)
    'key-money', 'key-note', 'key-pad',
    'key-pair', // (Crypto/Dev Critical)
    'key-ring', 'key-signature', 'key-stage', // (UK Education)
    'key-stone', 'key-stroke',
    'key-value', // (Dev: Key-value store)
    'key-way', 'key-word', 'key-worker', // (UK Critical)
    'kick-about', // (UK Football)
    'kick-ass', 'kick-back', 'kick-boxer', 'kick-boxing', 'kick-down', 'kick-off', 'kick-start', 'kick-starter', 'kick-up',
    'kid-gloves', 'kid-size',
    'kidney-bean', 'kidney-machine', 'kidney-stone',
    'kill-cord', 'kill-joy', 'kill-off',
    'kill-switch', // (Tech/Security)
    'kilo-byte', 'kilo-cycle', 'kilo-gram', 'kilo-hertz', 'kilo-joule', 'kilo-liter', 'kilo-metre', 'kilo-ton', 'kilo-watt',
    'kind-hearted',
    'king-cobra', 'king-crab', 'king-hit', 'king-maker', 'king-pin', 'king-prawn',
    'king-size', 'king-sized', // (Consumer/Retail)
    'kiss-and-tell', 'kiss-chase', 'kiss-curl', 'kiss-of-life',
    'kit-bag', 'kit-car',
    'kitchen-diner', 'kitchen-garden', 'kitchen-maid',
    'kitchen-sink', // (Adj: "Kitchen-sink drama")
    'kitchen-table', 'kitchen-ware',
    'kite-mark', // (UK Standards)
    'kite-surf', 'kite-surfer', 'kite-surfing',
    'knee-bend', 'knee-breeches', 'knee-cap', 'knee-deep', 'knee-high', 'knee-hole',
    'knee-jerk', // (Common Idiom)
    'knee-length', 'knee-pad', 'knee-slapper', 'knee-sock',
    'knife-edge', 'knife-point', 'knife-rest', 'knife-sharpener',
    'knight-errant', 'knight-hood',
    'knit-wear',
    'knob-head', // (UK Colloquial)
    'knock-about', 'knock-back', 'knock-down', 'knock-for-knock', 'knock-kneed', 'knock-off',
    'knock-on', // (Rugby/Cause-and-effect)
    'knock-out', 'knock-up',
    'knot-hole',
    'know-all',
    'know-how', // (Business Critical)
    'know-it-all', 'know-nothing',
    'knuckle-ball', 'knuckle-bone', 'knuckle-duster', 'knuckle-head', 'knuckle-sandwich',
    'kung-fu',

    // L (Modern & Tech Supplement)
    'lab-coat', 'lab-rat', 'lab-technician',
    'label-mate',
    'labour-camp', 'labour-force', 'labour-intensive', 'labour-market', 'labour-movement', 'labour-party', 'labour-saving', 'labour-union',
    'lace-up',
    'lack-lustre', // (UK Spelling)
    'ladder-back', 'ladder-proof',
    'ladies-man',
    'lady-bird', // (UK Specific - US is Ladybug)
    'lady-in-waiting', 'lady-killer', 'lady-like', 'lady-love',
    'lager-lout', // (UK Slang)
    'laid-back', 'laid-off', 'laid-up',
    'lake-side',
    'lamb-chop', 'lamb-wool',
    'lame-brain', 'lame-duck',
    'lamp-black', 'lamp-post', 'lamp-shade',
    'land-agent', 'land-based', 'land-crab', 'land-fill', 'land-form', 'land-grab', 'land-holder', 'land-line', 'land-locked', 'land-lord', 'land-lubber', 'land-mass', 'land-mine', 'land-owner', 'land-owning', 'land-rover', 'land-slide', 'land-slip',
    'landing-craft', 'landing-gear',
    'landing-page', // (Marketing/Web Critical)
    'landing-stage', 'landing-strip',
    'lane-discipline',
    'language-learning',
    'lap-dancer', 'lap-dancing', 'lap-dog', 'lap-joint', 'lap-top', // (Solid 'laptop' common, but hyphenated adj "lap-top computer" persists)
    'large-print', 'large-scale',
    'laser-disk', 'laser-guided', 'laser-printer',
    'last-ditch', 'last-gasp', 'last-minute', 'last-named', 'last-post', 'last-rights', 'last-word',
    'latch-key',
    'late-comer', 'late-night',
    'laughing-gas', 'laughing-stock',
    'launch-pad', 'launch-party', 'launch-site', 'launch-window',
    'launder-ette', // (UK Specific)
    'law-abiding', 'law-breaker', 'law-breaking', 'law-court', 'law-maker', 'law-making', 'law-man', 'law-suit',
    'lay-about', 'lay-by', // (UK Road Term)
    'lay-figure', 'lay-off', 'lay-out', 'lay-over', 'lay-person', 'lay-reader', 'lay-up',
    'lazy-bones',
    'lazy-load', 'lazy-loading', // (Dev/Web Perf Critical)
    'lead-free', 'lead-in', 'lead-line', 'lead-off', 'lead-singer',
    'lead-time', // (Business/Manufacturing)
    'lead-up',
    'leading-edge', // (Tech)
    'leaf-let', 'leaf-mould', 'leaf-spring',
    'lean-to',
    'leap-frog', 'leap-year',
    'learning-curve', 'learning-disabled', 'learning-disability',
    'lease-hold', 'lease-holder', 'lease-lend',
    'leave-taking',
    'left-back', 'left-bank', 'left-footer', 'left-hand', 'left-handed', 'left-hander', 'left-hook', 'left-luggage', // (UK Train Station)
    'left-over', 'left-wing', 'left-winger',
    'leg-before', // (Cricket)
    'leg-break', 'leg-pull', 'leg-room', 'leg-spin', 'leg-warmer',
    'legal-aid', 'legal-tender',
    'lemon-curd', 'lemon-grass', 'lemon-squeezer',
    'lend-lease',
    'let-down', 'let-out', 'let-up',
    'letter-bomb', 'letter-box', // (UK Specific)
    'letter-card', 'letter-carrier', 'letter-case', 'letter-head', 'letter-opener', 'letter-press', 'letter-spacing', // (Design/CSS)
    'letter-writer',
    'level-crossing', // (UK Road/Rail)
    'level-headed', 'level-peg', 'level-pegging',
    'li-ion', // (Lithium-Ion)
    'lib-dem', // (UK Politics)
    'library-book',
    'lie-detector', 'lie-down', 'lie-in', // (UK: Sleeping late)
    'life-belt', 'life-blood', 'life-boat', 'life-buoy', 'life-cycle', // (Business/Dev)
    'life-death', 'life-expectancy', 'life-force', 'life-form', 'life-giving', 'life-guard', 'life-hack', // (Modern Internet)
    'life-jacket', 'life-like', 'life-line', 'life-long', 'life-member', 'life-preserver', 'life-raft', 'life-saver', 'life-saving', 'life-science', 'life-sentence', 'life-size', 'life-sized', 'life-skill', 'life-span', 'life-style', 'life-support', 'life-threatening', 'life-time', 'life-work',
    'lift-off',
    'light-blue', 'light-bulb', 'light-fingered', 'light-footed', 'light-green', 'light-head', 'light-headed', 'light-heart', 'light-hearted', 'light-heavyweight', 'light-house', 'light-meter', 'light-pen', 'light-rail', 'light-ship', 'light-switch', 'light-weight', 'light-year',
    'light-box', // (UI/Photo)
    'like-minded',
    'lily-livered', 'lily-pad', 'lily-white',
    'lime-green', 'lime-light', 'lime-scale', // (UK Household)
    'limit-switch',
    'line-break', // (Dev/Text)
    'line-dance', 'line-dancer', 'line-dancing', 'line-drawing', 'line-drive',
    'line-height', // (CSS/Design)
    'line-item', // (Business/Invoice)
    'line-manager', // (UK HR Critical)
    'line-out', 'line-up',
    'linear-b',
    'link-bait', // (SEO/Marketing)
    'link-up',
    'lion-heart', 'lion-hearted', 'lion-tamer',
    'lip-gloss', 'lip-read', 'lip-reader', 'lip-reading', 'lip-service', 'lip-stick', 'lip-sync',
    'liquid-crystal', // (LCD)
    'liquor-store',
    'list-box', 'list-price', 'list-view', // (UI/Dev)
    'listen-in',
    'lithium-ion',
    'litter-bin', // (UK Specific)
    'litter-bug', 'litter-lout',
    'live-action', 'live-blog', // (Journalism)
    'live-feed', 'live-in', 'live-long', 'live-rail', 'live-stream', 'live-streaming', 'live-wire',
    'liver-salt', 'liver-sausage',
    'living-room', 'living-space', 'living-wage',
    'load-balancer', 'load-balancing', // (DevOps Critical)
    'load-shedding',
    'loaf-tin',
    'loan-shark', 'loan-word',
    'lock-down', 'lock-in', 'lock-jaw', 'lock-keeper', 'lock-nut', 'lock-out', 'lock-smith', 'lock-stitch', 'lock-up', 'lock-washer',
    'log-book', 'log-cabin', 'log-file', // (Tech)
    'log-fire',
    'log-in', 'log-off', 'log-on', 'log-out', // (Tech: Noun/Adj usually hyphenated or solid)
    'logic-bomb', 'logic-chop', 'logic-gate',
    'lollipop-lady', 'lollipop-man', // (UK School Crossing)
    'london-pride',
    'lone-parent', 'lone-star', 'lone-wolf',
    'long-ago', 'long-awaited', 'long-bow', 'long-distance', 'long-drawn', 'long-drawn-out', 'long-face', 'long-faced', 'long-form', // (Content)
    'long-hair', 'long-haired', 'long-hand', 'long-haul', 'long-horn', 'long-johns', 'long-jump', 'long-life', 'long-list', 'long-lived', 'long-lost', 'long-play', 'long-player', 'long-range', 'long-running', 'long-shore', 'long-shot', 'long-sight', 'long-sighted', 'long-stand', 'long-standing', 'long-stop', 'long-suffer', 'long-suffering', 'long-tail', // (SEO/Business)
    'long-term', 'long-time', 'long-wave', 'long-winded',
    'loo-roll', // (UK Essential!)
    'look-alike', 'look-down', 'look-in', 'look-out', 'look-over', 'look-see',
    'look-up', // (Tech: "Lookup table")
    'loop-back', // (Tech: 127.0.0.1)
    'loop-hole', 'loop-line',
    'loose-box', 'loose-change', 'loose-end', 'loose-fill', 'loose-fit', 'loose-fitting', 'loose-leaf', 'loose-limbed',
    'lord-lieutenant', 'lord-mayor',
    'loss-leader', // (Retail)
    'loss-making',
    'lost-and-found', 'lost-cause', 'lost-property',
    'loud-hailer', 'loud-mouth', 'loud-mouthed', 'loud-speaker',
    'love-affair', 'love-bird', 'love-bite', 'love-child', 'love-hate', 'love-in', 'love-knot', 'love-letter', 'love-lies-bleeding', 'love-life', 'love-lock', 'love-lorn', 'love-making', 'love-nest', 'love-seat', 'love-sick', 'love-song', 'love-story',
    'low-brow', 'low-cal', 'low-calorie', 'low-carb', 'low-class',
    'low-code', // (Dev/SaaS)
    'low-cost', 'low-cut', 'low-down', 'low-end', 'low-energy', 'low-fat', 'low-frequency', 'low-gear', 'low-grade', 'low-hanging', // (Business: "Low-hanging fruit")
    'low-impact', 'low-income', 'low-key', 'low-level', // (Dev: "Low-level language")
    'low-life', 'low-light', 'low-loader', 'low-maintenance', 'low-paid', 'low-pass', 'low-pitch', 'low-poly', // (3D Design)
    'low-power', 'low-pressure', 'low-profile', 'low-rank', 'low-res', 'low-resolution', 'low-rider', 'low-rise', 'low-risk', 'low-spirited', 'low-tech', 'low-tide', 'low-voltage', 'low-volume', 'low-water',
    'lower-case', // (Text Utility Critical!)
    'lower-class',
    'luck-out',
    'lug-nut',
    'luggage-rack', 'luggage-van',
    'lump-sum', // (Finance)
    'lunch-box', 'lunch-break', 'lunch-hour', 'lunch-time',
    'lung-power',
    'lurex-thread',
    'lying-in',

    // M (Modern & Tech Supplement)
    'mac-address',
    'machine-code', 'machine-gun', 'machine-head', 'machine-language',
    'machine-learning', // (Tech Critical: ML)
    'machine-made',
    'machine-readable', // (Dev: JSON/XML)
    'machine-tool', 'machine-washable',
    'mad-cap', 'mad-doctor', 'mad-dog', 'mad-house', 'mad-man',
    'made-to-measure', 'made-to-order', 'made-up',
    'magic-carpet', 'magic-eye', 'magic-lantern', 'magic-mushroom', 'magic-wand',
    'magnetic-field', 'magnetic-tape',
    'mail-bag', 'mail-bomb', 'mail-box', 'mail-coach', 'mail-drop',
    'mail-merge', // (Office Tech)
    'mail-order', 'mail-room', 'mail-shot', // (UK Marketing Term)
    'main-brace', 'main-drag',
    'main-frame', // (Legacy Tech)
    'main-line', 'main-mast', 'main-sail', 'main-spring', 'main-stay', 'main-stream', 'main-top',
    'major-general',
    'make-believe', 'make-do', 'make-or-break', 'make-over', 'make-piece', 'make-shift', 'make-up', 'make-weight',
    'man-bag', 'man-child', 'man-eater', 'man-eating', 'man-handle', 'man-hole', 'man-hour', 'man-hunt',
    'man-in-the-middle', // (Security Critical: MITM Attack)
    'man-kind', 'man-made', 'man-of-war', 'man-power', 'man-sized', 'man-slaughter', 'man-trap',
    'management-buyout',
    'mangel-wurzel',
    'manger-manger',
    'manic-depressive',
    'map-maker', 'map-read', 'map-reader', 'map-reading',
    'marble-cake',
    'marching-orders',
    'mark-down', // (Retail & Markup Language common confusion)
    'mark-up', // (Dev Critical: HTML/XML)
    'market-day', 'market-driven', 'market-force', 'market-garden',
    'market-leader', // (Business)
    'market-maker', 'market-place', 'market-price', 'market-rate', 'market-research', 'market-share', 'market-town', 'market-value',
    'marking-ink',
    'marrow-bone', 'marrow-fat',
    'marsh-gas', 'marsh-land', 'marsh-mallow',
    'martial-art', 'martial-law',
    'masking-tape',
    'mass-market', 'mass-media', 'mass-produce', 'mass-produced', 'mass-production', 'mass-spectrometer',
    'master-bedroom', 'master-builder', 'master-class', 'master-key', 'master-mind', 'master-piece', 'master-plan', 'master-stroke', 'master-switch', 'master-work',
    'match-box', 'match-day', 'match-fix', 'match-fixing', 'match-made', 'match-maker', 'match-making', 'match-play', 'match-point', 'match-stick', 'match-wood',
    'matter-of-fact',
    'meal-ticket', 'meal-time',
    'mean-spirited', 'mean-time', // (Greenwich Mean Time)
    'measure-up',
    'meat-ball', 'meat-eater', 'meat-head', 'meat-hook', 'meat-loaf', 'meat-market', 'meat-packer', 'meat-pie', 'meat-safe',
    'media-savvy',
    'medical-history',
    'meeting-place', 'meeting-point', 'meeting-room',
    'mega-bite', 'mega-bucks',
    'mega-byte', // (Tech)
    'mega-city', 'mega-drive',
    'mega-hertz', // (Tech)
    'mega-hit', 'mega-lith',
    'mega-pixel', // (Tech)
    'mega-star', 'mega-store', 'mega-structure', 'mega-watt',
    'melting-pot', 'melting-point',
    'member-state',
    'memo-pad',
    'memory-bank', 'memory-card', 'memory-foam', 'memory-lane', 'memory-loss',
    'memory-stick', // (Tech)
    'men-at-work',
    'merchant-bank', 'merchant-man', 'merchant-navy', 'merchant-ship',
    'merit-pay',
    'merry-go-round', 'merry-maker', 'merry-making',
    'mess-room', 'mess-tin', 'mess-up',
    'message-board',
    'meta-analysis', 'meta-data', // (Tech/SEO Critical)
    'meta-fiction', 'meta-language', 'meta-level', 'meta-physics',
    'meta-tag', // (SEO Critical)
    'metal-detector', 'metal-work', 'metal-worker',
    'meter-maid', 'meter-reading',
    'micro-aggression', 'micro-analysis', 'micro-biology', 'micro-brewery', 'micro-chip', 'micro-climate', 'micro-computer', 'micro-credit', 'micro-dot', 'micro-economics', 'micro-electronic', 'micro-electronics', 'micro-fibre', 'micro-fiche', 'micro-film', 'micro-finance',
    'micro-frontend', // (Modern Web Dev)
    'micro-gravity', 'micro-groove', 'micro-light', 'micro-manage', 'micro-management', 'micro-manager', 'micro-nutrient', 'micro-organism',
    'micro-payment', // (FinTech)
    'micro-phone', 'micro-processor', 'micro-scope', 'micro-second',
    'micro-service', // (Dev Critical)
    'micro-surgery', 'micro-switch', 'micro-system', 'micro-wave',
    'mid-air', 'mid-atlantic', 'mid-day', 'mid-flight', 'mid-life', 'mid-morning', 'mid-night', 'mid-off', 'mid-on', 'mid-range', 'mid-rib', 'mid-riff', 'mid-sentence', 'mid-ship', 'mid-size', 'mid-stream', 'mid-summer',
    'mid-term', // (UK Politics/School)
    'mid-way', 'mid-week', 'mid-wicket', 'mid-wife', 'mid-winter', 'mid-year',
    'middle-aged', 'middle-class', // (UK Social Class)
    'middle-distance', 'middle-ear', 'middle-east', 'middle-ground',
    'middle-man', // (Business)
    'middle-name', 'middle-of-the-road', 'middle-school', 'middle-weight',
    'midi-system',
    'mile-high', 'mile-ometer', 'mile-post', 'mile-stone', // (Project Management)
    'milk-bar', 'milk-bottle', 'milk-chocolate',
    'milk-float', // (UK Specific)
    'milk-maid', 'milk-man', 'milk-run', 'milk-shake', 'milk-sop', 'milk-tooth', 'milk-white',
    'mill-house', 'mill-pond', 'mill-race', 'mill-stone', 'mill-wheel', 'mill-work',
    'mince-meat',
    'mince-pie', // (UK Christmas)
    'mind-bending', 'mind-blowing', 'mind-boggling', 'mind-control', 'mind-expand', 'mind-expanding', 'mind-map', 'mind-numbing', 'mind-read', 'mind-reader',
    'mind-set', // (Already in your file, but essential)
    'mine-field', 'mine-host', 'mine-hunter', 'mine-layer', 'mine-shaft', 'mine-sweeper', // (Classic PC Game)
    'mini-bar', 'mini-break', 'mini-bus',
    'mini-cab', // (UK Specific: Private Hire)
    'mini-computer',
    'mini-disk', // (Retro Tech)
    'mini-dress', 'mini-market',
    'mini-roundabout', // (UK Road)
    'mini-series', 'mini-skirt', 'mini-state', 'mini-van',
    'minimum-wage',
    'minor-key',
    'mint-condition', 'mint-green', 'mint-sauce',
    'mirror-image',
    'mis-cast', 'mis-count', 'mis-deal', 'mis-direct', 'mis-file', 'mis-fire', 'mis-fit', 'mis-fortune', 'mis-guide', 'mis-handle', 'mis-hear', 'mis-inform', 'mis-interpret', 'mis-judge', 'mis-lead', 'mis-manage', 'mis-match', 'mis-place', 'mis-print', 'mis-quote', 'mis-read', 'mis-report', 'mis-represent', 'mis-rule', 'mis-sell', 'mis-selling', 'mis-shape', 'mis-spell', 'mis-spelling', 'mis-spend', 'mis-spent', 'mis-statement', 'mis-take', 'mis-time', 'mis-treat', 'mis-trust', 'mis-understand', 'mis-understanding', 'mis-use',
    'mission-critical', // (Business/Tech Critical)
    'mission-statement',
    'mix-up', 'mixed-ability', 'mixed-bag', 'mixed-economy', 'mixed-marriage',
    'mixed-media', // (Art/Design)
    'mixed-race', 'mixed-sex', 'mixed-up',
    'mobile-app', // (Modern Tech)
    'mobile-first', // (Web Design Critical)
    'mobile-friendly',
    'mobile-home',
    'mobile-phone', // (UK Standard)
    'mock-heroic', 'mock-up', 'mock-turtle',
    'model-making', 'model-t',
    'modem-cable',
    'modern-day',
    'money-back', 'money-bag', 'money-belt', 'money-box', 'money-changer', 'money-grubber', 'money-launder', 'money-laundering', 'money-lender', 'money-maker', 'money-making', 'money-market', 'money-off', 'money-order', 'money-saving',
    'money-spinner', // (UK Idiom)
    'money-supply', 'money-talks',
    'monkey-bar', 'monkey-business', 'monkey-nut', 'monkey-puzzle', 'monkey-suit', 'monkey-wrench',
    'mono-rail', 'mono-theism', 'mono-tone',
    'moon-beam', 'moon-boot', 'moon-face', 'moon-light', 'moon-lighting', 'moon-lit', 'moon-scape', 'moon-shine', 'moon-shot', 'moon-stone', 'moon-struck', 'moon-walk',
    'mop-head', 'mop-up',
    'moral-fibre',
    'morning-after', 'morning-coat', 'morning-glory', 'morning-paper', 'morning-prayer', 'morning-sickness', 'morning-star', 'morning-suit',
    'mortar-board',
    'mother-board', // (Tech)
    'mother-care', 'mother-country', 'mother-earth', 'mother-figure', 'mother-land', 'mother-lode', 'mother-nature', 'mother-of-pearl', 'mother-ship', 'mother-tongue', 'mother-to-be', 'mother-wit',
    'motion-picture', 'motion-sickness',
    'motor-bike', 'motor-boat', 'motor-cade', 'motor-car', 'motor-cycle', 'motor-cycling', 'motor-cyclist', 'motor-home', 'motor-man', 'motor-mouth', 'motor-oil', 'motor-race', 'motor-racing', 'motor-scooter', 'motor-sport', 'motor-vehicle',
    'motor-way', // (UK Critical)
    'mountain-ash', 'mountain-bike', 'mountain-chain', 'mountain-climb', 'mountain-climber', 'mountain-goat', 'mountain-lion', 'mountain-range', 'mountain-side', 'mountain-top',
    'mounted-police',
    'mouse-click',
    'mouse-hole',
    'mouse-mat', // (UK Specific - US is mousepad)
    'mouse-trap',
    'mouth-guard', 'mouth-organ', 'mouth-piece', 'mouth-to-mouth', 'mouth-wash', 'mouth-water', 'mouth-watering',
    'move-able',
    'movie-goer', 'movie-maker', 'movie-star', 'movie-theatre',
    'moving-staircase',
    'mp-3', // (Tech - often MP3 but hyphen check needed)
    'muck-heap', 'muck-rake', 'muck-raking', 'muck-spreader', 'muck-up',
    'mud-bath', 'mud-flap', 'mud-flat', 'mud-guard', 'mud-pack', 'mud-pie', 'mud-slide', 'mud-slinging', 'mud-wrestle', 'mud-wrestling',
    'muffing-top',
    'mug-shot',
    'multi-channel', 'multi-coloured', 'multi-cultural', 'multi-dimensional', 'multi-directional', 'multi-disciplinary', 'multi-ethnic', 'multi-faceted', 'multi-faith', 'multi-function', 'multi-functional', 'multi-gym', 'multi-lateral', 'multi-layer', 'multi-layered', 'multi-level', 'multi-lingual',
    'multi-media', // (Tech/Design)
    'multi-million', 'multi-national', 'multi-part', 'multi-party',
    'multi-player', // (Gaming)
    'multi-purpose', 'multi-racial', 'multi-screen', 'multi-stage',
    'multi-storey', // (UK Car Park)
    'multi-task', 'multi-tasking', // (Business Critical)
    'multi-touch', // (Tech)
    'multi-user', 'multi-vitamin',
    'muscle-bound', 'muscle-man',
    'music-box', 'music-center', 'music-centre', 'music-hall', 'music-lesson', 'music-lover', 'music-maker', 'music-stand', 'music-stool',
    'musical-chairs',
    'must-have', // (Marketing)
    'mustard-gas', 'mustard-pot',
    'mutton-chop',
    'mutton-chop',
    'my-space', // (Retro Tech)

    // N (Modern & Tech Supplement)
    'nail-biting', 'nail-brush', 'nail-clipper', 'nail-file', 'nail-polish', 'nail-scissors', 'nail-varnish',
    'name-call', 'name-calling', 'name-check', 'name-day', 'name-drop', 'name-dropper', 'name-dropping', 'name-plate', 'name-sake', 'name-tag', 'name-tape',
    'nanny-goat', 'nanny-state', // (UK Politics)
    'napkin-ring',
    'nappy-rash', // (UK Specific - US is diaper rash)
    'narrow-boat', // (UK Canals)
    'narrow-gauge', 'narrow-minded',
    'national-insurance', // (UK Tax)
    'native-app', // (Tech/Mobile)
    'native-speaker',
    'natural-born', 'natural-gas',
    'navel-gazing',
    'near-by', 'near-death', 'near-distance', 'near-fatal',
    'near-field', // (Tech: NFC)
    'near-miss', 'near-sighted', 'near-term',
    'neat-freak',
    'neck-band', 'neck-line', 'neck-rest', 'neck-tie', 'neck-wear',
    'needle-point', 'needle-work',
    'negative-equity',
    'neighbourhood-watch', // (UK Spelling)
    'neon-light',
    'nerve-cell', 'nerve-center', 'nerve-centre', 'nerve-ending', 'nerve-gas', 'nerve-racking', 'nerve-wracking',
    'net-book', // (Retro Tech)
    'net-curtain', // (UK Household)
    'net-head', 'net-income', 'net-neutrality', // (Tech/Politics)
    'net-profit', 'net-result', 'net-work', 'net-working', 'net-worth',
    'network-attached', // (Tech: NAS)
    'neural-network', // (AI/Tech)
    'never-ending', 'never-failing', 'never-land', 'never-mind', 'never-more', 'never-the-less',
    'new-age', 'new-born', 'new-build', // (UK Real Estate)
    'new-comer', 'new-found', 'new-laid', 'new-look', 'new-money', 'new-moon', 'new-normal', // (Post-2020)
    'new-rich', 'new-tech', 'new-wave', 'new-world', 'new-year',
    'news-agent', // (UK Retail)
    'news-anchor', 'news-boy', 'news-brief', 'news-cast', 'news-caster', 'news-conference', 'news-desk', 'news-flash', 'news-group', 'news-hound', 'news-letter', 'news-man', 'news-paper', 'news-print', 'news-reader', 'news-reel', 'news-room', 'news-sheet', 'news-stand', 'news-vendor', 'news-wire', 'news-worthy',
    'next-door', 'next-gen', 'next-generation', // (Tech/Gaming)
    'next-of-kin',
    'nice-looking',
    'niche-market',
    'nickel-and-dime', 'nickel-plate',
    'night-blindness', 'night-cap', 'night-club', 'night-dress', 'night-duty', 'night-fall', 'night-gown', 'night-life', 'night-light', 'night-long',
    'night-mode', // (UI/App Critical)
    'night-owl', 'night-porter', 'night-school', 'night-shift', 'night-shirt', 'night-sky', 'night-spot', 'night-time', 'night-vision', 'night-watch', 'night-watchman', 'night-wear',
    'nine-fold', 'nine-pin',
    'nitty-gritty',
    'no-ball', // (Cricket)
    'no-brainer', 'no-can-do', 'no-claim', // (Insurance)
    'no-code', // (SaaS/Dev Critical)
    'no-confidence', 'no-contest', 'no-cost', 'no-entry', 'no-fault', 'no-fly',
    'no-go', // (UK: "It's a no-go area")
    'no-good', 'no-hoper', 'no-how', 'no-load', 'no-man', 'no-mans-land',
    'no-name', // (Generic Brand)
    'no-nonsense',
    'no-one', // (Common UK style preference over "no one")
    'no-show',
    'no-sql', // (Tech: NoSQL databases)
    'no-strings', 'no-tax', 'no-trumps', 'no-win',
    'noble-man', 'noble-minded', 'noble-woman',
    'noise-cancelling', // (Tech/Audio)
    'noise-free', 'noise-level', 'noise-maker', 'noise-pollution', 'noise-reduction',
    'non-acceptance', 'non-action', 'non-addictive', 'non-alcoholic', 'non-aligned', 'non-appearance', 'non-attendance', 'non-believer', 'non-belligerent',
    'non-binary', // (Modern Identity)
    'non-blocking', // (Dev: "Non-blocking I/O")
    'non-breakable', 'non-christian', 'non-combatant', 'non-combustible', 'non-commercial', 'non-commissioned', 'non-committal', 'non-compliance', 'non-compliant', 'non-conductor', 'non-conforming', 'non-conformist', 'non-contagious', 'non-contributory', 'non-cooperation', 'non-corrosive', 'non-custodial', 'non-deductible', 'non-delivery', 'non-destructive',
    'non-disclosure', // (Legal: NDA)
    'non-discrimination', 'non-drinker', 'non-driver', 'non-drip', 'non-drying', 'non-durable', 'non-effective', 'non-essential', 'non-event', 'non-exclusive', 'non-executive', 'non-existence', 'non-existent', 'non-fat', 'non-ferrous',
    'non-fiction', // (Publishing)
    'non-flammable', 'non-flowering', 'non-flying', 'non-food',
    'non-fungible', // (Tech: NFT)
    'non-governmental', 'non-human', 'non-intervention', 'non-invasive', 'non-iron', 'non-jewish', 'non-linear', 'non-member', 'non-metal', 'non-military', 'non-native', 'non-negotiable', 'non-nuclear', 'non-observance', 'non-official', 'non-operational', 'non-payment', 'non-performance', 'non-perishable', 'non-playing', 'non-poisonous', 'non-political', 'non-porous', 'non-productive', 'non-professional',
    'non-profit', // (Business Critical)
    'non-proliferation', 'non-racial', 'non-random', 'non-reactive', 'non-refundable', 'non-religious', 'non-renewable', 'non-resident', 'non-resistance', 'non-resistant', 'non-returnable', 'non-scheduled', 'non-sectarian', 'non-sense', 'non-sensitive', 'non-sexist', 'non-skid', 'non-slip', 'non-smoker', 'non-smoking', 'non-standard',
    'non-starter', // (Business: "That idea is a non-starter")
    'non-stick', 'non-stop', 'non-striker', 'non-structural', 'non-swimmer', 'non-taxable', 'non-technical', 'non-toxic', 'non-transferable', 'non-union', 'non-user', 'non-verbal', 'non-violence', 'non-violent', 'non-voting', 'non-white', 'non-working',
    'noodle-soup',
    'north-bound', 'north-east', 'north-easterly', 'north-eastern', 'north-facing', 'north-pole', 'north-star', 'north-west', 'north-westerly', 'north-western',
    'nose-bag', 'nose-bleed', 'nose-cone', 'nose-dive', 'nose-flute', 'nose-job', 'nose-pick', 'nose-ring', 'nose-wheel',
    'nosey-parker', // (Classic UK Slang)
    'not-for-profit',
    'note-book', // (Stationery & Laptop)
    'note-case', 'note-let', 'note-pad', 'note-paper', 'note-taking', 'note-worthy',
    'notice-board',
    'nuclear-free', 'nuclear-powered',
    'null-and-void',
    'number-cruncher', 'number-crunching', 'number-one', 'number-plate', // (UK Car)
    'nurse-maid', 'nursery-man', 'nursery-rhyme', 'nursery-school', 'nursery-slope',
    'nut-case', 'nut-cracker', 'nut-hatch', 'nut-roast', 'nut-shell', 'nut-tree',
    'nylon-string',

    // O (Modern & Tech Supplement)
    'o-level', // (Retro UK Education)
    'o-ring',
    'object-based', 'object-code', 'object-lesson',
    'object-oriented', // (Dev Critical: OOP)
    'obstacle-course', 'obstacle-race',
    'ocean-going',
    'odd-ball', 'odd-job', 'odd-looking', 'odd-man-out',
    'off-air', 'off-axis',
    'off-balance', 'off-base', 'off-beat', 'off-campus', 'off-center', 'off-chance', 'off-colour', // (UK Spelling)
    'off-duty', 'off-grid', 'off-guard', 'off-hand', 'off-hour', 'off-key', 'off-label',
    'off-licence', // (UK Essential: "Going to the off-licence")
    'off-limits',
    'off-line', // (Tech)
    'off-load', 'off-message', 'off-page', // (SEO)
    'off-peak', 'off-piste', 'off-plan', // (UK Real Estate)
    'off-price', 'off-putting', 'off-ramp', 'off-road', 'off-roader', 'off-screen', 'off-season', 'off-set', 'off-shoot', 'off-shore', // (Business)
    'off-shoulder', 'off-side', // (Football)
    'off-site', 'off-spin', 'off-spinner', 'off-spring', 'off-stage', 'off-street',
    'off-the-cuff', 'off-the-peg', 'off-the-record', 'off-the-shelf', 'off-the-shoulder', 'off-the-wall',
    'off-topic', // (Forum/Internet)
    'off-track', 'off-white', 'off-world', // (Sci-Fi)
    'office-bearer', 'office-block', 'office-boy', 'office-holder', 'office-mate', 'office-seeker', 'office-work',
    'oil-cake', 'oil-can', 'oil-cloth', 'oil-colour', 'oil-field', 'oil-fired', 'oil-lamp', 'oil-man', 'oil-paint', 'oil-painting', 'oil-paper', 'oil-platform', 'oil-producing', 'oil-rich', 'oil-rig', 'oil-slick', 'oil-stone', 'oil-tanker', 'oil-well',
    'old-age', 'old-boy', // (UK School Network)
    'old-clothes', 'old-est', 'old-face', 'old-fashioned', 'old-girl', 'old-gold', 'old-growth', 'old-hand', 'old-hat', 'old-maid', 'old-master', 'old-school', 'old-style', 'old-time', 'old-timer', 'old-wives', 'old-world',
    'on-air', 'on-board', // (Adj: "On-board computer")
    'on-brand', // (Marketing)
    'on-call', 'on-camera', 'on-campus',
    'on-click', // (Dev: UI events)
    'on-cost',
    'on-demand', // (Tech/SaaS)
    'on-duty', 'on-going', 'on-hand', 'on-hold',
    'on-line', // (Tech)
    'on-looker', 'on-looking', 'on-message', 'on-off',
    'on-premise', // (Tech/Enterprise)
    'on-ramp', 'on-rush', 'on-rushing',
    'on-screen', // (UI/TV)
    'on-set', 'on-shore', 'on-side', 'on-site', 'on-stage', 'on-street', 'on-target', 'on-the-job', 'on-time', 'on-to', 'on-trend', 'on-trial',
    'one-act', 'one-another', 'one-armed', 'one-bagger', 'one-bedroom', 'one-by-one', 'one-child', 'one-day', 'one-dimensional', 'one-eyed', 'one-horse', 'one-legged', 'one-liner', 'one-man', 'one-night', 'one-nighter', 'one-off', 'one-on-one', 'one-parent', 'one-party', 'one-piece', 'one-reeler', 'one-room', 'one-shot', 'one-sided', 'one-size', 'one-star', 'one-step',
    'one-stop', // (Business: "One-stop shop")
    'one-time',
    'one-to-many', // (Dev: Database relationships)
    'one-to-one', // (Dev/Business)
    'one-track', 'one-up', 'one-upping', 'one-way', 'one-woman', 'one-year',
    'onion-ring', 'onion-skin',
    'open-air', 'open-and-shut', 'open-back', 'open-beak', 'open-book', 'open-cast', 'open-circuit', 'open-collar', 'open-door', 'open-ended', 'open-eyed', 'open-face', 'open-faced', 'open-handed', 'open-heart', 'open-hearth', 'open-house', 'open-letter', 'open-market', 'open-minded', 'open-mouthed', 'open-neck', 'open-plan', 'open-sandwich', 'open-secret',
    'open-source', // (Dev Critical)
    'open-space', 'open-top', 'open-topped', 'open-up', 'open-work',
    'opera-glass', 'opera-glasses', 'opera-hat', 'opera-house', 'opera-singer',
    'operating-system', // (Tech: OS)
    'optical-character-recognition', // (Tech: OCR)
    'optical-disk', 'optical-fiber', 'optical-fibre', 'optical-illusion',
    'opt-in', // (Marketing/GDPR)
    'opt-out',
    'orange-blossom', 'orange-peel', 'orange-stick',
    'order-book',
    'organ-grinder', 'organ-loft', 'organ-stop',
    'organic-search', // (SEO)
    'out-and-about', 'out-and-out', 'out-basket', 'out-bid', 'out-board', 'out-bound', 'out-box', 'out-break', 'out-breath', 'out-building', 'out-class', 'out-crop', 'out-cross', 'out-cry', 'out-distance', 'out-do', 'out-door', 'out-face', 'out-fall', 'out-field', 'out-fight', 'out-fit', 'out-fitter', 'out-flank', 'out-flow', 'out-fox', 'out-general', 'out-go', 'out-going', 'out-grow', 'out-growth', 'out-guess', 'out-gun', 'out-house', 'out-jump', 'out-land', 'out-landish', 'out-last', 'out-law', 'out-lay', 'out-let', 'out-lier', 'out-line', 'out-live', 'out-look', 'out-lying', 'out-manoeuvre', 'out-match', 'out-moded', 'out-number',
    'out-of-body', 'out-of-bounds', 'out-of-control', 'out-of-court', 'out-of-date', 'out-of-door', 'out-of-doors', 'out-of-focus', 'out-of-hand', 'out-of-home', 'out-of-hours', 'out-of-mind', 'out-of-order', 'out-of-place', 'out-of-pocket', 'out-of-print', 'out-of-range', 'out-of-reach', 'out-of-school', 'out-of-season', 'out-of-sight', 'out-of-stock',
    'out-of-the-blue',
    'out-of-the-box', // (Dev/Business: OOTB)
    'out-of-touch', 'out-of-work',
    'out-pace', 'out-patient', 'out-perform', 'out-performance', 'out-placement', 'out-play', 'out-point', 'out-post', 'out-pour', 'out-pouring', 'out-produce', 'out-put', 'out-rage', 'out-rageous', 'out-rank', 'out-reach', 'out-ride', 'out-rider', 'out-rigger', 'out-right', 'out-run', 'out-sell', 'out-set', 'out-shine', 'out-shoot', 'out-side', 'out-sider', 'out-size', 'out-smart',
    'out-source', // (Business Critical)
    'out-sourcing',
    'out-span', 'out-spoken', 'out-spread', 'out-standing', 'out-stare', 'out-stay', 'out-station', 'out-stretched', 'out-strip', 'out-take', 'out-talk', 'out-think', 'out-tray', 'out-vote', 'out-walk', 'out-ward', 'out-weigh', 'out-wit', 'out-work', 'out-worker',
    'oven-baked', 'oven-cloth', 'oven-glove', 'oven-proof', 'oven-ready', 'oven-ware',
    'over-abundance', 'over-act', 'over-active', 'over-all', 'over-ambitious', 'over-anxious', 'over-arch', 'over-arching', 'over-arm', 'over-awe', 'over-balance', 'over-bear', 'over-bearing', 'over-blown', 'over-board', 'over-book', 'over-booking', 'over-burden', 'over-busy', 'over-came', 'over-capacity', 'over-capitalized', 'over-cast', 'over-cautious', 'over-charge', 'over-coat', 'over-come', 'over-compensate', 'over-confident', 'over-cook', 'over-crowd', 'over-crowding', 'over-do', 'over-done', 'over-dose', 'over-draft', 'over-draw', 'over-drawn', 'over-dress', 'over-dressed', 'over-drive', 'over-dub', 'over-due', 'over-eat', 'over-eating', 'over-emphasize', 'over-estimate', 'over-estimation', 'over-excite', 'over-excited', 'over-exert', 'over-expose', 'over-exposed', 'over-exposure', 'over-feed', 'over-fill', 'over-fish', 'over-fishing', 'over-flight', 'over-flow', 'over-fly', 'over-garment', 'over-graze', 'over-ground', 'over-grow', 'over-grown', 'over-growth', 'over-hand', 'over-hang', 'over-hanging', 'over-haul', 'over-head', 'over-hear', 'over-heat', 'over-heating', 'over-hung', 'over-indulge', 'over-indulgence', 'over-joyed', 'over-kill', 'over-lade', 'over-laden', 'over-land', 'over-lander', 'over-lap', 'over-lay', 'over-leaf', 'over-lie', 'over-load', 'over-long', 'over-look', 'over-lord', 'over-loud', 'over-man', 'over-mantel', 'over-much', 'over-nice', 'over-night', 'over-nighter', 'over-paid', 'over-pass', 'over-pay', 'over-payment', 'over-play', 'over-populated', 'over-population', 'over-power', 'over-powering', 'over-price', 'over-priced', 'over-print', 'over-produce', 'over-production', 'over-protected', 'over-protective', 'over-qualified', 'over-rate', 'over-rated', 'over-reach', 'over-react', 'over-reaction', 'over-ride', 'over-riding', 'over-ripe', 'over-rule', 'over-run', 'over-sea', 'over-seas', 'over-see', 'over-seer', 'over-sell', 'over-sensitive', 'over-sexed', 'over-shadow', 'over-shoe', 'over-shoot', 'over-sight', 'over-simplify', 'over-size', 'over-sized', 'over-sleep', 'over-spend', 'over-spending', 'over-spill', 'over-staffed', 'over-state', 'over-statement', 'over-stay', 'over-step', 'over-stitch', 'over-stock', 'over-stocked', 'over-strain', 'over-stretch', 'over-stretched', 'over-strung', 'over-stuff', 'over-subscribe', 'over-subscribed', 'over-supply', 'over-take', 'over-tax',
    'over-the-air', // (Tech: OTA updates)
    'over-the-counter', // (Pharma/Finance)
    'over-the-moon', 'over-the-top',
    'over-throw', 'over-time', 'over-tired', 'over-tone', 'over-top', 'over-train', 'over-trained', 'over-training', 'over-turn', 'over-use', 'over-value', 'over-view', 'over-weening', 'over-weight', 'over-whelm', 'over-whelming', 'over-wind', 'over-winter', 'over-work', 'over-worked', 'over-wrought', 'over-zealous',
    'own-brand', // (UK Retail)
    'own-goal', // (Football/Idiom)
    'own-label',
    'owner-driver', 'owner-occupied', 'owner-occupier',
    'ox-blood', 'ox-bow', 'ox-cart', 'ox-eye', 'ox-tail',
    'ozone-friendly', 'ozone-hole', 'ozone-layer',

    'ozone-friendly', 'ozone-hole', 'ozone-layer',

    // P (Modern & Tech Supplement)
    'pack-animal', 'pack-horse', 'pack-ice', 'pack-leader', 'pack-saddle',
    'package-deal', 'package-holiday', 'package-tour',
    'packet-boat', 'packet-switching', // (Tech)
    'packing-case', 'packing-list', 'packing-tape',
    'pad-lock',
    'paddle-board', 'paddle-boat', 'paddle-steamer', 'paddle-wheel',
    'page-boy', 'page-break', 'page-down', 'page-load', 'page-maker', 'page-proof', 'page-rank', 'page-turner', 'page-up', 'page-view',
    'paid-for', 'paid-in-full', 'paid-up',
    'pain-killer', 'pain-killing', 'pain-relief', 'pain-staking',
    'paint-ball', 'paint-box', 'paint-brush', 'paint-by-numbers', 'paint-pot', 'paint-roller', 'paint-scraper', 'paint-shop', 'paint-stripper', 'paint-work',
    'pair-bond',
    'pal-up',
    'pale-face',
    'palm-top', // (Retro Tech)
    'pan-african', 'pan-american', 'pan-asian', 'pan-european', 'pan-fried', 'pan-fry', 'pan-pipe',
    'panel-beater', 'panel-beating', 'panel-game', 'panel-pin',
    'panic-attack', 'panic-button', 'panic-buy', 'panic-buying', 'panic-room', 'panic-stricken',
    'paper-bag', 'paper-board', 'paper-boy', 'paper-chain', 'paper-chase', 'paper-clip', 'paper-cup', 'paper-girl', 'paper-hanger', 'paper-knife', 'paper-mill', 'paper-money', 'paper-plate', 'paper-round', // (UK Essential)
    'paper-shredder', 'paper-thin', 'paper-tiger', 'paper-towel', 'paper-trail', 'paper-weight', 'paper-work',
    'papier-mache',
    'par-value',
    'parachute-jump',
    'parallel-bars', 'parallel-park', 'parallel-parking', 'parallel-port', 'parallel-processing',
    'parcel-bomb', 'parcel-post', 'parcel-shelf', 'parcel-tape',
    'parent-child', 'parent-company', 'parent-teacher',
    'park-and-ride', // (UK Transport)
    'park-keeper', 'park-land',
    'parking-bay', 'parking-brake', 'parking-fine', 'parking-lot', 'parking-meter', 'parking-permit', 'parking-space', 'parking-ticket', 'parking-zone',
    'parole-board', 'parole-officer',
    'parrot-fashion',
    'part-exchange', // (UK Retail/Car)
    'part-owner', 'part-ownership', 'part-payment', 'part-song', 'part-time', 'part-timer', 'part-way', 'part-work', 'part-worn',
    'party-animal', 'party-dress', 'party-goer', 'party-hat', 'party-line', 'party-piece', 'party-plan', 'party-political', 'party-pooper', 'party-spirit', 'party-wall',
    'pass-book', 'pass-code', 'pass-fail', 'pass-key', 'pass-mark',
    'pass-phrase', // (Crypto/Security)
    'pass-the-parcel', 'pass-through',
    'passenger-seat', 'passenger-train',
    'passer-by',
    'passport-control', 'passport-holder', 'passport-photo', 'passport-size',
    'password-protect', 'password-protected',
    'past-master',
    'paste-board', 'paste-up',
    'pastry-board', 'pastry-cook', 'pastry-cutter',
    'pasty-face', 'pasty-faced',
    'patch-pocket', 'patch-test', 'patch-up', 'patch-work',
    'patent-holder', 'patent-leather', 'patent-pending',
    'path-finder', 'path-way',
    'patrol-car',
    'pattern-recognition',
    'paved-area',
    'paw-mark', 'paw-print',
    'pay-as-you-earn', // (UK Tax: PAYE)
    'pay-as-you-go', // (Mobile/Finance)
    'pay-back', 'pay-bed', 'pay-check',
    'pay-cheque', // (UK Spelling)
    'pay-claim', 'pay-day', 'pay-dirt', 'pay-freeze',
    'pay-gap', // (Business/Social)
    'pay-load', 'pay-master', 'pay-off',
    'pay-packet', // (UK)
    'pay-per-click', // (Marketing: PPC)
    'pay-per-view',
    'pay-phone', 'pay-play', 'pay-rise', // (UK)
    'pay-roll', 'pay-scale', 'pay-slip',
    'pay-wall', // (Media/Tech)
    'pea-green', 'pea-shooter', 'pea-souper',
    'peace-conference', 'peace-corps', 'peace-keeping', 'peace-lover', 'peace-loving', 'peace-maker', 'peace-making', 'peace-offering', 'peace-process', 'peace-talks', 'peace-time', 'peace-treaty',
    'peach-blown',
    'peacock-blue',
    'peak-flow', 'peak-hour', 'peak-period', 'peak-season', 'peak-time',
    'pear-shaped', // (UK Idiom: "Gone pear-shaped")
    'pearl-diver', 'pearl-fisher', 'pearl-grey',
    'pebbled-dash', 'pebbled-glass',
    'pecking-order',
    'pedal-bin', // (UK Household)
    'pedal-board', 'pedal-boat', 'pedal-car', 'pedal-cycle', 'pedal-power', 'pedal-pusher',
    'peel-off',
    'peep-hole', 'peep-show', 'peeping-tom',
    'peer-assessment', 'peer-group', 'peer-pressure', 'peer-review', 'peer-reviewed', 'peer-support',
    'peer-to-peer', // (Tech Critical: P2P)
    'pen-and-ink', 'pen-drive', // (Tech)
    'pen-friend', 'pen-knife', 'pen-name', 'pen-pal', 'pen-portrait', 'pen-pusher', 'pen-pushing',
    'penalty-area', 'penalty-box', 'penalty-clause', 'penalty-corner', 'penalty-kick', 'penalty-point', 'penalty-shootout', 'penalty-spot', 'penalty-taker',
    'pencil-case', 'pencil-drawing', 'pencil-mark', 'pencil-pusher', 'pencil-sharpener', 'pencil-skirt', 'pencil-thin',
    'pendant-light',
    'penny-farthing', 'penny-loafers', 'penny-pinch', 'penny-pincher', 'penny-pinching', 'penny-share', 'penny-whistle', 'penny-worth',
    'pension-fund', 'pension-off', 'pension-plan', 'pension-scheme',
    'pent-house', 'pent-roof',
    'people-carrier', // (UK Car type)
    'people-mover', 'people-person', 'people-pleaser', 'people-power', 'people-smuggling', 'people-watch', 'people-watcher', 'people-watching',
    'pepper-corn', 'pepper-mill', 'pepper-mint', 'pepper-pot', 'pepper-spray',
    'per-annum', 'per-capita', 'per-cent', 'per-diem', 'per-se',
    'perfect-pitch',
    'performance-art', 'performance-enhancing', 'performance-related',
    'period-costume', 'period-drama', 'period-piece',
    'permanent-press', 'permanent-wave',
    'personal-assistant', // (PA)
    'personal-computer', // (PC)
    'personal-effects', 'personal-injury', 'personal-organizer', 'personal-shopper', 'personal-stereo', 'personal-touch', 'personal-trainer',
    'pet-food',
    'pet-hate', // (UK Idiom)
    'pet-name', 'pet-shop', 'pet-sitting',
    'petrol-bomb', // (UK)
    'petrol-cap', 'petrol-consumption', 'petrol-engine',
    'petrol-head', // (UK Slang for car lover)
    'petrol-pump', 'petrol-station', 'petrol-tank',
    'phase-in', 'phase-out',
    'phone-bill', 'phone-book',
    'phone-box', // (UK Essential)
    'phone-call', 'phone-card', 'phone-charger', 'phone-in', 'phone-line', 'phone-number', 'phone-tap', 'phone-tapping',
    'photo-album', 'photo-bomb', 'photo-call', 'photo-copier', 'photo-copy', 'photo-edit', 'photo-editing', 'photo-electric', 'photo-finish',
    'photo-fit', // (UK Police term)
    'photo-frame', 'photo-genic', 'photo-graph', 'photo-journalism', 'photo-journalist', 'photo-montage', 'photo-opportunity', 'photo-realism', 'photo-realistic', 'photo-sensitive', 'photo-shoot', 'photo-shop', 'photo-synthesis',
    'physical-education', // (PE)
    'piano-accordion', 'piano-key', 'piano-lesson', 'piano-player', 'piano-stool', 'piano-teacher', 'piano-tuner', 'piano-wire',
    'pick-and-mix', // (UK Sweets)
    'pick-axe', 'pick-lock', 'pick-me-up', 'pick-n-mix', 'pick-pocket', 'pick-up',
    'picnic-area', 'picnic-basket', 'picnic-hamper', 'picnic-table',
    'picture-book', 'picture-card', 'picture-editor', 'picture-frame', 'picture-postcard', 'picture-rail', 'picture-window',
    'pie-chart', 'pie-crust', 'pie-dish', 'pie-eyed',
    'piece-goods', 'piece-meal', 'piece-rate', 'piece-work',
    'pier-glass',
    'pig-farm', 'pig-headed', 'pig-iron', 'pig-out', 'pig-pen', 'pig-sty', 'pig-swill', 'pig-tail',
    'pigeon-hole', 'pigeon-loft', 'pigeon-toed',
    'piggy-back', 'piggy-bank',
    'pile-driver', 'pile-up',
    'pill-box', 'pill-popper',
    'pillar-box', // (UK Mailbox)
    'pillow-case', 'pillow-fight', 'pillow-slip', 'pillow-talk',
    'pilot-fish', 'pilot-light', 'pilot-officer', 'pilot-scheme', 'pilot-study',
    'pin-ball', 'pin-code', 'pin-cushion', 'pin-down', 'pin-hole', 'pin-money', 'pin-point', 'pin-prick', 'pin-stripe', 'pin-striped', 'pin-tuck', 'pin-up', 'pin-wheel',
    'pina-colada',
    'pinch-hit', 'pinch-hitter',
    'pine-apple', // (Included for safety, though mostly solid)
    'pine-cone', 'pine-forest', 'pine-needle', 'pine-nut', 'pine-tree',
    'ping-pong',
    'pink-eye', 'pink-slip',
    'pipe-band', 'pipe-clay', 'pipe-cleaner', 'pipe-dream', 'pipe-line', 'pipe-major', 'pipe-organ', 'pipe-work',
    'piping-hot',
    'pistol-grip', 'pistol-whip',
    'pit-bull', 'pit-head', 'pit-pony', 'pit-prop', 'pit-stop',
    'pitch-black', 'pitch-dark', 'pitch-fork', 'pitch-perfect', 'pitch-pine', 'pitch-pipe',
    'pixel-art', 'pixel-density',
    'pixel-perfect', // (Design/Dev Critical)
    'pizza-cutter',
    'place-kick', 'place-mat', 'place-name', 'place-setting', 'place-value',
    'plain-chocolate', 'plain-clothes', 'plain-flour', 'plain-paper',
    'plain-sailing', // (UK Idiom)
    'plain-song', 'plain-speaking', 'plain-spoken',
    'plain-text', // (Tech)
    'plane-crash', 'plane-spotter', 'plane-spotting', 'plane-tree',
    'planet-saving',
    'planning-permission', // (UK Property)
    'plant-holder', 'plant-life', 'plant-pot', // (UK)
    'plaster-board', 'plaster-cast', 'plaster-of-paris', 'plaster-work',
    'plastic-coated', 'plastic-surgery',
    'plate-glass', 'plate-layer', 'plate-rack',
    'platform-game', 'platform-shoe', 'platform-ticket',
    'play-act', 'play-acting', 'play-actor', 'play-area', 'play-back', 'play-boy', 'play-date', 'play-dough', 'play-group', 'play-house',
    'play-list', // (Tech/Music)
    'play-mate', 'play-off', 'play-pen', 'play-room', 'play-school', 'play-thing', 'play-time', 'play-wright', 'play-writing',
    'playing-card', 'playing-field',
    'pleasure-boat', 'pleasure-ground', 'pleasure-seeker', 'pleasure-trip',
    'plimsoll-line',
    'plot-line',
    'plough-man', // (UK: Ploughman's Lunch)
    'plough-share',
    'plug-and-play', // (Tech Critical)
    'plug-hole', // (UK)
    'plug-in', // (Tech)
    'plug-ugly',
    'po-faced',
    'pocket-book', 'pocket-calculator', 'pocket-comb', 'pocket-knife',
    'pocket-money', // (UK)
    'pocket-picking', 'pocket-size', 'pocket-sized', 'pocket-watch',
    'point-blank', 'point-duty', 'point-guard',
    'point-of-sale', // (POS)
    'point-scoring', 'point-to-point',
    'poison-gas', 'poison-ivy', 'poison-pen',
    'poke-bonnet',
    'poker-face', 'poker-faced', 'poker-work',
    'polar-bear', 'polar-ice',
    'pole-axe', 'pole-dance', 'pole-dancer', 'pole-dancing', 'pole-jump',
    'pole-position', // (F1/Business)
    'pole-star', 'pole-vault', 'pole-vaulter',
    'police-box', // (UK Cultural Icon)
    'police-car', 'police-constable', 'police-dog', 'police-force', 'police-man', 'police-officer', 'police-record', 'police-state', 'police-station', 'police-van', 'police-woman',
    'policy-holder', 'policy-maker', 'policy-making',
    'polish-remover',
    'political-correctness', 'political-party', 'political-prisoner',
    'polling-booth', 'polling-card', 'polling-day', 'polling-place', 'polling-station',
    'polo-neck', // (UK)
    'polo-shirt',
    'polter-geist',
    'poly-ester', 'poly-filler', 'poly-styrene', 'poly-technic', 'poly-thene', 'poly-unsaturated',
    'pom-pom',
    'pond-life',
    'pony-tail', 'pony-trekking',
    'pooh-pooh',
    'pool-side', 'pool-table',
    'poor-box', 'poor-house', 'poor-law', 'poor-quality', 'poor-spirited',
    'pop-art', 'pop-corn', 'pop-culture', 'pop-eyed', 'pop-group', 'pop-gun', 'pop-idol', 'pop-music', 'pop-quiz', 'pop-song', 'pop-star',
    'pop-up', // (UI/Tech)
    'pop-video',
    'pooper-scooper',
    'poppy-cock', 'poppy-day',
    'pork-butcher', 'pork-chop',
    'pork-pie', // (UK Food)
    'port-hole', 'port-wine',
    'portable-document-format', // (PDF)
    'pose-able',
    'position-paper',
    'post-bag',
    'post-box', // (UK Essential)
    'post-boy', 'post-chaise',
    'post-code', // (UK Essential: "ZIP code" in US)
    'post-date', 'post-doc', 'post-doctoral', 'post-free', 'post-grad', 'post-graduate', 'post-haste', 'post-horn', 'post-horse', 'post-impressionism', 'post-industrial',
    'post-man', // (UK)
    'post-mark', 'post-master', 'post-mistress', 'post-modern', 'post-modernism', 'post-mortem', 'post-natal', 'post-office', 'post-operative', 'post-paid', 'post-production', 'post-room', 'post-script', 'post-season', 'post-traumatic', 'post-truth', 'post-war', 'post-woman',
    'pot-belly', 'pot-boiler', 'pot-bound', 'pot-herb', 'pot-hole', 'pot-holer', 'pot-holing', 'pot-hook', 'pot-luck',
    'pot-plant', // (UK)
    'pot-pourri', 'pot-roast', 'pot-shot', 'pot-sticker',
    'potato-chip',
    'potato-crisp', // (UK)
    'potato-masher', 'potato-peeler',
    'pound-cake',
    'pound-shop', // (UK Retail)
    'poverty-line', 'poverty-stricken', 'poverty-trap',
    'powder-blue', 'powder-compact', 'powder-keg', 'powder-puff', 'powder-room',
    'power-assisted', 'power-boat', 'power-broker', 'power-cord',
    'power-cut', // (UK)
    'power-dressing', 'power-drill', 'power-driven', 'power-grid', 'power-house', 'power-hungry', 'power-lift', 'power-line', 'power-lunch', 'power-mad', 'power-nap', 'power-pack', 'power-plant',
    'power-point', // (UK: Electric Socket)
    'power-play', 'power-ranger', 'power-saving', 'power-sharing', 'power-station', 'power-steering', 'power-struggle', 'power-suit', 'power-tool', 'power-trip', 'power-up',
    'power-user', // (Tech)
    'power-walk', 'power-walking',
    'practical-joke', 'practical-joker',
    'prawn-cocktail',
    'prayer-book', 'prayer-mat', 'prayer-meeting', 'prayer-wheel',
    'pre-arrange', 'pre-book', 'pre-cast', 'pre-centennial', 'pre-christian', 'pre-condition', 'pre-cooked', 'pre-date', 'pre-deceased', 'pre-defined', 'pre-destined', 'pre-determine', 'pre-digest', 'pre-echampsia', 'pre-election', 'pre-eminence', 'pre-eminent', 'pre-empt', 'pre-emption', 'pre-emptive', 'pre-exist', 'pre-existing', 'pre-fab', 'pre-fabricate', 'pre-fill', 'pre-flight', 'pre-form', 'pre-formed', 'pre-heat', 'pre-history', 'pre-ignition', 'pre-industrial', 'pre-judge', 'pre-judgment', 'pre-launch', 'pre-load', 'pre-marital', 'pre-med', 'pre-menstrual', 'pre-mix', 'pre-natal', 'pre-nuptial', 'pre-occupied', 'pre-occupy', 'pre-ordained', 'pre-order', 'pre-owned', 'pre-pack', 'pre-package', 'pre-paid', 'pre-pay', 'pre-plan', 'pre-production', 'pre-program', 'pre-qualify', 'pre-raphaelite', 'pre-read', 'pre-record', 'pre-register', 'pre-registration', 'pre-release', 'pre-render', 'pre-requisite', 'pre-sale', 'pre-school', 'pre-season', 'pre-select', 'pre-set', 'pre-shrunk', 'pre-soak', 'pre-sold', 'pre-sort', 'pre-stressed', 'pre-tax', 'pre-teen', 'pre-tension', 'pre-test', 'pre-trial', 'pre-view', 'pre-war', 'pre-wash', 'pre-wrap',
    'precious-stone',
    'preferential-treatment',
    'pregnancy-test',
    'premium-bond', // (UK Finance)
    'prep-school',
    'present-day',
    'press-agent', 'press-box', 'press-conference', 'press-cutting', 'press-gang', 'press-pack', 'press-pass', 'press-release', 'press-room', 'press-stud',
    'press-up', // (UK: Push-up)
    'pressure-cooker', 'pressure-group', 'pressure-point', 'pressure-sore', 'pressure-washer',
    'pretty-boy', 'pretty-pretty',
    'price-cap', 'price-check', 'price-control', 'price-cut', 'price-fixing', 'price-freeze', 'price-hike', 'price-list', 'price-range', 'price-tag', 'price-war',
    'prickly-heat', 'prickly-pear',
    'prime-minister', 'prime-mover', 'prime-number', 'prime-suspect', 'prime-time',
    'print-head', 'print-maker', 'print-off', 'print-out', 'print-run', 'print-shop', 'print-works',
    'printed-circuit',
    'prison-camp', 'prison-guard', 'prison-officer',
    'private-detective', 'private-enterprise', 'private-eye',
    'private-key', // (Crypto)
    'private-practice', 'private-school',
    'private-sector', // (Business)
    'privy-council', 'privy-purse', 'privy-seal',
    'prize-fight', 'prize-fighter', 'prize-fighting', 'prize-giving', 'prize-money', 'prize-winner', 'prize-winning',
    'pro-active', 'pro-bono', 'pro-choice', 'pro-life', 'pro-rata', 'pro-tem', 'pro-vice-chancellor',
    'problem-child',
    'problem-page', // (UK Magazine term)
    'problem-solver', 'problem-solving',
    'product-design', 'product-key',
    'product-life-cycle', // (Business)
    'product-line', 'product-market', 'product-placement',
    'production-line', 'production-manager',
    'profit-and-loss', 'profit-loss', 'profit-making', 'profit-margin', 'profit-share',
    'profit-sharing', // (Business)
    'profit-taking',
    'program-manager',
    'progress-bar', // (UI)
    'progress-chaser', 'progress-report',
    'project-manager',
    'promo-video',
    'proof-read', 'proof-reader', 'proof-reading',
    'prop-forward', // (Rugby)
    'property-developer', 'property-ladder', 'property-market', 'property-owner', 'property-tax',
    'proportional-representation',
    'prosecuting-counsel',
    'prospecting-pick',
    'protection-money', 'protection-racket',
    'protective-custody',
    'protein-shake',
    'protest-march',
    'pseudo-code', // (Dev)
    'pseudo-intellectual', 'pseudo-science', 'pseudo-scientific',
    'public-address', 'public-domain',
    'public-house', // (Pub)
    'public-key', // (Crypto)
    'public-opinion',
    'public-relations', // (PR)
    'public-school', // (UK private school)
    'public-sector', 'public-service', 'public-speaking', 'public-spirited', 'public-transport', 'public-works',
    'publish-and-be-damned',
    'publishing-house',
    'pudding-basin', 'pudding-bowl',
    'puff-adder', 'puff-ball', 'puff-pastry', 'puff-sleeve',
    'pug-dog', 'pug-nose', 'pug-nosed',
    'pull-back', 'pull-cord',
    'pull-down', // (UI)
    'pull-in', 'pull-off', 'pull-out', 'pull-over',
    'pull-request', // (Dev Critical)
    'pull-string', 'pull-through', 'pull-together', 'pull-up',
    'pulp-fiction', 'pulp-wood',
    'pump-action',
    'punch-bag', 'punch-bowl', 'punch-card', 'punch-drunk', 'punch-line',
    'punch-up', // (UK Slang)
    'punching-bag',
    'punctuation-mark',
    'puppet-government', 'puppet-master', 'puppet-show', 'puppet-state',
    'purchase-ledger', 'purchase-order', 'purchase-tax',
    'pure-blood', 'pure-bred',
    'purple-heart',
    'push-bike', // (UK)
    'push-button', 'push-cart',
    'push-chair', // (UK Stroller)
    'push-fit',
    'push-notification', // (Tech)
    'push-over', 'push-start', 'push-up',
    'pushing-and-shoving',
    'put-down', 'put-on', 'put-out', 'put-up', 'put-upon',
    'putting-green',
    'puzzle-book',
    'pyjama-case', 'pyjama-party',
    'pin-money', 'pin-point', 'pin-prick', 'pin-stripe', 'pin-striped', 'pin-up', 'pinch-hit', 'pine-apple', 'pine-cone',
    'pine-nut', 'ping-pong', 'pipe-cleaner', 'pipe-dream', 'pipe-line', 'piping-hot', 'pit-bull', 'pit-fall', 'pit-head',
    'pit-pony', 'pit-stop', 'pitch-black', 'pitch-dark', 'pitch-fork', 'pizza-parlour', 'place-mat', 'place-name', 'place-setting',
    'plain-clothes', 'plain-sailing', 'plain-spoken', 'plane-crash', 'planet-arium', 'plant-pot', 'play-act', 'play-back',
    'play-boy', 'play-centre', 'play-down', 'play-ground', 'play-group', 'play-house', 'play-list', 'play-mate', 'play-off',
    'play-pen', 'play-room', 'play-school', 'play-thing', 'play-time', 'play-wright', 'playing-card', 'playing-field',
    'pleasure-boat', 'pleasure-ground', 'plimsoll-line', 'plug-hole', 'plug-in', 'po-faced', 'pocket-book', 'pocket-knife',
    'pocket-money', 'point-blank', 'point-duty', 'point-of-sale', 'point-to-point', 'poison-pen', 'poke-bonnet', 'poker-face',
    'poker-faced', 'polar-bear', 'pole-axe', 'pole-jump', 'pole-position', 'pole-star', 'pole-vault', 'police-constable',
    'police-dog', 'police-force', 'police-man', 'police-officer', 'police-state', 'police-station', 'police-woman', 'policy-holder',
    'political-prisoner', 'polling-booth', 'polling-card', 'polling-day', 'polling-station', 'polo-neck', 'polo-shirt',
    'pony-tail', 'pony-trekking', 'pooh-pooh', 'pool-table', 'pop-art', 'pop-corn', 'pop-group', 'pop-gun', 'pop-music',
    'pop-star', 'pop-up', 'pork-pie', 'port-hole', 'port-wine', 'post-bag', 'post-box', 'post-card', 'post-code', 'post-date',
    'post-free', 'post-graduate', 'post-haste', 'post-horn', 'post-man', 'post-mark', 'post-master', 'post-mistress',
    'post-modern', 'post-modernism', 'post-mortem', 'post-natal', 'post-office', 'post-paid', 'post-war', 'post-woman',
    'pot-bellied', 'pot-belly', 'pot-boiler', 'pot-hole', 'pot-holer', 'pot-holing', 'pot-luck', 'pot-plant', 'pot-pourri',
    'pot-roast', 'pot-shot', 'potato-chip', 'potato-crisp', 'pound-shop', 'poverty-line', 'poverty-stricken', 'poverty-trap',
    'powder-blue', 'powder-compact', 'powder-keg', 'powder-puff', 'powder-room', 'power-boat', 'power-cut', 'power-dressing',
    'power-drill', 'power-house', 'power-line', 'power-lunch', 'power-point', 'power-station', 'power-steering', 'power-tool',
    'practical-joke', 'prayer-book', 'prayer-mat', 'prayer-meeting', 'prayer-wheel', 'pre-arrange', 'pre-book', 'pre-cast',
    'pre-conception', 'pre-condition', 'pre-cooked', 'pre-date', 'pre-destined', 'pre-determine', 'pre-digest', 'pre-election',
    'pre-eminence', 'pre-eminent', 'pre-empt', 'pre-emption', 'pre-emptive', 'pre-exist', 'pre-existence', 'pre-existing',
    'pre-fabricate', 'pre-heat', 'pre-history', 'pre-ignite', 'pre-judge', 'pre-marital', 'pre-med', 'pre-meditate',
    'pre-menstrual', 'pre-natal', 'pre-nuptial', 'pre-occupied', 'pre-ordain', 'pre-own', 'pre-package', 'pre-paid',
    'pre-pay', 'pre-plan', 'pre-prandial', 'pre-production', 'pre-program', 'pre-record', 'pre-register', 'pre-release',
    'pre-school', 'pre-schooler', 'pre-select', 'pre-set', 'pre-shrunk', 'pre-stress', 'pre-tax', 'pre-teen', 'pre-term',
    'pre-trial', 'pre-view', 'pre-war', 'pre-wash', 'precious-stone', 'pref-ab', 'preferential-voting', 'premium-bond',
    'prep-school', 'present-day', 'press-agent', 'press-box', 'press-conference', 'press-cutting', 'press-gang',
    'press-gallery', 'press-pass', 'press-release', 'press-stud', 'press-up', 'pressure-cooker', 'pressure-group',
    'pressure-point', 'pressure-sore', 'pretty-pretty', 'price-control', 'price-cut', 'price-fix', 'price-fixing',
    'price-freeze', 'price-list', 'price-range', 'price-tag', 'price-war', 'prickly-heat', 'prickly-pear', 'prime-minister',
    'prime-number', 'prime-time', 'printing-press', 'prison-camp', 'prison-officer', 'private-detective', 'private-eye',
    'private-member', 'private-parts', 'private-practice', 'private-school', 'private-sector', 'privy-council',
    'privy-purse', 'privy-seal', 'prize-fight', 'prize-fighter', 'prize-giving', 'prize-money', 'prize-win', 'prize-winner',
    'prize-winning', 'pro-active', 'pro-choice', 'pro-life', 'pro-rata', 'pro-vice-chancellor', 'problem-page',
    'problem-solving', 'production-line', 'profit-margin', 'profit-sharing', 'profit-taking', 'proof-read', 'proof-reader',
    'property-tax', 'proportional-representation', 'public-address', 'public-house', 'public-relations', 'public-school',
    'public-sector', 'public-service', 'public-spirited', 'public-transport', 'public-works', 'publishing-house',
    'puff-adder', 'puff-ball', 'puff-pastry', 'pug-nose', 'pull-back', 'pull-down', 'pull-in', 'pull-out', 'pull-over',
    'pull-up', 'pulp-wood', 'pump-action', 'punch-bag', 'punch-bowl', 'punch-drunk', 'punch-line', 'punch-up', 'punching-bag',
    'puppet-government', 'puppet-master', 'puppet-show', 'puppet-state', 'push-bike', 'push-button', 'push-chair',
    'push-over', 'push-start', 'push-up', 'pushing-and-shoving', 'put-down', 'put-on', 'put-out', 'put-up', 'putt-ing',
    'putting-green', 'pyjama-party',
    // ... W 
    'wait-and-see', 'waiting-games', 'waiting-list', 'waiting-room', 'wake-up', 'walk-about', 'walk-in', 'walk-on',
    'walk-out', 'walk-over', 'walk-through', 'walk-up', 'walkie-talkie', 'walking-stick', 'wall-bar', 'wall-chart',
    'wall-covering', 'wall-flower', 'wall-hanging', 'wall-paper', 'wall-to-wall', 'wallet-file', 'war-cloud', 'war-cry',
    'war-dance', 'war-game', 'war-grave', 'war-head', 'war-horse', 'war-lord', 'war-memorial', 'war-monger', 'war-mongering',
    'war-paint', 'war-path', 'war-plane', 'war-ship', 'war-torn', 'war-widow', 'war-wound', 'ward-robe', 'ward-room',
    'warm-blooded', 'warm-front', 'warm-hearted', 'warm-up', 'warning-light', 'warrant-officer', 'wash-basin', 'wash-bag',
    'wash-board', 'wash-bowl', 'wash-cloth', 'wash-day', 'wash-house', 'wash-leather', 'wash-out', 'wash-room', 'wash-stand',
    'wash-tub', 'washer-woman', 'washing-line', 'washing-machine', 'washing-powder', 'washing-soda', 'washing-up',
    'waste-basket', 'waste-bin', 'waste-disposal', 'waste-land', 'waste-paper', 'waste-pipe', 'waste-product', 'waste-water',
    'watch-band', 'watch-chain', 'watch-dog', 'watch-maker', 'watch-man', 'watch-night', 'watch-strap', 'watch-tower',
    'watch-word', 'water-bed', 'water-bird', 'water-biscuit', 'water-borne', 'water-bottle', 'water-butt', 'water-cannon',
    'water-carrier', 'water-colour', 'water-cool', 'water-cooled', 'water-cooler', 'water-course', 'water-cress',
    'water-diviner', 'water-fall', 'water-fowl', 'water-front', 'water-hole', 'water-hyacinth', 'water-ice', 'water-jump',
    'water-level', 'water-lily', 'water-line', 'water-log', 'water-logged', 'water-main', 'water-mark', 'water-melon',
    'water-mill', 'water-pistol', 'water-polo', 'water-power', 'water-proof', 'water-pump', 'water-rat', 'water-rate',
    'water-retention', 'water-shed', 'water-shoot', 'water-shrew', 'water-side', 'water-skier', 'water-skiing',
    'water-slide', 'water-snake', 'water-softener', 'water-soluble', 'water-spout', 'water-sprite', 'water-supply',
    'water-table', 'water-tank', 'water-tight', 'water-tower', 'water-vole', 'water-way', 'water-wheel', 'water-wing',
    'water-work', 'watering-can', 'watering-hole', 'watt-hour', 'wave-band', 'wave-length', 'wax-work', 'way-bill',
    'way-farer', 'way-lay', 'way-out', 'way-side', 'weak-kneed', 'weak-minded', 'weak-willed', 'wear-and-tear', 'weather-beaten',
    'weather-board', 'weather-bound', 'weather-chart', 'weather-cock', 'weather-eye', 'weather-forecast', 'weather-girl',
    'weather-glass', 'weather-man', 'weather-map', 'weather-proof', 'weather-report', 'weather-station', 'weather-strip',
    'weather-vane', 'wedding-breakfast', 'wedding-cake', 'wedding-day', 'wedding-dress', 'wedding-march', 'wedding-ring',
    'wee-small', 'week-day', 'week-end', 'weeny-bopper', 'weeping-willow', 'weigh-bridge', 'weigh-in', 'weight-lift',
    'weight-lifter', 'weight-lifting', 'weight-loss', 'weight-watch', 'weight-watcher', 'weird-o', 'welcome-mat',
    'welfare-state', 'well-advised', 'well-appointed', 'well-balanced', 'well-behaved', 'well-being', 'well-born',
    'well-bred', 'well-built', 'well-chosen', 'well-connected', 'well-defined', 'well-disposed', 'well-done',
    'well-earned', 'well-educated', 'well-equipped', 'well-established', 'well-fed', 'well-founded', 'well-grounded',
    'well-head', 'well-heeled', 'well-informed', 'well-intentioned', 'well-kept', 'well-known', 'well-loved',
    'well-made', 'well-mannered', 'well-meaning', 'well-meant', 'well-off', 'well-oiled', 'well-ordered', 'well-organise',
    'well-paid', 'well-placed', 'well-planned', 'well-pleased', 'well-preserved', 'well-read', 'well-received', 'well-round',
    'well-rounded', 'well-run', 'well-spoken', 'well-spring', 'well-thought-of', 'well-thought-out', 'well-timed',
    'well-to-do', 'well-tried', 'well-trodden', 'well-used', 'well-wisher', 'well-worn', 'welly-boot', 'west-bound',
    'wet-blanket', 'wet-land', 'wet-nurse', 'wet-suit', 'whale-bone', 'what-not', 'wheel-arch', 'wheel-balance',
    'wheel-barrow', 'wheel-base', 'wheel-chair', 'wheel-clamp', 'wheel-house', 'wheel-spin', 'wheel-wright', 'wheelie-bin',
    'where-abouts', 'where-as', 'where-by', 'where-fore', 'where-in', 'where-of', 'where-upon', 'where-withal', 'whet-stone',
    'whipping-boy', 'whipping-cream', 'whipping-post', 'whippet-snapper', 'whirl-pool', 'whirl-wind', 'whistle-blow',
    'whistle-blower', 'whistle-stop', 'white-bait', 'white-board', 'white-collar', 'white-elephant', 'white-face',
    'white-lie', 'white-wash', 'whole-food', 'whole-heart', 'whole-hearted', 'whole-meal', 'whole-sale', 'whole-wheat',
    'whooping-cough', 'wicked-looking', 'wicker-work', 'wide-awake', 'wide-body', 'wide-boy', 'wide-eyed', 'wide-open',
    'wide-range', 'wide-screen', 'wide-spread', 'widows-weeds', 'width-way', 'wife-swap', 'wild-card', 'wild-cat',
    'wild-fire', 'wild-fowl', 'wild-goose', 'wild-life', 'will-o-the-wisp', 'will-power', 'win-win', 'wind-bag', 'wind-break',
    'wind-cheater', 'wind-farm', 'wind-instrument', 'wind-jammer', 'wind-mill', 'wind-pipe', 'wind-screen', 'wind-shield',
    'wind-sock', 'wind-surf', 'wind-tunnel', 'wind-up', 'window-box', 'window-cleaner', 'window-dress', 'window-dressing',
    'window-ledge', 'window-pane', 'window-seat', 'window-shop', 'window-sill', 'wine-bar', 'wine-bin', 'wine-bottle',
    'wine-box', 'wine-cellar', 'wine-cool', 'wine-glass', 'wine-grower', 'wine-gum', 'wine-list', 'wine-merchant',
    'wine-press', 'wine-rack', 'wine-taster', 'wine-waiter', 'wing-chair', 'wing-command', 'wing-mirror', 'wing-nut',
    'wing-span', 'winter-green', 'winter-time', 'wipe-out', 'wire-cutter', 'wire-hair', 'wire-less', 'wire-tap', 'wire-wool',
    'wire-work', 'wise-crack', 'wish-bone', 'wishing-well', 'witch-doctor', 'witch-hunt', 'with-hold', 'with-in',
    'with-it', 'with-stand', 'wolf-whistle', 'wonder-land', 'wood-block', 'wood-carving', 'wood-chuck', 'wood-cock',
    'wood-cut', 'wood-land', 'wood-louse', 'wood-pecker', 'wood-pile', 'wood-pulp', 'wood-shed', 'wood-wind',
    'wood-work', 'wood-worm', 'wool-gather', 'word-blind', 'word-game', 'word-perfect', 'word-play', 'word-process',
    'word-processor', 'work-a-day', 'work-ahol', 'work-aholic', 'work-basket', 'work-bench', 'work-book', 'work-box',
    'work-camp', 'work-clothes', 'work-day', 'work-experience', 'work-force', 'work-horse', 'work-house', 'work-load',
    'work-man', 'work-mate', 'work-out', 'work-permit', 'work-place', 'work-room', 'work-sheet', 'work-shop', 'work-shy',
    'work-space', 'work-station', 'work-surface', 'work-table', 'work-top', 'work-up', 'work-wear', 'work-week', 'working-class',
    'working-party', 'world-class', 'world-famous', 'world-power', 'world-war', 'world-weary', 'world-wide', 'worm-cast',
    'worm-eaten', 'worm-hole', 'would-be', 'wrap-around', 'wrap-up', 'wrecking-ball', 'wrist-band', 'wrist-watch',
    'write-down', 'write-off', 'write-up', 'writing-desk', 'writing-paper', 'writing-table', 'wrong-doer', 'wrong-doing',
    'wrong-foot', 'wrong-head', 'wrong-headed', 'wry-neck',
    // Z
    'z-bend', 'z-list', 'zenith-distance', 'zero-hour', 'zero-in', 'zero-option', 'zero-rated', 'zero-tolerance', 'zig-zag',
    'zinc-plate', 'zip-code', 'zip-fastener', 'zip-file', 'zip-up', 'zone-out', 'zoo-keeper', 'zoom-in', 'zoom-lens', 'zoom-out'
]);
