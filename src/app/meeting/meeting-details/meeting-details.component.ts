import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  meetingTimes = [
    {value: '1', viewValue: '9:00AM'},
    {value: '2', viewValue: '9:30AM'},
    {value: '3', viewValue: '10:AM'}
  ];

}
