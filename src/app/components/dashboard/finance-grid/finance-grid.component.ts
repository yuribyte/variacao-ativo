import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import { GridUtils } from './../../../core/utils/grid.utils';
import { IFinance } from './finance-grid.model';
import { FinanceGridOptions } from './finance-grid.options';

@Component({
  selector: 'svt-finance-grid',
  templateUrl: './finance-grid.component.html',
  styleUrls: ['./finance-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinanceGridComponent implements AfterViewInit {
  @ViewChild('financeGrid')
  financeGrid!: ElementRef;

  @Input()
  data!: Array<IFinance>;

  noRowsTemplateMessage = `<p class="fs-5">Ops, não foram encontrados dados!</p>`;
  gridOptions = FinanceGridOptions.setupGridOptions();

  ngAfterViewInit(): void {
    this._setupGridResponsiveness();
  }

  private _setupGridResponsiveness(): void {
    GridUtils.setupDOMResponsivenessLayout(this.gridOptions, this.financeGrid);
  }
}
