import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PriceAlert {
  id: string;
  tokenId: string;
  tokenTicker: string;
  tokenName: string;
  targetPrice: number;
  condition: 'above' | 'below';
  isActive: boolean;
  createdAt: number;
  triggeredAt?: number;
}

interface AlertsState {
  alerts: PriceAlert[];
}

const initialState: AlertsState = {
  alerts: [],
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Omit<PriceAlert, 'id' | 'createdAt' | 'isActive'>>) => {
      const alert: PriceAlert = {
        ...action.payload,
        id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: Date.now(),
        isActive: true,
      };
      state.alerts.push(alert);
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
    triggerAlert: (state, action: PayloadAction<string>) => {
      const alert = state.alerts.find(a => a.id === action.payload);
      if (alert) {
        alert.isActive = false;
        alert.triggeredAt = Date.now();
      }
    },
    toggleAlert: (state, action: PayloadAction<string>) => {
      const alert = state.alerts.find(a => a.id === action.payload);
      if (alert) {
        alert.isActive = !alert.isActive;
      }
    },
    loadAlerts: (state, action: PayloadAction<PriceAlert[]>) => {
      state.alerts = action.payload;
    },
    clearAlerts: (state) => {
      state.alerts = [];
    },
  },
});

export const { addAlert, removeAlert, triggerAlert, toggleAlert, loadAlerts, clearAlerts } = alertsSlice.actions;
export default alertsSlice.reducer;
