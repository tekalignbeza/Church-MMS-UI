import {Component, Input, OnInit} from '@angular/core';
import {FamilyDTO} from "../../back-service/model/familyDTO";
import {FormGroup} from "@angular/forms";
import {MemberServiceService} from "../../back-service/member-service.service";
import {Router, ActivatedRoute} from "@angular/router";
import {DataService} from "../../back-service/DataService/DataService";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css']
})
export class FamilyDetailsComponent implements OnInit {
  
  isLoading: boolean = false;
  isSaving: boolean = false;
  familyHeadName: string = ""; // Separate property for family head name

  constructor(
    public dataService: DataService, 
    public router: Router, 
    private memberApi: MemberServiceService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  @Input() familyDTO:FamilyDTO = {
    id:0,
    addressDTO:{
      city: "",
      state: "",
      streetAddress1: "",
      streetAddress2: "",
      zipCode: ""
    },
    name: ""
  }

  ngOnInit() {
    // Only load existing families - no create functionality
    this.route.queryParams.subscribe(params => {
      const familyId = params['familyId'];
      if (familyId) {
        this.loadFamilyDetails(familyId);
      } else if (this.dataService.family != undefined && this.dataService.family.id) {
        this.loadFamilyDetails(this.dataService.family.id);
      } else {
        // No family to load - redirect back to member list
        this.router.navigate(['/members/list']);
      }
    });
  }

  loadFamilyDetails(familyId: number | string) {
    this.isLoading = true;
    
    this.memberApi.getFamily(familyId).subscribe(
      (family: FamilyDTO) => {
        this.familyDTO = family;
        this.dataService.family = family; // Update data service for child components
        
        // Set family head name from first member if available
        if (family.memberDTOList && family.memberDTOList.length > 0) {
          const headMember = family.memberDTOList[0]; // Use first member as family head
          if (headMember.firstName || headMember.lastName) {
            this.familyHeadName = `${headMember.firstName || ''} ${headMember.lastName || ''}`.trim();
          }
        }
        
        this.initializeEmptyArrays();
        this.isLoading = false;
        console.log('Loaded family details:', family);
      },
      error => {
        console.error('Error loading family details:', error);
        this.showSnackBar('Error loading family details', 'Error');
        this.isLoading = false;
        // Initialize with empty arrays to prevent errors
        this.initializeEmptyArrays();
        // Also update data service with empty family to prevent errors
        this.dataService.family = this.familyDTO;
      }
    );
  }

  private initializeEmptyArrays() {
    // Initialize arrays to prevent console errors
    if (!this.familyDTO.memberDTOList) {
      this.familyDTO.memberDTOList = [];
    }
    if (!this.familyDTO.paymentDTOList) {
      this.familyDTO.paymentDTOList = [];
    }
    if (!this.familyDTO.attendanceDTOList) {
      this.familyDTO.attendanceDTOList = [];
    }
  }

  save() {
    if (!this.validateForm()) {
      return;
    }

    this.isSaving = true;
    
    // Clean up the family data before sending
    const familyToSave = this.prepareFamilyData();
    console.log('Saving family data:', JSON.stringify(familyToSave, null, 2));

    // Always update existing family (no create functionality)
    const saveOperation = this.memberApi.updateFamily(familyToSave);

    saveOperation.subscribe({
      next: (data: FamilyDTO) => {
        console.log('Family updated:', data);
        this.showSnackBar('Family updated successfully', 'Success');
        this.isSaving = false;
        
        // Navigate back to family list
        this.router.navigate(['/members/list']);
      },
      error: (error) => {
        console.error('Error saving family - Full error:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error body:', error.error);
        
        let errorMessage = 'Error saving family. Please try again.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        this.showSnackBar(errorMessage, 'Error');
        this.isSaving = false;
      }
    });
  }

  private prepareFamilyData(): FamilyDTO {
    // Create a clean copy of the family data for update
    const familyData: FamilyDTO = {
      id: this.familyDTO.id, // Always include ID for updates
      name: this.familyDTO.name?.trim(),
      addressDTO: {
        streetAddress1: this.familyDTO.addressDTO?.streetAddress1?.trim() || '',
        streetAddress2: this.familyDTO.addressDTO?.streetAddress2?.trim() || '',
        city: this.familyDTO.addressDTO?.city?.trim() || '',
        state: this.familyDTO.addressDTO?.state?.trim() || '',
        zipCode: this.familyDTO.addressDTO?.zipCode?.trim() || ''
      }
    };

    // Don't include the arrays for basic family save (they should be managed separately)
    // memberDTOList, paymentDTOList, attendanceDTOList will be excluded
    
    return familyData;
  }

  cancel() {
    // Navigate back to members list or previous page
    this.router.navigate(['/members/list']);
  }

  private validateForm(): boolean {
    if (!this.familyDTO.name || this.familyDTO.name.trim() === '') {
      this.showSnackBar('Family name is required', 'Validation Error');
      return false;
    }
    
    if (!this.familyDTO.addressDTO.streetAddress1 || this.familyDTO.addressDTO.streetAddress1.trim() === '') {
      this.showSnackBar('Street address is required', 'Validation Error');
      return false;
    }
    
    if (!this.familyDTO.addressDTO.city || this.familyDTO.addressDTO.city.trim() === '') {
      this.showSnackBar('City is required', 'Validation Error');
      return false;
    }
    
    return true;
  }

  private showSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
