import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/back-service/meeting-service.service';
import { MeetingDTO } from 'src/app/back-service/model/meetingDTO';

interface SearchCriteria {
  title: string;
  date: Date | null;
}

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {
  searchResults: MeetingDTO[] = [];
  allMeetings: MeetingDTO[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  
  searchCriteria: SearchCriteria = {
    title: '',
    date: null
  };

  constructor(
    private meetingService: MeetingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadAllMeetings();
  }

  loadAllMeetings() {
    this.isLoading = true;
    this.error = null;

    this.meetingService.getMeetingAll().subscribe({
      next: (meetings: MeetingDTO[]) => {
        console.log('Loaded meetings:', meetings);
        // Process date formatting as done in meeting-data-table component
        this.allMeetings = meetings.map(meeting => ({
          ...meeting,
          dateTime: Array.isArray(meeting.dateTime) 
            ? new Date(meeting.dateTime[0], meeting.dateTime[1] - 1, meeting.dateTime[2], meeting.dateTime[3], meeting.dateTime[4])
            : new Date(meeting.dateTime)
        }));
        this.searchResults = this.allMeetings;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading meetings:', error);
        this.error = 'Failed to load meetings. Please check if the backend is running.';
        this.isLoading = false;
      }
    });
  }

  searchMeetings() {
    console.log('Searching with criteria:', this.searchCriteria);
    
    const hasSearchCriteria = this.searchCriteria.title || this.searchCriteria.date;
    
    if (hasSearchCriteria) {
      this.isLoading = true;
      
      // Try server-side search first
      this.meetingService.searchMeetings(
        this.searchCriteria.title, 
        this.searchCriteria.date
      ).subscribe({
        next: (meetings: MeetingDTO[]) => {
          console.log('Server search results:', meetings);
          this.searchResults = meetings;
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
      this.searchResults = this.allMeetings;
    }
  }

  private performClientSideSearch() {
    let filteredMeetings = this.allMeetings;

    // Filter by title if provided
    if (this.searchCriteria.title && this.searchCriteria.title.trim()) {
      filteredMeetings = filteredMeetings.filter(meeting => 
        meeting.title.toLowerCase().includes(this.searchCriteria.title.toLowerCase())
      );
    }

    // Filter by date if provided
    if (this.searchCriteria.date) {
      const searchDate = new Date(this.searchCriteria.date);
      filteredMeetings = filteredMeetings.filter(meeting => {
        const meetingDate = new Date(meeting.dateTime);
        return (
          meetingDate.getFullYear() === searchDate.getFullYear() &&
          meetingDate.getMonth() === searchDate.getMonth() &&
          meetingDate.getDate() === searchDate.getDate()
        );
      });
    }

    this.searchResults = filteredMeetings;
    console.log('Client-side filtered results:', this.searchResults);
  }

  resetSearch() {
    this.searchCriteria = {
      title: '',
      date: null
    };
    this.searchResults = this.allMeetings;
    console.log('Search reset');
  }

  addNewMeeting() {
    this.router.navigateByUrl('meetings/new');
  }
}
