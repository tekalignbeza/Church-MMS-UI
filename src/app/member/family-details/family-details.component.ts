import {Component, OnInit} from '@angular/core';
import {FamilyDTO} from "../../back-service/model/familyDTO";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css']
})
export class FamilyDetailsComponent implements OnInit {

  constructor() { }

  private familyDTO:FamilyDTO;
  formGroup: FormGroup;

  ngOnInit() {
   // this.data.currentData.subscribe(message => this.familyDTO = message);
  }

}
