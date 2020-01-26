import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTypeDataTableComponent } from './payment-type-data-table.component';

describe('PaymentTypeDataTableComponent', () => {
  let component: PaymentTypeDataTableComponent;
  let fixture: ComponentFixture<PaymentTypeDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentTypeDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTypeDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
