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
import {HomeComponent} from "./dashboard/home/home.component";
import {MemberReportComponent} from "./report/member-report/member-report.component";
import {IncomeReportComponent} from "./report/income-report/income-report.component";
import {ExpenseReportComponent} from "./report/expense-report/expense-report.component";
import {SummaryReportComponent} from "./report/summary-report/summary-report.component";


const routes: Routes = [
      {path:"home",component:HomeComponent},
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
      {path:"miscellaneous/list", component:MiscellaneousListComponent},

      {path:"report/member", component:MemberReportComponent},
      {path:"report/payment", component:IncomeReportComponent},
      {path:"report/expense", component:ExpenseReportComponent},
      {path:"report/summary", component:SummaryReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
