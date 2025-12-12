'use client';

import React, { useState } from 'react';
import { DisplaySettingsDropdown } from '@/components/ui/DisplaySettingsDropdown';
import { ProfileModal } from '@/components/ui/ProfileModal';
import { useAppSelector } from '@/store';
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
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const PulseNavigation: React.FC = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const bookmarkCount = useAppSelector((state) => state.bookmarks.bookmarkedTokenIds.length);

  const showBookmarks = () => {
    toast({
      title: "Bookmarks",
      description: `You have ${bookmarkCount} bookmarked token${bookmarkCount !== 1 ? 's' : ''}`,
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
          onClick={showBookmarks}
          className="relative p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Bookmark className="w-5 h-5" />
          {bookmarkCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-black text-xs font-bold rounded-full flex items-center justify-center">
              {bookmarkCount}
            </span>
          )}
        </button>

        <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Grid3x3 className="w-5 h-5" />
        </button>

        <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Volume2 className="w-5 h-5" />
        </button>

        <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
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
    </nav>
  );
};
