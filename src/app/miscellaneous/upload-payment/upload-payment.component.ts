import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingService } from 'src/app/back-service/setting-service.service';
import { JobDTO } from 'src/app/back-service/model/jobDTO';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-upload-payment',
  templateUrl: './upload-payment.component.html',
  styleUrls: ['./upload-payment.component.css']
})
export class UploadPaymentComponent implements OnInit{
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  isNew: boolean = true;
  isUploading: boolean = false;
  isFormSubmitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UploadPaymentComponent>,
    private settingService: SettingService,
    private dateAdapter: DateAdapter<Date>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: JobDTO
  ) {
    this.dateAdapter.setLocale('en-US');
    
    // Initialize reactive form with validation
    this.uploadForm = this.formBuilder.group({
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required, this.dateRangeValidator.bind(this)]]
    });
  }

  // Custom validator to ensure start date is before end date
  dateRangeValidator(control: any): any {
    if (!this.uploadForm) return null;
    
    const fromDate = this.uploadForm.get('fromDate')?.value;
    const toDate = control.value;
    
    if (fromDate && toDate) {
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);
      
      if (startDate >= endDate) {
        return { dateRange: true };
      }
    }
    return null;
  }

  ngOnInit() {
    // Set up cross-field validation
    this.uploadForm.get('fromDate')?.valueChanges.subscribe(() => {
      this.uploadForm.get('toDate')?.updateValueAndValidity();
    });

    if (this.data && this.data.jobId) {
      // Editing existing upload - use jobId instead of id
      this.isNew = false;
      this.uploadForm.patchValue({
        fromDate: this.data.fromDate ? new Date(this.data.fromDate) : '',
        toDate: this.data.toDate ? new Date(this.data.toDate) : ''
      });
    } else {
      this.isNew = true;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      
      // Validate file type
      const allowedTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      if (!allowedTypes.includes(this.selectedFile.type)) {
        this.showError('Please select a valid Excel file (.xls or .xlsx)');
        this.selectedFile = null;
        input.value = '';
      }
    }
  }

  uploadFile(): void {
    this.isFormSubmitted = true;
    
    // Check form validity
    if (this.uploadForm.invalid) {
      this.markFormGroupTouched(this.uploadForm);
      this.showError('Please fill all required fields correctly');
      return;
    }

    // Check if file is selected
    if (!this.selectedFile) {
      this.showError('Please select an Excel file');
      return;
    }

    this.isUploading = true;
    const formValue = this.uploadForm.value;
    
    // Format dates for backend
    const fromDate = this.formatDateForBackend(formValue.fromDate);
    const toDate = this.formatDateForBackend(formValue.toDate);

    this.settingService.ingestFile(this.selectedFile, fromDate, toDate)
      .subscribe({
        next: (response) => {
          console.log('Upload successful:', response);
          this.showSuccess('File uploaded successfully');
          this.dialogRef.close(true); // Return true to indicate success
        },
        error: (error) => {
          console.error('Upload failed:', error);
          this.showError('Upload failed. Please try again.');
          this.isUploading = false;
        },
        complete: () => {
          this.isUploading = false;
        }
      });
  }

  cancel() {
    this.dialogRef.close(false);
  }

  private formatDateForBackend(date: Date): string {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
