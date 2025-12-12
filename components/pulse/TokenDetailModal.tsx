'use client';

import React, { useState, useMemo } from 'react';
import { TokenData } from '@/types';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Flame,
  Target,
  Shield,
  Network,
  Globe,
  MessageCircle,
  Copy,
  Star,
  RefreshCw,
  ChevronDown,
} from 'lucide-react';
import { formatNumber, formatPercentage, getPercentageColor, cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  generateMockChartData, 
  generateMockHolders, 
  generateMockTrades,
  type CandlestickData,
} from '@/lib/chartData';

interface TokenDetailModalProps {
  token: TokenData | null;
  isOpen: boolean;
  onClose: () => void;
}

type TradeTab = 'market' | 'limit' | 'advanced';
type ViewTab = 'trades' | 'positions' | 'orders' | 'holders' | 'topTraders' | 'devTokens';
type ChartInterval = '1s' | '3m' | '1m' | '5d' | '1d';

export const TokenDetailModal: React.FC<TokenDetailModalProps> = ({
  token,
  isOpen,
  onClose,
}) => {
  const [tradeTab, setTradeTab] = useState<TradeTab>('market');
  const [viewTab, setViewTab] = useState<ViewTab>('positions');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [chartInterval, setChartInterval] = useState<ChartInterval>('1s');

  // Generate mock data
  const chartData = useMemo(() => {
    if (!token) return [];
    return generateMockChartData(token.marketCap / 1000000, 100);
  }, [token]);

  const holders = useMemo(() => generateMockHolders(10), []);
  const trades = useMemo(() => generateMockTrades(20), []);

  if (!token) return null;

  const copyAddress = () => {
    navigator.clipboard.writeText(token.id);
  };

  const presetAmounts = ['0.01', '0.1', '1', '10'];
  const currentPrice = token.marketCap / 1000000;
  const priceChange = token.pctChange1h;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[98vw] max-h-[98vh] overflow-hidden bg-[#0a0d12] border-slate-800 p-0">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
          {/* Left: Token Info */}
          <div className="flex items-center gap-4">
            <img
              src={token.imageUrl}
              alt={token.name}
              className="w-10 h-10 rounded-lg"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-white">{token.ticker}</h2>
                <span className="text-gray-500 text-sm">{token.name}</span>
                {token.isPaid && (
                  <span className="px-2 py-0.5 bg-success/20 rounded text-xs text-success font-bold flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    7h
                  </span>
                )}
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-1 text-xs">
                      <Network className="w-3.5 h-3.5 text-gray-500" />
                      <Globe className="w-3.5 h-3.5 text-gray-500 hover:text-white cursor-pointer" />
                      <MessageCircle className="w-3.5 h-3.5 text-gray-500 hover:text-white cursor-pointer" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Social links</TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Price Info */}
            <div className="flex items-center gap-6 ml-8">
              <div>
                <div className="text-2xl font-bold text-white">{formatNumber(token.marketCap)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Price</div>
                <div className="text-sm font-semibold text-white">${currentPrice.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Liquidity</div>
                <div className="text-sm font-semibold text-white">{formatNumber(token.liquidity)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Supply</div>
                <div className="text-sm font-semibold text-white flex items-center gap-1">
                  1B
                  <svg className="w-3 h-3 text-info" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Global Fees Paid</div>
                <div className="text-sm font-semibold text-white flex items-center gap-1">
                  <div className="flex items-center gap-0.5">
                    <div className="w-1 h-3 bg-info rounded"></div>
                    <div className="w-1 h-3 bg-info rounded"></div>
                    <div className="w-1 h-3 bg-info rounded"></div>
                  </div>
                  {token.holders}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">B.Curve</div>
                <div className="text-sm font-semibold text-success">{(Math.random() * 100).toFixed(2)}%</div>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-gray-500">📊</span>
                    <span className="text-white">0</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Charts</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Right: Action Icons */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-800 rounded transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-slate-800 rounded transition-colors">
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-slate-800 rounded transition-colors">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_380px] h-[calc(98vh-80px)]">
          {/* Left Side - Chart Area */}
          <div className="flex flex-col border-r border-slate-800 bg-[#0f1419]">
            {/* Chart Controls */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">TDU/USD on Pump V1 · 1s · axiom.trade</span>
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">O</span>
                  <span className={cn('font-semibold', priceChange >= 0 ? 'text-success' : 'text-danger')}>
                    {currentPrice.toFixed(2)}K
                  </span>
                  <span className="text-gray-500">H</span>
                  <span className="text-success">{(currentPrice * 1.05).toFixed(2)}K</span>
                  <span className="text-gray-500">L</span>
                  <span className="text-danger">{(currentPrice * 0.95).toFixed(2)}K</span>
                  <span className="text-gray-500">C</span>
                  <span className={cn('font-semibold', priceChange >= 0 ? 'text-success' : 'text-danger')}>
                    {currentPrice.toFixed(2)}K
                  </span>
                  <span className={cn('font-semibold', priceChange >= 0 ? 'text-success' : 'text-danger')}>
                    {formatNumber(token.marketCap)} ({formatPercentage(priceChange)})
                  </span>
                </div>
              </div>
            </div>

            {/* Chart Canvas */}
            <div className="flex-1 relative p-4">
              <MockCandlestickChart data={chartData} />
            </div>

            {/* Chart Interval Controls */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-slate-800">
              <div className="flex items-center gap-1">
                {['3m', '1m', '5d', '1d'].map((interval) => (
                  <button
                    key={interval}
                    onClick={() => setChartInterval(interval as ChartInterval)}
                    className={cn(
                      'px-3 py-1 text-xs rounded transition-colors',
                      chartInterval === interval
                        ? 'bg-slate-700 text-white'
                        : 'text-gray-400 hover:bg-slate-800'
                    )}
                  >
                    {interval}
                  </button>
                ))}
                <button className="p-1 ml-2 hover:bg-slate-800 rounded transition-colors">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>{new Date().toLocaleTimeString()} (UTC)</span>
                <span>%</span>
                <span>log</span>
                <span className="text-info">auto</span>
              </div>
            </div>

            {/* Bottom Tabs */}
            <div className="border-t border-slate-800">
              <div className="flex items-center gap-1 p-2">
                {[
                  { id: 'trades', label: 'Trades' },
                  { id: 'positions', label: 'Positions' },
                  { id: 'orders', label: 'Orders' },
                  { id: 'holders', label: `Holders (${token.holders})` },
                  { id: 'topTraders', label: 'Top Traders' },
                  { id: 'devTokens', label: 'Dev Tokens (1)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setViewTab(tab.id as ViewTab)}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded transition-colors',
                      viewTab === tab.id
                        ? 'bg-slate-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="h-48 overflow-auto">
                {viewTab === 'positions' && (
                  <div className="px-4 py-2">
                    <div className="grid grid-cols-6 gap-4 text-xs text-gray-500 font-semibold pb-2 border-b border-slate-800">
                      <div>Token</div>
                      <div>Bought</div>
                      <div>Sold</div>
                      <div>Remaining</div>
                      <div>PnL</div>
                      <div>Actions</div>
                    </div>
                    <div className="text-center text-gray-500 text-sm py-8">
                      No positions yet
                    </div>
                  </div>
                )}
                {viewTab === 'holders' && (
                  <div className="px-4 py-2">
                    <div className="grid grid-cols-4 gap-4 text-xs text-gray-500 font-semibold pb-2 border-b border-slate-800">
                      <div>Address</div>
                      <div>Amount</div>
                      <div>%</div>
                      <div>Value</div>
                    </div>
                    {holders.map((holder, i) => (
                      <div key={i} className="grid grid-cols-4 gap-4 text-sm py-2 border-b border-slate-800/30 hover:bg-slate-800/20">
                        <div className="font-mono text-gray-400 text-xs">{holder.address}</div>
                        <div className="text-white text-xs">{holder.amount.toLocaleString()}</div>
                        <div className={cn('text-xs font-semibold', holder.percentage > 5 ? 'text-danger' : 'text-gray-400')}>
                          {holder.percentage.toFixed(2)}%
                        </div>
                        <div className="text-accent text-xs">${holder.value.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                )}
                {viewTab === 'trades' && (
                  <div className="px-4 py-2">
                    <div className="grid grid-cols-5 gap-4 text-xs text-gray-500 font-semibold pb-2 border-b border-slate-800">
                      <div>Time</div>
                      <div>Type</div>
                      <div>Amount</div>
                      <div>Price</div>
                      <div>Trader</div>
                    </div>
                    {trades.map((trade, i) => (
                      <div key={i} className="grid grid-cols-5 gap-4 text-xs py-2 border-b border-slate-800/30 hover:bg-slate-800/20">
                        <div className="text-gray-400">{trade.time}</div>
                        <div className={cn('font-semibold', trade.type === 'buy' ? 'text-success' : 'text-danger')}>
                          {trade.type.toUpperCase()}
                        </div>
                        <div className="text-white">{trade.amount.toLocaleString()}</div>
                        <div className="text-accent">${trade.price.toFixed(4)}</div>
                        <div className="font-mono text-gray-400">{trade.trader}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Trading Panel */}
          <div className="flex flex-col bg-[#0a0d12]">
            {/* Network and Time Info */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">5m Vol</span>
                <span className="text-success font-semibold">{formatNumber(token.volume * 0.1)}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-success">Buys<br/>{Math.floor(Math.random() * 10)} / ${(Math.random() * 100).toFixed(2)}</div>
                <div className="text-danger">Sells<br/>{Math.floor(Math.random() * 5)} / ${(Math.random() * 50).toFixed(2)}</div>
                <div className="text-info">Net Vol<br/>{formatPercentage(Math.random() * 100)}</div>
              </div>
            </div>

            {/* Buy/Sell Tabs */}
            <div className="grid grid-cols-2 gap-2 p-3 border-b border-slate-800">
              <button
                onClick={() => setTradeType('buy')}
                className={cn(
                  'py-3 rounded-lg font-bold text-sm transition-colors',
                  tradeType === 'buy'
                    ? 'bg-success text-black'
                    : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                )}
              >
                Buy
              </button>
              <button
                onClick={() => setTradeType('sell')}
                className={cn(
                  'py-3 rounded-lg font-bold text-sm transition-colors',
                  tradeType === 'sell'
                    ? 'bg-danger text-white'
                    : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                )}
              >
                Sell
              </button>
            </div>

            {/* Trade Type Tabs */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-800">
              {[
                { id: 'market', label: 'Market' },
                { id: 'limit', label: 'Limit' },
                { id: 'advanced', label: 'Adv.' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTradeTab(tab.id as TradeTab)}
                  className={cn(
                    'px-4 py-1.5 text-sm font-medium rounded transition-colors',
                    tradeTab === tab.id
                      ? 'bg-slate-700 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-slate-800'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Trading Form */}
            <div className="flex-1 px-4 py-3 space-y-3 overflow-auto">
              {/* Amount Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-gray-400">AMOUNT</label>
                  <span className="text-xs text-gray-500">0.0</span>
                </div>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                />
                
                {/* Preset Buttons */}
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setAmount(preset)}
                      className="py-2 bg-slate-800 hover:bg-slate-700 rounded text-sm font-medium transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slippage */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">≈ 20%</span>
                  <span className="text-success">📊 0.001 ▲</span>
                  <span className="text-gray-400">⊙ 0.01</span>
                  <span className="text-gray-400">⊡ Off</span>
                </div>
              </div>

              {/* Advanced Trading Strategy */}
              <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input type="checkbox" className="rounded" />
                  Advanced Trading Strategy
                </label>
              </div>

              {/* Buy/Sell Button */}
              <button
                className={cn(
                  'w-full py-4 rounded-lg font-bold text-lg transition-colors',
                  tradeType === 'buy'
                    ? 'bg-success hover:bg-success/80 text-black'
                    : 'bg-danger hover:bg-danger/80 text-white'
                )}
              >
                {tradeType === 'buy' ? `Buy ${token.ticker}` : `Sell ${token.ticker}`}
              </button>

              {/* Position Stats */}
              <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-800">
                {[
                  { label: 'Bought', value: '0', sublabel: '≣', color: 'text-info' },
                  { label: 'Sold', value: '0', sublabel: '≣', color: 'text-white' },
                  { label: 'Holding', value: '0', sublabel: '≣', color: 'text-white' },
                  { label: 'PnL', value: '+0 (+0%)', sublabel: '⊙', color: 'text-success' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[9px] text-gray-500 mb-0.5 flex items-center justify-center gap-1">
                      <span>{stat.sublabel}</span>
                      <span>{stat.label}</span>
                    </div>
                    <div className={cn('text-xs font-semibold', stat.color)}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Presets */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                {['PRESET 1', 'PRESET 2', 'PRESET 3'].map((preset, i) => (
                  <button
                    key={i}
                    className={cn(
                      'flex-1 py-2 text-xs font-medium rounded transition-colors',
                      i === 0
                        ? 'bg-info/20 text-info border border-info'
                        : i === 1
                        ? 'bg-info text-black'
                        : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                    )}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Token Info */}
              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">Token Info</span>
                  <button className="text-gray-400 hover:text-white">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Top 10 H.', value: token.topHoldersPct, color: token.topHoldersPct > 20 ? 'text-danger' : 'text-success' },
                    { label: 'Dev H.', value: token.devHoldersPct, color: 'text-success' },
                    { label: 'Snipers H.', value: token.snipersPct, color: 'text-success' },
                    { label: 'Insiders', value: token.insidersPct, color: token.insidersPct > 10 ? 'text-warning' : 'text-success' },
                    { label: 'Bundlers', value: Math.random() * 5, color: 'text-success' },
                    { label: 'LP Burned', value: token.lpBurnedPct, color: 'text-success' },
                  ].map((item, i) => (
                    <div key={i} className={cn('text-xs p-2 bg-slate-800/30 rounded', item.color)}>
                      <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-1">
                        {item.label}
                      </div>
                      <div className="text-sm font-bold">
                        {item.value.toFixed(2)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Mock Candlestick Chart Component
const MockCandlestickChart: React.FC<{ data: CandlestickData[] }> = ({ data }) => {
  const maxPrice = Math.max(...data.map(d => d.high));
  const minPrice = Math.min(...data.map(d => d.low));
  const priceRange = maxPrice - minPrice;

  return (
    <div className="w-full h-full relative">
      <svg width="100%" height="100%" className="absolute inset-0">
        {data.map((candle, i) => {
          const x = (i / data.length) * 100;
          const width = (1 / data.length) * 80;
          
          const closeY = ((maxPrice - candle.close) / priceRange) * 100;
          const openY = ((maxPrice - candle.open) / priceRange) * 100;
          const highY = ((maxPrice - candle.high) / priceRange) * 100;
          const lowY = ((maxPrice - candle.low) / priceRange) * 100;
          
          const isGreen = candle.close >= candle.open;
          const color = isGreen ? '#22c55e' : '#ef4444';
          
          return (
            <g key={i}>
              {/* Wick */}
              <line
                x1={`${x + width / 2}%`}
                y1={`${highY}%`}
                x2={`${x + width / 2}%`}
                y2={`${lowY}%`}
                stroke={color}
                strokeWidth="1"
              />
              {/* Body */}
              <rect
                x={`${x}%`}
                y={`${Math.min(openY, closeY)}%`}
                width={`${width}%`}
                height={`${Math.abs(closeY - openY) || 0.5}%`}
                fill={color}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
