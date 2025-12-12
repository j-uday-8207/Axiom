'use client';

import React, { useState } from 'react';
import { TokenData } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Droplets,
  BarChart3,
  Clock,
  Globe,
  MessageCircle,
  ExternalLink,
  Copy,
  Star,
  Activity,
  Flame,
  Target,
} from 'lucide-react';
import { formatNumber, formatPercentage, getPercentageColor, cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface TokenDetailModalProps {
  token: TokenData | null;
  isOpen: boolean;
  onClose: () => void;
}

type TradeTab = 'market' | 'limit' | 'advanced';
type ViewTab = 'trades' | 'positions' | 'orders' | 'holders' | 'topTraders';

export const TokenDetailModal: React.FC<TokenDetailModalProps> = ({
  token,
  isOpen,
  onClose,
}) => {
  const [tradeTab, setTradeTab] = useState<TradeTab>('market');
  const [viewTab, setViewTab] = useState<ViewTab>('positions');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState('20');

  if (!token) return null;

  const copyAddress = () => {
    navigator.clipboard.writeText(token.id);
  };

  const presetAmounts = ['0.01', '0.1', '1', '10'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-hidden bg-slate-950 border-slate-800 p-0">
        {/* Header */}
        <div className="border-b border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={token.imageUrl}
                alt={token.name}
                className="w-12 h-12 rounded-lg"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-white">{token.ticker}</h2>
                  <span className="text-gray-500 text-sm">{token.name}</span>
                  {token.isPaid && (
                    <span className="px-2 py-0.5 bg-amber-500/20 rounded text-xs text-amber-500 font-bold">
                      PAID
                    </span>
                  )}
                  {token.isDistinguished && (
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-success font-bold">{token.age}</span>
                  <span className="text-gray-500">|</span>
                  <button
                    onClick={copyAddress}
                    className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="font-mono">{token.id.slice(0, 12)}...</span>
                    <Copy className="w-3 h-3" />
                  </button>
                  {token.hasWebsite && (
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  {token.hasTwitter && (
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                  {token.hasDiscord && (
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            {/* Price Info */}
            <div className="flex items-center gap-6">
              <div>
                <div className="text-xs text-gray-500 mb-1">Price</div>
                <div className="text-2xl font-bold text-accent">{formatNumber(token.marketCap / 1000000)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Liquidity</div>
                <div className="text-lg font-semibold">{formatNumber(token.liquidity)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Supply</div>
                <div className="text-lg font-semibold">1B</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_380px] h-[calc(95vh-120px)]">
          {/* Left Side - Chart and Info */}
          <div className="flex flex-col border-r border-slate-800">
            {/* Chart Area */}
            <div className="flex-1 bg-slate-900/50 p-4 relative">
              {/* Price Header */}
              <div className="mb-4">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-2xl font-bold text-white">{formatNumber(token.marketCap)}</span>
                  <span className={cn('text-lg font-semibold flex items-center gap-1', getPercentageColor(token.pctChange1h))}>
                    {formatPercentage(token.pctChange1h)}
                    {token.pctChange1h > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">H</span>
                    <span className="text-success">{formatNumber(token.marketCap * 1.15)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">L</span>
                    <span className="text-danger">{formatNumber(token.marketCap * 0.85)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">O</span>
                    <span className="text-white">{formatNumber(token.marketCap * 0.98)}</span>
                  </div>
                </div>
              </div>

              {/* Mock Chart */}
              <div className="h-[400px] bg-slate-800/30 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Chart visualization (TradingView integration)</p>
                </div>
              </div>

              {/* Chart Controls */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {['3m', '1m', '5d', '1d'].map((interval) => (
                    <button
                      key={interval}
                      className="px-3 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                      {interval}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

            {/* Bottom Tabs */}
            <div className="border-t border-slate-800">
              <div className="flex items-center gap-1 p-2 bg-slate-900/50">
                {[
                  { id: 'trades', label: 'Trades' },
                  { id: 'positions', label: 'Positions' },
                  { id: 'orders', label: 'Orders' },
                  { id: 'holders', label: `Holders (${token.holders})` },
                  { id: 'topTraders', label: 'Top Traders' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setViewTab(tab.id as ViewTab)}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded transition-colors',
                      viewTab === tab.id
                        ? 'bg-slate-700 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-slate-800'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              <div className="h-48 p-4 overflow-auto">
                {viewTab === 'positions' && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-5 gap-4 text-xs text-gray-500 font-semibold pb-2 border-b border-slate-800">
                      <div>Token</div>
                      <div>Bought</div>
                      <div>Sold</div>
                      <div>Holding</div>
                      <div>PnL</div>
                    </div>
                    <div className="text-center text-gray-500 text-sm py-8">
                      No positions yet
                    </div>
                  </div>
                )}
                {viewTab === 'holders' && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 gap-4 text-xs text-gray-500 font-semibold pb-2 border-b border-slate-800">
                      <div>Address</div>
                      <div>Amount</div>
                      <div>%</div>
                      <div>Value</div>
                    </div>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="grid grid-cols-4 gap-4 text-sm py-2 border-b border-slate-800/50">
                        <div className="font-mono text-gray-400">{`0x${Math.random().toString(36).substr(2, 8)}...`}</div>
                        <div className="text-white">{(Math.random() * 1000000).toFixed(0)}</div>
                        <div className="text-gray-400">{(Math.random() * 10).toFixed(2)}%</div>
                        <div className="text-accent">${(Math.random() * 50000).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Trading Panel */}
          <div className="flex flex-col bg-slate-900/30">
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
            <div className="flex items-center gap-2 p-3 border-b border-slate-800">
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
            <div className="flex-1 p-4 space-y-4 overflow-auto">
              {/* Amount Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-gray-400">AMOUNT</label>
                  <span className="text-xs text-gray-500">0.0</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                  />
                </div>
                
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

              {/* Slippage Settings */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger>
                        <label className="text-sm text-gray-400 flex items-center gap-1">
                          ≈ 20%
                        </label>
                      </TooltipTrigger>
                      <TooltipContent>Slippage tolerance</TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500">0.001</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-success cursor-help">▲</span>
                      </TooltipTrigger>
                      <TooltipContent>Price impact</TooltipContent>
                    </Tooltip>
                    <span className="text-gray-500">0.01</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-gray-400 cursor-help">Off</span>
                      </TooltipTrigger>
                      <TooltipContent>Auto settings</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>

              {/* Advanced Trading Strategy */}
              <div className="p-3 bg-slate-800/50 rounded-lg">
                <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  Advanced Trading Strategy
                </label>
              </div>

              {/* Buy Button */}
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

              {/* Position Info */}
              <div className="grid grid-cols-4 gap-2 pt-4 border-t border-slate-800">
                {[
                  { label: 'Bought', value: '0', color: 'text-white' },
                  { label: 'Sold', value: '0', color: 'text-white' },
                  { label: 'Holding', value: '0', color: 'text-white' },
                  { label: 'PnL', value: '+0 (+0%)', color: 'text-success' },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="text-[10px] text-gray-500 mb-1">{item.label}</div>
                    <div className={cn('text-xs font-semibold', item.color)}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Presets */}
              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  {['PRESET 1', 'PRESET 2', 'PRESET 3'].map((preset, i) => (
                    <button
                      key={i}
                      className={cn(
                        'flex-1 py-2 text-xs font-medium rounded transition-colors',
                        i === 0
                          ? 'bg-slate-700 text-white'
                          : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                      )}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Token Info */}
              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-white">Token Info</span>
                  <button className="text-gray-400 hover:text-white">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Top 10 H.', value: '24.76%', color: 'text-danger', icon: Flame },
                    { label: 'Dev H.', value: '0.15%', color: 'text-success', icon: Target },
                    { label: 'Snipers H.', value: '0.15%', color: 'text-success', icon: Target },
                    { label: 'Insiders', value: '0.67%', color: 'text-success', icon: Users },
                    { label: 'Bundlers', value: '0.15%', color: 'text-success', icon: Activity },
                    { label: 'LP Burned', value: '100%', color: 'text-success', icon: Flame },
                  ].map((item, i) => (
                    <Tooltip key={i}>
                      <TooltipTrigger>
                        <div className="flex flex-col items-start p-2 bg-slate-800/30 rounded">
                          <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-1">
                            <item.icon className="w-3 h-3" />
                            {item.label}
                          </div>
                          <div className={cn('text-sm font-semibold', item.color)}>
                            {item.value}
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{item.label}</TooltipContent>
                    </Tooltip>
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
