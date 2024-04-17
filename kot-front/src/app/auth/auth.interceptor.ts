import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headerDef = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS, POST',
      'Access-Control-Allow-Headers':
        'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    };

    const jwt = this.authService.getLogInToken();

    if (jwt) {
      headerDef['Authorization'] = `Bearer ${jwt}`;
    }

    request = request.clone({
      setHeaders: headerDef,
    });

    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              console.log(err.status);
              return;
            }
            this.router.navigate(['login']);
            this.authService.removeLoggedInFromLocalStorage();
            this.authService.removeTokenFromLocalStorage();
            this.authService.removeAdminFromLocalStorage();
          }
        }
      )
    );
  }
}
