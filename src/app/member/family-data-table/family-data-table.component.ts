import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatTableDataSource} from "@angular/material";
import {FamilyDTO} from "../../back-service/model/familyDTO";
import {DataService} from "../../back-service/DataService/DataService"
import {Router} from "@angular/router";
import {MemberServiceService} from "../../back-service/member-service.service";

const ELEMENT_DATA:FamilyDTO[] = [{
  addressDTO:{
    city: "Norcross",
    state: "GA",
    streetAddress1: "2423 Hava ",
    zipCode: "3009"
  },
  attendanceDTOList: [],
  id: 123445,
  memberDTOList:[],
  name: "Tekalign's Family",
  paymentDTOList: []
}];

@Component({
  selector: 'app-family-data-table',
  templateUrl: './family-data-table.component.html',
  styleUrls: ['./family-data-table.component.css']
})
export class FamilyDataTableComponent implements OnInit {
  Families: any = [];

  displayedColumns: string[] = ['name', 'id'];
  dataSource : any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.loadFamilies();
  }
  constructor(private memberApi:MemberServiceService,private router: Router,private dataService: DataService,private _snackBar: MatSnackBar) {}
  openSnackBar() {
    this.showSnackBar("Member removed from family","Remove");
  }

  loadFamilies() {
    return this.memberApi.getFamilyList().subscribe((data:FamilyDTO[]) => {
      this.Families = data;
      data.filter(family=>family.memberDTOList!=null).forEach(value =>
      {
        value.memberDTOList.filter(member => member.familyHead);
      });
      this.dataSource = new MatTableDataSource<FamilyDTO>(data);
    });
  }

  showSnackBar(message:string, action:string):void{
    this._snackBar.open(message,action, {
      duration: 2000,
    });
  }

  getRecord(row: FamilyDTO) {
    this.dataService.family = row;
    console.log('i set family'+ JSON.stringify(this.dataService.family));
    this.showSnackBar("Edit Family","Family Edit");
    this.router.navigateByUrl("members/new")
  }

  addNewMember() {
    this.showSnackBar("Add Family","Family Add");
    this.router.navigateByUrl("members/new")
  }

}
