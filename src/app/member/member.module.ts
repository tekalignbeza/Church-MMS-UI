import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { FamilyDetailsComponent } from './family-details/family-details.component';
import {MaterialModule} from "../material.module";
import {MemberDataTableComponent} from './member-data-table/member-data-table.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFileUploadModule} from "mat-file-upload";
import {MeetingModule} from "../meeting/meeting.module";
import {PaymentModule} from "../payment/payment.module";
import { AddMemberDialogComponent } from './add-member-dialog/add-member-dialog.component';



@NgModule({
  declarations: [MemberListComponent, FamilyDetailsComponent, MemberDataTableComponent, AddMemberDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatFileUploadModule,
    MeetingModule,
    PaymentModule
  ],
  exports: [MemberListComponent, FamilyDetailsComponent, MemberDataTableComponent]
})
export class MemberModule { }
