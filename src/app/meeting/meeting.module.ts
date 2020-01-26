import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { AttendanceDetailsComponent } from './attendance-details/attendance-details.component';
import {MaterialModule} from "../material.module";
import { AttendaceDataTableComponent } from './attendace-data-table/attendace-data-table.component';
import { MeetingDataTableComponent } from './meeting-data-table/meeting-data-table.component';



@NgModule({
  declarations: [MeetingListComponent, MeetingDetailsComponent, AttendanceDetailsComponent, AttendaceDataTableComponent, MeetingDataTableComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [MeetingListComponent, MeetingDetailsComponent, AttendanceDetailsComponent, MeetingDataTableComponent, AttendaceDataTableComponent]
})
export class MeetingModule { }
