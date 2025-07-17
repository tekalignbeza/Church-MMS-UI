import { Component, Input, OnInit } from '@angular/core';
import { MeetingDTO } from 'src/app/back-service/model/meetingDTO';
import { MeetingService } from 'src/app/back-service/meeting-service.service';
import { DataService } from 'src/app/back-service/DataService/DataService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { empty } from 'rxjs';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit {

  meetingDate: Date;
  meetingTime: string;
  meetingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dataService: DataService, 
    public router: Router,
    private meetingApi: MeetingService,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-US');
    this.initForm();
  }

  private initForm() {
    this.meetingForm = this.fb.group({
      title: ['', [Validators.required]],
      cellPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      date: [null, [Validators.required]],
      time: [null, [Validators.required]],
      address1: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
      agenda: ['', [Validators.required]]
    });
  }

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
      
      // Initialize date and time from meetingDTO
      if (this.meetingDTO.dateTime) {
        const date = new Date(this.meetingDTO.dateTime);
        this.meetingDate = date;
        this.meetingTime = this.formatTime(date);
        
        // Update form with existing data
        this.meetingForm.patchValue({
          title: this.meetingDTO.title,
          cellPhone: this.meetingDTO.cellPhone,
          email: this.meetingDTO.email,
          date: this.meetingDate,
          time: this.meetingTime,
          address1: this.meetingDTO.address1,
          city: this.meetingDTO.city,
          state: this.meetingDTO.state,
          zipCode: this.meetingDTO.zipCode,
          agenda: this.meetingDTO.agenda
        });
      }
    }else{
      this.dataService.family = undefined;
      this.dataService.meetingId = undefined;
    }
  }

  // Getter methods for form controls - used in template for validation
  get f() { return this.meetingForm.controls; }

  formatTime(date: Date): string {
    return date.toTimeString().substring(0, 5); // Returns HH:mm format
  }

  onDateChange(date: Date) {
    this.meetingDate = date;
    this.meetingForm.patchValue({ date: date });
    this.updateDateTime();
  }

  onTimeChange(time: string) {
    this.meetingTime = time;
    this.meetingForm.patchValue({ time: time });
    this.updateDateTime();
  }

  updateDateTime() {
    if (this.meetingDate && this.meetingTime) {
      const [hours, minutes] = this.meetingTime.split(':');
      const date = new Date(this.meetingDate);
      date.setHours(parseInt(hours), parseInt(minutes));
      this.meetingDTO.dateTime = date;
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
    if (this.meetingForm.invalid) {
      Object.keys(this.meetingForm.controls).forEach(key => {
        const control = this.meetingForm.get(key);
        if (control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    // Update meetingDTO with form values
    this.meetingDTO.title = this.f['title'].value;
    this.meetingDTO.cellPhone = this.f['cellPhone'].value;
    this.meetingDTO.email = this.f['email'].value;
    this.meetingDTO.address1 = this.f['address1'].value;
    this.meetingDTO.city = this.f['city'].value;
    this.meetingDTO.state = this.f['state'].value;
    this.meetingDTO.zipCode = this.f['zipCode'].value;
    this.meetingDTO.agenda = this.f['agenda'].value;

    console.log(JSON.stringify(this.meetingDTO));
    this.meetingApi.createMeeting(this.meetingDTO).subscribe((data: {}) => {
      console.log('create meeting');
      this.router.navigate(['/meeting/list'])
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.f[controlName];
    if (!control) return '';
    
    if (control.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
    }
    if (control.hasError('email')) {
      return 'Invalid email address';
    }
    if (control.hasError('pattern')) {
      switch(controlName) {
        case 'cellPhone':
          return 'Phone number must be 10 digits';
        case 'zipCode':
          return 'Invalid ZIP code format';
        default:
          return 'Invalid format';
      }
    }
    return '';
  }

  cancel() {
    this.router.navigate(['/meeting/list']);
  }

}
