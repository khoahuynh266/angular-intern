import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignUpData } from '../model/SignUpData';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: any;

  constructor(private http: HttpClient,
     private authenticationService : AuthenticationService) { }
  baseUrl = 'http://localhost:8080/api/account/';
  token  = this.authenticationService.currentUserValue.accessToken;
  getListUser() {

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token)
    };
    return this.http.get(this.baseUrl,);

}
getListDepartment()
{

  const options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token)
  };
  return this.http.get(this.baseUrl +'deparments');
}
getListRole()
{

  const options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token)
  };
  return this.http.get(this.baseUrl +'roles');

}
  deleteUser(id: number) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token)
    };
    return this.http.delete(this.baseUrl + id);
  }

  getUser(id: number) : Observable<any>  {

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token)
    };
   return this.currentUser = this.http.get(this.baseUrl  + id);
  }

  getProfile(id: number) : Observable<any>  {

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token)
    };
   return this.currentUser = this.http.post(this.baseUrl +"profile",id, options);
  }
  changeStatus(status, id): any {

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token)
    };
    return this.http.put(this.baseUrl + 'changeStatus/' + id, status, options);
  }
  updateUser(param, id): any {

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token)
    };
    return this.http.put(this.baseUrl+"admin/" + id, param, options);
  }
  updateProfile(param, id): any {

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token)
    };
    return this.http.put(this.baseUrl + id, param, options);
  }

  addUser(createData: SignUpData): any {


    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + this.token)
    };
     return this.http.post('http://localhost:8080/api/account/' , JSON.stringify(createData), options);
  
  }

}
