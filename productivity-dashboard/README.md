# 🧭 Productivity Dashboard

A single-page productivity web app that brings several daily-use tools together on one screen: manage tasks, plan your day, stay motivated, track focus time, and check the weather — built with **HTML, CSS, and JavaScript** only.

Follows the dashboard flow: **dashboard → open feature → interact → save → return**. All data persists in **Local Storage**.

## ✨ Features

| Feature | Highlights |
|---|---|
| 🧭 Dashboard Navigation | Card grid home screen; one reusable show/hide system, only one view active at a time |
| 📝 Todo List | Add, mark important (floats to top), complete, delete — event delegation, persisted |
| 🗓️ Daily Planner | 24 hourly slots, autosave while typing, current hour highlighted & auto-scrolled |
| 💡 Motivation Quote | Live quotes via the Fetch API (DummyJSON) with loading state and offline fallback |
| 🍅 Pomodoro Timer | 25 min work / 5 min break, Start·Pause·Reset, SVG progress ring, end-of-session beep, interval-safe |
| 🌦️ Weather Widget | Open-Meteo (no API key) + Geolocation with default-city fallback; temp, condition, feels-like, humidity, wind, precipitation |
| 🕐 Date & Time | Live-updating clock in the header, always visible |
| 🌅 Dynamic Background | Morning / afternoon / evening / night gradients, crossfaded, re-checked every minute |
| 🌓 Theme Switch | Light/dark via CSS variables, saved to Local Storage, applied before first paint (no flash) |
| 🎯 Daily Goals | Add/toggle/delete goals with "X of Y completed" progress bar |

## 🛠 Tech

- HTML5 · CSS3 (custom properties, grid, backdrop-filter) · JavaScript (ES6+)
- Browser APIs: Local Storage, Fetch, Geolocation, `setInterval`, Date, Web Audio (timer beep)
- APIs: [Open-Meteo](https://open-meteo.com/) (weather, keyless), [DummyJSON](https://dummyjson.com/) (quotes), BigDataCloud (reverse geocoding, keyless)

## 🚀 Run It

No build step — open `index.html` in a browser, or:

```bash
npx serve productivity-dashboard
```

## 📁 Structure

```
productivity-dashboard/
├── index.html    # Dashboard + all feature sections
├── style.css     # Glass UI, light/dark variables, time-of-day backgrounds, responsive
├── script.js     # Navigation, features, storage, API calls, timers
└── assets/       # Logo and static assets
```
