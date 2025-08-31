import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MemberServiceService } from 'src/app/back-service/member-service.service';
import { SettingService } from 'src/app/back-service/setting-service.service';
import { SettingDTO } from 'src/app/back-service/model/settingDTO';
import { AttendanceDTO, AttendanceFlag } from 'src/app/back-service/model/attendanceDTO';
import { MeetingService } from 'src/app/back-service/meeting-service.service';
interface Member {
  memberId: number;
  firstName: string;
  lastName: string;
  flag: string;
}




@Component({
  selector: 'app-attedance-live',
  templateUrl: './attedance-live.component.html',
  styleUrls: ['./attedance-live.component.css']
})
export class AttedanceLiveComponent implements OnInit {
  @ViewChild('memberIdInput') memberIdInput!: ElementRef;
  
  currentFlag: string | null = null;
  scannedMembers: Member[] = [];
  dataSource = new MatTableDataSource<Member>(this.scannedMembers);
  displayedColumns: string[] = ['memberId', 'firstName', 'lastName', 'flag'];
  meetingTitle = "";
  meetingContact = "";
  meetingId;
  yearcont;
  mincont;
  setting: SettingDTO[];
  isLoading: boolean = false;

  constructor(private http: HttpClient,private route: ActivatedRoute,private memberApi:MemberServiceService,private settingApi:SettingService, private meetingApi:MeetingService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.meetingId = Number(params.id);
      this.meetingTitle = params.title;
      this.meetingContact = params.contact;
      this.settingApi.getSetting().subscribe((settings: SettingDTO[]) => {
        settings.forEach(setting => {
          if (setting.settingKey === 'YEARLY_CONTRIBUTION') {
            this.yearcont = setting.value ? Number(setting.value) : 0;
          } else if (setting.settingKey === 'MINIMUM_YEARLY_CONTRIBUTION') {
            this.mincont = setting.value ? Number(setting.value) : 0;
          }
        });
      });
    });
  }

  onSearch(memberId: string): void {
    this.memberApi.getMember(memberId).subscribe(
      response => {       
        this.currentFlag = response.membershipPayment;
        let flag = this.currentFlag;
        const existingMemberIndex = this.scannedMembers.findIndex(member => member.memberId === response.id);

        if (existingMemberIndex !== -1) {
          this.scannedMembers[existingMemberIndex].flag = flag;
        } else {
          this.scannedMembers.push({
            memberId: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            flag: flag
          });
          var attedance = {
            familyId: response.family.id as number,
            meetingId: this.meetingId as number,
            memberBarCode: response.id as number,
            flag: flag as AttendanceFlag
          };
          this.saveAttendance(attedance);
        }

        // Update the dataSource with the modified scannedMembers array
        this.dataSource.data = this.scannedMembers;

        // Clear the input text box
        if (this.memberIdInput) {
          this.memberIdInput.nativeElement.value = '';
        }

        // Refocus on the input text box after 2 seconds
        setTimeout(() => {
          this.currentFlag = null;
          if (this.memberIdInput) {
            this.memberIdInput.nativeElement.focus();
          }
        }, 2000);
      });
  }

  saveAttendance(attendanceDTO:AttendanceDTO){
    this.meetingApi.createAttedance(attendanceDTO).subscribe((data: {}) => {
      console.log('create attedance');});
  }

  onManualSearch(inputValue?: string): void {
    const value = inputValue || (this.memberIdInput ? this.memberIdInput.nativeElement.value.trim() : '');
    if (value) {
      console.log('Manual search with ID:', value);
      this.onSearch(value);
    } else {
      console.warn('No ID entered for manual search');
    }
  }

  onReset(): void {
    this.scannedMembers = [];
    this.dataSource.data = this.scannedMembers;
    if (this.memberIdInput) {
      this.memberIdInput.nativeElement.value = '';
    }
    this.currentFlag = null;
    console.log('Attendance data reset');
  }

}
