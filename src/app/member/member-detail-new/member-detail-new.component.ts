import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberServiceService } from 'src/app/back-service/member-service.service';
import { MemberDTO } from 'src/app/back-service/model/memberDTO';

@Component({
  selector: 'app-member-detail-new',
  templateUrl: './member-detail-new.component.html',
  styleUrls: ['./member-detail-new.component.css']
})
export class MemberDetailNewComponent {

  constructor(public dialogRef: MatDialogRef<MemberDetailNewComponent>,private memberService :MemberServiceService, @Inject(MAT_DIALOG_DATA) public data :MemberDTO) { }

  isNew :boolean
  memberDTO :MemberDTO;
  ngOnInit() {
    if(this.data.id!=undefined&&this.data.id>0){
     
      this.memberDTO = this.data;
      this.isNew = false;
    }
    else{
      this.isNew = true;
      
    }
  }

  save() {
  if(this.isNew){
    console.log("new is not empty")
   this.memberService.addMemberToFamily(this.memberDTO.family.id,this.memberDTO).subscribe((data: {}) => {
    console.log('add family');
  });   
  }else{
    console.log("update is empty");
    this.memberService.updateMember(this.memberDTO.id,this.memberDTO).subscribe((data: {}) => {
      console.log('create setting');
    });   
  }
   this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();

  }
}
