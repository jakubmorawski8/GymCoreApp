import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { IdentityError } from '../models/identity-error';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlingService implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if ([401, 403].includes(err.status) && this.authService.loggedUser) {
          this.authService.logout();
        }

        const error = err.error?.message || err.statusText;
        console.error(err);
        return throwError(() => new Error(error));
      })
    );
  }
}
