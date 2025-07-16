import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPaymentDataTableComponent } from './upload-payment-data-table.component';

describe('UploadPaymentDataTableComponent', () => {
  let component: UploadPaymentDataTableComponent;
  let fixture: ComponentFixture<UploadPaymentDataTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadPaymentDataTableComponent]
    });
    fixture = TestBed.createComponent(UploadPaymentDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
