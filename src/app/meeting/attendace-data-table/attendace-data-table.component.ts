import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {AttendanceDTO} from "../../back-service/model/attendanceDTO";
import { DataService } from 'src/app/back-service/DataService/DataService';
import { MeetingService } from 'src/app/back-service/meeting-service.service';


@Component({
  selector: 'app-attendace-data-table',
  templateUrl: './attendace-data-table.component.html',
  styleUrls: ['./attendace-data-table.component.css']
})
export class AttendaceDataTableComponent implements OnInit {
  @Input() hideMeetingTitle: boolean = false;
  @Input() hideMeetingDate: boolean = false;
  @Input() hideFamilyName: boolean = false;
  displayedColumns: string[] = [];
  dataSource :AttendanceDTO[];
  attendanceDTO: AttendanceDTO ;
  meetingTitle: string = '';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    // Set up columns based on what should be shown
    this.displayedColumns = [];
    if (!this.hideMeetingTitle) {
      this.displayedColumns.push('meetingTitle');
    }
    if (!this.hideMeetingDate) {
      this.displayedColumns.push('meetingDate');
    }
    if (!this.hideFamilyName) {
      this.displayedColumns.push('name');
    }
    this.displayedColumns.push('memberBarCode', 'flag');
    
    if(this.dataService.family!=null){
      this.dataSource = this.dataService.family.attendanceDTOList;
    }else{
    this.load();
    }
    // Get meeting title if available
    if(this.dataService.meeting) {
      this.meetingTitle = this.dataService.meeting.title;
    }
  }
  constructor(private _snackBar: MatSnackBar,public dialog: MatDialog,public dataService :DataService,private meetingApi:MeetingService) {}
  openSnackBar() {
    this.showSnackBar("Member removed from family","Remove");
  }

  showSnackBar(message:string, action:string):void{
    this._snackBar.open(message,action, {
      duration: 2000,
    });
  }

  
  public load() {
    this.meetingApi.getAttendanceByMeeting(this.dataService.meetingId).subscribe(data => {
      this.dataSource = data;
    });
  }

  getRecord(row: AttendanceDTO) {
  
  }

  addNewMember() {
  }
}
