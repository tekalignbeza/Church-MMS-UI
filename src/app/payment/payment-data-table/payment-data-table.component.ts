import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from "@angular/material";
import {PaymentDTO} from "../../back-service/model/paymentDTO";
import {AttendanceDetailsComponent} from "../../meeting/attendance-details/attendance-details.component";
import {PaymentDetailsComponent} from "../payment-details/payment-details.component";

const ELEMENT_DATA: PaymentDTO[] = [{
amount: 100,
familyDTO: {name: "Tekalign's Family"},
id: 12,
memberId: 1,
paymentMethod: "CASH",
  reason: "For FEB" ,
status: "COMPLETE",
type:{
  name: "Monthly payment"
}
}];
@Component({
  selector: 'app-payment-data-table',
  templateUrl: './payment-data-table.component.html',
  styleUrls: ['./payment-data-table.component.css']
})
export class PaymentDataTableComponent implements OnInit {
  displayedColumns: string[] = ['familyName', 'amount', 'paymentMethod','paymentType','reason'];
  dataSource = new MatTableDataSource<PaymentDTO>(ELEMENT_DATA);
  paymentDTO: PaymentDTO ;
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

  getRecord(row: PaymentDTO) {
    const dialogRef = this.dialog.open(PaymentDetailsComponent, {
      width: '40%',
      height: '80',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      row = result;
      console.log('The dialog was closed');
      this.showSnackBar("Member added","Member Add");
    });
  }

  addNewMember() {
    const dialogRef = this.dialog.open(PaymentDetailsComponent, {
      width: '40%',
      height: '80',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.paymentDTO = result;
      console.log('The dialog was closed');
      this.showSnackBar("Member added","Member Add");
    });
  }
}
