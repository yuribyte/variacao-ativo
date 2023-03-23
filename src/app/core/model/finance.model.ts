export namespace FinanceModelData {
  export interface RawIFinance {
    chart?: {
      result?: Array<RawIResult>;
    };
  }

  export interface RawIResult {
    meta: { symbol: string };
    timestamp?: Array<number>;
    indicators?: {
      quote?: Array<RawIQuote>;
    };
  }

  export interface RawIQuote {
    open?: Array<number>;
    close?: Array<number>;
    low?: Array<number>;
    high?: Array<number>;
    volume?: Array<number>;
  }

  export interface IFinance {
    day: number;
    date: Date;
    price: number;
    variationDayOne: number;
    variationIndexZero: number;
  }
}
