# Axiom Trade Pulse - Replica Dashboard

A **pixel-perfect, production-grade** replica of the Axiom Trade Pulse page, built with Next.js 14, TypeScript, Redux Toolkit, React Query, and Radix UI components.

## 🚀 Features

### Core Features
- **3-Column Kanban Layout**: "New Pairs", "Final Stretch", and "Migrated" columns
- **High-Density Token Cards**: Comprehensive token information in compact cards
- **Real-Time Updates**: Simulated WebSocket updates with smooth flash animations
- **Advanced Trading Modal**: Full trading interface with charts, order book, and position tracking
- **Responsive Design**: Desktop 3-column grid, mobile tab-based navigation
- **Performance Optimized**: Memoized components, efficient state management, <100ms interactions

### Interactive Features
✅ **Modals**: Click any token to open full trading interface  
✅ **Tooltips**: Hover over icons and metrics for detailed information  
✅ **Popovers**: Quick actions and contextual information  
✅ **Sorting**: Sort columns by market cap, volume, transactions, or age  
✅ **Loading States**: Skeleton screens and progressive loading  
✅ **Error Boundaries**: Graceful error handling with recovery options  

### Trading Interface
- **Buy/Sell Tabs**: Switch between buying and selling modes
- **Order Types**: Market, Limit, and Advanced trading options
- **Preset Amounts**: Quick trade size selection (0.01, 0.1, 1, 10)
- **Slippage Control**: Configurable slippage tolerance
- **Position Tracking**: Real-time position monitoring
- **Price Charts**: Mock chart visualization area (ready for TradingView integration)
- **Token Analytics**: Holder distribution, top traders, dev holdings, LP status

### UI Components
- **Dialog Modals**: Full-screen trading interface
- **Tooltips**: Context-sensitive help
- **Dropdown Menus**: Sorting and filtering options
- **Skeleton Loading**: Smooth loading experience
- **Error States**: User-friendly error messages

## 📋 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query (@tanstack/react-query)
- **UI Components**: Radix UI (Dialog, Tooltip, Popover, Dropdown)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Performance**: Memoization, efficient re-renders, optimized animations

## 🛠️ Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

3. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata & providers
│   ├── page.tsx            # Main Pulse page with Redux Provider
│   └── globals.css         # Global styles and animations
├── components/
│   ├── pulse/
│   │   ├── TokenCard.tsx          # Individual token card with tooltips
│   │   ├── Column.tsx             # Column with sorting functionality
│   │   ├── PulseColumns.tsx       # Three-column layout manager
│   │   └── TokenDetailModal.tsx   # Full trading interface modal
│   ├── ui/                # Radix UI components
│   │   ├── dialog.tsx
│   │   ├── tooltip.tsx
│   │   ├── popover.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── skeleton.tsx
│   ├── providers/
│   │   └── ReactQueryProvider.tsx
│   └── ErrorBoundary.tsx  # Error boundary component
├── store/
│   ├── index.ts            # Redux store configuration
│   └── slices/
│       └── pulseFeedSlice.ts # Pulse feed state management
├── hooks/
│   └── useTokenSocket.ts   # WebSocket simulation hook
├── lib/
│   ├── utils.ts            # Utility functions
│   └── mockData.ts         # Mock data generator
├── types/
│   └── index.ts            # TypeScript type definitions
└── tailwind.config.ts      # Tailwind configuration
```

## 🎨 Key Components

### TokenCard
High-density card displaying:
- Token image with online indicator
- Market cap with flash animations
- Volume and transaction count
- Percentage changes (1m, 5m, 1h)
- Social icons (website, Twitter, Discord)
- Holders and liquidity stats

### PulseColumns
Responsive layout:
- **Desktop**: 3-column grid layout
- **Mobile**: Tab-based navigation

### useTokenSocket
Simulates real-time updates:
- Updates 5 random tokens every 200ms
- Flash animations on price changes
- Efficient Redux updates

## 🎯 Features Implemented

✅ Pixel-perfect card layout matching screenshot  
✅ Three-column Kanban structure  
✅ Real-time price updates with animations  
✅ Responsive mobile design with tabs  
✅ Memoized components for performance  
✅ Redux Toolkit for state management  
✅ TypeScript strict mode  
✅ Dark theme with neon accents  
✅ Smooth hover effects  
✅ Custom scrollbar styling  

## 🚀 Performance

- **Memoized Components**: TokenCard is memoized to prevent unnecessary re-renders
- **Efficient Updates**: Only changed tokens trigger re-renders
- **Optimized Animations**: CSS-based animations for smooth performance
- **Lazy Loading**: Images loaded on demand

## 🎨 Design Details

### Colors
- Background: `#0a0a0a`
- Card: `#111111`
- Success (Green): `#22c55e`
- Danger (Red): `#ef4444`
- Info (Blue): `#3b82f6`
- Accent (Teal): `#38bdf8`

### Typography
- Small text: `10px` (text-[10px])
- Regular: `12px` (text-xs)
- Headers: `14-16px` (text-sm/base)

## 🔧 Customization

### Update Frequency
Modify in `app/page.tsx`:
```typescript
useTokenSocket({
  enabled: true,
  updateInterval: 200,  // ms between updates
  tokensPerUpdate: 5,   // tokens updated per interval
});
```

### Mock Data
Edit `lib/mockData.ts` to customize:
- Token names and tickers
- Initial data counts
- Value ranges

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (Tab-based navigation)
- **Desktop**: ≥ 768px (3-column grid)

## 🐛 Known Limitations

- Mock data only (no real API integration)
- WebSocket simulation (not real WebSocket)
- Images use placeholders

## 🚀 Next Steps

To connect to real data:
1. Replace mock data in `lib/mockData.ts` with API calls
2. Update `useTokenSocket` to use real WebSocket
3. Add authentication for private endpoints
4. Implement filtering and sorting
5. Add token detail modals

## 📄 License

MIT

## 🙏 Credits

Inspired by [Axiom Trade](https://axiom.trade/pulse)

---

Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS
