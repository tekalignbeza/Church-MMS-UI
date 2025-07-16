import { Component, Input, OnInit } from '@angular/core';
import {FamilyDTO} from "../../back-service/model/familyDTO";
import { MemberSearchCriteriaDTO } from 'src/app/back-service/model/memberSearchCriteriaDTO';
import { MemberServiceService } from 'src/app/back-service/member-service.service';
import { MemberDTO } from 'src/app/back-service/model/memberDTO';
import { map, pipe } from 'rxjs';
@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.css']
})
export class FamilyListComponent implements OnInit {

  constructor(private memberApi:MemberServiceService) { }

  memberSearchCriteriaDTO:MemberSearchCriteriaDTO = {}
  dataSource :FamilyDTO[];
  ngOnInit() {
    this.loadFamilies()
  }

search() {
  this.memberApi.searchMember(this.memberSearchCriteriaDTO).pipe(
    map((members: MemberDTO[]) => members.map(member => member.family))
  ).subscribe((families: FamilyDTO[]) => {
    this.dataSource = families;
  });
}

  reset() {
   this.memberSearchCriteriaDTO = {};   
  }

  loadFamilies() {
     this.memberApi.getFamilyList().subscribe((data:FamilyDTO[]) => {     
      this.dataSource = data;
      console.log("load fam"+data.length);

    });
  }


}
