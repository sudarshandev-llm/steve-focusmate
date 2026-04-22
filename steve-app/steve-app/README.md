# Steve – A Focusmate from Alumni AI

A professional multi-page student productivity application with iOS-style design.

## Pages

| Page | Path | Description |
|------|------|-------------|
| Welcome | `/index.html` | Landing page with animated logo |
| Auth | `/pages/auth.html` | Login & Signup with auto-generated Student ID |
| Dashboard | `/pages/dashboard.html` | Overview, stats, quick access |
| Timer | `/pages/timer.html` | Focus / Pomodoro / custom countdown timer |
| Notes | `/pages/notes.html` | Categorised notes with colour labels |
| Calendar | `/pages/calendar.html` | Event & reminder calendar |
| More | `/pages/more.html` | Calculator, Goals tracker, Quick Reminders |
| Profile | `/pages/profile.html` | Student info, stats, logout |
| Coming Soon | `/pages/coming-soon.html` | Alumni AI waitlist page |

## Features
- ✅ Welcome page with bubble animations
- ✅ Login / Signup with auto-generated Student UserID (format: `AB2025-XXXXX`)
- ✅ Dashboard with live stats
- ✅ Pomodoro / Focus / custom timer with ring progress
- ✅ Notes with categories, colour labels, search & filter
- ✅ Calendar with event/reminder management
- ✅ Integrated calculator
- ✅ Goals tracker with progress bars
- ✅ Quick reminders
- ✅ Minecraft-style block notifications
- ✅ Bubble transition animations
- ✅ Translucent bottom nav with active state
- ✅ Coming Soon page with waitlist
- ✅ All data stored in localStorage (no backend needed)

## Run Locally

```bash
npm install
npm start
# Open http://localhost:3000
```

Or just open `index.html` directly in a browser — no build step needed.

## Deploy to Render

1. Push this folder to a GitHub repository
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Click **Deploy**

Alternatively, Render auto-detects `render.yaml` — just connect the repo and it configures itself.

## Tech Stack
- Pure HTML5 / CSS3 / Vanilla JavaScript (no build tools needed)
- Google Fonts (Nunito + JetBrains Mono)
- localStorage for data persistence
- Express.js static server for Render deployment
