import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {AttendanceDetailsComponent} from "../../meeting/attendance-details/attendance-details.component";
import {PaymentTypeDTO} from "../../back-service/model/paymentTypeDTO";
import {PaymentTypeDetailsComponent} from "../payment-type-details/payment-type-details.component";
import {PaymentServiceService} from "../../back-service/payment-service.service";

const ELEMENT_DATA: PaymentTypeDTO[] = [{
    name: "Monthly membership payment",
    description: "",
    id: 1
},
  {
    name: "Selet payment",
    description: "",
    id: 2
  },
  {
    name: "Christening membership payment",
    description: "",
    id: 3
  },
  {
    name: "Other service payment",
    description: "",
    id: 4
  }];
@Component({
  selector: 'app-payment-type-data-table',
  templateUrl: './payment-type-data-table.component.html',
  styleUrls: ['./payment-type-data-table.component.css']
})
export class PaymentTypeDataTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource<PaymentTypeDTO>(ELEMENT_DATA);
  paymentTypeDTO: PaymentTypeDTO ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource = new MatTableDataSource<PaymentTypeDTO>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }
  constructor(private payment:PaymentServiceService,private _snackBar: MatSnackBar,public dialog: MatDialog) {}
  openSnackBar() {
    this.showSnackBar("Member removed from family","Remove");
  }

  showSnackBar(message:string, action:string):void{
    this._snackBar.open(message,action, {
      duration: 2000,
    });
  }

  getRecord(row: PaymentTypeDTO) {
    const dialogRef = this.dialog.open(PaymentTypeDetailsComponent, {
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
    const dialogRef = this.dialog.open(PaymentTypeDetailsComponent, {
      width: '40%',
      height: '46%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.paymentTypeDTO = result;
      console.log('The dialog was closed');
      this.showSnackBar("Member added","Member Add");
    });
  }
}
