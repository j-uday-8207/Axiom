/**
 * Generate mock candlestick chart data
 */
export interface CandlestickData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export function generateMockChartData(
  basePrice: number,
  points: number = 100
): CandlestickData[] {
  const data: CandlestickData[] = [];
  let currentPrice = basePrice;
  const now = Date.now();
  const interval = 60000; // 1 minute intervals

  for (let i = points; i >= 0; i--) {
    const time = now - i * interval;
    const volatility = 0.02; // 2% volatility
    const change = (Math.random() - 0.5) * volatility * currentPrice;
    
    const open = currentPrice;
    const close = currentPrice + change;
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    const volume = Math.random() * 100000 + 10000;

    data.push({
      time,
      open,
      high,
      low,
      close,
      volume,
    });

    currentPrice = close;
  }

  return data;
}

/**
 * Generate mock holder data
 */
export interface HolderData {
  address: string;
  amount: number;
  percentage: number;
  value: number;
}

export function generateMockHolders(count: number = 10): HolderData[] {
  const holders: HolderData[] = [];
  let remainingPercentage = 100;

  for (let i = 0; i < count; i++) {
    const percentage = i === count - 1 
      ? remainingPercentage 
      : Math.random() * (remainingPercentage / (count - i)) * 1.5;
    
    remainingPercentage -= percentage;

    holders.push({
      address: `0x${Math.random().toString(36).substr(2, 8)}...${Math.random().toString(36).substr(2, 4)}`,
      amount: Math.floor(Math.random() * 10000000),
      percentage: Math.max(0.01, percentage),
      value: Math.random() * 100000,
    });
  }

  return holders.sort((a, b) => b.percentage - a.percentage);
}

/**
 * Generate mock trade data
 */
export interface TradeData {
  time: number;
  type: 'buy' | 'sell';
  price: number;
  amount: number;
  total: number;
  trader: string;
}

export function generateMockTrades(count: number = 20): TradeData[] {
  const trades: TradeData[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const type = Math.random() > 0.5 ? 'buy' : 'sell';
    const price = Math.random() * 100 + 10;
    const amount = Math.random() * 1000 + 10;

    trades.push({
      time: now - i * 30000, // 30 seconds apart
      type,
      price,
      amount,
      total: price * amount,
      trader: `0x${Math.random().toString(36).substr(2, 8)}...`,
    });
  }

  return trades;
}
