import { Component, OnInit } from '@angular/core';
import { PaymentServiceService } from "../../back-service/payment-service.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-type-details',
  templateUrl: './payment-type-details.component.html',
  styleUrls: ['./payment-type-details.component.css']
})
export class PaymentTypeDetailsComponent implements OnInit {
  paymentTypeForm: FormGroup;

  constructor(
    private payment: PaymentServiceService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  private initForm() {
    this.paymentTypeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Getter for easy form field access
  get f() { return this.paymentTypeForm.controls; }

  getErrorMessage(controlName: string): string {
    const control = this.f[controlName];
    if (!control) return '';
    
    if (control.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
    }
    if (control.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${minLength} characters long`;
    }
    return '';
  }

  ngOnInit() {
  }

  save() {
    if (this.paymentTypeForm.invalid) {
      Object.keys(this.paymentTypeForm.controls).forEach(key => {
        const control = this.paymentTypeForm.get(key);
        if (control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    const paymentType = {
      name: this.f['name'].value,
      description: this.f['description'].value
    };

    // Uncomment and implement when backend is ready
    // this.payment.postPaymenType(paymentType).subscribe(
    //   response => {
    //     console.log('Payment type saved successfully');
    //   },
    //   error => {
    //     console.error('Error saving payment type:', error);
    //   }
    // );
  }

  cancel() {

  }

  paymentTypes = [
    {value: '1', viewValue: 'Monthly payment'},
    {value: '2', viewValue: 'Baptism'},
    {value: '3', viewValue: 'Asrat'}
  ];

  paymentMethods = [
    {value: '1', viewValue: 'Cash'},
    {value: '2', viewValue: 'Check'},
    {value: '3', viewValue: 'Card'}
  ];
}
