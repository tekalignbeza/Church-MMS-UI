import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expenset-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.css']
})
export class ExpenseDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  save() {

  }

  cancel() {

  }

  expenseTypes = [
    {value: '1', viewValue: 'Monthly payment'},
    {value: '2', viewValue: 'Power'},
    {value: '3', viewValue: 'Mobile'}
  ];

  expenseMethods = [
    {value: '1', viewValue: 'Cash'},
    {value: '2', viewValue: 'Check'},
    {value: '3', viewValue: 'Card'},
    {value: '4', viewValue: 'online'}
  ];
}
