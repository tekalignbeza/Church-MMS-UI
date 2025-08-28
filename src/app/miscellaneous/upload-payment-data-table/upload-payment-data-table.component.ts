import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingService } from 'src/app/back-service/setting-service.service';
import { JobDTO } from 'src/app/back-service/model/jobDTO';

@Component({
  selector: 'app-upload-payment-data-table',
  templateUrl: './upload-payment-data-table.component.html',
  styleUrls: ['./upload-payment-data-table.component.css']
})
export class UploadPaymentDataTableComponent implements OnChanges {

 displayedColumns: string[] = ['name','fromDate','endDate','status'];
  @Input() dataSource: JobDTO[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {
      console.log('Data source updated:', this.dataSource);
    }
  }
  constructor(private settingService:SettingService,private _snackBar: MatSnackBar) {}

  showSnackBar(message:string, action:string):void{
    this._snackBar.open(message,action, {
      duration: 2000,
    });
  }

  getRecord(row: JobDTO) {
  
  }

}