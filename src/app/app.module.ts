import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ExpenseModule } from "./expense/expense.module";
import { MemberModule } from "./member/member.module";
import { MeetingModule } from "./meeting/meeting.module";
import { PaymentModule } from "./payment/payment.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { ReportModule } from "./report/report.module";
import { HttpClientModule } from "@angular/common/http";

import { DataService } from "./back-service/DataService/DataService";
import { MemberDetailsComponent } from "./member/member-details/member-details.component";
import { AttendanceDetailsComponent } from "./meeting/attendance-details/attendance-details.component";
import { PaymentDetailsComponent } from "./payment/payment-details/payment-details.component";
import { ExpenseDetailsComponent } from "./expense/expenset-details/expense-details.component";
import { PaymentTypeDetailsComponent } from "./miscellaneous/payment-type-details/payment-type-details.component";
import { ExpenseTypeDetailsComponent } from "./miscellaneous/expense-type-details/expense-type-details.component";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    ExpenseModule,
    MeetingModule,
    MemberModule,
    PaymentModule,
    DashboardModule,
    MiscellaneousModule,
    ReportModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
