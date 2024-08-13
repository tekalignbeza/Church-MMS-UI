import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {PaymentTypeDTO} from "./model/paymentTypeDTO";

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {
  private REST_API_SERVER = "http://tekesoft.azurewebsites.net"

  constructor(private http: HttpClient) {
  }

  data: PaymentTypeDTO;
  datas: PaymentTypeDTO[];

  getPaymenType(): PaymentTypeDTO {
    this.http.get<PaymentTypeDTO>(
      this.REST_API_SERVER, {observe: 'response'}).subscribe((resp) => this.data = {...resp.body});
    return this.data;
  }

  getAllPaymenType(): PaymentTypeDTO[]{
    console.log('Im called  getAllPaymenType');
    this.http.get<PaymentTypeDTO[]>(
      this.REST_API_SERVER+"/payment/PaymentType/", {observe: 'response'}).subscribe((resp) =>
    {
      console.log('inside'+ resp.body);
      this.datas = {...resp.body};
    });
    console.log(this.datas);
    return this.datas;
  }

  postPaymenType(): PaymentTypeDTO {
    console.log('Im called');
    this.http.post<PaymentTypeDTO>(
      this.REST_API_SERVER+"/payment/PaymentType/", {name: 'response'}).subscribe((resp) => this.data = resp);
    console.log(this.data);
    return this.data;
  }


}
