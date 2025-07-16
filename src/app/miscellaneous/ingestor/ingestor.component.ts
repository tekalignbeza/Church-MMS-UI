import {Component, Inject, Input, OnInit} from '@angular/core';
import {MemberDTO} from "../../back-service/model/memberDTO";
import { MAT_DIALOG_DATA,MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SettingService } from 'src/app/back-service/setting-service.service';

@Component({
  selector: 'app-ingestor',
  templateUrl: './ingestor.component.html',
  styleUrls: ['./ingestor.component.css']
})
export class IngestorComponent {

  ngOnInit() {

  }  

file:FileList;
constructor(private setingService:SettingService, public dialogRef: MatDialogRef<IngestorComponent>) {
}

onUploadClicked(event){
  console.log('upload started');
  this.setingService.ingestFile(event.item(0),'','').subscribe((data)=>{
    console.log(data);
    this.dialogRef.close();

  });
}

}
