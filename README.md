## DRIFT — Market Anomaly & Meaningful Change Detector

## Live Demo
https://drift-market.vercel.app

"Don't watch the market. Understand what changed."

DRIFT is a smart watchlist built for CODE 2026. Instead of just showing raw price changes, it tells you whether a move is actually unusual for that specific stock — and whether it deserves your attention.

The Problem

A normal watchlist shows you numbers like +2.8%, -1.9%, +1.7% and leaves you to figure out what matters. A 3% move can be completely normal for a volatile stock, but extraordinary for a stable one. Raw percentages don't tell you that.

The Core Idea: Movement ≠ Meaningful Change

DRIFT builds a statistical baseline for each stock using its rolling daily volatility, then measures how far today's move is from that baseline (a z-score):

z = (today's return - average return) / typical daily volatility
A stable stock that normally moves ±0.7% but jumps +4.8% today → highly unusual
A volatile stock that normally moves ±1.8% and moves +0.5% today → completely normal

Same idea, different meaning — because the baseline is different for each stock.

## Key Features
"Since You Were Last Here" — shows what changed since your last visit, not just today's raw numbers
Normal / Worth a Look / Significant — every stock is sorted into one of three attention levels
Market-wide vs. stock-specific drift — if the whole market moves, DRIFT filters that out so you only see moves that are unusual for that stock, not just because everything moved
Evidence, not opinions — every signal shows the numbers behind it (price move, volume, z-score) instead of a vague "score"
Demo scenario presets — one-click switches to show earnings anomalies, market-wide crashes, sector spillover, and a calm baseline day
No buy/sell recommendations — DRIFT tells you what changed and why, and leaves the decision to you
Why We Left Some Things Out
Not Built	Why
Buy/sell signals	An anomaly isn't investment advice — that decision stays with the user
Price prediction	Out of scope, and avoids making claims we can't back up
Black-box ML models	A z-score is simple to explain and defend; a neural net isn't
Microservices / Kafka / Kubernetes	Unnecessary complexity for this scale in 72 hours
Tech Stack
Frontend: React 18, TypeScript, Vite
Styling: Tailwind CSS
Charts: Recharts
Core logic: z-score based anomaly engine (src/services/driftEngine.ts)
Running Locally
bash
# install dependencies
npm install

# start dev server
npm run dev

Open http://localhost:3000 in your browser.
