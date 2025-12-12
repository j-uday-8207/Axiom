'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { useToast } from '@/hooks/use-toast';
import {
  updateMetricSize,
  toggleQuickBuyButton,
  toggleTheme,
  toggleLayoutOption,
  updateMetricFilter,
  updateQuickBuyBehavior,
  toggleColumn,
  type QuickBuySize,
  type QuickBuyBehavior,
} from '@/store/slices/displaySlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type TabType = 'layout' | 'metrics' | 'row' | 'extras';

export const DisplaySettingsDropdown: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('layout');
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.display.settings);
  const { toast } = useToast();

  const quickBuyOptions: Array<{ value: QuickBuySize; label: string }> = [
    { value: 'small', label: 'Small' },
    { value: 'large', label: 'Large' },
    { value: 'mega', label: 'Mega' },
    { value: 'ultra', label: 'Ultra' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
        Display
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[280px] bg-[#0a0d12] border-slate-700 p-0">
        {/* Metrics Section */}
        <div className="px-3 py-2 border-b border-slate-800">
          <div className="text-xs text-gray-500 font-semibold mb-2">Metrics</div>
          
          {/* MC Size Toggle */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">MC</span>
              <span className="text-sm font-bold text-white">77K</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => dispatch(updateMetricSize('small'))}
                className={cn(
                  'px-2 py-1 text-xs rounded transition-colors',
                  settings.mcSize === 'small'
                    ? 'bg-slate-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                )}
              >
                Small
              </button>
              <button
                onClick={() => dispatch(updateMetricSize('large'))}
                className={cn(
                  'px-2 py-1 text-xs rounded transition-colors',
                  settings.mcSize === 'large'
                    ? 'bg-slate-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                )}
              >
                Large
              </button>
            </div>
          </div>

          {/* Quick Buy Buttons */}
          <div className="mb-2">
            <div className="text-xs text-gray-400 mb-2">Quick Buy</div>
            <div className="flex gap-2">
              {quickBuyOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => dispatch(toggleQuickBuyButton(option.value))}
                  className={cn(
                    'flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors',
                    settings.quickBuyButtons.includes(option.value)
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                  )}
                >
                  {settings.quickBuyButtons.includes(option.value) && (
                    <span className="text-xs">+7</span>
                  )}
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grey Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-gray-300 hover:bg-slate-800 rounded transition-colors"
          >
            <span>☀️</span>
            <span>Grey</span>
            {settings.theme === 'grey' && <Check className="w-4 h-4 ml-auto text-success" />}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b border-slate-800">
          {(['layout', 'metrics', 'row', 'extras'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'flex-1 px-3 py-2 text-xs font-medium capitalize transition-colors',
                activeTab === tab
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-2">
          {activeTab === 'layout' && (
            <div className="space-y-1">
              <button
                onClick={() => dispatch(toggleLayoutOption('hideSearchBar'))}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:bg-slate-800 rounded transition-colors"
              >
                <span className="text-lg">🔍</span>
                <span>Hide Search Bar</span>
                {settings.hideSearchBar && <Check className="w-4 h-4 ml-auto text-success" />}
              </button>

              <button
                onClick={() => dispatch(toggleLayoutOption('noDecimals'))}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:bg-slate-800 rounded transition-colors"
              >
                <span className="text-lg">#</span>
                <span>No Decimals</span>
                {settings.noDecimals && <Check className="w-4 h-4 ml-auto text-success" />}
              </button>

              <button
                onClick={() => dispatch(toggleLayoutOption('hideHiddenTokens'))}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:bg-slate-800 rounded transition-colors"
              >
                <span className="text-lg">🚫</span>
                <span>Hide Hidden Tokens</span>
                {settings.hideHiddenTokens && <Check className="w-4 h-4 ml-auto text-success" />}
              </button>

              <button
                onClick={() => dispatch(toggleLayoutOption('squareImages'))}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:bg-slate-800 rounded transition-colors"
              >
                <span className="text-lg">⭕</span>
                <span>Square Images</span>
                {settings.squareImages && <Check className="w-4 h-4 ml-auto text-success" />}
              </button>

              <button
                onClick={() => dispatch(toggleLayoutOption('progressBar'))}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:bg-slate-800 rounded transition-colors"
              >
                <span className="text-lg">⭕</span>
                <span>Progress Bar</span>
                {settings.progressBar && <Check className="w-4 h-4 ml-auto text-success" />}
              </button>

              <button
                onClick={() => dispatch(toggleLayoutOption('spacedTables'))}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:bg-slate-800 rounded transition-colors"
              >
                <span className="text-lg">▦</span>
                <span>Spaced Tables</span>
                {settings.spacedTables && <Check className="w-4 h-4 ml-auto text-success" />}
              </button>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="space-y-4 py-2">
              {/* Market Cap Filter */}
              <div className="px-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">Market Cap</span>
                  <input
                    type="checkbox"
                    checked={settings.marketCapFilter.enabled}
                    onChange={(e) => dispatch(updateMetricFilter({ 
                      filter: 'marketCapFilter', 
                      value: { enabled: e.target.checked } 
                    }))}
                    className="rounded"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '30000', subLabel: '0 - 30K', range: [0, 30000] as [number, number], color: 'bg-blue-500' },
                    { label: '150000', subLabel: '30K - 150K', range: [30000, 150000] as [number, number], color: 'bg-yellow-500' },
                    { label: 'Above', subLabel: '150K+', range: [150000, Infinity] as [number, number], color: 'bg-green-500' },
                  ].map((option, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        dispatch(updateMetricFilter({ 
                          filter: 'marketCapFilter', 
                          value: { enabled: true, min: option.range[0], max: option.range[1] } 
                        }));
                        toast({
                          title: 'Market Cap Filter Applied',
                          description: `Showing tokens with ${option.subLabel} market cap`,
                          variant: 'success',
                        });
                      }}
                      className={cn(
                        "flex flex-col items-start p-2 rounded transition-colors",
                        settings.marketCapFilter.enabled && 
                        settings.marketCapFilter.min === option.range[0] && 
                        settings.marketCapFilter.max === option.range[1]
                          ? "bg-slate-700 border-2 border-blue-500"
                          : "bg-slate-800/50 hover:bg-slate-800"
                      )}
                    >
                      <div className="flex items-center gap-2 w-full mb-1">
                        <div className={cn("w-3 h-3 rounded", option.color)}></div>
                        <span className="text-xs font-medium text-white">{option.label}</span>
                      </div>
                      <span className="text-[10px] text-gray-500">{option.subLabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume Filter */}
              <div className="px-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">Volume</span>
                  <input
                    type="checkbox"
                    checked={settings.volumeFilter.enabled}
                    onChange={(e) => dispatch(updateMetricFilter({ 
                      filter: 'volumeFilter', 
                      value: { enabled: e.target.checked } 
                    }))}
                    className="rounded"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '1000', subLabel: '0 - 1K', range: [0, 1000] as [number, number] },
                    { label: '2000', subLabel: '1K - 2K', range: [1000, 2000] as [number, number] },
                    { label: 'Above', subLabel: '2K+', range: [2000, Infinity] as [number, number] },
                  ].map((option, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        dispatch(updateMetricFilter({ 
                          filter: 'volumeFilter', 
                          value: { enabled: true, min: option.range[0], max: option.range[1] } 
                        }));
                        toast({
                          title: 'Volume Filter Applied',
                          description: `Showing tokens with ${option.subLabel} volume`,
                          variant: 'success',
                        });
                      }}
                      className={cn(
                        "flex flex-col items-start p-2 rounded transition-colors",
                        settings.volumeFilter.enabled && 
                        settings.volumeFilter.min === option.range[0] && 
                        settings.volumeFilter.max === option.range[1]
                          ? "bg-slate-700 border-2 border-green-500"
                          : "bg-slate-800/50 hover:bg-slate-800"
                      )}
                    >
                      <div className="flex items-center gap-2 w-full mb-1">
                        <div className="w-3 h-3 rounded bg-white"></div>
                        <span className="text-xs font-medium text-white">{option.label}</span>
                      </div>
                      <span className="text-[10px] text-gray-500">{option.subLabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Holders Filter */}
              <div className="px-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">Holders</span>
                  <input
                    type="checkbox"
                    checked={settings.holdersFilter.enabled}
                    onChange={(e) => dispatch(updateMetricFilter({ 
                      filter: 'holdersFilter', 
                      value: { enabled: e.target.checked } 
                    }))}
                    className="rounded"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '10', subLabel: '0 - 10', range: [0, 10] as [number, number] },
                    { label: '50', subLabel: '10 - 50', range: [10, 50] as [number, number] },
                    { label: 'Above', subLabel: '50+', range: [50, Infinity] as [number, number] },
                  ].map((option, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        dispatch(updateMetricFilter({ 
                          filter: 'holdersFilter', 
                          value: { enabled: true, min: option.range[0], max: option.range[1] } 
                        }));
                        toast({
                          title: 'Holders Filter Applied',
                          description: `Showing tokens with ${option.subLabel} holders`,
                          variant: 'success',
                        });
                      }}
                      className={cn(
                        "flex flex-col items-start p-2 rounded transition-colors",
                        settings.holdersFilter.enabled && 
                        settings.holdersFilter.min === option.range[0] && 
                        settings.holdersFilter.max === option.range[1]
                          ? "bg-slate-700 border-2 border-purple-500"
                          : "bg-slate-800/50 hover:bg-slate-800"
                      )}
                    >
                      <div className="flex items-center gap-2 w-full mb-1">
                        <div className="w-3 h-3 rounded bg-white"></div>
                        <span className="text-xs font-medium text-white">{option.label}</span>
                      </div>
                      <span className="text-[10px] text-gray-500">{option.subLabel}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'row' && (
            <div className="space-y-3 py-2 px-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🌈</span>
                  <span className="text-sm font-semibold text-white">Color Row</span>
                </div>
                <button
                  onClick={() => {
                    dispatch(toggleLayoutOption('enableProtocolColors'));
                    toast({
                      title: settings.enableProtocolColors ? 'Protocol Colors Disabled' : 'Protocol Colors Enabled',
                      description: settings.enableProtocolColors ? 'Rows will use default styling' : 'Rows will show protocol-specific colors',
                      variant: 'success',
                    });
                  }}
                  className={cn(
                    'relative w-11 h-6 rounded-full transition-colors',
                    settings.enableProtocolColors ? 'bg-blue-600' : 'bg-slate-700'
                  )}
                >
                  <div className={cn(
                    'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                    settings.enableProtocolColors ? 'left-6' : 'left-1'
                  )} />
                </button>
              </div>
              
              <div className="mb-3">
                <div className="text-xs text-gray-400 mb-2">Protocol Row Colors</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Pump', color: 'border-green-500 text-green-500', icon: '🚀' },
                    { name: 'Mayhem', color: 'border-red-500 text-red-500', icon: '💥' },
                    { name: 'Believe', color: 'border-green-400 text-green-400', icon: '🙏' },
                    { name: 'Moonit', color: 'border-yellow-500 text-yellow-500', icon: '🌙' },
                    { name: 'Bonk', color: 'border-orange-500 text-orange-500', icon: '🔥' },
                    { name: 'Jupiter Studio', color: 'border-orange-400 text-orange-400', icon: '🪐' },
                    { name: 'LaunchLab', color: 'border-cyan-500 text-cyan-500', icon: '🔬' },
                    { name: 'Boop', color: 'border-blue-500 text-blue-500', icon: '👻' },
                    { name: 'Moonshot App', color: 'border-purple-500 text-purple-500', icon: '🌙' },
                    { name: 'Heaven', color: 'border-gray-400 text-gray-400', icon: '☁️' },
                    { name: 'Daos.fun', color: 'border-blue-400 text-blue-400', icon: '🌊' },
                    { name: 'Candle', color: 'border-orange-600 text-orange-600', icon: '🕯️' },
                    { name: 'Sugar', color: 'border-pink-500 text-pink-500', icon: '🍩' },
                    { name: 'Bags', color: 'border-green-600 text-green-600', icon: '💰' },
                    { name: 'Migrating', color: 'border-blue-600 text-blue-600', icon: '🔵' },
                    { name: 'Pump AMM', color: 'border-green-700 text-green-700', icon: '🚀' },
                    { name: 'Meteora', color: 'border-orange-700 text-orange-700', icon: '☄️' },
                  ].map((protocol) => (
                    <button
                      key={protocol.name}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                        'bg-slate-900/50 hover:bg-slate-800',
                        protocol.color
                      )}
                    >
                      <span className="mr-1">{protocol.icon}</span>
                      {protocol.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'extras' && (
            <div className="space-y-4 py-2 px-3">
              {/* Column Visibility */}
              <div>
                <div className="text-xs text-gray-400 mb-2">Visible Columns</div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'newPairs' as const, label: 'New Pairs' },
                    { id: 'finalStretch' as const, label: 'Final Stretch' },
                    { id: 'migrated' as const, label: 'Migrated' },
                  ].map((column) => (
                    <button
                      key={column.id}
                      onClick={() => {
                        dispatch(toggleColumn(column.id));
                        const isVisible = settings.visibleColumns.includes(column.id);
                        toast({
                          title: isVisible ? `${column.label} Hidden` : `${column.label} Visible`,
                          description: isVisible 
                            ? `${column.label} column will be hidden` 
                            : `${column.label} column will be shown`,
                          variant: 'success',
                        });
                      }}
                      className={cn(
                        'px-4 py-3 rounded-lg text-sm font-medium transition-colors border-2',
                        settings.visibleColumns.includes(column.id)
                          ? 'border-blue-500 text-blue-500 bg-blue-500/10'
                          : 'border-slate-700 text-gray-400 bg-slate-800/30'
                      )}
                    >
                      {column.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Buy Behavior */}
              <div>
                <div className="text-sm font-semibold text-white mb-2">Click Quick Buy Behavior</div>
                <div className="space-y-2">
                  {[
                    { value: 'nothing' as QuickBuyBehavior, label: 'Nothing', icon: '□' },
                    { value: 'openPage' as QuickBuyBehavior, label: 'Open Page', icon: '→' },
                    { value: 'openNewTab' as QuickBuyBehavior, label: 'Open in New Tab', icon: '↗' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        dispatch(updateQuickBuyBehavior(option.value));
                        toast({
                          title: 'Quick Buy Behavior Updated',
                          description: `Quick Buy will now: ${option.label}`,
                          variant: 'success',
                        });
                      }}
                      className={cn(
                        'flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                        settings.quickBuyBehavior === option.value
                          ? 'bg-slate-700 text-white'
                          : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800'
                      )}
                    >
                      <span className="text-lg">{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-2 border-t border-slate-800 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Second Quick Buy Button</span>
                  <button
                    onClick={() => {
                      dispatch(toggleLayoutOption('secondQuickBuyButton'));
                      toast({
                        title: settings.secondQuickBuyButton ? 'Second Quick Buy Disabled' : 'Second Quick Buy Enabled',
                        description: settings.secondQuickBuyButton 
                          ? 'Second quick buy button hidden' 
                          : 'Second quick buy button shown',
                        variant: 'success',
                      });
                    }}
                    className={cn(
                      'relative w-11 h-6 rounded-full transition-colors',
                      settings.secondQuickBuyButton ? 'bg-blue-600' : 'bg-slate-700'
                    )}
                  >
                    <div className={cn(
                      'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                      settings.secondQuickBuyButton ? 'left-6' : 'left-1'
                    )} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Wallet Groups in Header</span>
                  <button
                    onClick={() => {
                      dispatch(toggleLayoutOption('walletGroupsInHeader'));
                      toast({
                        title: settings.walletGroupsInHeader ? 'Wallet Groups Disabled' : 'Wallet Groups Enabled',
                        description: settings.walletGroupsInHeader 
                          ? 'Wallet groups removed from header' 
                          : 'Wallet groups shown in header',
                        variant: 'success',
                      });
                    }}
                    className={cn(
                      'relative w-11 h-6 rounded-full transition-colors',
                      settings.walletGroupsInHeader ? 'bg-blue-600' : 'bg-slate-700'
                    )}
                  >
                    <div className={cn(
                      'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                      settings.walletGroupsInHeader ? 'left-6' : 'left-1'
                    )} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <DropdownMenuSeparator className="bg-slate-800" />

        {/* Customize Rows */}
        <button className="w-full px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-slate-800 transition-colors text-left">
          Customize rows
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
