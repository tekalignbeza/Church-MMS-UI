import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatTableDataSource} from "@angular/material";
import {AttendanceDTO} from "../../back-service/model/attendanceDTO";
import {MeetingDTO} from "../../back-service/model/meetingDTO";
import {DataService} from "../../back-service/DataService/DataService";
import {Router} from "@angular/router";


const ELEMENT_DATA: MeetingDTO[] = [{
      city: "Norcross",
      state: "GA",
      address1: "2423 Hava ",
      zipCode: "3009",
      id: 123445,
      cellPhone: "632432434",
      dateTime: new Date("2019-04-21"),
      duration: 3,
      email: "tedafd@gmail.com",
      title: "Title"
}
];


@Component({
  selector: 'app-meeting-data-table',
  templateUrl: './meeting-data-table.component.html',
  styleUrls: ['./meeting-data-table.component.css']
})
export class MeetingDataTableComponent implements OnInit {

  displayedColumns: string[] = ['title', 'dateTime', 'duration','address1'];
  dataSource = new MatTableDataSource<MeetingDTO>(ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private _snackBar: MatSnackBar,private dataService:DataService,private router:Router) {}
  openSnackBar() {
    this.showSnackBar("Meeting removed from list","Remove Meeting");
  }

  showSnackBar(message:string, action:string):void{
    this._snackBar.open(message,action, {
      duration: 2000,
    });
  }

  getRecord(row: MeetingDTO) {
    this.dataService.meeting = row;
    this.showSnackBar("Edit Meeting","Edit Meeting");
    this.router.navigateByUrl("meetings/new")
  }

  addNewMember() {
    this.showSnackBar("Add Meeting","Meeting Add");
    this.router.navigateByUrl("meetings/new")
  }
}
