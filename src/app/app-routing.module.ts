import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./dashboard/home/home.component";
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MemberListComponent } from "./member/member-list/member-list.component";
import { MeetingListComponent } from "./meeting/meeting-list/meeting-list.component";
import { MeetingDetailsComponent } from "./meeting/meeting-details/meeting-details.component";
import { PaymentListComponent } from "./payment/payment-list/payment-list.component";
import { FamilyDetailsComponent } from "./member/family-details/family-details.component";
import { AttedanceLiveComponent } from './meeting/attedance-live/attedance-live.component';
import { MiscellaneousListComponent } from './miscellaneous/miscellaneous-list/miscellaneous-list.component';
import { UploadPaymentComponent } from './miscellaneous/upload-payment/upload-payment.component';
import { UploadPaymentListComponent } from './miscellaneous/upload-payment-list/upload-payment-list.component';

const routes: Routes = [
      // Public routes
      {path: "login", component: LoginComponent},
      
      // Core routes (eagerly loaded)
      {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
      {path: "dashboard", component: HomeComponent, canActivate: [AuthGuard]},
      {path: "members/new", component: FamilyDetailsComponent, canActivate: [AuthGuard]},
      {path: "members/family-details", component: FamilyDetailsComponent, canActivate: [AuthGuard]},
      {path: "members/list", component: MemberListComponent, canActivate: [AuthGuard]},
      {path: "meetings/list", component: MeetingListComponent, canActivate: [AuthGuard]},
      {path: "meetings/new", component: MeetingDetailsComponent, canActivate: [AuthGuard]},
      {path: "meetings/attedance", component: AttedanceLiveComponent, canActivate: [AuthGuard]},
      {path: "meetings/:id", component: MeetingDetailsComponent, canActivate: [AuthGuard]},
      {path: "payments/list", component: PaymentListComponent, canActivate: [AuthGuard]},
      
      // Miscellaneous routes (now eagerly loaded)
      {path: "miscellaneous/list", component: MiscellaneousListComponent, canActivate: [AuthGuard]},
      {path: "miscellaneous/uploadPayment", component: UploadPaymentComponent, canActivate: [AuthGuard]},
      {path: "miscellaneous/uploadPaymentList", component: UploadPaymentListComponent, canActivate: [AuthGuard]},
      {path: "miscellaneous", redirectTo: "/miscellaneous/list", pathMatch: "full"},
      
      // Default routes
      {path: "", redirectTo: "/dashboard", pathMatch: "full"},
      {path: "**", redirectTo: "/login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
