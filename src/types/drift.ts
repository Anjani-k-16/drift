export type AnomalySeverity = 'NORMAL' | 'WORTH_A_LOOK' | 'SIGNIFICANT';

export type DriftType = 'STOCK_SPECIFIC' | 'MARKET_WIDE' | 'NO_DRIFT';

export type DataFreshnessStatus = 'LIVE' | 'DELAYED' | 'STALE';

export interface IntradayPoint {
  time: string;
  returnPct: number;
  isCrossedBaseline?: boolean;
}

export interface PricePoint {
  date: string;
  price: number;
  returnPct: number;
  upperBand: number;
  lowerBand: number;
  upperBand2: number;
  lowerBand2: number;
  volume: number;
  normalVolume: number;
}

export interface StockBaseline {
  ticker: string;
  name: string;
  sector: string;
  currentPrice: number;
  previousClose: number;
  todayReturnPct: number;
  historicalVolatility: number;
  typicalDailyMovePct: number;
  todayVolume: number;
  avg30dVolume: number;
  volumeMultiplier: number;
  zScore: number;
  volumeZScore: number;
  severity: AnomalySeverity;
  driftType: DriftType;
  marketCorrelation: number;
  lastUpdated: string;
  priceHistory: PricePoint[];
  intradayTimeline?: IntradayPoint[];
  dataQuality: {
    priceFreshness: 'FRESH' | 'DELAYED' | 'STALE';
    volumeFreshness: 'FRESH' | 'DELAYED';
    historyCompleteness: 'COMPLETE_30D' | 'LIMITED_14D';
    confidence: 'HIGH' | 'MODERATE' | 'LOW';
  };
  catalystEvidence?: {
    hasSpecificNews: boolean;
    headline?: string;
    source?: string;
    timestamp?: string;
    bulletPoints: string[];
  };
}

export interface MarketState {
  indexName: string;
  indexReturnPct: number;
  indexZScore: number;
  isMarketWideDrift: boolean;
  marketDriftDirection: 'UP' | 'DOWN' | 'NEUTRAL';
  totalStocksWatched: number;
  significantCount: number;
  worthALookCount: number;
  normalCount: number;
  timestamp: string;
  freshnessStatus: DataFreshnessStatus;
  lastUpdatedSecsAgo: number;
}

export interface UserLastSeenState {
  lastSeenTimestamp: string;
  timeAgoLabel: string;
  unseenChangeCount: number;
}

export interface ScenarioPreset {
  id: string;
  name: string;
  description: string;
  badge: string;
  badgeColor: string;
}
