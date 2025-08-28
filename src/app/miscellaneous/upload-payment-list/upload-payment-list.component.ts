import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/back-service/setting-service.service';
import { JobDTO } from 'src/app/back-service/model/jobDTO';

interface SearchCriteria {
  name: string;
  status: string;
}

@Component({
  selector: 'app-upload-payment-list',
  templateUrl: './upload-payment-list.component.html',
  styleUrls: ['./upload-payment-list.component.css']
})
export class UploadPaymentListComponent implements OnInit {
  searchResults: JobDTO[] = [];
  allJobs: JobDTO[] = [];
  isLoading: boolean = false;
  
  searchCriteria: SearchCriteria = {
    name: '',
    status: ''
  };

  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
    // Load initial data
    this.loadUploadPayments();
  }

  loadUploadPayments() {
    this.isLoading = true;
    
    this.settingService.jobStatus().subscribe({
      next: (jobs: JobDTO[]) => {
        console.log('Loaded jobs:', jobs);
        this.allJobs = jobs;
        this.searchResults = jobs;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading upload payments:', error);
        this.isLoading = false;
      }
    });
  }

  searchUploadPayments() {
    console.log('Searching with criteria:', this.searchCriteria);
    
    // Use server-side search if backend supports it, otherwise use client-side
    const useServerSideSearch = this.searchCriteria.name || this.searchCriteria.status;
    
    if (useServerSideSearch) {
      this.isLoading = true;
      this.settingService.searchJobs(
        this.searchCriteria.name,
        this.searchCriteria.status
      ).subscribe({
        next: (jobs: JobDTO[]) => {
          console.log('Server search results:', jobs);
          this.searchResults = jobs;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Server search failed, falling back to client-side:', error);
          // Fallback to client-side search
          this.performClientSideSearch();
          this.isLoading = false;
        }
      });
    } else {
      // No search criteria, show all results
      this.searchResults = this.allJobs;
    }
  }
  
  private performClientSideSearch() {
    let filteredJobs = this.allJobs;

    // Filter by name if provided
    if (this.searchCriteria.name && this.searchCriteria.name.trim()) {
      filteredJobs = filteredJobs.filter(job => 
        job.name.toLowerCase().includes(this.searchCriteria.name.toLowerCase())
      );
    }

    // Filter by status if provided
    if (this.searchCriteria.status && this.searchCriteria.status.trim()) {
      filteredJobs = filteredJobs.filter(job => 
        job.status === this.searchCriteria.status
      );
    }

    this.searchResults = filteredJobs;
    console.log('Client-side filtered results:', this.searchResults);
  }

  resetSearch() {
    this.searchCriteria = {
      name: '',
      status: ''
    };
    this.searchResults = this.allJobs;
    console.log('Search reset');
  }
}