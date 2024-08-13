import {Component, Input, OnInit} from '@angular/core';
import {FamilyDTO} from "../../back-service/model/familyDTO";
import {FormGroup} from "@angular/forms";
import {MemberServiceService} from "../../back-service/member-service.service";
import {Router} from "@angular/router";
import {DataService} from "../../back-service/DataService/DataService";

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css']
})
export class FamilyDetailsComponent implements OnInit {

  constructor(public dataService:DataService, public router: Router,private memberApi:MemberServiceService) { }

  @Input() familyDTO:FamilyDTO = {
    id:0,
    addressDTO:{
      city: "",
      state: "",
      streetAddress1: "",
      zipCode: ""
    },
    name: ""
  }

  ngOnInit() {
    if(this.dataService.family != undefined){
      this.familyDTO = this.dataService.family;
    }
  }

  save() {
    console.log(JSON.stringify(this.familyDTO));
    this.memberApi.creteFamily(this.familyDTO).subscribe((data: {}) => {
      console.log('create family');
      this.router.navigate(['/members/families'])
    });
  }

  cancel() {
    this.router.navigate(['/members/families']);
  }
}
