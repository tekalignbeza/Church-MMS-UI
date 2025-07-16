import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobDTO } from 'src/app/back-service/model/jobDTO';
import { SettingService } from 'src/app/back-service/setting-service.service';
import { IngestorComponent } from '../ingestor/ingestor.component';

@Component({
  selector: 'app-ingestor-data-table',
  templateUrl: './ingestor-data-table.component.html',
  styleUrls: ['./ingestor-data-table.component.css']
})
export class IngestorDataTableComponent {


  displayedColumns: string[] = ['jobId','datetime','total_rows','processed_rows','skipped_rows','status'];
  dataSource :JobDTO[];

  ngOnInit() {
    this.loadData()
  }
  constructor(private settingService:SettingService,private _snackBar: MatSnackBar,public dialog: MatDialog) {}
  openSnackBar() {
    this.showSnackBar("Member removed from family","Remove");
  }

  showSnackBar(message:string, action:string):void{
    this._snackBar.open(message,action, {
      duration: 2000,
    });
  }

  upload() {
    const dialogRef = this.dialog.open(IngestorComponent, {
      width: '40%',
      height: '46%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadData()
    });
  }

  public loadData(){
    this.settingService.jobStatus().subscribe(r=> this.dataSource = r );
  }
}