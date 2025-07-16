import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SettingDTO } from 'src/app/back-service/model/settingDTO';
import { SettingService } from 'src/app/back-service/setting-service.service';

@Component({
  selector: 'app-setting-data-details',
  templateUrl: './setting-data-details.component.html',
  styleUrls: ['./setting-data-details.component.css']
})
export class SettingDataDetailsComponent implements OnInit{

    constructor(public dialogRef: MatDialogRef<SettingDataDetailsComponent>,private settingService :SettingService,@Inject(MAT_DIALOG_DATA) public data :SettingDTO) { }

    isNew :boolean
    dataSource :SettingDTO;
    ngOnInit() {
      if(this.data!=undefined){
       
        this.dataSource = this.data;
        this.isNew = false;
      }
      else{
        this.isNew = true;
        
      }
    }
  
    save() {
    if(this.isNew){
      console.log("new is not empty")
     this.settingService.createSetting(this.dataSource).subscribe((data: {}) => {
      console.log('create setting');
    });   
    }else{
      console.log("update is empty");
      this.settingService.updateSetting(this.dataSource).subscribe((data: {}) => {
        console.log('create setting');
      });   
    }
     this.dialogRef.close();
    }
  
    cancel() {
      this.dialogRef.close();

    }
  }
  