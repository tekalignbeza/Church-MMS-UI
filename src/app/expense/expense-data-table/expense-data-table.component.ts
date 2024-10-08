import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {AttendanceDetailsComponent} from "../../meeting/attendance-details/attendance-details.component";
import {ExpenseDTO} from "../../back-service/model/expenseDTO";
import {ExpenseDetailsComponent} from "../expenset-details/expense-details.component";

const ELEMENT_DATA: ExpenseDTO[] = [{
  amount: 100,
  vendor: {name: "Georgia Power"},
  id: 12,
  transactionMethod: "CREDIT",
  expenseName: "For Utility" ,
  status: "COMPLETE",
  expenseType:{
    name: "Monthly payment"
  }
},{
  amount: 100,
  vendor: {name: "Georgia Water"},
  id: 12,
  transactionMethod: "CREDIT",
  expenseName: "For Utility" ,
  status: "COMPLETE",
  expenseType:{
    name: "Monthly payment"
  }
},
  {
    amount: 100,
    vendor: {name: "Clarkston Police"},
    id: 12,
    transactionMethod: "CREDIT",
    expenseName: "For Security" ,
    status: "COMPLETE",
    expenseType:{
      name: "Monthly payment"
    }
  },{
    amount: 100,
    vendor: {name: "Priest X"},
    id: 12,
    transactionMethod: "CREDIT",
    expenseName: "For Salary" ,
    status: "COMPLETE",
    expenseType:{
      name: "Monthly payment"
    }
  }];
@Component({
  selector: 'app-expense-data-table',
  templateUrl: './expense-data-table.component.html',
  styleUrls: ['./expense-data-table.component.css']
})
export class ExpenseDataTableComponent implements OnInit {

  displayedColumns: string[] = ['vendorName', 'amount', 'transactionMethod', 'expenseType', 'expenseName'];
  dataSource = new MatTableDataSource<ExpenseDTO>(ELEMENT_DATA);
  expenseDTO: ExpenseDTO;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  openSnackBar() {
    this.showSnackBar("Member removed from family", "Remove");
  }

  showSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getRecord(row: ExpenseDTO) {
    const dialogRef = this.dialog.open(ExpenseDetailsComponent, {
      width: '40%',
      height: '80%',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      row = result;
      console.log('The dialog was closed');
      this.showSnackBar("Member added", "Member Add");
    });
  }

  addNewMember() {
    const dialogRef = this.dialog.open(ExpenseDetailsComponent, {
      width: '40%',
      height: '80%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.expenseDTO = result;
      console.log('The dialog was closed');
      this.showSnackBar("Member added", "Member Add");
    });
  }
}
