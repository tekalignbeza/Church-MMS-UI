import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaymentListComponent} from './payment-list/payment-list.component';
import {PaymentDataTableComponent} from './payment-data-table/payment-data-table.component';
import {MaterialModule} from "../material.module";


@NgModule({
  declarations: [PaymentListComponent, PaymentDataTableComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[PaymentListComponent, PaymentDataTableComponent]
})
export class PaymentModule { }
