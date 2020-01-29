import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from "@angular/material";
import {AttendanceDetailsComponent} from "../../meeting/attendance-details/attendance-details.component";
import {ExpenseTypeDTO} from "../../back-service/model/expenseTypeDTO";
import {ExpenseTypeDetailsComponent} from "../expense-type-details/expense-type-details.component";

const ELEMENT_DATA: ExpenseTypeDTO[] = [{
  name: "Monthly payment",
  description: "",
  id: 1
}];
  @Component({
    selector: 'app-expense-type-data-table',
    templateUrl: './expense-type-data-table.component.html',
    styleUrls: ['./expense-type-data-table.component.css']
  })
  export class ExpenseTypeDataTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource<ExpenseTypeDTO>(ELEMENT_DATA);
  expenseTypeDTO: ExpenseTypeDTO ;
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

  getRecord(row: ExpenseTypeDTO) {
    const dialogRef = this.dialog.open(ExpenseTypeDetailsComponent, {
      width: '40%',
      height: '46%',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      row = result;
      console.log('The dialog was closed');
      this.showSnackBar("Member added","Member Add");
    });
  }

  addNewMember() {
    const dialogRef = this.dialog.open(ExpenseTypeDetailsComponent, {
      width: '40%',
      height: '46%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.expenseTypeDTO = result;
      console.log('The dialog was closed');
      this.showSnackBar("Member added","Member Add");
    });
  }
}
