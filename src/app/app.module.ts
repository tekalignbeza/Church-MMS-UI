import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { MemberModule } from "./member/member.module";
import { MeetingModule } from "./meeting/meeting.module";
import { PaymentModule } from "./payment/payment.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { HttpClientModule } from "@angular/common/http";

import { DataService } from "./back-service/DataService/DataService";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    MeetingModule,
    MemberModule,
    PaymentModule,
    DashboardModule,
    MiscellaneousModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
