import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTypeDetailsComponent } from './expense-type-details.component';

describe('ExpenseTypeDetailsComponent', () => {
  let component: ExpenseTypeDetailsComponent;
  let fixture: ComponentFixture<ExpenseTypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
