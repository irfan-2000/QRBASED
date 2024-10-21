import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'https://localhost:44368/api/Json/'; // Your backend API URL

  constructor(private http: HttpClient) {}

  Createorder(amount:number,customerName:string,tableNumber:number):Observable<any>
{
  const params = new HttpParams()
  .set('amount', amount.toString()) // Convert decimal to string
  .set('customerName', customerName)
  .set('tableNumber', tableNumber); // Convert number to string

return this.http.post(`${this.baseUrl}CreateOrder`, params);
}

verifypayment(PaymentId:string,OrderId:string,signature:string):Observable<any>
{
  
  return this.http.post(`${this.baseUrl}VerifyPayment`, { PaymentId, OrderId, signature });
}


}