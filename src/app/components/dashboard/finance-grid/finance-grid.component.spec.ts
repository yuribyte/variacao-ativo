import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinanceGridComponent } from './finance-grid.component';

describe('FinanceGridComponent', () => {
  let component: FinanceGridComponent;
  let fixture: ComponentFixture<FinanceGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinanceGridComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FinanceGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
