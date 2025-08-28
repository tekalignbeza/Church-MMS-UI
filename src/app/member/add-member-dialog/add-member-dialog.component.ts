import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MemberServiceService } from '../../back-service/member-service.service';
import { MemberDTO } from '../../back-service/model/memberDTO';
import { FamilyDTO } from '../../back-service/model/familyDTO';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.css']
})
export class AddMemberDialogComponent implements OnInit, OnDestroy {
  memberData: MemberDTO;
  isSaving = false;
  currentYear = new Date().getFullYear();
  phoneNumberExists = false;
  checkingPhone = false;
  private phoneCheckSubject = new Subject<string>();

  constructor(
    public dialogRef: MatDialogRef<AddMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { familyId: number, familyName: string },
    private memberService: MemberServiceService,
    private snackBar: MatSnackBar
  ) {
    // Initialize member data with default values
    this.memberData = {
      id: 0,
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      cellPhone: '',
      gender: 'MALE',
      yearOfBirth: null,
      familyHead: false,
      spouse: false,
      family: {
        id: data.familyId,
        name: data.familyName
      } as FamilyDTO,
      userDTO: null
    } as MemberDTO;
  }

  ngOnInit(): void {
    // Set up phone number validation with debouncing
    this.phoneCheckSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(phone => {
        if (!phone || phone.trim().length === 0) {
          this.phoneNumberExists = false;
          this.checkingPhone = false;
          return [];
        }
        this.checkingPhone = true;
        const searchCriteria = { cellPhone: phone.trim() };
        return this.memberService.searchMember(searchCriteria);
      })
    ).subscribe({
      next: (members) => {
        this.phoneNumberExists = members && members.length > 0;
        this.checkingPhone = false;
      },
      error: (error) => {
        console.error('Error checking phone number:', error);
        this.checkingPhone = false;
        this.phoneNumberExists = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.phoneCheckSubject.complete();
  }

  isFormValid(): boolean {
    return !!(
      this.memberData.firstName?.trim() &&
      this.memberData.middleName?.trim() &&
      this.memberData.lastName?.trim() &&
      this.memberData.cellPhone?.trim() &&
      !this.phoneNumberExists
    );
  }

  onPhoneNumberChange(): void {
    this.phoneCheckSubject.next(this.memberData.cellPhone || '');
  }

  onSave(): void {
    if (!this.isFormValid()) {
      this.showSnackBar('Please fill all required fields', 'Error');
      return;
    }

    this.isSaving = true;

    // No need to create user account for family members
    this.memberData.userDTO = null;

    // Ensure yearOfBirth has a valid value (can't be null for primitive int)
    if (!this.memberData.yearOfBirth || this.memberData.yearOfBirth <= 0) {
      this.memberData.yearOfBirth = 1990; // Default year if not provided
    }

    console.log('Sending member data:', this.memberData);

    // Call API to add member to family
    this.memberService.addMemberToFamily(this.data.familyId, this.memberData).subscribe({
      next: (response) => {
        this.showSnackBar('Member added successfully', 'Success');
        this.dialogRef.close({ success: true, data: response });
      },
      error: (error) => {
        console.error('Error adding member:', error);
        const errorMessage = error?.error?.message || 'Error adding member. Please try again.';
        this.showSnackBar(errorMessage, 'Error');
        this.isSaving = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close({ success: false });
  }

  private showSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}