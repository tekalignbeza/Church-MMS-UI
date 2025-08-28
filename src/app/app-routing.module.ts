import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {MemberListComponent} from "./member/member-list/member-list.component";
import {MeetingListComponent} from "./meeting/meeting-list/meeting-list.component";
import {MeetingDetailsComponent} from "./meeting/meeting-details/meeting-details.component";
import {PaymentListComponent} from "./payment/payment-list/payment-list.component";
import {FamilyDetailsComponent} from "./member/family-details/family-details.component";
import {MiscellaneousListComponent} from "./miscellaneous/miscellaneous-list/miscellaneous-list.component";
import {HomeComponent} from "./dashboard/home/home.component";
import { AttedanceLiveComponent } from './meeting/attedance-live/attedance-live.component';
import { UploadPaymentListComponent } from './miscellaneous/upload-payment-list/upload-payment-list.component';
import { UploadPaymentComponent } from './miscellaneous/upload-payment/upload-payment.component';

const routes: Routes = [
      {path:"home",component:HomeComponent},
      {path:"members/new", component:FamilyDetailsComponent},
      {path:"members/family-details", component:FamilyDetailsComponent},
      {path:"members/list", component:MemberListComponent},

      {path:"meetings/list", component:MeetingListComponent},
      {path:"meetings/new", component:MeetingDetailsComponent},
      {path:"meetings/attedance", component:AttedanceLiveComponent},

      {path:"payments/list", component:PaymentListComponent},


      {path:"miscellaneous/list", component:MiscellaneousListComponent},
      {path:"miscellaneous/uploadPayment", component:UploadPaymentComponent},
      {path:"miscellaneous/uploadPaymentList", component:UploadPaymentListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
