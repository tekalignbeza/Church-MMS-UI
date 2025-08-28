import {Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {AttendanceDTO} from "../../back-service/model/attendanceDTO";
import {MeetingDTO} from "../../back-service/model/meetingDTO";
import {DataService} from "../../back-service/DataService/DataService";
import {Router} from "@angular/router";
import { MeetingService } from 'src/app/back-service/meeting-service.service';

@Component({
  selector: 'app-meeting-data-table',
  templateUrl: './meeting-data-table.component.html',
  styleUrls: ['./meeting-data-table.component.css']
})
export class MeetingDataTableComponent implements OnInit, OnChanges {

  displayedColumns: string[] = ['title', 'dateTime','address1','attedance'];
  @Input() dataSource: MeetingDTO[] = [];
  loading = false;
  error: string | null = null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    // Only load if no data is provided via input
    if (this.dataSource.length === 0) {
      this.load();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {
      console.log('Meeting data source updated:', this.dataSource);
    }
  }
  constructor(private meetingService :MeetingService, private _snackBar: MatSnackBar,private dataService:DataService,private router:Router) {}
  openSnackBar() {
    this.showSnackBar("Meeting removed from list","Remove Meeting");
  }

  showSnackBar(message:string, action:string):void{
    this._snackBar.open(message,action, {
      duration: 2000,
    });
  }

  getRecord(row: MeetingDTO) {
    this.dataService.meeting = row;
    this.dataService.meetingId = row.id;
    this.showSnackBar("Edit Meeting","Edit Meeting");
    this.router.navigateByUrl("meetings/new")
  }

  public load() {
    this.loading = true;
    this.error = null;
    console.log('Loading meetings from:', this.meetingService.meetingUrl + 'all');
    
    this.meetingService.getMeetingAll().subscribe({
      next: (data) => {
        console.log('Received meeting data:', data);
        this.dataSource = data.map(meeting => ({
          ...meeting,
          dateTime: Array.isArray(meeting.dateTime) 
            ? new Date(meeting.dateTime[0], meeting.dateTime[1] - 1, meeting.dateTime[2], meeting.dateTime[3], meeting.dateTime[4])
            : new Date(meeting.dateTime) // Handle normal date strings too
        }));
        this.loading = false;
        this.showSnackBar(`Loaded ${data.length} meetings`, "Success");
      },
      error: (error) => {
        console.error('Error loading meetings:', error);
        this.error = 'Failed to load meetings. Please check if the backend is running.';
        this.loading = false;
        this.showSnackBar("Failed to load meetings", "Error");
      }
    });
  }
  takeAttendace(meeting: MeetingDTO) {
    this.router.navigateByUrl("meetings/attedance")
    this.router.navigate(['meetings/attedance'], { queryParams: { id: meeting.id, title: meeting.title, contact:meeting.cellPhone } });
  }
  public addNew(){
    this.dataService.meeting = undefined;
    this.dataService.meetingId = undefined;
    this.router.navigateByUrl("meetings/new")
  }
}
