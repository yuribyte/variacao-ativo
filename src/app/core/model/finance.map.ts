import { FinanceModelData as Model } from './finance.model';

export namespace FinanceDataMap {
  export function mapFinanceData(
    rawChart: Model.RawIFinance
  ): Model.RawIResult {
    const [result] = rawChart?.chart?.result || [];

    return mapRawResult(result);
  }

  export function mapRawResult(raw: Model.RawIResult): Model.RawIResult {
    return {
      indicators: raw?.indicators,
      timestamp: raw?.timestamp,
      meta: raw?.meta
    };
  }
}
