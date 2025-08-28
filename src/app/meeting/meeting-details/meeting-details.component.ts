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
  isLoading: boolean = false;
  attendanceList: any[] = [];

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
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      cellPhone: ['', [
        Validators.pattern('^\\+?[1-9]\\d{1,14}$')
      ]],
      email: ['', [
        Validators.email
      ]],
      date: [null, [Validators.required]],
      time: [null, [Validators.required]],
      address1: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      address2: ['', [
        Validators.maxLength(100)
      ]],
      city: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      state: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      zipCode: ['', [
        Validators.required,
        Validators.pattern('^\\d{5}(-\\d{4})?$')
      ]],
      duration: [60, [
        Validators.min(15)
      ]],
      agenda: ['', [
        Validators.maxLength(500)
      ]]
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
    duration: 60,
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
          duration: this.meetingDTO.duration || 60,
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
      
      const localDate = new Date(date);
      localDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      this.meetingDTO.dateTime = localDate;
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
    this.meetingDTO.duration = this.f['duration'].value;
    this.meetingDTO.agenda = this.f['agenda'].value;

    console.log(JSON.stringify(this.meetingDTO));
    this.meetingApi.createMeeting(this.meetingDTO).subscribe((data: {}) => {
      console.log('create meeting');
      this.router.navigate(['/meetings/list'])
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.f[controlName];
    if (!control || !control.errors) return '';
    
    if (control.hasError('required')) {
      return `${this.getFieldDisplayName(controlName)} is required`;
    }
    if (control.hasError('email')) {
      return 'Please provide a valid email address';
    }
    if (control.hasError('pattern')) {
      switch(controlName) {
        case 'cellPhone':
          return 'Please provide a valid phone number';
        case 'zipCode':
          return 'Please provide a valid zip code (12345 or 12345-6789)';
        default:
          return 'Invalid format';
      }
    }
    if (control.hasError('minlength')) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `${this.getFieldDisplayName(controlName)} must be at least ${requiredLength} characters`;
    }
    if (control.hasError('maxlength')) {
      const requiredLength = control.errors['maxlength'].requiredLength;
      return `${this.getFieldDisplayName(controlName)} cannot exceed ${requiredLength} characters`;
    }
    if (control.hasError('min')) {
      const minValue = control.errors['min'].min;
      return `${this.getFieldDisplayName(controlName)} must be at least ${minValue}`;
    }
    return '';
  }

  private getFieldDisplayName(controlName: string): string {
    const fieldNames: { [key: string]: string } = {
      title: 'Title',
      cellPhone: 'Phone number',
      email: 'Email',
      address1: 'Address',
      address2: 'Address line 2',
      city: 'City',
      state: 'State',
      zipCode: 'Zip code',
      duration: 'Duration',
      agenda: 'Agenda',
      date: 'Date',
      time: 'Time'
    };
    return fieldNames[controlName] || controlName;
  }

  cancel() {
    this.router.navigate(['/meetings/list']);
  }

}
