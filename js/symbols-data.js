/**
 * 10 HANDS THEMATIC SYMBOLS - The 10 Sacred Symbols & Contemporary Powers
 * Maa Durga's Ten Divine Weapons transformed into forces of modern Bengal (Category 01 Theme).
 * Aligned with the official Durga Puja 2026 Contest Brief & Copy (22 September 2026).
 */
const PUJO_SYMBOLS_DATA = [
  {
    id: 'trishul',
    num: '01',
    symbol: 'Trishul',
    bengali: 'ত্রিশূল',
    power: 'Strength',
    bengaliPower: 'শক্তি',
    subtext: 'Mastery over body, mind & spirit',
    sacredMeaning: 'Power over the three forces of nature; the force to overcome evil.',
    description: 'Power over the three forces of nature; the force to overcome evil. In modern Bengal, Trishul represents moral backbone, physical resilience, and the inner fortitude to champion justice.',
    svg: 'assets/symbols/trishul.svg',
    accentColor: '#A61A37'
  },
  {
    id: 'chakra',
    num: '02',
    symbol: 'Chakra',
    bengali: 'চক্র',
    power: 'Progress',
    bengaliPower: 'অগ্রগতি',
    subtext: 'Time, motion and cosmic order',
    sacredMeaning: 'Time, motion and cosmic order — always moving forward.',
    description: 'Time, motion and cosmic order — always moving forward. Chakra symbolizes continuous innovation, social transformation, and breaking boundaries while honoring eternal heritage.',
    svg: 'assets/symbols/chakra.svg',
    accentColor: '#f99c1c'
  },
  {
    id: 'shankha',
    num: '03',
    symbol: 'Shankha',
    bengali: 'শঙ্খ',
    power: 'Awakening',
    bengaliPower: 'জাগরণ',
    subtext: 'Primordial sound of creation',
    sacredMeaning: 'The primordial sound of creation, positive energy and awakening.',
    description: 'The primordial sound of creation, positive energy and awakening. Shankha invokes purity and summons all souls to awaken — our clarion call for civic pride and cultural renaissance.',
    svg: 'assets/symbols/shankha.svg',
    accentColor: '#540000'
  },
  {
    id: 'khadga',
    num: '04',
    symbol: 'Khadga',
    bengali: 'খড়্গ',
    power: 'Courage',
    bengaliPower: 'সাহস',
    subtext: 'Discernment that slices fear',
    sacredMeaning: 'Wisdom and sharp intellect that cut through doubt and negativity.',
    description: 'Wisdom and sharp intellect that cut through doubt and negativity. Khadga embodies intellectual bravery, speaking truth with conviction, and standing up for what is right.',
    svg: 'assets/symbols/khadga.svg',
    accentColor: '#A61A37'
  },
  {
    id: 'bow-arrow',
    num: '05',
    symbol: 'Bow + Arrow',
    bengali: 'ধনু ও বাণ',
    power: 'Focus',
    bengaliPower: 'একাগ্রতা',
    subtext: 'Single-pointed purpose',
    sacredMeaning: 'Focused energy, aim and the precision to achieve a goal.',
    description: 'Focused energy, aim and the precision to achieve a goal. Taut string and sharpened arrow denote supreme concentration, craftsmanship, and unwavering direction.',
    svg: 'assets/symbols/bow-arrow.svg',
    accentColor: '#004215'
  },
  {
    id: 'vajra',
    num: '06',
    symbol: 'Vajra',
    bengali: 'বজ্র',
    power: 'Confidence',
    bengaliPower: 'আত্মবিশ্বাস',
    subtext: 'Diamond-hard indomitable spirit',
    sacredMeaning: 'Firmness of spirit, supreme force and unshakeable conviction.',
    description: 'Firmness of spirit, supreme force and unshakeable conviction. Indestructible like a diamond and decisive like lightning, Vajra is unshakeable self-belief and dignity.',
    svg: 'assets/symbols/vajra.svg',
    accentColor: '#f99c1c'
  },
  {
    id: 'parashu',
    num: '07',
    symbol: 'Parashu',
    bengali: 'পরশু',
    power: 'Resolve',
    bengaliPower: 'সংকল্প',
    subtext: 'Fearlessness in action',
    sacredMeaning: 'Fearlessness and the strength to act against what is wrong.',
    description: 'Fearlessness and the strength to act against what is wrong. The sacred axe cleaves obstacles and represents resolute determination to finish what we begin.',
    svg: 'assets/symbols/parashu.svg',
    accentColor: '#540000'
  },
  {
    id: 'bell',
    aliasId: 'padma',
    num: '08',
    symbol: 'Ghanta (Bell)',
    bengali: 'ঘণ্টা',
    power: 'Prosperity',
    bengaliPower: 'সমৃদ্ধি',
    subtext: 'Divine resonance & auspicious awakening',
    sacredMeaning: 'Sacred sound dispelling negativity and invoking auspicious grace.',
    description: 'The sacred bell rings with divine vibrations that dispel negative energies and awaken auspicious consciousness. In modern Bengal, Ghanta symbolizes harmony, public celebration, and joyful prosperity.',
    svg: 'assets/symbols/bell.svg',
    accentColor: '#E87817'
  },
  {
    id: 'dhal',
    aliasId: 'gada',
    num: '09',
    symbol: 'Dhal (Shield)',
    bengali: 'ঢাল',
    power: 'Protection',
    bengaliPower: 'সুরক্ষা',
    subtext: 'Steadfast defense & civic safety',
    sacredMeaning: 'Invulnerable protection of dharma and vulnerable communities.',
    description: 'The divine shield guards against all hostility and malice. In contemporary Bengal, Dhal signifies civic defense, safeguarding cultural heritage, and standing as a protector for the people.',
    svg: 'assets/symbols/dhal.svg',
    accentColor: '#540000'
  },
  {
    id: 'nag',
    num: '10',
    symbol: 'Nag (Snake)',
    bengali: 'নাগ',
    power: 'Ambition',
    bengaliPower: 'উচ্চাকাঙ্ক্ষা',
    subtext: 'Vital energy ascending upward',
    sacredMeaning: 'Rising consciousness, vital energy and upward movement.',
    description: 'Rising consciousness, vital energy and upward movement. Nag channels concentrated latent potential into visionary ambition for youth and Bengal.',
    svg: 'assets/symbols/nag.svg',
    accentColor: '#004215'
  }
];

const DASHA_SHAKTI_DATA = PUJO_SYMBOLS_DATA;

if (typeof window !== 'undefined') {
  window.PUJO_SYMBOLS_DATA = PUJO_SYMBOLS_DATA;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PUJO_SYMBOLS_DATA;
}
