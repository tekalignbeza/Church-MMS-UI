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

    isNew: boolean;
    dataSource: SettingDTO;
    
    ngOnInit() {
      if(this.data != undefined){
        this.dataSource = { ...this.data };
        this.isNew = false;
      } else {
        this.isNew = true;
        this.dataSource = {
          settingKey: '',
          value: ''
        };
      }
    }
  
    save() {
    if(this.isNew){
      console.log("Creating new setting");
      this.settingService.createSetting(this.dataSource).subscribe({
        next: (data: {}) => {
          console.log('Setting created successfully');
          this.dialogRef.close(this.dataSource); // Return the created setting
        },
        error: (error) => {
          console.error('Error creating setting:', error);
          this.dialogRef.close(); // Close without result on error
        }
      });   
    }else{
      console.log("Updating existing setting");
      this.settingService.updateSetting(this.dataSource).subscribe({
        next: (data: {}) => {
          console.log('Setting updated successfully');
          this.dialogRef.close(this.dataSource); // Return the updated setting
        },
        error: (error) => {
          console.error('Error updating setting:', error);
          this.dialogRef.close(); // Close without result on error
        }
      });   
    }
    }
  
    cancel() {
      this.dialogRef.close();

    }
  }
  