import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MemberDTO} from "../../back-service/model/memberDTO";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  memberDTO:MemberDTO;
  imageSrc:any;
  closeButton =  "none";
  file:FileList;
  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<MemberDetailsComponent>,
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

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstName: [this.memberDTO.firstName, Validators.required],
      cellPhone: [this.memberDTO.cellPhone, Validators.required],
      lastName: [this.memberDTO.lastName, Validators.required],
      gender: ['Male', Validators.required],
      familyHead: [this.memberDTO.familyHead],
      email: [this.memberDTO.email],
      middleName: [this.memberDTO.middleName],
      spouse: [this.memberDTO.spouse],
      yearOfBirth: [this.memberDTO.yearOfBirth],
    });
    this.imageSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7VHJcKn_dK4W8JHjJccjVoOYcBqdWyXIIluHvoCxKJK7gQMd4&amp;s";
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
