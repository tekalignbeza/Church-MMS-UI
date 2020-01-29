import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-income-report',
  templateUrl: './income-report.component.html',
  styleUrls: ['./income-report.component.css']
})
export class IncomeReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  paymentTypes = [
    {value: '1', viewValue: 'Monthly payment'},
    {value: '2', viewValue: 'Baptism'},
    {value: '3', viewValue: 'Asrat'}
  ];
}
