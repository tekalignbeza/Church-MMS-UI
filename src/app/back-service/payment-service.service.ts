import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {PaymentDTO} from "./model/paymentDTO";

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {
  private REST_API_SERVER = "http://localhost:8080"

  constructor(private http: HttpClient) {
  }

  // Payment service methods can be added here as needed
  // PaymentType functionality has been removed as it's no longer needed
}
