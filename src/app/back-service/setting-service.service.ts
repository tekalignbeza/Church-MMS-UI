import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError,retry, map, tap } from 'rxjs/operators';
import {SettingDTO} from "./model/settingDTO";
import {AttendanceDTO} from "./model/attendanceDTO";
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JobDTO } from './model/jobDTO';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  settingUrl = environment.apiBaseUrl+"/api/settings/"
  response : SettingDTO;
  responses : SettingDTO[];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient : HttpClient) {    
  }

  private extractData(response : Response){
    let body = response.json();
    return body;
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
                   error.status ? `${error.status} - ${error.statusText}` :
                   'Server error';
    return throwError(errMsg);
  }

  public createSetting(settingDTO): Observable<any> {
    return this.httpClient.post(this.settingUrl+"/", JSON.stringify(settingDTO), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

  public getSettingById(id :string):Observable<SettingDTO>{
    return this.httpClient.get<SettingDTO>(this.settingUrl+id);
  }

  public getSetting():Observable<SettingDTO[]>{
    return this.httpClient.get<SettingDTO[]>(this.settingUrl+"all");
  }


  public  updateSetting(setting : SettingDTO) : Observable<any>{
    return this.httpClient.post(this.settingUrl+setting.settingKey, JSON.stringify(setting), this.httpOptions).pipe(
      retry(0),
      catchError(this.handleError)
    )
  }

  public deleteSetting(id :string):Observable<any>{
    return this.httpClient.delete(this.settingUrl+id);
  }

  ingestFile(fileToUpload: File, startDate: string, endDate: string): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
  
    console.log('Uploading file:', fileToUpload.name);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  
    return this.httpClient.post<string>(
      environment.apiBaseUrl + "/api/ingest/upload",
      formData 
    ).pipe(
      retry(0),
      catchError(this.handleError)
    );
  }
  

  jobStatus(): Observable<JobDTO[]> {
    return this.httpClient.get<JobDTO[]>(environment.apiBaseUrl+"/api/ingest/status/all");
   }
}

