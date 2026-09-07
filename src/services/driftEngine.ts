import { StockBaseline, MarketState, AnomalySeverity } from '../types/drift';

export interface EvaluationResult {
  stocks: StockBaseline[];
  marketState: MarketState;
}

export function evaluateDrift(
  stocksInput: StockBaseline[],
  forcedMarketReturnPct?: number
): EvaluationResult {
  const stocks = stocksInput.map(stock => ({ ...stock }));

  // Calculate z-scores based on return / vol
  stocks.forEach(stock => {
    const rawZ = stock.todayReturnPct / (stock.typicalDailyMovePct || 1.0);
    stock.zScore = Number(rawZ.toFixed(2));
    stock.volumeZScore = Number(((stock.volumeMultiplier - 1.0) * 2.0).toFixed(2));
  });

  // Watchlist average return & z-score
  const totalZ = stocks.reduce((acc, s) => acc + s.zScore, 0);
  const avgZ = totalZ / stocks.length;
  
  const calculatedMarketReturn = forcedMarketReturnPct !== undefined
    ? forcedMarketReturnPct
    : Number((stocks.reduce((acc, s) => acc + s.todayReturnPct, 0) / stocks.length).toFixed(2));

  // Check macro market move
  const isMarketWide = Math.abs(avgZ) >= 1.8 || Math.abs(calculatedMarketReturn) >= 2.5;
  const marketDirection = calculatedMarketReturn > 0.5 ? 'UP' : calculatedMarketReturn < -0.5 ? 'DOWN' : 'NEUTRAL';

  let significantCount = 0;
  let worthALookCount = 0;
  let normalCount = 0;

  stocks.forEach(stock => {
    const relativeZ = isMarketWide ? stock.zScore - avgZ : stock.zScore;
    const absRawZ = Math.abs(stock.zScore);
    const absRelZ = Math.abs(relativeZ);
    const volMult = stock.volumeMultiplier;

    let severity: AnomalySeverity = 'NORMAL';

    if (absRelZ >= 2.5 || (absRawZ >= 2.2 && volMult >= 2.0)) {
      severity = 'SIGNIFICANT';
      significantCount++;
    } else if (absRelZ >= 1.4 || volMult >= 1.6 || absRawZ >= 1.5) {
      severity = 'WORTH_A_LOOK';
      worthALookCount++;
    } else {
      severity = 'NORMAL';
      normalCount++;
    }

    stock.severity = severity;
    stock.driftType = isMarketWide
      ? absRelZ >= 1.5 ? 'STOCK_SPECIFIC' : 'MARKET_WIDE'
      : severity === 'NORMAL' ? 'NO_DRIFT' : 'STOCK_SPECIFIC';
  });

  const marketState: MarketState = {
    indexName: 'NIFTY 50 Watchlist Index',
    indexReturnPct: calculatedMarketReturn,
    indexZScore: Number(avgZ.toFixed(2)),
    isMarketWideDrift: isMarketWide,
    marketDriftDirection: marketDirection,
    totalStocksWatched: stocks.length,
    significantCount,
    worthALookCount,
    normalCount,
    timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    freshnessStatus: 'LIVE',
    lastUpdatedSecsAgo: 12
  };

  return { stocks, marketState };
}

// Generate explanation string from z-score, volume and market context
export function generateSignalSummary(stock: StockBaseline, marketState: MarketState): string {
  const dir = stock.todayReturnPct > 0 ? 'surged' : 'dropped';
  const signStr = stock.todayReturnPct > 0 ? `+${stock.todayReturnPct}%` : `${stock.todayReturnPct}%`;
  const absReturn = Math.abs(stock.todayReturnPct).toFixed(1);
  const typMove = stock.typicalDailyMovePct.toFixed(1);

  if (stock.severity === 'NORMAL') {
    return `${stock.name} moved ${signStr} today. This ${absReturn}% movement is completely within its historical daily variance of ±${typMove}%. Trading volume is normal.`;
  }

  let narrative = `${stock.name} ${dir} ${signStr} today, moving beyond its normal daily variation of ±${typMove}%. `;

  if (stock.volumeMultiplier >= 1.8) {
    narrative += `Heavy trading volume detected (${stock.volumeMultiplier.toFixed(1)}x 30-day average). `;
  }

  if (marketState.isMarketWideDrift) {
    const mktSign = marketState.indexReturnPct > 0 ? `+${marketState.indexReturnPct}%` : `${marketState.indexReturnPct}%`;
    if (stock.driftType === 'MARKET_WIDE') {
      narrative += `Broad market shifted ${mktSign} today; move aligns with index trend rather than stock isolation.`;
    } else {
      narrative += `While index shifted ${mktSign}, ${stock.ticker} moved further than market peers.`;
    }
  } else {
    narrative += `Broader market stayed calm (${marketState.indexReturnPct > 0 ? '+' : ''}${marketState.indexReturnPct}%), indicating stock-specific movement. `;
  }

  if (stock.catalystEvidence?.hasSpecificNews && stock.catalystEvidence.headline) {
    narrative += `Filing: "${stock.catalystEvidence.headline}".`;
  } else {
    narrative += `No specific filing catalyst found in public feed.`;
  }

  return narrative;
}
