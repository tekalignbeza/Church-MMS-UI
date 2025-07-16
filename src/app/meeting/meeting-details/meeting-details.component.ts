import { Component, Input, OnInit } from '@angular/core';
import { MeetingDTO } from 'src/app/back-service/model/meetingDTO';
import { MeetingService } from 'src/app/back-service/meeting-service.service';
import { DataService } from 'src/app/back-service/DataService/DataService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { empty } from 'rxjs';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit {

  constructor(public dataService:DataService, public router: Router,private meetingApi:MeetingService) {}

  @Input() meetingDTO: MeetingDTO = {
    title: '',
    cellPhone: '',
    email: '',
    dateTime: null,
    address1: '',
    city: '',
    state: '',
    zipCode: '',
    agenda: ''
  };
  ngOnInit() {
    if(this.dataService.meeting != undefined){
      this.meetingDTO = { ...this.dataService.meeting };
      console.log(JSON.stringify(this.meetingDTO));
      this.dataService.family = undefined;
    }else{
      this.dataService.family = undefined;
      this.dataService.meetingId = undefined;
    }
  }

  get formattedDateTime(): string {
    if(this.meetingDTO.dateTime!=null){
    const date = new Date(this.meetingDTO.dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
  }

  set formattedDateTime(value: string) {
    this.meetingDTO.dateTime = new Date(value);
  }

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
