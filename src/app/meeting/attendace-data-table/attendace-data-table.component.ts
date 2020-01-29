import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from "@angular/material";
import {AttendanceDTO} from "../../back-service/model/attendanceDTO";
import {MemberDetailsComponent} from "../../member/member-details/member-details.component";
import {AttendanceDetailsComponent} from "../attendance-details/attendance-details.component";


const ELEMENT_DATA: AttendanceDTO[] = [{
  familyDTO: {
    addressDTO:{
      city: "Norcross",
      state: "GA",
      streetAddress1: "2423 Hava ",
      zipCode: "3009"
    },
    attendanceDTOList: [],
    id: 123445,
    memberDTOList:[],
    name: "Tekalign's Family",
    paymentDTOList: []
  },
  id:123,
  meetingDTO:{},
  memberId:1121
}
];

@Component({
  selector: 'app-attendace-data-table',
  templateUrl: './attendace-data-table.component.html',
  styleUrls: ['./attendace-data-table.component.css']
})
export class AttendaceDataTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'memberId', 'id'];
  dataSource = new MatTableDataSource<AttendanceDTO>(ELEMENT_DATA);
  attendanceDTO: AttendanceDTO ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private _snackBar: MatSnackBar,public dialog: MatDialog) {}
  openSnackBar() {
    this.showSnackBar("Member removed from family","Remove");
  }

  showSnackBar(message:string, action:string):void{
    this._snackBar.open(message,action, {
      duration: 2000,
    });
  }

  getRecord(row: AttendanceDTO) {
    const dialogRef = this.dialog.open(AttendanceDetailsComponent, {
       width: '40%',
       height: '80%',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      row = result;
      console.log('The dialog was closed');
      this.showSnackBar("Member added","Member Add");
    });
  }

  addNewMember() {
    const dialogRef = this.dialog.open(AttendanceDetailsComponent, {
      width: '40%',
      height: '80%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.attendanceDTO = result;
      console.log('The dialog was closed');
      this.showSnackBar("Member added","Member Add");
    });
  }
}
