import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscellaneousListComponent } from './miscellaneous-list/miscellaneous-list.component';
import {ExpenseDetailsComponent} from "../expense/expenset-details/expense-details.component";
import {ExpensetListComponent} from "../expense/expenset-list/expenset-list.component";
import {ExpenseDataTableComponent} from "../expense/expense-data-table/expense-data-table.component";
import {MaterialModule} from "../material.module";
import {ExpenseTypeDetailsComponent} from "./expense-type-details/expense-type-details.component";
import {ExpenseTypeDataTableComponent} from "./expense-type-data-table/expense-type-data-table.component";
import {PaymentTypeDetailsComponent} from "./payment-type-details/payment-type-details.component";
import {PaymentTypeDataTableComponent} from "./payment-type-data-table/payment-type-data-table.component";
import {VendorDetailsComponent} from "./vendor-details/vendor-details.component";
import {VendorDataTableComponent} from "./vendor-data-table/vendor-data-table.component";
import {ExpenseModule} from "../expense/expense.module";



@NgModule({
  declarations: [MiscellaneousListComponent,ExpenseTypeDetailsComponent,ExpenseTypeDataTableComponent,PaymentTypeDetailsComponent,PaymentTypeDataTableComponent,VendorDetailsComponent,VendorDataTableComponent],
  imports: [
    CommonModule, MaterialModule, ExpenseModule
  ],
  exports: [MiscellaneousListComponent,ExpenseTypeDetailsComponent,ExpenseTypeDataTableComponent,PaymentTypeDetailsComponent,PaymentTypeDataTableComponent,VendorDetailsComponent,VendorDataTableComponent]
})
export class MiscellaneousModule { }
