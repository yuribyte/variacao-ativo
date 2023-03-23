import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AgGridModule } from 'ag-grid-angular';
import { CandlestickChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsModule } from 'ngx-echarts';

//  * ECharts Setup
echarts.use([
  GridComponent,
  TooltipComponent,
  CandlestickChart,
  CanvasRenderer
]);

const MODULES = [
  // * Material Modules
  MatToolbarModule,

  // * AgGrid Modules
  AgGridModule,

  // * ECharts Module
  NgxEchartsModule.forRoot({ echarts })
];

@NgModule({
  declarations: [],
  imports: [CommonModule, MODULES],
  exports: [MODULES]
})
export class CoreModule {}
