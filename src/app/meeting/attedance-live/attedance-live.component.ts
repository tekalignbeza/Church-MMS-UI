import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MemberServiceService } from 'src/app/back-service/member-service.service';
import { SettingService } from 'src/app/back-service/setting-service.service';
import { SettingDTO } from 'src/app/back-service/model/settingDTO';
import { AttendanceDTO, AttendanceFlag } from 'src/app/back-service/model/attendanceDTO';
import { MeetingService } from 'src/app/back-service/meeting-service.service';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
interface Member {
  barcode: number;
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
  @ViewChild('barcodeInput') barcodeInput!: ElementRef;
  @ViewChild('scanner') scanner!: ZXingScannerComponent;
  
  currentFlag: string | null = null;
  scannedMembers: Member[] = [];
  dataSource = new MatTableDataSource<Member>(this.scannedMembers);
  displayedColumns: string[] = ['barcode', 'firstName', 'lastName', 'flag'];
  meetingTitle = "";
  meetingContact = "";
  meetingId;
  yearcont;
  mincont;
  setting: SettingDTO[];
  isLoading: boolean = false;

  // Camera scanner properties
  isCameraEnabled = false;
  hasDevices = false;
  availableDevices: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | null = null;
  allowedFormats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E
  ];
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
    
    // Initialize camera devices
    this.initializeCameraDevices();
  }

  initializeCameraDevices(): void {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        this.availableDevices = devices.filter(device => device.kind === 'videoinput');
        this.hasDevices = this.availableDevices.length > 0;
        
        if (this.hasDevices) {
          // Try to find back camera for mobile, otherwise use first available
          const backCamera = this.availableDevices.find(device => 
            device.label.toLowerCase().includes('back') || 
            device.label.toLowerCase().includes('rear')
          );
          this.selectedDevice = backCamera || this.availableDevices[0];
          console.log('Available cameras:', this.availableDevices.length);
        } else {
          console.warn('No camera devices found');
        }
      })
      .catch(err => {
        console.error('Error accessing camera devices:', err);
        this.hasDevices = false;
      });
  }

  onScan(barcode: string): void {
    this.memberApi.getMember(barcode).subscribe(
      response => {       
        this.currentFlag = response.membershipPayment;
        let flag = this.currentFlag;
        const existingMemberIndex = this.scannedMembers.findIndex(member => member.barcode === response.id);

        if (existingMemberIndex !== -1) {
          this.scannedMembers[existingMemberIndex].flag = flag;
        } else {
          this.scannedMembers.push({
            barcode: response.id,
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
        this.barcodeInput.nativeElement.value = '';

        // Refocus on the input text box after 2 seconds
        setTimeout(() => {
          this.currentFlag = null;
          this.barcodeInput.nativeElement.focus();
        }, 2000);
      });
  }

  saveAttendance(attendanceDTO:AttendanceDTO){
    this.meetingApi.createAttedance(attendanceDTO).subscribe((data: {}) => {
      console.log('create attedance');});
  }

  onManualSearch(): void {
    const inputValue = this.barcodeInput.nativeElement.value.trim();
    if (inputValue) {
      console.log('Manual search with ID:', inputValue);
      this.onScan(inputValue);
    } else {
      console.warn('No ID entered for manual search');
    }
  }

  onReset(): void {
    this.scannedMembers = [];
    this.dataSource.data = this.scannedMembers;
    this.barcodeInput.nativeElement.value = '';
    this.currentFlag = null;
    console.log('Attendance data reset');
  }

  // Camera scanner methods
  toggleCamera(): void {
    this.isCameraEnabled = !this.isCameraEnabled;
    console.log('Camera enabled:', this.isCameraEnabled);
  }

  onCameraScan(result: string): void {
    console.log('Camera scan result:', result);
    this.onScan(result);
    // Optionally disable camera after successful scan
    // this.isCameraEnabled = false;
  }

  onScanError(error: any): void {
    console.error('Scanner error:', error);
  }

  onScanFailure(error: any): void {
    console.warn('Scanner failure:', error);
  }

  onScanComplete(result: any): void {
    console.log('Scan complete:', result);
  }

  onCameraChange(device: MediaDeviceInfo): void {
    this.selectedDevice = device;
    console.log('Camera changed to:', device.label);
  }
}
