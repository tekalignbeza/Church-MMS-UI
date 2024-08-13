import {Component, Inject, Input, OnInit} from '@angular/core';
import {MemberDTO} from "../../back-service/model/memberDTO";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {MemberServiceService} from "../../back-service/member-service.service";
import {UserDTO} from "../../back-service/model/userDTO";

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  @Input() memberDTO:MemberDTO = {
      id : 0
    }
  imageSrc:any;
  closeButton =  "none";
  file:FileList;
  constructor(private memberApi:MemberServiceService, public dialogRef: MatDialogRef<MemberDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MemberDTO) {
    this.memberDTO = data;
  }
  onSelectedFilesChanged(event):void{
    this.closeButton = "cancel";
    console.log(event);
    this.file = event;
    var reader = new FileReader();
    reader.readAsDataURL(event.item(0));
    reader.onload = (_event) => {
      this.imageSrc = reader.result;
    }
    console.log(this.file.item(0));
  }
  onUploadClicked(event){
    console.log('upload started');
    this.memberApi.uploadPhoto(event.item(0),this.memberDTO.id).subscribe((data)=>{
      console.log(data);
      if(data===true){
        this.dialogRef.close();
      }
    });
  }

  ngOnInit() {

  }

  test() {
    console.log('Im clicked'+ JSON.stringify(this.memberDTO));
    this.memberDTO.userDTO = {
      email : this.memberDTO.email,
      role : UserDTO.RoleEnum.User
    }
    this.memberDTO.id = 0;
    this.memberApi.addMemberToFamily(this.memberDTO.family.id,this.memberDTO).subscribe((data: {}) => {
      console.log('create family');
    });
  }
}
