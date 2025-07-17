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
import { SettingDataTableComponent } from './setting-data-table/setting-data-table.component';
import { SettingDataDetailsComponent } from './setting-data-details/setting-data-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { IngestorComponent } from './ingestor/ingestor.component';
import {MatFileUploadModule} from "mat-file-upload";
import { IngestorDataTableComponent } from './ingestor-data-table/ingestor-data-table.component';
import { UploadPaymentComponent } from './upload-payment/upload-payment.component';
import { UploadPaymentDataTableComponent } from './upload-payment-data-table/upload-payment-data-table.component';



@NgModule({
  declarations: [MiscellaneousListComponent,ExpenseTypeDetailsComponent,ExpenseTypeDataTableComponent,PaymentTypeDetailsComponent,PaymentTypeDataTableComponent,VendorDetailsComponent,VendorDataTableComponent, SettingDataTableComponent, SettingDataDetailsComponent, IngestorComponent, IngestorDataTableComponent, UploadPaymentComponent, UploadPaymentDataTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ExpenseModule,
    FormsModule,
    ReactiveFormsModule,
    MatFileUploadModule
  ],
  exports: [ReactiveFormsModule,MiscellaneousListComponent,ExpenseTypeDetailsComponent,ExpenseTypeDataTableComponent,PaymentTypeDetailsComponent,PaymentTypeDataTableComponent,VendorDetailsComponent,VendorDataTableComponent]
})
export class MiscellaneousModule { }
