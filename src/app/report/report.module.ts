import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberReportComponent } from './member-report/member-report.component';
import { IncomeReportComponent } from './income-report/income-report.component';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { SummaryReportComponent } from './summary-report/summary-report.component';
import {MaterialModule} from "../material.module";
import {MemberModule} from "../member/member.module";
import {PaymentModule} from "../payment/payment.module";
import {ExpenseModule} from "../expense/expense.module";



@NgModule({
  declarations: [MemberReportComponent, IncomeReportComponent, ExpenseReportComponent, SummaryReportComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MemberModule,
    PaymentModule,
    ExpenseModule
  ],
  exports:[MemberReportComponent, IncomeReportComponent, ExpenseReportComponent, SummaryReportComponent]
})
export class ReportModule { }
