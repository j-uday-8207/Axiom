import { TokenData } from '@/types';

const TOKEN_NAMES = [
  'PSHI', 'KNS', 'SESSIONS', 'CORGI', 'JUN', 'Peperica',
  'ADOG', 'Amby', 'GOLDIE', 'TDU', 'USDUG7C', 'OPENSOULS',
  'ZEREBROZ', 'UNC', 'sparky', 'MOONSHOT', 'VIRAL', 'BASED',
  'ROCKET', 'ALPHA', 'DEGEN', 'WAGMI', 'PUMP', 'HODL'
];

const FULL_NAMES = [
  'Pish Fish', 'KindSoul', 'SESSIONS SONORES', 'Humpday Chicken Wings',
  'Jun', 'Peperica', 'American Doge Coin', 'Amby the lamb',
  'Goldie Franklin\'s Pet', 'Trenching Degens Unite', 'unstable 67 coin',
  'opensouls', 'Zerebro 2', 'Unstable Nigga Coin', 'TIKZ unicorn in Sparks of AGI',
  'MoonShot Protocol', 'Viral Meme', 'Based Token', 'Rocket Fuel',
  'Alpha Bot', 'Degen Score', 'WAGMI Coin', 'Pump Token', 'HODL Gang'
];

/**
 * Generate a variety of crypto-themed avatar URLs
 * Using only reliable, CORS-friendly services
 */
function getRandomTokenImage(ticker: string, index: number): string {
  const colors = ['22c55e', '3b82f6', 'ef4444', 'f59e0b', '8b5cf6', 'ec4899', '06b6d4', '10b981'];
  const color = colors[index % colors.length];
  
  const imageTypes = [
    // DiceBear avatars - highly reliable
    `https://api.dicebear.com/7.x/bottts/svg?seed=${ticker}&backgroundColor=${color}`,
    `https://api.dicebear.com/7.x/shapes/svg?seed=${ticker}&backgroundColor=${color}`,
    `https://api.dicebear.com/7.x/identicon/svg?seed=${ticker}&backgroundColor=${color}`,
    `https://api.dicebear.com/7.x/rings/svg?seed=${ticker}`,
    `https://api.dicebear.com/7.x/pixels/svg?seed=${ticker}`,
    // Boring Avatars - very reliable
    `https://source.boringavatars.com/marble/120/${ticker}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`,
    `https://source.boringavatars.com/beam/120/${ticker}?colors=22c55e,3b82f6,ef4444,f59e0b,8b5cf6`,
    `https://source.boringavatars.com/bauhaus/120/${ticker}?colors=06b6d4,10b981,ec4899,f59e0b,8b5cf6`,
    `https://source.boringavatars.com/ring/120/${ticker}?colors=22c55e,3b82f6,ef4444,f59e0b,8b5cf6`,
    // UI Avatars - very reliable
    `https://ui-avatars.com/api/?name=${ticker}&background=${color}&color=fff&size=128&bold=true&rounded=true`,
  ];
  
  return imageTypes[index % imageTypes.length];
}

const IMAGE_PLACEHOLDERS = TOKEN_NAMES.map((name, index) => 
  getRandomTokenImage(name, index)
);

/**
 * Generate a random token with realistic data
 */
