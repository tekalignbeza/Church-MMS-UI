import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SettingService } from 'src/app/back-service/setting-service.service';
import { JobDTO } from 'src/app/back-service/model/jobDTO';

@Component({
  selector: 'app-upload-payment',
  templateUrl: './upload-payment.component.html',
  styleUrls: ['./upload-payment.component.css']
})
export class UploadPaymentComponent implements OnInit{
  selectedFile: File | null = null;
  uploadUrl = 'YOUR_BACKEND_API_URL_HERE'; // Replace with actual backend API URL
  isNew :boolean

  constructor(public dialogRef: MatDialogRef<UploadPaymentComponent>,private settingService :SettingService,@Inject(MAT_DIALOG_DATA) public data :JobDTO) { }
 
    dataSource :JobDTO;
    ngOnInit() {
      if(this.data!=undefined){
       
        this.dataSource = this.data;
        this.isNew = false;
      }
      else{
        this.isNew = true;
        
      }
    }
    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
      }
    }

  uploadFile(): void {
    if (!this.selectedFile) {
      console.log('no file selected');
      return;
    }
    this.settingService.ingestFile(this.selectedFile, this.dataSource.fromDate, this.dataSource.toDate)
    .subscribe(response => {
      console.log('Upload successful:', response);
    }, error => {
      console.error('Upload failed:', error);
    });
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();

  }
}
