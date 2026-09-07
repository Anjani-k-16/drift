import { StockBaseline, PricePoint, IntradayPoint } from '../types/drift';

function generatePriceHistory(basePrice: number, volPct: number, days: number = 30): PricePoint[] {
  const points: PricePoint[] = [];
  let current = basePrice * 0.92;
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const randomReturn = (Math.random() - 0.49) * 2 * volPct;
    current = current * (1 + randomReturn / 100);
    
    const normalVol = Math.round(1500000 + Math.random() * 500000);
    const actualVol = i === 0 ? normalVol * 2.4 : Math.round(normalVol * (0.8 + Math.random() * 0.4));

    points.push({
      date: dateStr,
      price: Number(current.toFixed(2)),
      returnPct: Number(randomReturn.toFixed(2)),
      upperBand: Number((volPct * 1.5).toFixed(2)),
      lowerBand: Number((-volPct * 1.5).toFixed(2)),
      upperBand2: Number((volPct * 2.5).toFixed(2)),
      lowerBand2: Number((-volPct * 2.5).toFixed(2)),
      volume: actualVol,
      normalVolume: normalVol
    });
  }

  return points;
}

export const INITIAL_STOCKS: StockBaseline[] = [
  {
    ticker: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    sector: 'Banking & Financials',
    currentPrice: 1684.50,
    previousClose: 1607.35,
    todayReturnPct: 4.80,
    historicalVolatility: 0.70,
    typicalDailyMovePct: 0.70,
    todayVolume: 28400000,
    avg30dVolume: 11800000,
    volumeMultiplier: 2.41,
    zScore: 6.85,
    volumeZScore: 3.2,
    severity: 'SIGNIFICANT',
    driftType: 'STOCK_SPECIFIC',
    marketCorrelation: 0.72,
    lastUpdated: '12 secs ago',
    priceHistory: generatePriceHistory(1684.50, 0.70),
    dataQuality: {
      priceFreshness: 'FRESH',
      volumeFreshness: 'FRESH',
      historyCompleteness: 'COMPLETE_30D',
      confidence: 'HIGH'
    },
    intradayTimeline: [
      { time: '09:30 AM', returnPct: 0.40 },
      { time: '11:00 AM', returnPct: 0.85 },
      { time: '12:30 PM', returnPct: 1.70 },
      { time: '01:45 PM', returnPct: 3.10, isCrossedBaseline: true },
      { time: '03:30 PM', returnPct: 4.80 }
    ],
    catalystEvidence: {
      hasSpecificNews: true,
      headline: 'RBI approves higher credit-to-deposit ratio expansion & strong Q2 loan growth numbers',
      source: 'NSE Exchange Filing',
      timestamp: 'Today · 11:30 AM',
      bulletPoints: [
        'Quarterly gross advances grew 14.2% YoY to ₹25.2 Lakh Cr.',
        'Deposit growth accelerated to 16.5% YoY, alleviating liquidity concerns.',
        'Institutional volume surge observed in morning trading block.'
      ]
    }
  },
  {
    ticker: 'TCS',
    name: 'Tata Consultancy Services',
    sector: 'Information Technology',
    currentPrice: 4120.00,
    previousClose: 4256.20,
    todayReturnPct: -3.20,
    historicalVolatility: 0.90,
    typicalDailyMovePct: 0.90,
    todayVolume: 8900000,
    avg30dVolume: 3800000,
    volumeMultiplier: 2.34,
    zScore: -3.55,
    volumeZScore: 2.8,
    severity: 'SIGNIFICANT',
    driftType: 'STOCK_SPECIFIC',
    marketCorrelation: 0.65,
    lastUpdated: '15 secs ago',
    priceHistory: generatePriceHistory(4120.00, 0.90),
    dataQuality: {
      priceFreshness: 'FRESH',
      volumeFreshness: 'FRESH',
      historyCompleteness: 'COMPLETE_30D',
      confidence: 'HIGH'
    },
    intradayTimeline: [
      { time: '09:15 AM', returnPct: -0.50 },
      { time: '10:30 AM', returnPct: -1.20, isCrossedBaseline: true },
      { time: '01:15 PM', returnPct: -2.40 },
      { time: '03:30 PM', returnPct: -3.20 }
    ],
    catalystEvidence: {
      hasSpecificNews: true,
      headline: 'Major European banking client defers $400M digital transformation contract renewal',
      source: 'Reuters Financial',
      timestamp: 'Today · 09:15 AM',
      bulletPoints: [
        'Management confirmed project deferral during investor call.',
        'IT sector peers trading lower, but TCS lead downside by 2.1%.',
        'Analyst downgrades triggered algorithmic stop-loss execution.'
      ]
    }
  },
  {
    ticker: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    sector: 'Energy & Conglomerate',
    currentPrice: 2985.40,
    previousClose: 2935.50,
    todayReturnPct: 1.70,
    historicalVolatility: 1.10,
    typicalDailyMovePct: 1.10,
    todayVolume: 9200000,
    avg30dVolume: 7800000,
    volumeMultiplier: 1.18,
    zScore: 1.54,
    volumeZScore: 0.7,
    severity: 'WORTH_A_LOOK',
    driftType: 'STOCK_SPECIFIC',
    marketCorrelation: 0.85,
    lastUpdated: '8 secs ago',
    priceHistory: generatePriceHistory(2985.40, 1.10),
    dataQuality: {
      priceFreshness: 'FRESH',
      volumeFreshness: 'FRESH',
      historyCompleteness: 'COMPLETE_30D',
      confidence: 'HIGH'
    },
    intradayTimeline: [
      { time: '09:30 AM', returnPct: 0.20 },
      { time: '12:00 PM', returnPct: 0.90 },
      { time: '03:30 PM', returnPct: 1.70, isCrossedBaseline: true }
    ],
    catalystEvidence: {
      hasSpecificNews: false,
      bulletPoints: [
        'Slightly elevated movement above daily 1.1% volatility baseline.',
        'Volume remains within normal historical variance (+18%).',
        'No direct company disclosures or exchange filings detected.'
      ]
    }
  },
  {
    ticker: 'INFY',
    name: 'Infosys Limited',
    sector: 'Information Technology',
    currentPrice: 1820.10,
    previousClose: 1859.14,
    todayReturnPct: -2.10,
    historicalVolatility: 1.25,
    typicalDailyMovePct: 1.25,
    todayVolume: 12500000,
    avg30dVolume: 10200000,
    volumeMultiplier: 1.23,
    zScore: -1.68,
    volumeZScore: 0.8,
    severity: 'WORTH_A_LOOK',
    driftType: 'STOCK_SPECIFIC',
    marketCorrelation: 0.78,
    lastUpdated: '20 secs ago',
    priceHistory: generatePriceHistory(1820.10, 1.25),
    dataQuality: {
      priceFreshness: 'FRESH',
      volumeFreshness: 'FRESH',
      historyCompleteness: 'COMPLETE_30D',
      confidence: 'HIGH'
    },
    catalystEvidence: {
      hasSpecificNews: false,
      bulletPoints: [
        'Sympathy movement following TCS sector contract news.',
        'Move is slightly beyond typical ±1.25% daily swing.',
        'Drift engine classifies this as partial sector spillover.'
      ]
    }
  },
  {
    ticker: 'ICICIBANK',
    name: 'ICICI Bank Ltd.',
    sector: 'Banking & Financials',
    currentPrice: 1210.80,
    previousClose: 1201.20,
    todayReturnPct: 0.80,
    historicalVolatility: 0.85,
    typicalDailyMovePct: 0.85,
    todayVolume: 14200000,
    avg30dVolume: 15100000,
    volumeMultiplier: 0.94,
    zScore: 0.94,
    volumeZScore: -0.2,
    severity: 'NORMAL',
    driftType: 'NO_DRIFT',
    marketCorrelation: 0.81,
    lastUpdated: '10 secs ago',
    priceHistory: generatePriceHistory(1210.80, 0.85),
    dataQuality: {
      priceFreshness: 'FRESH',
      volumeFreshness: 'FRESH',
      historyCompleteness: 'COMPLETE_30D',
      confidence: 'HIGH'
    }
  },
  {
    ticker: 'TATAMOTORS',
    name: 'Tata Motors Ltd.',
    sector: 'Automotive',
    currentPrice: 965.20,
    previousClose: 960.40,
    todayReturnPct: 0.50,
    historicalVolatility: 1.80,
    typicalDailyMovePct: 1.80,
    todayVolume: 18500000,
    avg30dVolume: 19200000,
    volumeMultiplier: 0.96,
    zScore: 0.28,
    volumeZScore: -0.1,
    severity: 'NORMAL',
    driftType: 'NO_DRIFT',
    marketCorrelation: 0.62,
    lastUpdated: '14 secs ago',
    priceHistory: generatePriceHistory(965.20, 1.80),
    dataQuality: {
      priceFreshness: 'FRESH',
      volumeFreshness: 'FRESH',
      historyCompleteness: 'COMPLETE_30D',
      confidence: 'HIGH'
    }
  },
  {
    ticker: 'BHARTIARTL',
    name: 'Bharti Airtel Ltd.',
    sector: 'Telecommunications',
    currentPrice: 1540.00,
    previousClose: 1546.15,
    todayReturnPct: -0.40,
    historicalVolatility: 0.95,
    typicalDailyMovePct: 0.95,
    todayVolume: 6100000,
    avg30dVolume: 6400000,
    volumeMultiplier: 0.95,
    zScore: -0.42,
    volumeZScore: -0.2,
    severity: 'NORMAL',
    driftType: 'NO_DRIFT',
    marketCorrelation: 0.55,
    lastUpdated: '18 secs ago',
    priceHistory: generatePriceHistory(1540.00, 0.95),
    dataQuality: {
      priceFreshness: 'FRESH',
      volumeFreshness: 'FRESH',
      historyCompleteness: 'COMPLETE_30D',
      confidence: 'HIGH'
    }
  },
  {
    ticker: 'SBIN',
    name: 'State Bank of India',
    sector: 'Banking & Financials',
    currentPrice: 812.30,
    previousClose: 809.05,
    todayReturnPct: 0.40,
    historicalVolatility: 1.20,
    typicalDailyMovePct: 1.20,
    todayVolume: 11200000,
    avg30dVolume: 12000000,
    volumeMultiplier: 0.93,
    zScore: 0.33,
    volumeZScore: -0.3,
    severity: 'NORMAL',
    driftType: 'NO_DRIFT',
    marketCorrelation: 0.79,
    lastUpdated: '5 secs ago',
    priceHistory: generatePriceHistory(812.30, 1.20),
    dataQuality: {
      priceFreshness: 'FRESH',
      volumeFreshness: 'FRESH',
      historyCompleteness: 'COMPLETE_30D',
      confidence: 'HIGH'
    }
  }
];