export function generateMockToken(id?: string): TokenData {
  const randomIndex = Math.floor(Math.random() * TOKEN_NAMES.length);
  const uniqueId = id || `token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Generate realistic market cap ranges
  const marketCapTier = Math.random();
  let marketCap: number;
  
  if (marketCapTier > 0.8) {
    // High tier: $100K - $1M
    marketCap = Math.random() * 900_000 + 100_000;
  } else if (marketCapTier > 0.5) {
    // Mid tier: $10K - $100K
    marketCap = Math.random() * 90_000 + 10_000;
  } else {
    // Low tier: $1K - $10K
    marketCap = Math.random() * 9_000 + 1_000;
  }
  
  const volume = marketCap * (Math.random() * 0.5 + 0.1); // 10-60% of market cap
  const liquidity = marketCap * (Math.random() * 0.3 + 0.05); // 5-35% of market cap
  
  return {
    id: uniqueId,
    name: FULL_NAMES[randomIndex] || `Token ${randomIndex}`,
    ticker: TOKEN_NAMES[randomIndex] || `TKN${randomIndex}`,
    imageUrl: IMAGE_PLACEHOLDERS[randomIndex % IMAGE_PLACEHOLDERS.length],
    age: generateRandomAge(),
    
    // Core metrics
    marketCap,
    volume,
    txCount: Math.floor(Math.random() * 2000) + 50,
    floorPrice: Math.random() * 1,
    
    // Percentage changes
    pctChange1m: (Math.random() - 0.5) * 100,
    pctChange5m: (Math.random() - 0.5) * 80,
    pctChange1h: (Math.random() - 0.5) * 60,
    
    // Status flags
    isPaid: Math.random() > 0.7,
    isDistinguished: Math.random() > 0.85,
    isOnline: Math.random() > 0.2,
    
    // Social links
    hasWebsite: Math.random() > 0.4,
    hasTwitter: Math.random() > 0.3,
    hasDiscord: Math.random() > 0.6,
    
    // Additional metrics
    holders: Math.floor(Math.random() * 10000) + 100,
    liquidity,
    fdv: marketCap * (Math.random() * 2 + 1),
    
    // Performance indicators
    performance1h: (Math.random() - 0.5) * 50,
    performance24h: (Math.random() - 0.5) * 100,
    
    // Security & holder metrics
    topHoldersPct: Math.random() * 30 + 5, // 5-35%
    devHoldersPct: Math.random() * 5, // 0-5%
    snipersPct: Math.random() * 3, // 0-3%
    insidersPct: Math.random() * 10, // 0-10%
    lpBurnedPct: Math.random() > 0.5 ? 100 : Math.random() * 100, // 0-100%
    
    // Additional stats
    userCount: Math.floor(Math.random() * 100) + 1,
    chartCount: Math.floor(Math.random() * 50) + 1,
    
    // Timestamps
    createdAt: Date.now() - Math.random() * 86400000 * 7, // Random time in last 7 days
    lastUpdated: Date.now(),
  };
}

/**
 * Generate an array of mock tokens
 */
export function generateMockTokens(count: number): TokenData[] {
  return Array.from({ length: count }, (_, i) => generateMockToken(`token-${i}`));
}

/**
 * Generate random age string
 */
function generateRandomAge(): string {
  const types = ['s', 'm', 'h', 'd'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  let value: number;
  switch (type) {
    case 's':
      value = Math.floor(Math.random() * 59) + 1;
      break;
    case 'm':
      value = Math.floor(Math.random() * 59) + 1;
      break;
    case 'h':
      value = Math.floor(Math.random() * 23) + 1;
      break;
    case 'd':
      value = Math.floor(Math.random() * 30) + 1;
      break;
    default:
      value = 1;
  }
  
  return `${value}${type}`;
}

/**
 * Update token with random value changes (for simulation)
 */
export function generateRandomUpdate(token: TokenData): Partial<TokenData> {
  const changePercent = (Math.random() - 0.5) * 10; // -5% to +5% change
  const newMarketCap = token.marketCap * (1 + changePercent / 100);
  const newVolume = token.volume * (1 + (Math.random() - 0.5) * 5 / 100);
  
  return {
    marketCap: Math.max(1000, newMarketCap),
    volume: Math.max(100, newVolume),
    pctChange1m: (Math.random() - 0.5) * 100,
    pctChange5m: (Math.random() - 0.5) * 80,
    txCount: token.txCount + Math.floor(Math.random() * 10),
    lastUpdated: Date.now(),
  };
}

/**
 * Initial data for all three columns
 */
export const INITIAL_MOCK_DATA = {
  newPairs: generateMockTokens(12),
  finalStretch: generateMockTokens(10),
  migrated: generateMockTokens(15),
};
