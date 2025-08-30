import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberServiceService } from 'src/app/back-service/member-service.service';
import { MeetingService } from 'src/app/back-service/meeting-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  memberCount = 0;
  familyCount = 0;
  upcomingMeetings = 0;
  isLoading = true;

  constructor(
    private router: Router,
    private memberService: MemberServiceService,
    private meetingService: MeetingService
  ) { }

  ngOnInit() {
    this.loadDashboardCounts();
  }

  loadDashboardCounts() {
    this.isLoading = true;
    
    // Load member count
    this.memberService.getMemberCount().subscribe({
      next: (count) => {
        this.memberCount = count;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading member count:', error);
        this.memberCount = 0;
        this.checkLoadingComplete();
      }
    });

    // Load family count
    this.memberService.getFamilyCount().subscribe({
      next: (count) => {
        this.familyCount = count;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading family count:', error);
        this.familyCount = 0;
        this.checkLoadingComplete();
      }
    });

    // Load upcoming meetings count
    this.meetingService.getUpcomingMeetingCount().subscribe({
      next: (count) => {
        this.upcomingMeetings = count;
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading upcoming meetings count:', error);
        this.upcomingMeetings = 0;
        this.checkLoadingComplete();
      }
    });
  }

  private loadingCounter = 0;
  
  checkLoadingComplete() {
    this.loadingCounter++;
    if (this.loadingCounter >= 3) {
      this.isLoading = false;
    }
  }

  navigateToMembers() {
    this.router.navigate(['/members/list']);
  }

  navigateToMeetings() {
    this.router.navigate(['/meetings/list']);
  }


  navigateToMiscellaneous() {
    this.router.navigate(['/miscellaneous/uploadPaymentList']);
  }


}
