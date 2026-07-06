# 💰 FinTrack Pro — Personal Finance Tracker

FinTrack Pro is a modern **Personal Finance Tracker** built with **HTML, CSS, and JavaScript**. It helps users manage their daily income and expenses with a clean, interactive interface.

The application runs entirely in the browser and stores all data using **Local Storage** — no backend, database, or authentication required.

## ✨ Key Features

- 💰 Add income and expense transactions
- 📊 Live balance, total income, and total expense summary
- 📈 Cash flow visualization (last 7 days, SVG bar chart)
- 🔍 Filter transactions (All, Income, Expense)
- 🗑️ Delete transactions instantly
- 🌍 Multi-currency support (USD, EUR, GBP, INR, JPY)
- 🌙 Dark mode with saved user preference
- 👤 Profile settings (Name & Preferred Currency)
- 💾 Automatic Local Storage data persistence
- 🔄 One-click reset for all saved data
- ⚡ Fast, lightweight, and browser-based

## 🛠 Tech Stack

- HTML5
- CSS3 (custom properties, grid, animations)
- JavaScript (ES6+)
- Local Storage API

## 🚀 Getting Started

No build step needed. Either open `index.html` directly in a browser, or serve the folder:

```bash
npx serve fintrack-pro
```

## 📁 Structure

```
fintrack-pro/
├── index.html   # Markup: summary, entry form, chart, history, settings modal
├── style.css    # Ledger-style theme (light + dark) via CSS variables
└── script.js    # State, Local Storage persistence, rendering, SVG chart
```
