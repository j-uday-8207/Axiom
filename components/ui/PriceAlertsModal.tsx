'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/store';
import { addAlert, removeAlert, toggleAlert } from '@/store/slices/alertsSlice';
import { X, Bell, BellOff, Plus, TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PriceAlertsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PriceAlertsModal: React.FC<PriceAlertsModalProps> = ({ open, onOpenChange }) => {
  const dispatch = useAppDispatch();
  const alerts = useAppSelector((state) => state.alerts.alerts);
  const newPairs = useAppSelector((state) => state.pulseFeed.newPairs);
  const finalStretch = useAppSelector((state) => state.pulseFeed.finalStretch);
  const migrated = useAppSelector((state) => state.pulseFeed.migrated);
  
  const allTokens = [...newPairs, ...finalStretch, ...migrated];
  
  const [selectedToken, setSelectedToken] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [condition, setCondition] = useState<'above' | 'below'>('above');

  const handleAddAlert = () => {
    if (!selectedToken || !targetPrice) return;
    
    const token = allTokens.find((t) => t.id === selectedToken);
    if (!token) return;

    dispatch(addAlert({
      tokenId: selectedToken,
      tokenTicker: token.ticker,
      tokenName: token.name,
      targetPrice: parseFloat(targetPrice),
      condition,
    }));

    setSelectedToken('');
    setTargetPrice('');
  };

  const activeAlerts = alerts.filter(a => a.isActive);
  const triggeredAlerts = alerts.filter(a => !a.isActive && a.triggeredAt);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden bg-slate-900 text-white border-slate-700 p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Bell className="w-6 h-6 text-yellow-500" />
                Price Alerts
              </DialogTitle>
              <p className="text-sm text-gray-400 mt-1">{activeAlerts.length} active alerts</p>
            </div>
            <button onClick={() => onOpenChange(false)} className="p-1 hover:bg-slate-800 rounded transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </DialogHeader>

        {/* Create Alert Form */}
        <div className="px-6 py-4 bg-slate-800/50 border-b border-slate-800">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create New Alert
          </h3>
          <div className="grid grid-cols-4 gap-3">
            <select
              value={selectedToken}
              onChange={(e) => setSelectedToken(e.target.value)}
              className="col-span-2 px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select token...</option>
              {allTokens.map((token) => (
                <option key={token.id} value={token.id}>
                  {token.ticker} - {token.name}
                </option>
              ))}
            </select>
            
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value as 'above' | 'below')}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="above">Above</option>
              <option value="below">Below</option>
            </select>

            <div className="flex gap-2">
              <input
                type="number"
                step="0.000001"
                placeholder="Price"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={handleAddAlert}
            disabled={!selectedToken || !targetPrice}
            className="mt-3 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded text-white text-sm font-medium transition-colors"
          >
            Add Alert
          </button>
        </div>

        {/* Active Alerts */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {activeAlerts.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3 text-gray-400">Active Alerts ({activeAlerts.length})</h3>
              <div className="space-y-2">
                {activeAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={cn(
                        "p-2 rounded-lg",
                        alert.condition === 'above' ? "bg-green-900/20" : "bg-red-900/20"
                      )}>
                        {alert.condition === 'above' ? (
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">{alert.tokenTicker}</span>
                          <span className="text-gray-400 text-sm">{alert.tokenName}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Alert when price goes {alert.condition} {alert.targetPrice.toFixed(6)} SOL
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dispatch(toggleAlert(alert.id))}
                        className="p-2 hover:bg-slate-700 rounded transition-colors"
                        title="Toggle alert"
                      >
                        <Bell className="w-4 h-4 text-yellow-500" />
                      </button>
                      <button
                        onClick={() => dispatch(removeAlert(alert.id))}
                        className="p-2 hover:bg-slate-700 rounded transition-colors text-red-400"
                        title="Delete alert"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Triggered Alerts */}
          {triggeredAlerts.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-400">Triggered ({triggeredAlerts.length})</h3>
              <div className="space-y-2">
                {triggeredAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg opacity-60">
                    <div className="flex items-center gap-3 flex-1">
                      <BellOff className="w-4 h-4 text-gray-500" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">{alert.tokenTicker}</span>
                          <span className="text-gray-400 text-sm">{alert.tokenName}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Triggered at {alert.triggeredAt ? new Date(alert.triggeredAt).toLocaleString() : 'N/A'}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch(removeAlert(alert.id))}
                      className="p-2 hover:bg-slate-700 rounded transition-colors text-red-400"
                      title="Delete alert"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {alerts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Bell className="w-12 h-12 mb-4" />
              <p className="text-lg font-medium">No alerts set</p>
              <p className="text-sm mt-2">Create an alert to get notified when prices change</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
