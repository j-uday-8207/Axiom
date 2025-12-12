'use client';

import React, { useState } from 'react';
import { DisplaySettingsDropdown } from '@/components/ui/DisplaySettingsDropdown';
import { ProfileModal } from '@/components/ui/ProfileModal';
import { SettingsModal } from '@/components/ui/SettingsModal';
import { ExchangeModal } from '@/components/ui/ExchangeModal';
import { PortfolioModal } from '@/components/ui/PortfolioModal';
import { useAppSelector, useAppDispatch } from '@/store';
import { toggleShowBookmarkedOnly, setViewMode } from '@/store/slices/displaySlice';
import { toast } from '@/hooks/use-toast';
import {
  HelpCircle,
  Bookmark,
  Grid3x3,
  Volume2,
  Settings,
  LayoutGrid,
  File,
  Menu,
  UserCircle,
  Columns3,
  Wallet,
  Package,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const PulseNavigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [exchangeOpen, setExchangeOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  
  const bookmarkCount = useAppSelector((state) => state.bookmarks.bookmarkedTokenIds.length);
  const showBookmarkedOnly = useAppSelector((state) => state.display.settings.showBookmarkedOnly);
  const viewMode = useAppSelector((state) => state.display.settings.viewMode);
  const solBalance = useAppSelector((state) => state.wallet.solBalance);
  const positionCount = useAppSelector((state) => Object.keys(state.portfolio.positions).length);

  const toggleBookmarkFilter = () => {
    dispatch(toggleShowBookmarkedOnly());
    toast({
      title: showBookmarkedOnly ? "Showing All Tokens" : "Showing Bookmarked Only",
      description: showBookmarkedOnly 
        ? "Displaying all tokens" 
        : `Displaying ${bookmarkCount} bookmarked token${bookmarkCount !== 1 ? 's' : ''}`,
    });
  };

  const toggleViewMode = () => {
    const newMode = viewMode === 'column' ? 'grid' : 'column';
    dispatch(setViewMode(newMode));
    toast({
      title: `View Mode: ${newMode === 'column' ? 'Column' : 'Grid'}`,
      description: `Switched to ${newMode} view`,
    });
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a] border-b border-slate-800">
      {/* Left Side - Logo and Title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Menu className="w-5 h-5 text-gray-400" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded"></div>
            <h1 className="text-xl font-bold text-white">Pulse</h1>
          </div>
        </div>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>

        <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Menu className="w-5 h-5" />
        </button>

        <DisplaySettingsDropdown />

        <button 
          onClick={toggleBookmarkFilter}
          className={cn(
            "relative p-2 rounded-lg transition-colors",
            showBookmarkedOnly 
              ? "bg-yellow-600 text-white" 
              : "text-gray-400 hover:text-white hover:bg-slate-800"
          )}
          title={showBookmarkedOnly ? "Show all tokens" : "Show bookmarked only"}
        >
          <Bookmark className={cn("w-5 h-5", showBookmarkedOnly && "fill-current")} />
          {bookmarkCount > 0 && !showBookmarkedOnly && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
              {bookmarkCount}
            </span>
          )}
        </button>

        <button 
          onClick={toggleViewMode}
          className={cn(
            "p-2 rounded-lg transition-colors",
            viewMode === 'grid' 
              ? "bg-purple-600 text-white" 
              : "text-gray-400 hover:text-white hover:bg-slate-800"
          )}
          title={viewMode === 'column' ? "Switch to grid view" : "Switch to column view"}
        >
          {viewMode === 'column' ? (
            <Grid3x3 className="w-5 h-5" />
          ) : (
            <Columns3 className="w-5 h-5" />
          )}
        </button>

        <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Volume2 className="w-5 h-5" />
        </button>

        <button 
          onClick={() => setSettingsOpen(true)}
          className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          title="Open settings"
        >
          <Settings className="w-5 h-5" />
        </button>

        <button 
          onClick={() => setExchangeOpen(true)}
          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-colors"
          title="Add tokens"
        >
          <Wallet className="w-4 h-4 text-white" />
          <span className="text-sm text-white font-medium">{solBalance.toFixed(2)} SOL</span>
        </button>

        <button 
          onClick={() => setPortfolioOpen(true)}
          className="relative flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-colors"
          title="View portfolio"
        >
          <Package className="w-4 h-4 text-white" />
          <span className="text-sm text-white font-medium">Portfolio</span>
          {positionCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
              {positionCount}
            </span>
          )}
        </button>

        <button 
          onClick={() => setProfileOpen(true)}
          className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <UserCircle className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 rounded-lg">
          <LayoutGrid className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-white font-medium">1</span>
          <File className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-white font-medium">0</span>
        </div>
      </div>

      <ProfileModal open={profileOpen} onOpenChange={setProfileOpen} />
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
      <ExchangeModal open={exchangeOpen} onOpenChange={setExchangeOpen} />
      <PortfolioModal open={portfolioOpen} onOpenChange={setPortfolioOpen} />
    </nav>
  );
};
