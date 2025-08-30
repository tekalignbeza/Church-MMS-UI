import { Component, Input, OnInit } from '@angular/core';
import { MeetingDTO } from 'src/app/back-service/model/meetingDTO';
import { MeetingService } from 'src/app/back-service/meeting-service.service';
import { DataService } from 'src/app/back-service/DataService/DataService';
import { Router, ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
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
    // Check if we have an ID in the route
    const meetingId = this.route.snapshot.paramMap.get('id');
    
    if (meetingId && meetingId !== 'new') {
      // Load meeting by ID from backend
      this.loadMeetingById(meetingId);
    } else if(this.dataService.meeting != undefined){
      // Use meeting from dataService if available
      this.meetingDTO = { ...this.dataService.meeting };
      console.log(JSON.stringify(this.meetingDTO));
      this.dataService.family = undefined;
      
      // Initialize date and time from meetingDTO
      if (this.meetingDTO.dateTime) {
        let date: Date;
        
        // Handle array format [year, month, day, hour, minute] from backend
        if (Array.isArray(this.meetingDTO.dateTime)) {
          const [year, month, day, hour, minute] = this.meetingDTO.dateTime as any;
          // Note: JavaScript months are 0-indexed, so subtract 1 from month
          date = new Date(year, month - 1, day, hour, minute);
        } else {
          // Handle normal date string format
          date = new Date(this.meetingDTO.dateTime);
        }
        
        this.meetingDate = date;
        // Use local hours for the time, not UTC
        const localHours = date.getHours();
        const localMinutes = date.getMinutes();
        this.meetingTime = `${String(localHours).padStart(2, '0')}:${String(localMinutes).padStart(2, '0')}`;
        
        // Convert array format to proper date string for consistent handling
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hoursStr = String(date.getHours()).padStart(2, '0');
        const minutesStr = String(date.getMinutes()).padStart(2, '0');
        this.meetingDTO.dateTime = `${year}-${month}-${day}T${hoursStr}:${minutesStr}:00` as any;
        
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

  private loadMeetingById(id: string) {
    this.isLoading = true;
    this.meetingApi.getMeetingById(id).subscribe({
      next: (meeting: MeetingDTO) => {
        this.meetingDTO = meeting;
        this.dataService.meeting = meeting;
        this.dataService.meetingId = meeting.id;
        
        // Initialize date and time from meetingDTO
        if (this.meetingDTO.dateTime) {
          let date: Date;
          
          // Handle array format [year, month, day, hour, minute] from backend
          if (Array.isArray(this.meetingDTO.dateTime)) {
            const [year, month, day, hour, minute] = this.meetingDTO.dateTime as any;
            // Note: JavaScript months are 0-indexed, so subtract 1 from month
            date = new Date(year, month - 1, day, hour, minute);
          } else {
            // Handle normal date string format
            date = new Date(this.meetingDTO.dateTime);
          }
          
          this.meetingDate = date;
          // Use local hours for the time, not UTC
          const localHours = date.getHours();
          const localMinutes = date.getMinutes();
          this.meetingTime = `${String(localHours).padStart(2, '0')}:${String(localMinutes).padStart(2, '0')}`;
          
          // Convert array format to proper date string for consistent handling
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const hoursStr = String(date.getHours()).padStart(2, '0');
          const minutesStr = String(date.getMinutes()).padStart(2, '0');
          this.meetingDTO.dateTime = `${year}-${month}-${day}T${hoursStr}:${minutesStr}:00` as any;
          
          // Update form with existing data
          this.meetingForm.patchValue({
            title: this.meetingDTO.title,
            cellPhone: this.meetingDTO.cellPhone,
            email: this.meetingDTO.email,
            date: this.meetingDate,
            time: this.meetingTime,
            address1: this.meetingDTO.address1,
            address2: this.meetingDTO.address2,
            city: this.meetingDTO.city,
            state: this.meetingDTO.state,
            zipCode: this.meetingDTO.zipCode,
            duration: this.meetingDTO.duration || 60,
            agenda: this.meetingDTO.agenda
          });
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading meeting:', error);
        this.isLoading = false;
        // Navigate back to list on error
        this.router.navigate(['/meetings/list']);
      }
    });
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
      
      // Create a new date from the selected date
      const combinedDate = new Date(this.meetingDate);
      
      // Set the time directly without creating intermediate Date objects
      // This preserves the local time without timezone conversions
      combinedDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      // Create a local ISO string that represents the exact time selected
      // without timezone conversion
      const year = combinedDate.getFullYear();
      const month = String(combinedDate.getMonth() + 1).padStart(2, '0');
      const day = String(combinedDate.getDate()).padStart(2, '0');
      const hoursStr = String(combinedDate.getHours()).padStart(2, '0');
      const minutesStr = String(combinedDate.getMinutes()).padStart(2, '0');
      
      // Format as local time string - this will be sent to backend
      const localISOString = `${year}-${month}-${day}T${hoursStr}:${minutesStr}:00`;
      
      // Log for debugging
      console.log('Selected time:', this.meetingTime);
      console.log('Combined DateTime (UTC):', combinedDate.toISOString());
      console.log('Local DateTime:', combinedDate.toLocaleString());
      console.log('Local ISO String (will be sent to backend):', localISOString);
      
      // Store the local ISO string as the dateTime
      // This prevents JSON.stringify from converting to UTC
      this.meetingDTO.dateTime = localISOString as any;
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

    // Ensure dateTime is properly set before saving
    this.updateDateTime();

    console.log('Meeting DTO being sent to backend:');
    console.log(JSON.stringify(this.meetingDTO));
    if (this.meetingDTO.dateTime) {
      // Check if dateTime is a string (as it should be after updateDateTime)
      if (typeof this.meetingDTO.dateTime === 'string') {
        const dt = new Date(this.meetingDTO.dateTime);
        console.log('DateTime breakdown:');
        console.log('- Local ISO String being sent:', this.meetingDTO.dateTime);
        console.log('- As Date object:', dt.toLocaleString());
        console.log('- Hours (24h):', dt.getHours());
        console.log('- Minutes:', dt.getMinutes());
      } else {
        console.log('Warning: dateTime is not a string, it might be in array format');
      }
    }
    
    // Check if we're updating or creating
    if (this.meetingDTO.id) {
      // Update existing meeting
      this.meetingApi.updateMeeting(this.meetingDTO).subscribe((data: {}) => {
        console.log('update meeting');
        this.router.navigate(['/meetings/list'])
      });
    } else {
      // Create new meeting
      this.meetingApi.createMeeting(this.meetingDTO).subscribe((data: {}) => {
        console.log('create meeting');
        this.router.navigate(['/meetings/list'])
      });
    }
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
