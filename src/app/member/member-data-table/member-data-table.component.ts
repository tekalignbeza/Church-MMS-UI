import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import {MemberDTO} from "../../back-service/model/memberDTO";
import {DataService} from "../../back-service/DataService/DataService";
import {Router} from "@angular/router";
import {MemberServiceService} from "../../back-service/member-service.service";
import {FamilyDTO} from "../../back-service/model/familyDTO";
import { environment } from 'src/environments/environment';
import { MemberDetailNewComponent } from '../member-detail-new/member-detail-new.component';

@Component({
  selector: 'app-member-data-table',
  templateUrl: './member-data-table.component.html',
  styleUrls: ['./member-data-table.component.css']
})
export class MemberDataTableComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'cellPhone', 'id', 'download'];
  dataSource :MemberDTO[];
  memberData: MemberDTO ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    if(this.dataService.family!=undefined){
    console.log('im loading member from family'+JSON.stringify(this.dataService.family.memberDTOList));
    this.dataSource = this.dataService.family.memberDTOList;
  }
  }
  constructor(public dataService:DataService, public router: Router,private memberApi:MemberServiceService,private _snackBar: MatSnackBar,public dialog: MatDialog) {}
  openSnackBar() {
    this.showSnackBar("Member removed from family","Remove");
  }

   showSnackBar(message:string, action:string):void{
     this._snackBar.open(message,action, {
       duration: 2000,
     });
  }

  getRecord(row: MemberDTO) {
    const dialogRef = this.dialog.open(MemberDetailNewComponent, {
      width: '500px',
      height: '600px',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      row = result;
      console.log('The dialog was closed');
      //this.showSnackBar("Member added","Member Add");
    });
  }

  addNewMember() {
    let data:MemberDTO = {}
    data.family = this.dataService.family;
    const dialogRef = this.dialog.open(MemberDetailNewComponent, {
      width: '500px',
      height: '600px',
      data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.memberData = result;
      console.log('The dialog was closed');
      this.showSnackBar("Member added","Member Add");
    });
  }

  loadFamilies() {
    return this.memberApi.getFamily(this.dataService.family.id).subscribe((data:any) => {
      console.log(JSON.stringify(data));
      //this.dataSource = new MatTableDataSource<MemberDTO>(data.memberDTOList);
    });
  }

  downloadIdCard(id: string) {
    const url = environment.apiBaseUrl+'/member/idcard/${id}';
    fetch(url)
    .then(response => response.blob())
    .then(blob => {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);

      // Specify the filename for download
      link.download = `${id}-idcard.jpg`;

      // Append the anchor to the document body
      document.body.appendChild(link);

      // Trigger a click on the anchor
      link.click();

      // Clean up
      window.URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    })
    .catch(error => console.error('Download error:', error));
  }
}
