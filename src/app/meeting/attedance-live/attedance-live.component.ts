import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

interface Member {
  barcode: string;
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
  currentFlag: string | null = null;
  scannedMembers: Member[] = [];
  dataSource = new MatTableDataSource<Member>(this.scannedMembers);
  displayedColumns: string[] = ['barcode', 'firstName', 'lastName', 'flag'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onScan(barcode: string): void {
    this.http.get<any>(`http://localhost:8080/member/${barcode}`)
      .subscribe(response => {
        const paymentPercentage = response.membershipPayment/1200;
        let flag: string;

        if (paymentPercentage > .80) {
          flag = 'green';
        } else if (paymentPercentage >= .50) { 
          flag = 'yellow';
        } else {
          flag = 'red';
        }

        this.currentFlag = flag;

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
}
