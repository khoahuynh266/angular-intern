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
  baseUrl: string = 'http://localhost:8080/api/account/';
  getUser() {
    let token = localStorage.getItem('accessToken');
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token)
    };
    return this.http.get(this.baseUrl, options);
  }

  deleteUser(id: number) {
    let token = localStorage.getItem('accessToken');
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token)
    };
    return this.http.delete(this.baseUrl + id, options);
  }

  getCurrentUser(id: number) : Observable<any>  {
    let token = localStorage.getItem('accessToken');
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token)
    };
   return this.currentUser = this.http.get(this.baseUrl  + id, options);
  }

  updateUser(param, id): any {
    let token = localStorage.getItem('accessToken');
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token)
    };
    return this.http.put(this.baseUrl + id, param, options)
  }

  addUser(createData: SignUpData): any {
    let token = localStorage.getItem('accessToken');

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token)
    };
    // let body = {
    //   'username': createData.getUsername(),
    //   'password': createData.getPassword(),
    //   'fullname': createData.getName(),
    //   'phone' : createData.getPhone()
    // };
    // console.log(JSON.stringify(body));
     return this.http.post('http://localhost:8080/api/account/' , JSON.stringify(createData), options)
  //    .subscribe(
  //     data => {
  //       return true;
  //     },
  //     error => {
  //       return false;
  //     });
  }

}
