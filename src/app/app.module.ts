import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FinanceChartComponent } from './components/dashboard/finance-chart/finance-chart.component';
import { FinanceGridComponent } from './components/dashboard/finance-grid/finance-grid.component';
import { StockPipe } from './components/dashboard/pipes/stock.pipe';
import { VariationPipe } from './components/dashboard/pipes/variation.pipe';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    FinanceGridComponent,
    FinanceChartComponent,
    DashboardComponent,
    VariationPipe,
    StockPipe
  ],
  imports: [
    // * Angular Modules
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // * Core Module
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
