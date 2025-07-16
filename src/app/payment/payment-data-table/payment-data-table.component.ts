import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {PaymentDTO} from "../../back-service/model/paymentDTO";
import {AttendanceDetailsComponent} from "../../meeting/attendance-details/attendance-details.component";
import {PaymentDetailsComponent} from "../payment-details/payment-details.component";
import {DataService} from "../../back-service/DataService/DataService";


@Component({
  selector: 'app-payment-data-table',
  templateUrl: './payment-data-table.component.html',
  styleUrls: ['./payment-data-table.component.css']
})
export class PaymentDataTableComponent implements OnInit {
  displayedColumns: string[] = ['familyName', 'amount','paymentType','reason'];
  dataSource :PaymentDTO[];
  paymentDTO: PaymentDTO ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    if(this.dataService.family!=undefined){
    this.dataSource = this.dataService.family.paymentDTOList;
    }
  }
  constructor(private _snackBar: MatSnackBar,public dialog: MatDialog, public dataService :DataService) {}
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
