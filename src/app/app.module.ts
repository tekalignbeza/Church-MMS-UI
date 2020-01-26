import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ExpenseModule} from "./expense/expense.module";
import { MemberModule} from "./member/member.module";
import { MeetingModule} from "./meeting/meeting.module";
import {PaymentModule} from "./payment/payment.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {MemberDetailsComponent} from "./member/member-details/member-details.component";
import {AttendanceDetailsComponent} from "./meeting/attendance-details/attendance-details.component";
import {MiscellaneousModule} from "./miscellaneous/miscellaneous.module";
import {DataService} from "./back-service/DataService/DataService";
import {PaymentDetailsComponent} from "./payment/payment-details/payment-details.component";
import {ExpenseDetailsComponent} from "./expense/expenset-details/expense-details.component";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ExpenseModule,
    MeetingModule,
    MemberModule,
    PaymentModule,
    DashboardModule,
    MiscellaneousModule
  ],
  entryComponents: [MemberDetailsComponent,AttendanceDetailsComponent,PaymentDetailsComponent,ExpenseDetailsComponent],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
