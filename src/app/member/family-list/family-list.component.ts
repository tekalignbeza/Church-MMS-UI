import { Component, OnInit } from '@angular/core';
import {FamilyDTO} from "../../back-service/model/familyDTO";

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.css']
})
export class FamilyListComponent implements OnInit {

  constructor() { }
  private familyDTO:FamilyDTO;

  ngOnInit() {
   // this.data.currentData.subscribe(message => this.familyDTO = message)
  }

}
