# 🎯 Pulse Dashboard - Quick Reference Guide

## 🚀 App Status
**Running on**: http://localhost:3001  
**Status**: ✅ All features operational

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Focus search bar |
| `ESC` | Clear search |
| `⌘/Ctrl + K` | Quick search |
| `⌘/Ctrl + ,` | Open settings |
| `⌘/Ctrl + P` | Open portfolio |
| `⌘/Ctrl + E` | Open exchange/deposit |
| `⌘/Ctrl + D` | Toggle dark/light theme |
| `⌘/Ctrl + G` | Toggle column/grid view |

---

## 🎨 Navigation Bar Icons

| Icon | Function | Badge |
|------|----------|-------|
| 🔍 | Search tokens | - |
| 🔖 | Toggle bookmarks | Bookmark count |
| 🎨 | Toggle view mode | Active view |
| ☀️/🌙 | Toggle theme | - |
| 🕐 | Transaction history | - |
| 🔔 | Price alerts | Active alerts count |
| 🔊 | Audio settings | - |
| ⚙️ | Settings modal | - |
| 💰 | SOL balance + Deposit | Current balance |
| 📦 | Portfolio | Position count |
| 👤 | Profile | - |

---

## 📊 New Features Summary

### 1. Transaction History
- **Access**: Click 🕐 clock icon
- **Shows**: All buy/sell transactions with timestamps
- **Stats**: Total buys, sells, volume

### 2. Price Alerts
- **Access**: Click 🔔 bell icon
- **Create**: Select token, set price target (above/below)
- **Badge**: Shows active alerts count

### 3. Notes System
- **Access**: Open any token detail modal
- **Location**: Sidebar, below position stats
- **Auto-save**: Saves when you click away

### 4. Theme Toggle
- **Access**: Click ☀️/🌙 icon or use `⌘/Ctrl + D`
- **Modes**: Dark (default) / Light
- **Persists**: Saves preference automatically

### 5. Search
- **Access**: Type in search bar or press `/`
- **Filters**: Searches ticker and name
- **Clear**: Press ESC or click X

---

## 💾 Data Persistence

All data is automatically saved to browser localStorage:
- ✅ Bookmarked tokens
- ✅ Portfolio positions
- ✅ SOL wallet balance
- ✅ Display settings
- ✅ Theme preference
- ✅ Transaction history
- ✅ Token notes
- ✅ Price alerts

**Note**: Data persists across page refreshes!

---

## 🎮 Trading Features

### Buy Tokens
1. Click any token card
2. Enter amount or use preset buttons
3. Click "Buy [TOKEN]" button
4. Check balance before buying

### Sell Tokens
1. Open token detail modal
2. Switch to "Sell" tab
3. Enter amount or click "Sell All"
4. Confirm sale

### Add SOL
1. Click wallet button (shows balance)
2. Choose deposit method:
   - **Deposit**: QR code + address
   - **Buy**: Quick amounts (1, 5, 10, 50 SOL)
   - **Convert**: (Coming soon)

---

## 📈 Portfolio Management

### View Positions
- Click 📦 Portfolio button
- See all token positions
- View P&L (green = profit, red = loss)

### Position Details
- Quantity owned
- Average buy price
- Current price
- Total P&L
- Current value

### Actions
- Sell individual positions
- Clear all positions
- View in detail modal

---

## 🛠️ Settings

Access via ⚙️ icon or `⌘/Ctrl + ,`

### Display Options
- Metric size (Small/Medium/Large)
- Theme (Dark/Light)
- Layout (Compact/Comfortable)

### Visible Columns
- Show/hide specific metrics
- Customize what you see

### Filters
- Market cap range
- Volume threshold
- Min holders

### Actions
- Clear all bookmarks
- Reset to defaults

---

## 🎯 Tips & Tricks

1. **Quick Search**: Press `/` anytime to search
2. **Multi-position**: Buy same token multiple times for averaging
3. **Bookmarks**: Mark favorites for quick access
4. **Grid View**: Better for many tokens
5. **Price Alerts**: Set multiple alerts per token
6. **Notes**: Keep track of research or strategies
7. **Keyboard**: Use shortcuts for faster navigation

---

## 🐛 Known Limitations

- Theme change requires component refresh (expected)
- Browser notifications not yet implemented
- CSV export coming in future update
- Social sharing infrastructure ready, UI pending

---

## 📱 Responsive Design

- Desktop optimized
- Large modal views for detailed information
- Scrollable content areas
- Responsive grid layouts

---

## 🔧 Technical Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: Browser localStorage
- **Updates**: Simulated WebSocket

---

## 📞 Quick Help

**Can't find a feature?**
- Check the navigation bar icons
- Try keyboard shortcuts (⌘/Ctrl + K for search)
- All modals accessible from top bar

**Data not saving?**
- Check browser localStorage is enabled
- Don't use private/incognito mode
- Clear browser cache if issues persist

**Performance slow?**
- Try hiding columns in settings
- Use bookmarks to filter
- Refresh page to reset

---

**Enjoy trading on Pulse! 🚀**
