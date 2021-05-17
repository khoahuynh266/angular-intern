import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/model/user";
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from "rxjs";
import { SignInData } from "../model/sigInData";
import { SignUpData } from "../model/SignUpData";
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient,
    private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  isAuthenticated = false;
  // public get currentUserValue(): User {
  //   return this.currentUserSubject.value;
  // }
  getToken() {
    console.log(localStorage.getItem('accessToken'));
    return localStorage.getItem('accessToken');
  }
  getAccount() {
    console.log(localStorage.getItem('accessToken'));
    var token = localStorage.getItem('accessToken');


    const options = {
      headers:  new HttpHeaders({
          'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': "Bearer "+ token })
    };
    return this.http.post("http://localhost:3000/api/account" ,'',options);

    // body ( thong so truyen vao)

  //   var headers_object = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //      'Authorization': "Bearer "+ token
  //   });

  //       const httpOptions = {
  //         headers: headers_object
  //       };


  //  return this.http.post('http://localhost:3000/api/account', {limit:10}, httpOptions);
  }

  login(signinData: SignInData): Observable<any> {
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }
    let body = new URLSearchParams();
    body.set("username", signinData.getEmail());
    body.set("password", signinData.getPassword());

    return this.http.post<User>("http://localhost:3000/api/login", body.toString(), options).pipe(map(res => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('accessToken', res['accesToken']);
      localStorage.setItem('refreshToken', res['refreshToken']);
      // this.currentUserSubject.next(res);
      this.isAuthenticated = true;
      localStorage.setItem('currentUser', JSON.stringify(res));
      this.currentUserSubject.next(res);
      return res;
    }));
  }


  resigter(resigterData: SignUpData): any {
    console.log(resigterData.getName())
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }
    let body = new URLSearchParams();
    body.set("username", resigterData.getEmail());
    body.set("password", resigterData.getPassword());
    body.set("fullname", resigterData.getName());

    this.http.post("http://localhost:3000/api/resigter", body.toString(), options).subscribe(
      data => {
        this.isAuthenticated = true;
        this.router.navigate(["home"]);
        alert("hello" + resigterData.getEmail());
        return true;
      },
      error => {
        this.isAuthenticated = false;
        return false;
      });;

  }

  logout() {
    localStorage.removeItem('currentUser');
    // this.currentUserSubject.next(null);
    this.router.navigate(["/login"]);
    this.isAuthenticated = false
    this.currentUserSubject.next(null);
  }
}
