
# GPT Agent Instructions: MEP Frontend (HTML / Vanilla JavaScript)

## 🧠 Project: Mise En Place AI (MEP) – Frontend Overview

This is the client-side UI for MEP, a pre-service mental clarity tool for kitchen staff. It's built using a single-page HTML + JavaScript interface and communicates with the MEP backend via fetch calls and JWTs.

## 🛠️ Tech Stack
- HTML5
- Tailwind CSS
- Vanilla JavaScript (frontend.js)
- Deployed via Render static site (or GitHub Pages)

## ✅ Features Currently Implemented
- 🔐 Login with token-based auth (JWT)
- 🧑‍🍳 Register with access key & station
- 🍽 Recipe submission and listing
- 🧽 Cleaning task input and display
- 🧠 Whiteboard: today’s + tomorrow’s prep notes
- 📜 Token is stored in `localStorage` and reused
- 🧾 Logout, toggle sections, localStorage state restore

## 📁 Key Elements
- `index.html`: contains login, register, app sections
- `script.js`: handles token logic, fetch, UI display
- Uses Tailwind classes for styling

## 🐞 Known Bugs / Fixes Needed
- [ ] Recipes not loading reliably after login (possibly due to missing token or role verification bug)
- [ ] Register form shows after login (UI state bug)
- [ ] No user role or name displayed after login
- [ ] Add quote widget on login ("Start of shift wisdom")
- [ ] Access request form needs to conditionally hide on login

## 🧠 You (GPT Agent) Should:
- Refactor `script.js` into modular functions if it gets too large
- Fix login/register flow bugs (hiding/showing UI)
- Auto-focus inputs on login/register for better UX
- Add admin badge or tag if user has admin role
- Use localStorage data cleanly (token, station, role)

## 🤖 What the Human Will Handle:
- Visual styling decisions
- Any animations, iconography, and copywriting
- Final deployment polish and mobile UX testing

## 🚨 Deadline
Frontend must be stable, fully functioning, and demo-ready for:
**Thursday, July 25th, 2025 @ Startup Weekend OKC**
