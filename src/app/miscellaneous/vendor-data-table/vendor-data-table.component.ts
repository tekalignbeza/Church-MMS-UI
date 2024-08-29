import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {AttendanceDetailsComponent} from "../../meeting/attendance-details/attendance-details.component";
import {VendorDTO} from "../../back-service/model/vendorDTO";
import {DataService} from "../../back-service/DataService/DataService";
import {Router} from "@angular/router";

const ELEMENT_DATA: VendorDTO[] = [{
  name: "Georgia Power",
  addressDTO: {
    city: "Norcross",
    state: "GA",
    streetAddress1: "2423 Hava ",
    zipCode: "3009"
  },
id: 1,
},
  {
    name: "Georgia water",
    addressDTO: {
      city: "Norcross",
      state: "GA",
      streetAddress1: "2423 Hava ",
      zipCode: "3009"
    },
    id: 2,
  },{
    name: "Priest X",
    addressDTO: {
      city: "Norcross",
      state: "GA",
      streetAddress1: "2423 Hava ",
      zipCode: "3009"
    },
    id: 3,
  },
  {
    name: "Clarkston Police",
    addressDTO: {
      city: "Norcross",
      state: "GA",
      streetAddress1: "2423 Hava ",
      zipCode: "3009"
    },
    id: 4,
  }];
@Component({
  selector: 'app-vendor-data-table',
  templateUrl: './vendor-data-table.component.html',
  styleUrls: ['./vendor-data-table.component.css']
})
export class VendorDataTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'id', 'streetAddress1', 'city', 'state'];
  dataSource = new MatTableDataSource<VendorDTO>(ELEMENT_DATA);
  vendorDTO: VendorDTO;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private _snackBar: MatSnackBar, private dataService:DataService,private router:Router) {
  }

  openSnackBar() {
    this.showSnackBar("Member removed from family", "Remove");
  }

  showSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getRecord(row: VendorDTO) {
    this.dataService.vendor = row;
    this.showSnackBar("Edit Vendor", "Vendor Edit");
    this.router.navigateByUrl("miscellaneous/new")
  }

  addNewMember() {
    this.showSnackBar("Add Vendor", "Vendor Add");
    this.router.navigateByUrl("miscellaneous/new")
  }
}
