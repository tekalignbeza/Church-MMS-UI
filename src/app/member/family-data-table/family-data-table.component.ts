import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {FamilyDTO} from "../../back-service/model/familyDTO";
import {DataService} from "../../back-service/DataService/DataService"
import {Router} from "@angular/router";
import {MemberServiceService} from "../../back-service/member-service.service";


@Component({
  selector: 'app-family-data-table',
  templateUrl: './family-data-table.component.html',
  styleUrls: ['./family-data-table.component.css']
})
export class FamilyDataTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'id'];
  @Input() dataSource: FamilyDTO[];
  ngOnInit() {
    console.log('DataSource received by child:', this.dataSource);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {
      console.log('DataSource changed:', this.dataSource);
      // Update the table or perform any other necessary action
    }
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
    console.log('i set family'+ JSON.stringify(this.dataService.family));
    this.showSnackBar("Edit Family","Family Edit");
    this.router.navigateByUrl("members/new")
  }

  addNewMember() {
    this.showSnackBar("Add Family","Family Add");
    this.router.navigateByUrl("members/new")
  }

}
