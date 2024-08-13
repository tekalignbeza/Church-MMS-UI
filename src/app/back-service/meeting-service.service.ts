import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {MeetingDTO} from "./model/meetingDTO";
import {AttendanceDTO} from "./model/attendanceDTO";


@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  meetingUrl : string;
  response : MeetingDTO;
  responses : MeetingDTO[];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient : HttpClient) {
    this.meetingUrl = "/api/meeting/"
  }

  private extractData(response : Response){
    let body = response.json();
    return body;
  }

  private handleError(error : any){
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error'
    return Observable.throw(errMsg);
  }

  public getMeetingById(id :string):Observable<any>{
    return this.httpClient.get(this.meetingUrl+id);
  }

  public createMeeting(meeting : MeetingDTO) : Observable<any>{
    return this.httpClient.post<MeetingDTO>(this.meetingUrl, meeting, this.httpOptions).pipe(
      tap((newMeeting: MeetingDTO) =>console.log("New Meeting Created")),
      catchError(this.handleError)
    );
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

  public meetingAttendance(attendance : AttendanceDTO) : Observable<any>{
    return this.httpClient.put<MeetingDTO>(this.meetingUrl+"attendance", attendance, this.httpOptions).pipe(
      tap((newMeeting: MeetingDTO) =>console.log("Checking Attendance")),
      catchError(this.handleError)
    );
  }

  public getMeeitngAttendance(id :string):Observable<any>{
    return this.httpClient.get(this.meetingUrl+"attendance/"+id);
  }


}
