import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FinanceModelData } from 'src/app/core/model/finance.model';
import { FinanceDataService } from 'src/app/core/service/finance.data.service';

@Component({
  selector: 'svt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  rawFinanceData$!: Observable<FinanceModelData.RawIResult>;

  constructor(private _financeService: FinanceDataService) {}

  ngOnInit(): void {
    this._getFinanceData();
  }

  private _getFinanceData(): void {
    this.rawFinanceData$ = this._financeService.requestFinanceListData();
  }
}
