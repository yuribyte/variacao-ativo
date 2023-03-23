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
        }
      },
      xAxis: {
        type: 'category',
        data: this.data?.dateISO || [],
        gridIndex: 0,
        boundaryGap: true,
        axisLine: { onZero: false },
        splitLine: { show: false }
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
