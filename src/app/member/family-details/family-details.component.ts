import {Component, Input, OnInit} from '@angular/core';
import {FamilyDTO} from "../../back-service/model/familyDTO";
import {FormGroup} from "@angular/forms";
import {MemberServiceService} from "../../back-service/member-service.service";
import {Router, ActivatedRoute} from "@angular/router";
import {DataService} from "../../back-service/DataService/DataService";

@Component({
  selector: 'app-family-details',
  templateUrl: './family-details.component.html',
  styleUrls: ['./family-details.component.css']
})
export class FamilyDetailsComponent implements OnInit {
  
  isLoading: boolean = false;

  constructor(
    public dataService: DataService, 
    public router: Router, 
    private memberApi: MemberServiceService,
    private route: ActivatedRoute
  ) { }

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
    // Check if family ID is provided in query params or from data service
    this.route.queryParams.subscribe(params => {
      const familyId = params['familyId'];
      if (familyId) {
        this.loadFamilyDetails(familyId);
      } else if (this.dataService.family != undefined && this.dataService.family.id) {
        this.loadFamilyDetails(this.dataService.family.id);
      } else if (this.dataService.family != undefined) {
        // Fallback to data service family (for new family creation)
        this.familyDTO = this.dataService.family;
        this.initializeEmptyArrays();
      }
    });
  }

  private loadFamilyDetails(familyId: number | string) {
    this.isLoading = true;
    this.memberApi.getFamily(familyId).subscribe(
      (family: FamilyDTO) => {
        this.familyDTO = family;
        this.dataService.family = family; // Update data service for child components
        this.initializeEmptyArrays();
        this.isLoading = false;
        console.log('Loaded family details:', family);
      },
      error => {
        console.error('Error loading family details:', error);
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
