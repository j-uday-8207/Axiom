'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppSelector, useAppDispatch } from '@/store';
import {
  updateMetricSize,
  toggleTheme,
  toggleLayoutOption,
  updateMetricFilter,
  toggleColumn,
  resetDisplaySettings,
  MetricSize,
} from '@/store/slices/displaySlice';
import { clearBookmarks } from '@/store/slices/bookmarksSlice';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ open, onOpenChange }) => {
  const dispatch = useAppDispatch();
  const displaySettings = useAppSelector((state) => state.display.settings);
  const bookmarkCount = useAppSelector((state) => state.bookmarks.bookmarkedTokenIds.length);

  const handleMetricSizeChange = (size: MetricSize) => {
    dispatch(updateMetricSize(size));
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleToggleLayoutOption = (option: keyof typeof displaySettings) => {
    dispatch(toggleLayoutOption(option as any));
  };

  const handleToggleColumn = (column: 'newPairs' | 'finalStretch' | 'migrated') => {
    dispatch(toggleColumn(column));
  };

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      dispatch(resetDisplaySettings());
    }
  };

  const handleClearBookmarks = () => {
    if (confirm(`Are you sure you want to clear all ${bookmarkCount} bookmarks?`)) {
      dispatch(clearBookmarks());
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-slate-900 text-white border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Settings</DialogTitle>
          <DialogDescription className="text-gray-400">
            Customize your Pulse experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Display Settings */}
          <section>
            <h3 className="text-lg font-semibold mb-3 text-white">Display</h3>
            <div className="space-y-3">
              {/* Metric Size */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Metric Size</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMetricSizeChange('small')}
                    className={cn(
                      'px-3 py-1 rounded text-sm transition-colors',
                      displaySettings.mcSize === 'small'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                    )}
                  >
                    Small
                  </button>
                  <button
                    onClick={() => handleMetricSizeChange('large')}
                    className={cn(
                      'px-3 py-1 rounded text-sm transition-colors',
                      displaySettings.mcSize === 'large'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                    )}
                  >
                    Large
                  </button>
                </div>
              </div>

              {/* Theme */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Theme</span>
                <button
                  onClick={handleToggleTheme}
                  className={cn(
                    'px-3 py-1 rounded text-sm transition-colors',
                    'bg-slate-800 text-gray-300 hover:bg-slate-700'
                  )}
                >
                  {displaySettings.theme === 'grey' ? 'Grey' : 'Default'}
                </button>
              </div>
            </div>
          </section>

          {/* Layout Settings */}
          <section>
            <h3 className="text-lg font-semibold mb-3 text-white">Layout</h3>
            <div className="space-y-2">
              {[
                { key: 'hideSearchBar', label: 'Hide Search Bar' },
                { key: 'squareImages', label: 'Square Token Images' },
                { key: 'progressBar', label: 'Show Progress Bar' },
                { key: 'spacedTables', label: 'Spaced Tables' },
                { key: 'noDecimals', label: 'Hide Decimals' },
                { key: 'enableProtocolColors', label: 'Protocol Colors' },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  className="flex items-center justify-between cursor-pointer hover:bg-slate-800 p-2 rounded transition-colors"
                >
                  <span className="text-sm text-gray-300">{label}</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={displaySettings[key as keyof typeof displaySettings] as boolean}
                      onChange={() => handleToggleLayoutOption(key as any)}
                      className="sr-only"
                    />
                    <div
                      className={cn(
                        'w-11 h-6 rounded-full transition-colors',
                        displaySettings[key as keyof typeof displaySettings]
                          ? 'bg-purple-600'
                          : 'bg-slate-700'
                      )}
                    >
                      <div
                        className={cn(
                          'w-5 h-5 bg-white rounded-full shadow-md transform transition-transform m-0.5',
                          displaySettings[key as keyof typeof displaySettings]
                            ? 'translate-x-5'
                            : 'translate-x-0'
                        )}
                      />
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Visible Columns */}
          <section>
            <h3 className="text-lg font-semibold mb-3 text-white">Visible Columns</h3>
            <div className="space-y-2">
              {[
                { id: 'newPairs' as const, label: 'New Pairs' },
                { id: 'finalStretch' as const, label: 'Final Stretch' },
                { id: 'migrated' as const, label: 'Migrated' },
              ].map(({ id, label }) => (
                <label
                  key={id}
                  className="flex items-center justify-between cursor-pointer hover:bg-slate-800 p-2 rounded transition-colors"
                >
                  <span className="text-sm text-gray-300">{label}</span>
                  <button
                    onClick={() => handleToggleColumn(id)}
                    disabled={displaySettings.visibleColumns.length === 1 && displaySettings.visibleColumns.includes(id)}
                    className={cn(
                      'w-6 h-6 rounded border-2 transition-all flex items-center justify-center',
                      displaySettings.visibleColumns.includes(id)
                        ? 'bg-purple-600 border-purple-600'
                        : 'border-slate-600',
                      displaySettings.visibleColumns.length === 1 && displaySettings.visibleColumns.includes(id)
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    )}
                  >
                    {displaySettings.visibleColumns.includes(id) && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </button>
                </label>
              ))}
            </div>
          </section>

          {/* Filter Settings */}
          <section>
            <h3 className="text-lg font-semibold mb-3 text-white">Filters</h3>
            <div className="space-y-4">
              {/* Market Cap Filter */}
              <div className="space-y-2">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Market Cap Filter</span>
                  <input
                    type="checkbox"
                    checked={displaySettings.marketCapFilter.enabled}
                    onChange={(e) =>
                      dispatch(
                        updateMetricFilter({
                          filter: 'marketCapFilter',
                          value: { enabled: e.target.checked },
                        })
                      )
                    }
                    className="w-4 h-4"
                  />
                </label>
                {displaySettings.marketCapFilter.enabled && (
                  <div className="flex gap-2 items-center pl-4">
                    <input
                      type="number"
                      value={displaySettings.marketCapFilter.min}
                      onChange={(e) =>
                        dispatch(
                          updateMetricFilter({
                            filter: 'marketCapFilter',
                            value: { min: Number(e.target.value) },
                          })
                        )
                      }
                      className="w-20 px-2 py-1 bg-slate-800 rounded text-sm"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      value={displaySettings.marketCapFilter.max}
                      onChange={(e) =>
                        dispatch(
                          updateMetricFilter({
                            filter: 'marketCapFilter',
                            value: { max: Number(e.target.value) },
                          })
                        )
                      }
                      className="w-20 px-2 py-1 bg-slate-800 rounded text-sm"
                      placeholder="Max"
                    />
                  </div>
                )}
              </div>

              {/* Volume Filter */}
              <div className="space-y-2">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Volume Filter</span>
                  <input
                    type="checkbox"
                    checked={displaySettings.volumeFilter.enabled}
                    onChange={(e) =>
                      dispatch(
                        updateMetricFilter({
                          filter: 'volumeFilter',
                          value: { enabled: e.target.checked },
                        })
                      )
                    }
                    className="w-4 h-4"
                  />
                </label>
                {displaySettings.volumeFilter.enabled && (
                  <div className="flex gap-2 items-center pl-4">
                    <input
                      type="number"
                      value={displaySettings.volumeFilter.min}
                      onChange={(e) =>
                        dispatch(
                          updateMetricFilter({
                            filter: 'volumeFilter',
                            value: { min: Number(e.target.value) },
                          })
                        )
                      }
                      className="w-20 px-2 py-1 bg-slate-800 rounded text-sm"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      value={displaySettings.volumeFilter.max}
                      onChange={(e) =>
                        dispatch(
                          updateMetricFilter({
                            filter: 'volumeFilter',
                            value: { max: Number(e.target.value) },
                          })
                        )
                      }
                      className="w-20 px-2 py-1 bg-slate-800 rounded text-sm"
                      placeholder="Max"
                    />
                  </div>
                )}
              </div>

              {/* Holders Filter */}
              <div className="space-y-2">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Holders Filter</span>
                  <input
                    type="checkbox"
                    checked={displaySettings.holdersFilter.enabled}
                    onChange={(e) =>
                      dispatch(
                        updateMetricFilter({
                          filter: 'holdersFilter',
                          value: { enabled: e.target.checked },
                        })
                      )
                    }
                    className="w-4 h-4"
                  />
                </label>
                {displaySettings.holdersFilter.enabled && (
                  <div className="flex gap-2 items-center pl-4">
                    <input
                      type="number"
                      value={displaySettings.holdersFilter.min}
                      onChange={(e) =>
                        dispatch(
                          updateMetricFilter({
                            filter: 'holdersFilter',
                            value: { min: Number(e.target.value) },
                          })
                        )
                      }
                      className="w-20 px-2 py-1 bg-slate-800 rounded text-sm"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      value={displaySettings.holdersFilter.max}
                      onChange={(e) =>
                        dispatch(
                          updateMetricFilter({
                            filter: 'holdersFilter',
                            value: { max: Number(e.target.value) },
                          })
                        )
                      }
                      className="w-20 px-2 py-1 bg-slate-800 rounded text-sm"
                      placeholder="Max"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Actions */}
          <section>
            <h3 className="text-lg font-semibold mb-3 text-white">Actions</h3>
            <div className="space-y-2">
              <button
                onClick={handleClearBookmarks}
                disabled={bookmarkCount === 0}
                className={cn(
                  'w-full px-4 py-2 rounded text-sm font-medium transition-colors',
                  bookmarkCount > 0
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                    : 'bg-slate-800 text-gray-500 cursor-not-allowed'
                )}
              >
                Clear All Bookmarks {bookmarkCount > 0 && `(${bookmarkCount})`}
              </button>
              <button
                onClick={handleResetSettings}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium text-white transition-colors"
              >
                Reset All Settings
              </button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};
