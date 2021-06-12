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

  private isAuthenticated: boolean;

  constructor(private http: HttpClient,
    private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    if (this.currentUserValue) { this.isAuthenticated = true; }
    else { this.isAuthenticated = false; }
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
      'username': signinData.getEmail(),
      'password': signinData.getPassword()
    };

    return this.http.post<User>('http://localhost:8080/api/auth/login', JSON.stringify(body), options).pipe(map(res => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('accessToken', res['accessToken']);
      localStorage.setItem('refreshToken', res['refreshToken']);
      // this.currentUserSubject.next(res);
      this.isAuthenticated = true;
      localStorage.setItem('currentUser', JSON.stringify(res));
      this.currentUserSubject.next(res);
      return res;
    }));
  }

  resigter(resigterData: SignUpData): any {
    console.log(resigterData.getName());
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    let body = {
      'username': resigterData.getUsername(),
      'password': resigterData.getPassword(),
      'fullname': resigterData.getName()
    };


    console.log(JSON.stringify(body));
    this.http.post('http://localhost:8080/api/auth/resigter', JSON.stringify(body), options).subscribe(
      data => {
        this.isAuthenticated = true;
        this.currentUserSubject.next(<User> data);
        this.router.navigate(['home']);
         alert('Đăng ký không thành công');
        return true;
      },
      error => {
        this.isAuthenticated = false;
        this.currentUserSubject.next(null);
  
        return false;
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
    this.isAuthenticated = false
    console.log(this.currentUserSubject);
  };
}
