import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense-type-details',
  templateUrl: './expense-type-details.component.html',
  styleUrls: ['./expense-type-details.component.css']
})
export class ExpenseTypeDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  save() {

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
