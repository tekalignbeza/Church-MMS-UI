import { Component, Input, OnInit } from '@angular/core';
import { MeetingDTO } from 'src/app/back-service/model/meetingDTO';
import { MeetingService } from 'src/app/back-service/meeting-service.service';
import { DataService } from 'src/app/back-service/DataService/DataService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit {

  constructor(public dataService:DataService, public router: Router,private meetingApi:MeetingService) {}

  @Input() meetingDTO:MeetingDTO = {}
  ngOnInit() {
    
  }

  meetingTimes = [
    {value: '1', viewValue: '9:00AM'},
    {value: '2', viewValue: '9:30AM'},
    {value: '3', viewValue: '10:AM'}
  ];

  save() {
    console.log(JSON.stringify(this.meetingDTO));
    this.meetingApi.createMeeting(this.meetingDTO).subscribe((data: {}) => {
      console.log('create meeting');
      this.router.navigate(['/meeting/list'])
    });
  }

  cancel() {
    this.router.navigate(['/meeting/list']);
  }

}
