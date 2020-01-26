import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTypeDataTableComponent } from './expense-type-data-table.component';

describe('ExpenseTypeDataTableComponent', () => {
  let component: ExpenseTypeDataTableComponent;
  let fixture: ComponentFixture<ExpenseTypeDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseTypeDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTypeDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
