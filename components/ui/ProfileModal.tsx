'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAppSelector, useAppDispatch } from '@/store';
import { clearBookmarks, toggleBookmark } from '@/store/slices/bookmarksSlice';
import { X, Bookmark, Copy, ExternalLink, Settings, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.bookmarks.bookmarkedTokenIds);
  const newPairs = useAppSelector((state) => state.pulseFeed.newPairs);
  const finalStretch = useAppSelector((state) => state.pulseFeed.finalStretch);
  const migrated = useAppSelector((state) => state.pulseFeed.migrated);
  const allTokens = [...newPairs, ...finalStretch, ...migrated];
  
  // Mock user data - replace with actual user data when authentication is implemented
  const mockUser = {
    name: 'Crypto Trader',
    walletAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    avatar: '👤',
    email: 'trader@example.com',
    joinedDate: 'January 2024',
  };

  const bookmarkedTokens = allTokens.filter(token => bookmarks.includes(token.id));

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(mockUser.walletAddress);
    toast({
      title: 'Wallet Copied',
      description: `${mockUser.walletAddress.slice(0, 8)}...${mockUser.walletAddress.slice(-8)}`,
      variant: 'success',
    });
  };

  const handleRemoveBookmark = (tokenId: string, tokenSymbol: string) => {
    dispatch(toggleBookmark(tokenId));
    toast({
      title: 'Bookmark Removed',
      description: `${tokenSymbol} removed from bookmarks`,
    });
  };

  const handleClearAllBookmarks = () => {
    dispatch(clearBookmarks());
    toast({
      title: 'Bookmarks Cleared',
      description: 'All bookmarks have been removed',
      variant: 'success',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Profile</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
          {/* User Info Section */}
          <div className="border-b border-slate-800 pb-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl">
                {mockUser.avatar}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{mockUser.name}</h2>
                <p className="text-gray-400 text-sm mb-3">{mockUser.email}</p>
                <p className="text-xs text-gray-500">Member since {mockUser.joinedDate}</p>
                
                <div className="mt-4 flex items-center gap-2 bg-slate-800/50 rounded-lg p-3">
                  <div className="flex-1">
                    <div className="text-xs text-gray-400 mb-1">Wallet Address</div>
                    <div className="font-mono text-sm text-white truncate">
                      {mockUser.walletAddress.slice(0, 16)}...{mockUser.walletAddress.slice(-8)}
                    </div>
                  </div>
                  <button
                    onClick={copyWalletAddress}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-800/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">{bookmarks.length}</div>
              <div className="text-xs text-gray-400 mt-1">Bookmarked</div>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-500">24</div>
              <div className="text-xs text-gray-400 mt-1">Trades</div>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-500">$12.5K</div>
              <div className="text-xs text-gray-400 mt-1">Volume</div>
            </div>
          </div>

          {/* Bookmarked Tokens Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-yellow-500" />
                Bookmarked Tokens ({bookmarks.length})
              </h3>
              {bookmarks.length > 0 && (
                <button
                  onClick={handleClearAllBookmarks}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            
            {bookmarkedTokens.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bookmark className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No bookmarked tokens yet</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                {bookmarkedTokens.map((token) => (
                  <div
                    key={token.id}
                    className="bg-slate-800/50 rounded-lg p-3 flex items-center gap-3 hover:bg-slate-800 transition-colors"
                  >
                    <img
                      src={token.imageUrl}
                      alt={token.ticker}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{token.ticker}</div>
                      <div className="text-xs text-gray-400 truncate">{token.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">${(token.marketCap / 1000).toFixed(1)}K</div>
                      <div className={cn(
                        'text-xs',
                        token.pctChange1h >= 0 ? 'text-green-500' : 'text-red-500'
                      )}>
                        {token.pctChange1h >= 0 ? '+' : ''}{token.pctChange1h.toFixed(2)}%
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveBookmark(token.id, token.ticker)}
                      className="p-1.5 hover:bg-slate-700 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors">
              <span className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Account Settings</span>
              </span>
              <ExternalLink className="w-4 h-4" />
            </button>
            
            <button className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors">
              <span className="flex items-center gap-3">
                <ExternalLink className="w-5 h-5" />
                <span className="font-medium">Trading History</span>
              </span>
              <ExternalLink className="w-4 h-4" />
            </button>
            
            <button className="w-full flex items-center justify-between px-4 py-3 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors">
              <span className="flex items-center gap-3">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
