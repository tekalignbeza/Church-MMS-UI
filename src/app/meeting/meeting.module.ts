import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { AttendanceDetailsComponent } from './attendance-details/attendance-details.component';
import {MaterialModule} from "../material.module";
import { AttendaceDataTableComponent } from './attendace-data-table/attendace-data-table.component';
import { MeetingDataTableComponent } from './meeting-data-table/meeting-data-table.component';
import { AttedanceLiveComponent } from './attedance-live/attedance-live.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [MeetingListComponent, MeetingDetailsComponent, AttendanceDetailsComponent, AttendaceDataTableComponent, MeetingDataTableComponent, AttedanceLiveComponent],
  imports: [
    CommonModule,
    MaterialModule,    
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [MeetingListComponent, MeetingDetailsComponent, AttendanceDetailsComponent, MeetingDataTableComponent, AttendaceDataTableComponent]
})
export class MeetingModule { }
