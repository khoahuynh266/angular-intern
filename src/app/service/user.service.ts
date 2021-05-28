import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpData } from '../model/SignUpData';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: any;

  constructor(private http: HttpClient,
    private router: Router) { }
  getUser() {
    console.log(localStorage.getItem('accessToken'));
    var token = localStorage.getItem('accessToken');

    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    };
    return this.http.get("http://localhost:8080/api/account", options)
  }

  deleteUser(id: String) {
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    };
    console.log(id);
    this.http.delete("http://localhost:8080/api/account/" + id, options)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getCurrentUser(id: String) {
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    };
    this.currentUser = this.http.get("http://localhost:8080/api/account" + id, options)
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  updateUser(updateData: SignUpData,id): any {
    console.log(updateData.getName())
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    }
    let body = {
      "username": updateData.getEmail(),
      "password": updateData.getPassword(),
      "fullname": updateData.getName(),
      "phone" : updateData.getPhone()
    }
    console.log(JSON.stringify(body))
    this.http.put("http://localhost:8080/api/account/"+ id, JSON.stringify(body), options).subscribe(
      data => {
        return true;
      },
      error => {
        return false;
      });;
  }

}
