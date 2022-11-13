import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../dto/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl=environment.baseUrl;

  constructor(private http:HttpClient) { }

  public saveCustomer(
    c:Customer
  ):Observable<any>{
    console.log(c)
    return this.http.post(this.baseUrl+'customer/save',{
      name:c.name,
      address:c.address,
      salary:c.salary
    });
  }
}
