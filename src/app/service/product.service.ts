import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  public saveProduct(
    desc:any, qty:any,unit_price: any
  ):Observable<any>{
    return this.http.post(this.baseUrl + 'product/save', {
      description: desc,
      qty: qty,
      unitPrice: unit_price
    });
  }

  public loadProducts():Observable<any>{
    return this.http.get(this.baseUrl + 'product/list', {});
  }
  public getAllProductIds():Observable<any>{
    return this.http.get(this.baseUrl + 'product/id-list', {});
  }

  public getProduct(id: any): Observable<any> {
    return this.http.get(this.baseUrl + 'product/get', {
      headers: {
        id:id
      }
    });
  }
}
