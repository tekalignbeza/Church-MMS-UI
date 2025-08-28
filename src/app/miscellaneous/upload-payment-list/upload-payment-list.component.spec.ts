import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPaymentListComponent } from './upload-payment-list.component';

describe('UploadPaymentListComponent', () => {
  let component: UploadPaymentListComponent;
  let fixture: ComponentFixture<UploadPaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPaymentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});