import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import {MemberDTO} from "../../back-service/model/memberDTO";
import {MemberSearchCriteriaDTO} from "../../back-service/model/memberSearchCriteriaDTO";
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
export class MemberDataTableComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['firstName', 'middleName', 'lastName', 'cellPhone', 'id', 'download', 'familyDetail'];
  dataSource: MemberDTO[] = [];
  memberData: MemberDTO;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Input() memberList: MemberDTO[] = [];
  @Output() memberAdded = new EventEmitter<void>();
  ngOnInit() {
    // Check if we're loading from a specific family context
    if(this.dataService.family!=undefined && this.dataService.family.memberDTOList){
      this.dataSource = this.dataService.family.memberDTOList;
    } else {
      // Use the input data from parent component
      this.updateDataSource();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Update dataSource when memberList input changes
    if (changes['memberList']) {
      this.updateDataSource();
    }
  }

  private updateDataSource() {
    this.dataSource = this.memberList || [];
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
    // Only set family if we're in family context
    if (this.dataService.family) {
      data.family = this.dataService.family;
    }
    const dialogRef = this.dialog.open(MemberDetailNewComponent, {
      width: '500px',
      height: '600px',
      data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.memberData = result;
      console.log('The dialog was closed');
      this.showSnackBar("Member added","Member Add");
      // Notify parent component to refresh data
      this.memberAdded.emit();
    });
  }

  loadFamilies() {
    return this.memberApi.getFamily(this.dataService.family.id).subscribe((data:any) => {
      console.log(JSON.stringify(data));
      //this.dataSource = new MatTableDataSource<MemberDTO>(data.memberDTOList);
    });
  }

  loadAllMembers() {
    // Use paginated loading for better performance, but load a larger page
    this.memberApi.getFamilyListPaginated(0, 50).subscribe(
      (pageData: any) => {
        const allMembers: MemberDTO[] = [];
        pageData.content.forEach(family => {
          if (family.memberDTOList) {
            allMembers.push(...family.memberDTOList);
          }
        });
        this.dataSource = allMembers;
      },
      error => {
        console.error('Error loading members with pagination, trying legacy:', error);
        // Fallback to legacy method
        this.loadAllMembersLegacy();
      }
    );
  }

  loadAllMembersLegacy() {
    // Load all members by getting families and extracting members (legacy)
    this.memberApi.getFamilyList().subscribe(
      (families: any[]) => {
        const allMembers: MemberDTO[] = [];
        families.forEach(family => {
          if (family.memberDTOList) {
            allMembers.push(...family.memberDTOList);
          }
        });
        this.dataSource = allMembers;
      },
      error => {
        console.error('Error loading members:', error);
        this.dataSource = [];
      }
    );
  }

  downloadIdCard(id: string) {
    // Validate and sanitize the ID parameter
    if (!id || id.trim() === '') {
      console.error('Invalid ID provided for ID card download');
      this.showSnackBar("Invalid ID card reference", "Error");
      return;
    }

    // Ensure id is properly decoded if it was URL encoded, then encode properly for URL path
    let cleanId = id.trim();
    
    // Check if the ID is already URL encoded (contains % characters)
    if (cleanId.includes('%')) {
      try {
        cleanId = decodeURIComponent(cleanId);
      } catch (e) {
        console.warn('Failed to decode ID, using original:', cleanId);
      }
    }
    
    // Properly encode for URL path (this handles special characters correctly)
    const encodedId = encodeURIComponent(cleanId);
    const url = `${environment.apiBaseUrl}/member/idcard/${encodedId}`;
    console.log('Downloading ID card from URL:', url, 'Original ID:', id, 'Clean ID:', cleanId);
    
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.blob();
    })
    .then(blob => {
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);

      // Specify the filename for download
      link.download = `${cleanId}-idcard.jpg`;

      // Append the anchor to the document body
      document.body.appendChild(link);

      // Trigger a click on the anchor
      link.click();

      // Clean up
      window.URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
      
      this.showSnackBar("ID card downloaded successfully", "Success");
    })
    .catch(error => {
      console.error('Download error:', error);
      this.showSnackBar("Failed to download ID card", "Error");
    });
  }

  viewFamilyDetail(member: MemberDTO) {
    if (member.family && member.family.id) {
      // Set the family in the data service for navigation
      this.dataService.family = member.family;
      // Navigate to family detail page or show family details
      this.router.navigate(['/members/family-details'], { 
        queryParams: { familyId: member.family.id } 
      });
    } else {
      this.showSnackBar("Family information not available", "Error");
    }
  }
}
