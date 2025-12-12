'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearSearch } from '@/store/slices/searchSlice';
import { toggleTheme } from '@/store/slices/themeSlice';
import { setViewMode } from '@/store/slices/displaySlice';

export const useKeyboardShortcuts = (callbacks?: {
  onOpenSearch?: () => void;
  onOpenSettings?: () => void;
  onOpenPortfolio?: () => void;
  onOpenExchange?: () => void;
  onEscape?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const searchActive = useAppSelector((state) => state.search.isActive);
  const viewMode = useAppSelector((state) => state.display.settings.viewMode);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      const isTyping = ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName);
      
      // ESC - Clear search or call escape callback
      if (e.key === 'Escape') {
        if (searchActive) {
          dispatch(clearSearch());
        } else {
          callbacks?.onEscape?.();
        }
        return;
      }

      // Ignore other shortcuts when typing
      if (isTyping && e.key !== 'Escape') return;

      // / - Focus search
      if (e.key === '/' && !isTyping) {
        e.preventDefault();
        callbacks?.onOpenSearch?.();
        return;
      }

      // Cmd/Ctrl + K - Open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        callbacks?.onOpenSearch?.();
        return;
      }

      // Cmd/Ctrl + , - Open settings
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        callbacks?.onOpenSettings?.();
        return;
      }

      // Cmd/Ctrl + P - Open portfolio
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        callbacks?.onOpenPortfolio?.();
        return;
      }

      // Cmd/Ctrl + E - Open exchange
      if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault();
        callbacks?.onOpenExchange?.();
        return;
      }

      // Cmd/Ctrl + D - Toggle theme
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        dispatch(toggleTheme());
        return;
      }

      // Cmd/Ctrl + G - Toggle grid/column view
      if ((e.metaKey || e.ctrlKey) && e.key === 'g') {
        e.preventDefault();
        dispatch(setViewMode(viewMode === 'column' ? 'grid' : 'column'));
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, searchActive, viewMode, callbacks]);
};
