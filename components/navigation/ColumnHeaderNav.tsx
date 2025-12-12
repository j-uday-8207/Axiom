'use client';

import React from 'react';
import { Search, Plus, Filter, Settings } from 'lucide-react';

interface ColumnHeaderNavProps {
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

export const ColumnHeaderNav: React.FC<ColumnHeaderNavProps> = ({
  searchPlaceholder = 'Search by ticker or name',
  onSearch,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/30">
      {/* Left Side - Column Tabs */}
      <div className="flex items-center gap-1">
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-slate-800 rounded-lg">
          <span className="text-success">●</span>
          <span>New Pairs</span>
          <span className="text-xs text-gray-500">0</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
          <span>P1</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
          <span>P2</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors">
          <span>P3</span>
        </button>
        <button className="p-1.5 text-gray-400 hover:text-white hover:bg-slate-800 rounded transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:bg-slate-800"
          />
        </div>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Filter className="w-4 h-4" />
          <span>0</span>
        </button>
        <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
