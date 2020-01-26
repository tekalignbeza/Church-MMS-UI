import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatTableDataSource} from "@angular/material";
import {FamilyDTO} from "../../back-service/model/familyDTO";
import {DataService} from "../../back-service/DataService/DataService"
import {Router} from "@angular/router";

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
  displayedColumns: string[] = ['name', 'id'];
  dataSource = new MatTableDataSource<FamilyDTO>(ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private router: Router,private dataService: DataService,private _snackBar: MatSnackBar) {}
  openSnackBar() {
    this.showSnackBar("Member removed from family","Remove");
  }

  showSnackBar(message:string, action:string):void{
    this._snackBar.open(message,action, {
      duration: 2000,
    });
  }

  getRecord(row: FamilyDTO) {
    this.dataService.family = row;
    this.showSnackBar("Edit Family","Family Edit");
    this.router.navigateByUrl("members/new")
  }

  addNewMember() {
    this.showSnackBar("Add Family","Family Add");
    this.router.navigateByUrl("members/new")
  }

}
