import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignInData } from '../model/sigInData';
import { SignUpData } from '../model/SignUpData';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  public isAuthenticated: boolean;

  constructor(private http: HttpClient,
    private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    // if (this.currentUserValue) { this.isAuthenticated = true; }
    // else { this.isAuthenticated = false; }
    console.log(this.currentUserSubject);
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  getToken() {
    console.log(localStorage.getItem('accessToken'));
    return localStorage.getItem('accessToken');
  }
  login(signinData: SignInData): Observable<any> {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    let body = {
      'username': signinData.getUsername(),
      'password': signinData.getPassword()
    };

    return this.http.post<User>('http://localhost:8080/api/auth/login', JSON.stringify(body), options).pipe(map(res => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('accessToken', res['accessToken']);
      localStorage.setItem('refreshToken', res['refreshToken']);
      // this.currentUserSubject.next(res);
      this.isAuthenticated = true;
      localStorage.setItem('currentUser', JSON.stringify(res));
      localStorage.setItem('currentId', JSON.stringify(res['id']));
      this.currentUserSubject.next(res);
      return res;
    }));
  }
   
changePassword(param, id): any {
  const token = localStorage.getItem('accessToken');  
  const options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token)
  };
  return this.http.post('http://localhost:8080/api/auth/changePassword/' + id, param, options);
}
  resigter(param): any {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    return  this.http.post('http://localhost:8080/api/auth/resigter', param, options);
    }

  logout() {
    localStorage.clear();
    // localStorage.removeItem('currentUser');
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
    console.log(this.currentUserSubject);
  }
}
