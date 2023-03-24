import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty, isNil } from 'lodash-es';
import { DateTime } from 'luxon';
import { FinanceModelData as Model } from 'src/app/core/model/finance.model';
import { StockData } from '../finance-chart/finance-chart.model';

@Pipe({
  name: 'mapStock'
})
export class StockPipe implements PipeTransform {
  transform(data: Model.RawIResult): StockData {
    const stockData: StockData = {} as StockData;
    const hasData = !isEmpty(data) && !isNil(data);

    if (!hasData) {
      return stockData;
    }

    const consultRange = 30;
    const timestamps = data?.timestamp?.slice(-consultRange) || [];
    const dateISO = timestamps.map((timestamp) =>
      DateTime.fromSeconds(timestamp).toISODate()
    );

    const [quote] = data?.indicators?.quote || [];
    const sortingOrder = ['open', 'close', 'low', 'high', 'volume'];

    if (quote) {
      const sortedQuotes = Object.fromEntries(
        Object.entries(quote).sort(
          ([keyA], [keyB]) =>
            sortingOrder.indexOf(keyA) - sortingOrder.indexOf(keyB)
        )
      );

      const stockValues: number[][] = [];
      const consultRangeIndex = sortedQuotes['open'].length - consultRange;

      for (let i = consultRangeIndex; i < sortedQuotes['open'].length; i++) {
        const data: number[] = [];

        for (const key in sortedQuotes) {
          if (sortedQuotes.hasOwnProperty(key)) {
            const quoteValue = sortedQuotes[key][i];

            data.push(Number(quoteValue?.toFixed(2)));

            if (key === 'open' && quoteValue === 0 && i >= 2) {
              data.splice(-1);
            }
          }
        }

        stockValues.push(data);
      }

      Object.assign(stockData, {
        stockValues,
        dateISO,
        symbol: data?.meta?.symbol
      });
    }

    return stockData;
  }
}
