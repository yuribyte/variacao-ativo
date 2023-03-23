import { ElementRef } from '@angular/core';
import { GridOptions, ValueFormatterParams } from 'ag-grid-community';
import { DateTime } from 'luxon';

export class GridUtils {
  static options: GridOptions = {
    defaultColDef: {
      sortable: true,
      resizable: true
    },

    columnTypes: {
      date: {
        valueFormatter: GridUtils.dateFormatter
      },
      price: {
        valueFormatter: GridUtils.priceFormatter
      },
      percent: {
        cellRenderer: GridUtils.variationFormatter
      }
    },

    animateRows: true,
    headerHeight: 35,
    rowHeight: 35,
    suppressDragLeaveHidesColumns: true,
    rowSelection: 'single'
  };

  static setupDOMResponsivenessLayout(
    defaultOptions: GridOptions,
    gridContainer: ElementRef
  ): void {
    if (gridContainer) {
      defaultOptions.api?.setDomLayout('autoHeight');
    }
  }

  static dateFormatter(params: ValueFormatterParams): string {
    const date = DateTime.fromJSDate(params?.value);
    const isValidDate = date.isValid;
    const datetimeShort = date.toFormat('dd/MM/yyyy');

    return isValidDate ? datetimeShort : '';
  }

  static priceFormatter(params: ValueFormatterParams): string {
    const price = Number(params?.value);

    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  }

  static variationFormatter(params: ValueFormatterParams): string {
    const value = Number(params?.value);
    const rowIndex = params.node?.rowIndex;
    const percent = `${value.toFixed(2).replace('.', ',')}%`;
    const isFirstRowValue = rowIndex === 0 && value === 0;

    if (isFirstRowValue) {
      return `<span>--</span>`;
    }

    if (value > 0) {
      return `<span style="color:green;">+${percent}</span>`;
    }

    if (value < 0) {
      return `<span style="color:red;">${percent}</span>`;
    }

    return percent;
  }
}
