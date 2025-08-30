import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiscellaneousListComponent } from './miscellaneous-list/miscellaneous-list.component';
import { UploadPaymentComponent } from './upload-payment/upload-payment.component';
import { UploadPaymentListComponent } from './upload-payment-list/upload-payment-list.component';

const routes: Routes = [
  { path: 'list', component: MiscellaneousListComponent },
  { path: 'uploadPayment', component: UploadPaymentComponent },
  { path: 'uploadPaymentList', component: UploadPaymentListComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscellaneousRoutingModule { }