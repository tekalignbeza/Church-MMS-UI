import { Component, OnInit } from '@angular/core';
import {PaymentServiceService} from "../../back-service/payment-service.service";

@Component({
  selector: 'app-payment-type-details',
  templateUrl: './payment-type-details.component.html',
  styleUrls: ['./payment-type-details.component.css']
})
export class PaymentTypeDetailsComponent implements OnInit {

  constructor(private payment:PaymentServiceService) { }

  ngOnInit() {
  }

  save() {
    //this.payment.postPaymenType();
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
