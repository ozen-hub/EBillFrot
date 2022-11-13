import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl=environment.baseUrl;

  constructor(private http:HttpClient) { }

  public signup(fullName:any,email:any,password:any):Observable<any>{
    return this.http.post(this.baseUrl+'user/signup',{
      email:email,
      password:password,
      fullName:fullName
    });
  }
}
