import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDataTableComponent } from './expense-data-table.component';

describe('ExpenseDataTableComponent', () => {
  let component: ExpenseDataTableComponent;
  let fixture: ComponentFixture<ExpenseDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
