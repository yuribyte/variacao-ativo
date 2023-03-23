import { GridOptions } from 'ag-grid-community';
import { GridUtils } from 'src/app/core/utils/grid.utils';

export class FinanceGridOptions {
  static setupGridOptions(): GridOptions {
    return {
      ...GridUtils.options,
      onGridReady: (event) => event.api.sizeColumnsToFit(),
      onFirstDataRendered: undefined,
      onRowDataUpdated: undefined,
      suppressMovableColumns: true,
      suppressHorizontalScroll: true,
      columnDefs: [
        {
          field: 'day',
          headerName: 'Dia',
          suppressMovable: true,
          width: 50
        },
        {
          field: 'date',
          headerName: 'Data',
          type: 'date',
          suppressMovable: true
        },
        {
          field: 'price',
          headerName: 'Valor',
          type: 'price',
          suppressMovable: true
        },
        {
          field: 'variationDayOne',
          headerName: 'Variação em relação a D-1',
          type: 'percent',
          suppressMovable: true
        },
        {
          field: 'variationIndexZero',
          headerName: 'Variação em relação a primeira data',
          type: 'percent',
          suppressMovable: true
        }
      ]
    };
  }
}
