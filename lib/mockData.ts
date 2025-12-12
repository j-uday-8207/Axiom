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
 * Generate SVG avatar data URI
 */
function generateAvatarDataUri(letter: string, bgColor: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
    <rect width="48" height="48" fill="${bgColor}" rx="8"/>
    <text x="24" y="32" font-family="Arial, sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="white">${letter}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

const COLORS = ['#22c55e', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981'];

const IMAGE_PLACEHOLDERS = TOKEN_NAMES.map((name, index) => 
  generateAvatarDataUri(name.charAt(0), COLORS[index % COLORS.length])
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
    floorPrice: Math.random() * 10,
    
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
