# 🏆 DRIFT — Market Anomaly & Meaningful Change Detector

## Live Demo 
https://drift-market.vercel.app

> **“Don’t watch the market. Understand what changed.”**

DRIFT is an intelligent market memory and anomaly-detection web application built for CODE 2026. It solves information overload on financial watchlists by moving beyond raw price swings to measure **meaningful change relative to each stock’s individual historical behavior**.

---

## 🎯 The Core Problem & Differentiating Insight

### The Problem
Traditional watchlists answer: *"What are my stocks doing right now?"* 
They present raw percentages (+2.8%, -1.9%, +1.7%), leaving the user to figure out what actually matters. A 3% move can be completely normal for a volatile stock, but extraordinary for a steady one.

### The Insight: Movement ≠ Meaningful Change
DRIFT calculates a dynamic statistical baseline for every monitored stock using rolling daily volatility ($\sigma$) and trading volume ratios:

$$z = \frac{R_i - \mu}{\sigma_i}$$

- **Stable Stock** (Typical move $\pm 0.7\%$): Today $+4.8\% \rightarrow z = +6.85\sigma$ (**🔴 SIGNIFICANT**)
- **Volatile Stock** (Typical move $\pm 1.8\%$): Today $+0.5\% \rightarrow z = +0.28\sigma$ (**🟢 NORMAL**)

---

## ✨ Key Features & Product Highlights

1. **"Since You Were Last Here" Hero Digest**
   - Personalizes market change based on user's last visited timestamp ("You were away. Here is what you missed.").
   - Categorizes watched securities into **🟢 Normal**, **🟡 Worth a Look**, and **🔴 Significant**.
   - Includes proud **✓ NOTHING SIGNIFICANT HAPPENED** state when all stocks trade inside baseline variance.

2. **Market-Wide vs. Stock-Specific Drift Isolation**
   - Evaluates macro watchlist index z-score.
   - If broad market crashes or surges (e.g. NIFTY -4.1%), DRIFT surfaces a **🌐 Macro Market Context Banner**, filtering out noise so only true stock-specific outliers are highlighted.

3. **Intraday Drift Progression Timeline**
   - Hour-by-hour move timeline inside the evidence drawer ("What actually happened while you were away").

4. **Transparent Data Freshness & Data Quality Indicators**
   - Displays live feed age (e.g., `Live · 12s ago`).
   - Simulates stale/delayed feed warning banners (e.g. `⚠ Market Feed Delayed: 14 min old`) to satisfy data reliability standards.
   - Displays Data Quality Verification vector (`Price: Fresh`, `Volume: Fresh`, `30d Baseline: Complete`).

5. **Conservative AI Explanation Engine**
   - *"Detect confidently. Explain conservatively."*
   - Translates statistical z-scores and volume multipliers into natural language explanations.
   - Deliberately fallback-safe: If no regulatory filing is detected, DRIFT cleanly states cause is unverified rather than hallucinating events.

6. **Interactive CODE 2026 Scenario Demo Suite**
   - Instant 1-click preset switches for hackathon presentations:
     - 💥 *HDFC Earnings Anomaly* (+4.8% on 2.4x vol)
     - 📉 *NIFTY 50 Macro Crash* (-4.1% broad market drop)
     - 💻 *Tech Sector Spillover* (TCS contract news)
     - 🟢 *Calm Baseline Day* (All stocks within normal range)

7. **Deep Baseline Inspection Modal**
   - Interactive Recharts visualization with $\pm 1.5\sigma$ and $\pm 2.5\sigma$ volatility confidence bands.
   - Volume ratio histogram highlighting trading spikes.

---

## 🚫 Why We Didn't Build X (Strategic Engineering Trade-Offs)

| Omitted Feature | Engineering & Product Rationale |
| :--- | :--- |
| **No Buy/Sell Signals** | Anomaly $\neq$ Investment advice. DRIFT informs; the decision remains 100% with the user. |
| **No Price Prediction** | DRIFT surfaces what *changed*, avoiding speculative financial liability. |
| **No Black-box ML** | Prioritized $z$-score mathematical transparency and explainability over uninterpretable deep neural nets. |
| **No Microservices** | Modular monolith design avoided unnecessary infrastructure complexity for current scale. |
| **No Unconstrained Chatbots** | Prevented non-deterministic hallucinations in financial context. |

---

## 🛠 Tech Stack

- **Frontend Framework**: React 18 + TypeScript + Vite
- **UI & Styling**: Dark Glassmorphism, Tailwind CSS, Lucide Icons
- **Data Visualization**: Recharts (ComposedChart with confidence bands)
- **Statistical Engine**: Real-time z-score rolling volatility and volume ratio engine (`src/services/driftEngine.ts`)

---

## 🚀 Quick Start & Running Locally

<<<<<<< HEAD
=======


>>>>>>> 6752ae7 (Final production polish: Verified Midnight Signal dark theme, z-score anomaly card accents, and zero-error production build)
# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open http://localhost:3000 in your browser.
