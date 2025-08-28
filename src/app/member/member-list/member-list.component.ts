import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberServiceService } from '../../back-service/member-service.service';
import { MemberDTO } from '../../back-service/model/memberDTO';
import { MemberSearchCriteriaDTO } from '../../back-service/model/memberSearchCriteriaDTO';
import { DataService } from '../../back-service/DataService/DataService';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MemberDataTableComponent } from '../member-data-table/member-data-table.component';
import { PageDTO } from '../../back-service/model/pageDTO';
import { FamilyDTO } from '../../back-service/model/familyDTO';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  @ViewChild(MemberDataTableComponent, {static: false}) memberDataTable: MemberDataTableComponent;
  searchForm: FormGroup;
  searchResults: MemberDTO[] = [];
  currentPage: number = 0;
  pageSize: number = 20;
  totalElements: number = 0;
  isLoading: boolean = false;

  constructor(
    private memberService: MemberServiceService,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      id: [''],
      generalSearch: ['']
    });
    
    // Load all members initially
    this.loadAllMembers();
  }

  searchMembers() {
    const idValue = this.searchForm.get('id').value;
    const generalSearchValue = this.searchForm.get('generalSearch').value;

    // Convert to string and trim, handling null/undefined values
    const id = idValue ? String(idValue).trim() : '';
    const generalSearch = generalSearchValue ? String(generalSearchValue).trim() : '';

    console.log('Search form values:', { id, generalSearch });

    let searchCriteria: MemberSearchCriteriaDTO = {};
    let hasSearchCriteria = false;

    // Add search fields
    if (id && id !== '') {
      const parsedId = parseInt(id);
      if (!isNaN(parsedId)) {
        searchCriteria.id = parsedId;
        hasSearchCriteria = true;
        console.log('Adding ID to search criteria:', parsedId);
      } else {
        console.warn('Invalid ID entered:', id);
      }
    }
    if (generalSearch && generalSearch !== '') {
      searchCriteria.generalSearch = generalSearch;
      hasSearchCriteria = true;
      console.log('Adding general search to criteria:', generalSearch);
    }

    console.log('Final search criteria:', searchCriteria);

    if (!hasSearchCriteria) {
      // If no criteria provided, load all members
      this.loadAllMembers();
      return;
    }

    this.isLoading = true;
    console.log('Sending search request with criteria:', searchCriteria);
    this.memberService.searchMember(searchCriteria).subscribe(
      (data: MemberDTO[]) => {
        console.log('Search results received:', data);
        this.searchResults = data;
        this.totalElements = data.length; // Set total for search results
        this.isLoading = false;
      },
      error => {
        console.error('Error searching members:', error);
        this.isLoading = false;
        this.searchResults = [];
      }
    );
  }

  resetSearch() {
    this.searchForm.reset();
    this.loadAllMembers();
  }

  loadAllMembers(page: number = 0) {
    this.isLoading = true;
    this.currentPage = page;
    
    // Load members using paginated family data for better performance
    this.memberService.getFamilyListPaginated(page, this.pageSize).subscribe(
      (pageData: PageDTO<FamilyDTO>) => {
        const allMembers: MemberDTO[] = [];
        pageData.content.forEach(family => {
          if (family.memberDTOList && family.memberDTOList.length > 0) {
            allMembers.push(...family.memberDTOList);
          }
        });
        
        this.searchResults = allMembers;
        this.totalElements = pageData.totalElements;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading members with pagination:', error);
        // Fallback: try the old method
        this.loadAllMembersLegacy();
      }
    );
  }

  loadAllMembersLegacy() {
    this.isLoading = true;
    
    // Fallback method using the legacy endpoint
    this.memberService.getFamilyList().subscribe(
      (families: any[]) => {
        const allMembers: MemberDTO[] = [];
        families.forEach(family => {
          if (family.memberDTOList && family.memberDTOList.length > 0) {
            allMembers.push(...family.memberDTOList);
          }
        });
        
        this.searchResults = allMembers;
        this.totalElements = allMembers.length; // Set total for legacy
        this.isLoading = false;
      },
      error => {
        console.error('Error loading members:', error);
        this.tryWildcardSearch();
      }
    );
  }

  onPageChange(event: any) {
    console.log('Page change event:', event);
    this.pageSize = event.pageSize;
    this.loadAllMembers(event.pageIndex);
  }

  onMemberAdded() {
    // Refresh current page when a member is added
    this.loadAllMembers(this.currentPage);
  }

  private tryWildcardSearch() {
    // Try searching with a single character that might match many records
    const wildcardCriteria: MemberSearchCriteriaDTO = {
      firstName: "" // Empty string might work
    };
    this.memberService.searchMember(wildcardCriteria).subscribe(
      (data: MemberDTO[]) => {
        this.searchResults = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error with wildcard search:', error);
        // As last resort, show empty results
        this.searchResults = [];
        this.isLoading = false;
      }
    );
  }

}