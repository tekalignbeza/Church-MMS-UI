import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaymentListComponent} from './payment-list/payment-list.component';
import {PaymentDetailsComponent} from './payment-details/payment-details.component';
import {PaymentDataTableComponent} from './payment-data-table/payment-data-table.component';
import {MaterialModule} from "../material.module";


@NgModule({
  declarations: [PaymentListComponent, PaymentDetailsComponent, PaymentDataTableComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[PaymentListComponent, PaymentDetailsComponent,PaymentDataTableComponent]
})
export class PaymentModule { }
