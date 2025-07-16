import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPaymentComponent } from './upload-payment.component';

describe('UploadPaymentComponent', () => {
  let component: UploadPaymentComponent;
  let fixture: ComponentFixture<UploadPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadPaymentComponent]
    });
    fixture = TestBed.createComponent(UploadPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
