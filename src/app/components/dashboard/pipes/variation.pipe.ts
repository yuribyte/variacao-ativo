import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty, isNil } from 'lodash-es';
import { DateTime } from 'luxon';
import { FinanceModelData as Model } from 'src/app/core/model/finance.model';

@Pipe({
  name: 'mapVariation'
})
export class VariationPipe implements PipeTransform {
  transform(value: Model.RawIResult): Array<Model.IFinance> {
    const rowData: Array<Model.IFinance> = [];
    const hasData = !isEmpty(value) && !isNil(value);

    if (hasData) {
      const amount = 30;

      const timestampAmount = value?.timestamp?.slice(0, amount) || [];
      const [quote] = value?.indicators?.quote || [];
      const quoteAmount = quote?.close?.slice(0, amount);

      quoteAmount?.map((price, index) => {
        const date = DateTime.fromSeconds(timestampAmount[index]).toJSDate();

        const fromDayOne = quoteAmount[index - 1];
        const fromIndexZero = quoteAmount[0];
        const variationDayOne = this._calculateVariationStock(
          price,
          fromDayOne
        );
        const variationIndexZero = this._calculateVariationStock(
          price,
          fromIndexZero
        );

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

    return rowData;
  }

  private _calculatePercentValues(
    currentPrice: number,
    previousPrice: number
  ): number {
    if (!previousPrice) {
      return 0;
    }

    return (currentPrice * 100) / previousPrice;
  }

  private _calculateVariationStock(
    currentPrice: number,
    previousPrice: number
  ): number {
    const calculatedPercent = this._calculatePercentValues(
      currentPrice,
      previousPrice
    );
    if (previousPrice === undefined || previousPrice === 0) {
      return 0;
    }

    const isPositivePercent = calculatedPercent > 100;

    if (isPositivePercent) {
      return (calculatedPercent - 100) * +1;
    }

    return (100 - calculatedPercent) * -1;
  }
}
