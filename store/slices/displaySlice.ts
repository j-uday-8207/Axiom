import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MetricSize = 'small' | 'large';
export type QuickBuySize = 'small' | 'large' | 'mega' | 'ultra';
export type QuickBuyBehavior = 'nothing' | 'openPage' | 'openNewTab';

export interface MetricFilter {
  enabled: boolean;
  min: number;
  max: number;
}

export interface DisplaySettings {
  // Metrics
  mcSize: MetricSize;
  quickBuyButtons: QuickBuySize[];
  theme: 'grey' | 'default';
  
  // Metric Filters
  marketCapFilter: MetricFilter;
  volumeFilter: MetricFilter;
  holdersFilter: MetricFilter;
  
  // Layout
  hideSearchBar: boolean;
  noDecimals: boolean;
  hideHiddenTokens: boolean;
  squareImages: boolean;
  progressBar: boolean;
  spacedTables: boolean;
  
  // Row Colors
  enableProtocolColors: boolean;
  
  // Extras
  visibleColumns: Array<'newPairs' | 'finalStretch' | 'migrated'>;
  quickBuyBehavior: QuickBuyBehavior;
  secondQuickBuyButton: boolean;
  walletGroupsInHeader: boolean;
}

interface DisplayState {
  settings: DisplaySettings;
}

const initialState: DisplayState = {
  settings: {
    mcSize: 'large',
    quickBuyButtons: ['small', 'large', 'mega', 'ultra'],
    theme: 'grey',
    marketCapFilter: { enabled: false, min: 0, max: 30000 },
    volumeFilter: { enabled: false, min: 0, max: 1000 },
    holdersFilter: { enabled: false, min: 0, max: 10 },
    hideSearchBar: false,
    noDecimals: false,
    hideHiddenTokens: false,
    squareImages: true,
    progressBar: true,
    spacedTables: false,
    enableProtocolColors: true,
    visibleColumns: ['newPairs', 'finalStretch', 'migrated'],
    quickBuyBehavior: 'nothing',
    secondQuickBuyButton: false,
    walletGroupsInHeader: true,
  },
};

const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    updateMetricSize: (state, action: PayloadAction<MetricSize>) => {
      state.settings.mcSize = action.payload;
    },
    toggleQuickBuyButton: (state, action: PayloadAction<QuickBuySize>) => {
      const button = action.payload;
      const index = state.settings.quickBuyButtons.indexOf(button);
      if (index > -1) {
        state.settings.quickBuyButtons.splice(index, 1);
      } else {
        state.settings.quickBuyButtons.push(button);
      }
    },
    toggleTheme: (state) => {
      state.settings.theme = state.settings.theme === 'grey' ? 'default' : 'grey';
    },
    toggleLayoutOption: (
      state,
      action: PayloadAction<keyof Omit<DisplaySettings, 'mcSize' | 'quickBuyButtons' | 'theme' | 'marketCapFilter' | 'volumeFilter' | 'holdersFilter' | 'visibleColumns' | 'quickBuyBehavior'>>
    ) => {
      const option = action.payload;
      state.settings[option] = !state.settings[option] as any;
    },
    updateMetricFilter: (
      state,
      action: PayloadAction<{ filter: 'marketCapFilter' | 'volumeFilter' | 'holdersFilter'; value: Partial<MetricFilter> }>
    ) => {
      const { filter, value } = action.payload;
      state.settings[filter] = { ...state.settings[filter], ...value };
    },
    updateQuickBuyBehavior: (state, action: PayloadAction<QuickBuyBehavior>) => {
      state.settings.quickBuyBehavior = action.payload;
    },
    toggleColumn: (state, action: PayloadAction<'newPairs' | 'finalStretch' | 'migrated'>) => {
      const column = action.payload;
      const index = state.settings.visibleColumns.indexOf(column);
      if (index > -1) {
        if (state.settings.visibleColumns.length > 1) {
          state.settings.visibleColumns.splice(index, 1);
        }
      } else {
        state.settings.visibleColumns.push(column);
      }
    },
    resetDisplaySettings: (state) => {
      state.settings = initialState.settings;
    },
  },
});

export const {
  updateMetricSize,
  toggleQuickBuyButton,
  toggleTheme,
  toggleLayoutOption,
  updateMetricFilter,
  updateQuickBuyBehavior,
  toggleColumn,
  resetDisplaySettings,
} = displaySlice.actions;

export default displaySlice.reducer;
