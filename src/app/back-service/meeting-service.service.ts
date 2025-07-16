import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError,retry, map, tap } from 'rxjs/operators';
import {MeetingDTO} from "./model/meetingDTO";
import {AttendanceDTO} from "./model/attendanceDTO";
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  meetingUrl = environment.apiBaseUrl+"/meeting/"
  response : MeetingDTO;
  responses : MeetingDTO[];
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

  public createMeeting(meetingDTO): Observable<MeetingDTO> {
    return this.httpClient.post<MeetingDTO>(this.meetingUrl, JSON.stringify(meetingDTO), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

  public getMeetingById(id :string):Observable<any>{
    return this.httpClient.get(this.meetingUrl+id);
  }

  public getMeetingAll():Observable<MeetingDTO[]>{
    return this.httpClient.get<MeetingDTO[]>(this.meetingUrl+"all");
  }

  public getMeeitngInvite(id :string):Observable<any>{
    return this.httpClient.get(this.meetingUrl+"invite/"+id);
  }

  public  updateMeeting(meeting : MeetingDTO) : Observable<any>{
    return this.httpClient.put<MeetingDTO>(this.meetingUrl, meeting, this.httpOptions).pipe(
      tap((newMeeting: MeetingDTO) =>console.log("Meeting Updated")),
      catchError(this.handleError)
    );
  }

  public deleteMeeting(id :string):Observable<any>{
    return this.httpClient.delete(this.meetingUrl+id);
  }

  public createAttedance(attendance): Observable<AttendanceDTO> {
    return this.httpClient.post<AttendanceDTO>(this.meetingUrl+"attendance/meeting/"+attendance.meetingId, JSON.stringify(attendance), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

  public getAttendanceByMeeting(meetingId:number){
    return this.httpClient.get<AttendanceDTO[]>(this.meetingUrl+"attendanceByMeeting/"+meetingId,this.httpOptions);
  }

  public getMeeitngAttendance(id :string):Observable<any>{
    return this.httpClient.get(this.meetingUrl+"attendance/"+id);
  }


}
