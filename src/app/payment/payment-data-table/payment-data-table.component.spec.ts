import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDataTableComponent } from './payment-data-table.component';

describe('PaymentDataTableComponent', () => {
  let component: PaymentDataTableComponent;
  let fixture: ComponentFixture<PaymentDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
