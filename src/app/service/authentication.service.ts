import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/model/user";
import { map } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import { SignInData } from "../model/sigInData";
import { SignUpData } from "../model/SignUpData";
const BASEURL = 'http://localhost:8080/api/auth';
@Injectable({
  providedIn: "root",
})

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public isAdmin: boolean;
  public isAuthenticated: boolean;
  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem("currentUser") !== null) {
      this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem("currentUser"))
      );
    } else {
      this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(sessionStorage.getItem("currentUser"))
      );
    }

    this.currentUser = this.currentUserSubject.asObservable();
    if (this.currentUserValue && this.currentUserValue.roles === "ROLE_ADMIN") {
      this.isAdmin = true;
    }
    console.log(this.currentUserSubject);
    console.log(this.currentUser);
    console.log(this.currentUserValue);
  }
  
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getToken() {
    console.log(localStorage.getItem("accessToken"));
    return localStorage.getItem("accessToken");
  }

  login(signinData: SignInData, isRemember: boolean): Observable<any> {
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    };
    return this.http
      .post<User>(`${BASEURL}/login`, signinData)
      .pipe(
        map((res) => {
          if (isRemember) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("refreshToken", res["refreshToken"]);
            localStorage.setItem("currentUser", JSON.stringify(res));
            localStorage.setItem("accessToken", res["accessToken"]);
            // this.currentUserSubject.next(res);
          } else {
            sessionStorage.setItem("currentUser", JSON.stringify(res));
          }
          this.currentUserSubject.next(res);
          if (res.roles === "ROLE_ADMIN") {
            this.isAdmin = true;
          }
          this.isAuthenticated = true;
          return res;
        })
      );
  }
  refreshToken() {
    const refreshToken = {"refreshToken" : this.currentUserValue.refreshToken};
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    };
    return this.http
      .post(
        `${BASEURL}/refreshToken`,
        refreshToken,
        options
      )
      // .pipe(
      //   map((res) => {
         
      //   })
      // );
  }
  newPassword(body): Observable<any> {
    return this.http.post(`${BASEURL}/newPassword`, body);
  }

  ValidPasswordToken(body): Observable<any> {
    return this.http.post(`${BASEURL}/vertifyResetToken`, body);
  }
  requestReset(body): Observable<any> {
    return this.http.post(`${BASEURL}/forgotPassword`, body);
  }

  changePassword(param, id): any {
    const token = this.currentUserValue.accessToken;
    const options = {
      headers: new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + token),
    };
    return this.http.post(
      "http://localhost:8080/api/account/changePassword/" + id,
      param,
      options
    );
  }
  adminChangePassword(param, id): any {
    const token = this.currentUserValue.accessToken;
    const options = {
      headers: new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + token),
    };
    return this.http.post(
      "http://localhost:8080/api/account/adminChangePassword/" + id,
      param,
      options
    );
  }
  resigter(param): any {
    const options = {
      headers: new HttpHeaders().set("Content-Type", "application/json"),
    };

    return this.http.post(
    `${BASEURL}/resigter`,
      param,
      options
    );
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(["/login"]);
    this.isAuthenticated = false;
    console.log(this.currentUserSubject);
  }


  
}
