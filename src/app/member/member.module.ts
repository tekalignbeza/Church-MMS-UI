import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberListComponent } from './member-list/member-list.component';
import { FamilyDetailsComponent } from './family-details/family-details.component';
import { FamilyListComponent } from './family-list/family-list.component';
import {MaterialModule} from "../material.module";
import {MemberDataTableComponent} from './member-data-table/member-data-table.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFileUploadModule} from "mat-file-upload";
import { FamilyDataTableComponent } from './family-data-table/family-data-table.component';
import {MeetingModule} from "../meeting/meeting.module";
import {PaymentModule} from "../payment/payment.module";



@NgModule({
  declarations: [MemberDetailsComponent, MemberListComponent, FamilyDetailsComponent, FamilyListComponent, MemberDataTableComponent, FamilyDataTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatFileUploadModule,
    MeetingModule,
    PaymentModule
  ],
  exports: [MemberDetailsComponent, MemberListComponent, FamilyDetailsComponent, FamilyListComponent, FamilyDataTableComponent, MemberDataTableComponent]
})
export class MemberModule { }
