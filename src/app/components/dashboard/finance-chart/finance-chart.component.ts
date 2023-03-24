import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild
} from '@angular/core';
import { EChartsOption } from 'echarts';
import { isEmpty } from 'lodash-es';
import { DateTime } from 'luxon';
import { StockData } from './finance-chart.model';

@Component({
  selector: 'svt-finance-chart',
  templateUrl: './finance-chart.component.html',
  styleUrls: ['./finance-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinanceChartComponent implements OnChanges {
  @ViewChild('candlestickChart')
  candlestickChart!: ElementRef;

  @Input()
  data!: StockData;

  chartOption: EChartsOption = {};

  ngOnChanges(): void {
    this._buildChartOptions();
  }

  get hasStockData(): boolean {
    return !isEmpty(this.data);
  }

  private _buildChartOptions() {
    this.chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },

        formatter: function (param: any) {
          param = param[0];
          const values = param.data;

          const customMarker = `
            <span
              style="
                display:inline-block;
                margin-left:2px;
                margin-bottom:2px;
                border-radius:50%;
                width:6px;height:6px;
                background-color:${param.color}"
          ></span>
          `;

          const tooltip = [
            `${param.marker} ${
              param.seriesName
            } <span style="color:#ccc">(${DateTime.fromISO(param.name).toFormat(
              'dd/MM/yyyy'
            )})</span>`,

            `${customMarker} Abertura: <strong> R$ ${values[1]
              ?.toFixed(2)
              ?.replace('.', ',')}</strong>`,

            `${customMarker} Fechamento: <strong> R$ ${values[2]
              ?.toFixed(2)
              ?.replace('.', ',')}</strong>`,

            `${customMarker} Alta: <strong> R$ ${values[3]
              ?.toFixed(2)
              ?.replace('.', ',')}</strong>`,

            `${customMarker} Baixa: <strong> R$ ${values[4]
              ?.toFixed(2)
              ?.replace('.', ',')}</strong>`
          ];

          return tooltip.join('<br/>');
        }
      },

      xAxis: {
        type: 'category',
        data: this.data?.dateISO || [],
        gridIndex: 0,
        boundaryGap: true,
        splitLine: { show: false },
        axisLine: { onZero: false },
        axisPointer: {
          label: {
            formatter: function (params) {
              const date = DateTime.fromISO(params.value.toString()).toFormat(
                'dd/MM/yyyy'
              );
              return date;
            }
          }
        },
        axisLabel: {
          formatter: function (value) {
            const date = DateTime.fromISO(value).toFormat('dd/MM/yyyy');

            return date;
          }
        }
      },

      yAxis: {
        type: 'value',
        scale: true,
        gridIndex: 0,
        splitNumber: 0,
        splitArea: {
          show: true
        },
        axisLabel: { show: true },
        axisPointer: {
          label: {
            formatter: function (params) {
              const currency = Number(params.value)
                .toFixed(2)
                .replace('.', ',');

              return `R$${currency}`;
            }
          }
        },
        splitLine: { show: true }
      },

      series: [
        {
          name: this.data?.symbol,
          type: 'candlestick',
          data: this.data?.stockValues || [],
          itemStyle: {
            color: '#00da3c',
            color0: '#ec0000',
            borderColor: '#00da3c',
            borderColor0: '#ec0000'
          }
        }
      ]
    };
  }
}
