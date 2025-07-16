import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingService } from 'src/app/back-service/setting-service.service';
import { UploadPaymentComponent } from '../upload-payment/upload-payment.component';
import { JobDTO } from 'src/app/back-service/model/jobDTO';

@Component({
  selector: 'app-upload-payment-data-table',
  templateUrl: './upload-payment-data-table.component.html',
  styleUrls: ['./upload-payment-data-table.component.css']
})
export class UploadPaymentDataTableComponent {

 displayedColumns: string[] = ['name','fromDate','endDate','status'];
  dataSource :JobDTO[];

  ngOnInit() {
    this.loadData()
  }
  constructor(private settingService:SettingService,private _snackBar: MatSnackBar,public dialog: MatDialog) {}

  showSnackBar(message:string, action:string):void{
    this._snackBar.open(message,action, {
      duration: 2000,
    });
  }

  getRecord(row: JobDTO) {
  
  }

  addNewSetting() {
    const dialogRef = this.dialog.open(UploadPaymentComponent, {
      width: '40%',
      height: '50%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dataSource = result;
      console.log('The dialog was closed');
      this.loadData();
      this.showSnackBar("upload added","upload Add");
    });
  }

  public loadData(){
    this.settingService.jobStatus().subscribe(r=> this.dataSource = r );
  }
}