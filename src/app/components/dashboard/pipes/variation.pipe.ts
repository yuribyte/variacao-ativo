import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty, isNil } from 'lodash-es';
import { DateTime } from 'luxon';
import { FinanceModelData as Model } from 'src/app/core/model/finance.model';

@Pipe({
  name: 'mapVariation'
})
export class VariationPipe implements PipeTransform {
  transform(data: Model.RawIResult): Model.IFinance[] {
    const rowData: Model.IFinance[] = [];
    const hasData = !isEmpty(data) && !isNil(data);

    if (!hasData) {
      return rowData;
    }

    const consultRange = 30;

    const timestamps = data?.timestamp?.slice(-consultRange) || [];
    const [quote] = data?.indicators?.quote || [];
    const stockPrices = quote?.close?.slice(-consultRange);

    stockPrices?.forEach((price, index) => {
      const date = DateTime.fromSeconds(timestamps[index]).toJSDate();
      const previousDayPrice = stockPrices[index - 1];
      const initialPrice = stockPrices[0];
      const variationDayOne = this._calculateVariation(price, previousDayPrice);
      const variationIndexZero = this._calculateVariation(price, initialPrice);

      rowData.push({
        day: index + 1,
        date,
        price,
        variationDayOne,
        variationIndexZero
      } as Model.IFinance);
    });

    return rowData;
  }

  private _calculateVariation(
    currentPrice: number,
    previousPrice: number
  ): number {
    if (!previousPrice) {
      return 0;
    }

    const percentVariation = (currentPrice / previousPrice) * 100;

    return percentVariation - 100;
  }
}
