/**
 * LocalStorage utility for persisting app data
 */

const STORAGE_KEYS = {
  BOOKMARKS: 'jyotish_bookmarks',
  PORTFOLIO: 'jyotish_portfolio',
  WALLET: 'jyotish_wallet',
  DISPLAY_SETTINGS: 'jyotish_display_settings',
  THEME: 'jyotish_theme',
  NOTES: 'jyotish_token_notes',
  ALERTS: 'jyotish_price_alerts',
  TRANSACTION_HISTORY: 'jyotish_transactions',
} as const;

export const storage = {
  // Generic get/set
  get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
    }
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
    }
  },

  clear(): void {
    if (typeof window === 'undefined') return;
    
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        window.localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  // Specific helpers
  getBookmarks(): string[] {
    return this.get(STORAGE_KEYS.BOOKMARKS, []);
  },

  setBookmarks(bookmarks: string[]): void {
    this.set(STORAGE_KEYS.BOOKMARKS, bookmarks);
  },

  getPortfolio(): any {
    return this.get(STORAGE_KEYS.PORTFOLIO, { positions: {}, totalInvested: 0, realizedPnL: 0 });
  },

  setPortfolio(portfolio: any): void {
    this.set(STORAGE_KEYS.PORTFOLIO, portfolio);
  },

  getWallet(): any {
    return this.get(STORAGE_KEYS.WALLET, { solBalance: 0, depositAddress: 'GPivcgNo4eWg6BVsy5hBUfaLyCG3qJ4g9JoiQ6SnFjmtA', isConnected: false });
  },

  setWallet(wallet: any): void {
    this.set(STORAGE_KEYS.WALLET, wallet);
  },

  getDisplaySettings(): any {
    return this.get(STORAGE_KEYS.DISPLAY_SETTINGS, null);
  },

  setDisplaySettings(settings: any): void {
    this.set(STORAGE_KEYS.DISPLAY_SETTINGS, settings);
  },

  getTheme(): 'dark' | 'light' {
    return this.get(STORAGE_KEYS.THEME, 'dark');
  },

  setTheme(theme: 'dark' | 'light'): void {
    this.set(STORAGE_KEYS.THEME, theme);
  },

  getNotes(): Record<string, string> {
    return this.get(STORAGE_KEYS.NOTES, {});
  },

  setNotes(notes: Record<string, string>): void {
    this.set(STORAGE_KEYS.NOTES, notes);
  },

  getAlerts(): any[] {
    return this.get(STORAGE_KEYS.ALERTS, []);
  },

  setAlerts(alerts: any[]): void {
    this.set(STORAGE_KEYS.ALERTS, alerts);
  },

  getTransactionHistory(): any[] {
    return this.get(STORAGE_KEYS.TRANSACTION_HISTORY, []);
  },

  setTransactionHistory(transactions: any[]): void {
    this.set(STORAGE_KEYS.TRANSACTION_HISTORY, transactions);
  },
};

export default storage;
