import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingDTO } from 'src/app/back-service/model/settingDTO';
import { SettingService } from 'src/app/back-service/setting-service.service';
import { SettingDataDetailsComponent } from '../setting-data-details/setting-data-details.component';

@Component({
  selector: 'app-setting-data-table',
  templateUrl: './setting-data-table.component.html',
  styleUrls: ['./setting-data-table.component.css']
})
export class SettingDataTableComponent {

  displayedColumns: string[] = ['name','value'];
  dataSource :SettingDTO[];

  ngOnInit() {
    this.loadData()
  }
  constructor(private settingService:SettingService,private _snackBar: MatSnackBar,public dialog: MatDialog) {}
  openSnackBar() {
    this.showSnackBar(" "," ");
  }

  showSnackBar(message:string, action:string):void{
    this._snackBar.open(message,action, {
      duration: 2000,
    });
  }

  getRecord(row: SettingDTO) {
    const dialogRef = this.dialog.open(SettingDataDetailsComponent, {
      width: '40%',
      height: '46%',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      row = result;
      console.log('The dialog was closed');
      this.loadData()
    });
  }

  addNewSetting() {
    const dialogRef = this.dialog.open(SettingDataDetailsComponent, {
      width: '40%',
      height: '46%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dataSource = result;
      console.log('The dialog was closed');
      this.loadData()
    });
  }

  public loadData(){
    this.settingService.getSetting().subscribe(r=> this.dataSource = r );
  }
}