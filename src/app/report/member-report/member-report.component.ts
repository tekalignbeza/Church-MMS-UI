import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-report',
  templateUrl: './member-report.component.html',
  styleUrls: ['./member-report.component.css']
})
export class MemberReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  paymentTypes = [
    {value: '1', viewValue: 'Monthly payment'},
    {value: '2', viewValue: 'Baptism'},
    {value: '3', viewValue: 'Asrat'}
  ];
}
