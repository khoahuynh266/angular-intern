import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, filter, switchMap, take } from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";
import { Router } from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private refreshingInProgress: boolean;
  private accessTokenSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>(null);

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.accessToken) {
      req = this.addAuthorizationHeader(req,currentUser.accessToken)
    }

    return next.handle(req).pipe(
      catchError((err) => {
        // in case of 401 http error
        if (err instanceof HttpErrorResponse && err.status === 401) {
          // get refresh tokens
          if( this.authenticationService.currentUserValue!== null){
          const refreshToken =
            this.authenticationService.currentUserValue.refreshToken;
          console.log(refreshToken);
          // if there are tokens then send refresh token request
          if (refreshToken && currentUser.accessToken) {
            return this.refreshToken(req, next);
          }

          // otherwise logout and redirect to login page
          return this.logoutAndRedirect(err);
        }}

        // in case of 403 http error (refresh token failed)
        if (err instanceof HttpErrorResponse && err.status === 403) {
          // logout and redirect to login page
          return this.logoutAndRedirect(err);
        }
        // if error has status neither 401 nor 403 then just return this error
        return throwError(err);
      })
    );
  }

  private addAuthorizationHeader(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    if (token) {
      return (request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      }));
    }

    return request;
  }

  private logoutAndRedirect(err): Observable<HttpEvent<any>> {
    this.authenticationService.logout();
    this.router.navigateByUrl("/login");

    return throwError(err);
  }

  private refreshToken(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.refreshingInProgress) {
      this.refreshingInProgress = true;
      this.accessTokenSubject.next(null);

      return this.authenticationService.refreshToken().pipe(
        switchMap((res) => {
          this.refreshingInProgress = false;
          this.accessTokenSubject.next(res["accessToken"]);
          this.authenticationService.currentUserValue.accessToken = res["accessToken"];
          this.authenticationService.isAuthenticated = true;
          // repeat failed request with new token
          return next.handle(
            this.addAuthorizationHeader(request, res["accessToken"])
          );
        })
      );
    } else {
      // wait while getting new token
      return this.accessTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => {
          // repeat failed request with new token
          return next.handle(this.addAuthorizationHeader(request, token));
        })
      );
    }
  }
}
