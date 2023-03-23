import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty, isNil } from 'lodash-es';
import { DateTime } from 'luxon';
import { FinanceModelData as Model } from 'src/app/core/model/finance.model';
import { StockData } from '../finance-chart/finance-chart.model';

@Pipe({
  name: 'mapStock'
})
export class StockPipe implements PipeTransform {
  transform(value: Model.RawIResult): StockData {
    const stockData: StockData = {} as StockData;
    const hasData = !isEmpty(value) && !isNil(value);

    if (hasData) {
      const amount = 30;
      const timestampAmount = value?.timestamp?.slice(0, amount) || [];
      const dateISO = timestampAmount.map((timestamp) =>
        DateTime.fromSeconds(timestamp).toISODate()
      );

      const [quote] = value?.indicators?.quote || [];
      const sortingOrder = ['open', 'close', 'low', 'high', 'volume'];

      if (quote) {
        const sortedQuotes = Object.fromEntries(
          Object.entries(quote).sort(
            ([value], [next]) =>
              sortingOrder.indexOf(value) - sortingOrder.indexOf(next)
          )
        );

        const stockValues: number[][] = [];

        for (let i = 0; i < sortedQuotes['open'].length; i++) {
          let data: number[] | null = null;

          for (const key in sortedQuotes) {
            if (sortedQuotes.hasOwnProperty(key)) {
              if (!data) {
                data = [];
              }
              data.push(Number(Number(sortedQuotes[key][i]).toFixed(2)));
            }
          }
          if (data) {
            stockValues.push(data.slice(0, amount));
          }
        }

        Object.assign(stockData, {
          stockValues,
          dateISO,
          symbol: value?.meta?.symbol
        });
      }

      return stockData;
    }

    return stockData;
  }
}
