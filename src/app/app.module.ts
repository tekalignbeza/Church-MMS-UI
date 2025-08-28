import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { MemberModule } from "./member/member.module";
import { MeetingModule } from "./meeting/meeting.module";
import { PaymentModule } from "./payment/payment.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";

import { DataService } from "./back-service/DataService/DataService";
import { AuthService } from './back-service/auth.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    MeetingModule,
    MemberModule,
    PaymentModule,
    DashboardModule,
    MiscellaneousModule
  ],
  providers: [
    DataService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
