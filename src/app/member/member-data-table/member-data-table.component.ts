import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {
  MatDialog,
  MatPaginator,
  MatSnackBar,
  MatTableDataSource
} from "@angular/material";
import {MemberDTO} from "../../back-service/model/memberDTO";
import {MemberDetailsComponent} from "../member-details/member-details.component";

const ELEMENT_DATA: MemberDTO[] = [{
  firstName:'tekalign',
  lastName:'Habtemchael',
  middleName:'middle',
  cellPhone:'123456',
  email:'tefd@gmail.com',
  id:1121,
  familyHead:true,
  gender:'Male'
}
];
@Component({
  selector: 'app-member-data-table',
  templateUrl: './member-data-table.component.html',
  styleUrls: ['./member-data-table.component.css']
})
export class MemberDataTableComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'cellPhone', 'id'];
  dataSource = new MatTableDataSource<MemberDTO>(ELEMENT_DATA);
  memberData: MemberDTO ;
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

  getRecord(row: MemberDTO) {
    const dialogRef = this.dialog.open(MemberDetailsComponent, {
      width: '500px',
      height: '600px',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      row = result;
      console.log('The dialog was closed');
      this.showSnackBar("Member added","Member Add");
    });
  }

  addNewMember() {
    const dialogRef = this.dialog.open(MemberDetailsComponent, {
      width: '500px',
      height: '600px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.memberData = result;
      console.log('The dialog was closed');
      this.showSnackBar("Member added","Member Add");
    });
  }
}
