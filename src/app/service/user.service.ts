import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignUpData } from '../model/SignUpData';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: any;

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/api/account/';
  getListUser() {
    const token = localStorage.getItem('accessToken');
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token)
    };
    return this.http.get(this.baseUrl, options);

}
getListDeparment()
{
  const token = localStorage.getItem('accessToken');
  const options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token)
  };
  return this.http.get(this.baseUrl +'/deparment', options);

}
  deleteUser(id: number) {
    const token = localStorage.getItem('accessToken');
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token)
    };
    return this.http.delete(this.baseUrl + id, options);
  }

  getUser(id: number) : Observable<any>  {
    const token = localStorage.getItem('accessToken');
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token)
    };
   return this.currentUser = this.http.get(this.baseUrl  + id, options);
  }

  getProfile(id: number) : Observable<any>  {
    const token = localStorage.getItem('accessToken');
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token)
    };
   return this.currentUser = this.http.post(this.baseUrl +"profile",id, options);
  }
  changeStatus(status, id): any {
    const token = localStorage.getItem('accessToken');
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token)
    };
    return this.http.put(this.baseUrl + 'changeStatus/' + id, status, options);
  }
  updateUser(param, id): any {
    const token = localStorage.getItem('accessToken');
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token)
    };
    return this.http.put(this.baseUrl + id, param, options);
  }

  addUser(createData: SignUpData): any {
    const token = localStorage.getItem('accessToken');

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token)
    };
     return this.http.post('http://localhost:8080/api/account/' , JSON.stringify(createData), options);
  
  }

}
