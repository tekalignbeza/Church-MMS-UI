import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {FamilyDTO} from "./model/familyDTO";
import {catchError, retry} from "rxjs/operators";
import {MemberDTO} from "./model/memberDTO";

@Injectable({
  providedIn: 'root'
})
export class MemberServiceService {
  private apiURL = "http://tekesoft.azurewebsites.net"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getFamilyList(): Observable<FamilyDTO[]> {
    return this.http.get<FamilyDTO[]>(this.apiURL + '/member/family')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getFamily(id): Observable<FamilyDTO> {
    return this.http.get<FamilyDTO>(this.apiURL + '/member/family/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  creteFamily(FamilyDTO): Observable<FamilyDTO> {
    return this.http.post<FamilyDTO>(this.apiURL + '/member/family/', JSON.stringify(FamilyDTO), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  addMemberToFamily(familyId, MemberDTO): Observable<FamilyDTO> {
    return this.http.put<FamilyDTO>(this.apiURL + '/member/addFamilyMember/' + familyId, JSON.stringify(MemberDTO), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  removeMemberFromFamily(familyid,id){
    return this.http.delete<FamilyDTO>(this.apiURL + '/member/removeFamilyMember/'+familyid+'/member/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  // Error handling
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


  getMemberList(): Observable<MemberDTO> {
    return this.http.get<MemberDTO>(this.apiURL + '/member/')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getMember(id): Observable<MemberDTO> {
    return this.http.get<MemberDTO>(this.apiURL + '/member/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

   createMember(MemberDTO): Observable<MemberDTO> {
    return this.http.post<MemberDTO>(this.apiURL + '/member/', JSON.stringify(MemberDTO), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  updateMember(MemberDTO,id): Observable<MemberDTO> {
    return this.http.put<MemberDTO>(this.apiURL + '/member/'+id, JSON.stringify(MemberDTO), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  searchMember(MemberSearchCriteriaDTO): Observable<MemberDTO> {
    return this.http.post<MemberDTO>(this.apiURL + '/member/search', JSON.stringify(MemberSearchCriteriaDTO), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }



  uploadPhoto(fileToUpload: File, id): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('memberId',id);
    return this.http
      .post<boolean>(this.apiURL+"/member/upload", formData)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

}
