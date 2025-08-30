import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscellaneousListComponent } from './miscellaneous-list/miscellaneous-list.component';
import {MaterialModule} from "../material.module";
import { SettingDataTableComponent } from './setting-data-table/setting-data-table.component';
import { SettingDataDetailsComponent } from './setting-data-details/setting-data-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { IngestorComponent } from './ingestor/ingestor.component';
import {MatFileUploadModule} from "mat-file-upload";
import { IngestorDataTableComponent } from './ingestor-data-table/ingestor-data-table.component';
import { UploadPaymentComponent } from './upload-payment/upload-payment.component';
import { UploadPaymentDataTableComponent } from './upload-payment-data-table/upload-payment-data-table.component';
import { UploadPaymentListComponent } from './upload-payment-list/upload-payment-list.component';



@NgModule({
  declarations: [MiscellaneousListComponent, SettingDataTableComponent, SettingDataDetailsComponent, IngestorComponent, IngestorDataTableComponent, UploadPaymentComponent, UploadPaymentDataTableComponent, UploadPaymentListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatFileUploadModule
  ]
})
export class MiscellaneousModule { }
