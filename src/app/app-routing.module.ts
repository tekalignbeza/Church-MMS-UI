import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {MemberListComponent} from "./member/member-list/member-list.component";
import {MeetingListComponent} from "./meeting/meeting-list/meeting-list.component";
import {MeetingDetailsComponent} from "./meeting/meeting-details/meeting-details.component";
import {PaymentListComponent} from "./payment/payment-list/payment-list.component";
import {PaymentDetailsComponent} from "./payment/payment-details/payment-details.component";
import {PaymentTypeDetailsComponent} from "./miscellaneous/payment-type-details/payment-type-details.component";
import {ExpensetListComponent} from "./expense/expenset-list/expenset-list.component";
import {ExpenseDetailsComponent} from "./expense/expenset-details/expense-details.component";
import {ExpenseTypeDetailsComponent} from "./miscellaneous/expense-type-details/expense-type-details.component";
import {VendorDetailsComponent} from "./miscellaneous/vendor-details/vendor-details.component";
import {FamilyDetailsComponent} from "./member/family-details/family-details.component";
import {FamilyListComponent} from "./member/family-list/family-list.component";
import {MiscellaneousListComponent} from "./miscellaneous/miscellaneous-list/miscellaneous-list.component";


const routes: Routes = [
      {path:"home",component:AppComponent},
      {path:"members/families", component:FamilyListComponent},
      {path:"members/new", component:FamilyDetailsComponent},
      {path:"members/list", component:MemberListComponent},

      {path:"meetings/list", component:MeetingListComponent},
      {path:"meetings/new", component:MeetingDetailsComponent},

      {path:"payments/list", component:PaymentListComponent},
      {path:"payments/new", component:PaymentDetailsComponent},
      {path:"payments/newTypes", component:PaymentTypeDetailsComponent},

      {path:"expenses/list", component:ExpensetListComponent},
      {path:"expenses/new", component:ExpenseDetailsComponent},
      {path:"expenses/newTypes", component:ExpenseTypeDetailsComponent},

      {path:"miscellaneous/new", component:VendorDetailsComponent},
      {path:"miscellaneous/list", component:MiscellaneousListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
