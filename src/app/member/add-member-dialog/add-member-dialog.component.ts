import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MemberServiceService } from '../../back-service/member-service.service';
import { MemberDTO } from '../../back-service/model/memberDTO';
import { FamilyDTO } from '../../back-service/model/familyDTO';

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.css']
})
export class AddMemberDialogComponent implements OnInit {
  memberData: MemberDTO;
  isSaving = false;
  currentYear = new Date().getFullYear();

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
      yearOfBirth: new Date().getFullYear() - 30,
      familyHead: false,
      spouse: false,
      family: {
        id: data.familyId,
        name: data.familyName
      } as FamilyDTO,
      userDTO: {
        email: ''
      }
    } as MemberDTO;
  }

  ngOnInit(): void {
  }

  isFormValid(): boolean {
    return !!(
      this.memberData.firstName?.trim() &&
      this.memberData.middleName?.trim() &&
      this.memberData.lastName?.trim() &&
      this.memberData.cellPhone?.trim()
    );
  }

  onSave(): void {
    if (!this.isFormValid()) {
      this.showSnackBar('Please fill all required fields', 'Error');
      return;
    }

    this.isSaving = true;

    // Update user object with email
    if (this.memberData.userDTO) {
      this.memberData.userDTO.email = this.memberData.email || '';
    }

    // Ensure yearOfBirth has a valid value (can't be null for primitive int)
    if (!this.memberData.yearOfBirth || this.memberData.yearOfBirth <= 0) {
      this.memberData.yearOfBirth = new Date().getFullYear() - 30;
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