import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {AttendanceDTO} from "../../back-service/model/attendanceDTO";
import {AttendanceDetailsComponent} from "../attendance-details/attendance-details.component";
import { DataService } from 'src/app/back-service/DataService/DataService';
import { MeetingService } from 'src/app/back-service/meeting-service.service';


@Component({
  selector: 'app-attendace-data-table',
  templateUrl: './attendace-data-table.component.html',
  styleUrls: ['./attendace-data-table.component.css']
})
export class AttendaceDataTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'memberBarCode', 'flag'];
  dataSource :AttendanceDTO[];
  attendanceDTO: AttendanceDTO ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    if(this.dataService.family!=null){
      this.dataSource = this.dataService.family.attendanceDTOList;
    }else{
    this.load();
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
