import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
<<<<<<<< HEAD:src/app/services/http/http-error-handling.service.ts
import { IdentityError } from 'src/app/models/identity-error';
import { AuthService } from '../auth/auth.service';
========
import { IdentityError } from 'src/app/core/models/identity-error';
>>>>>>>> feature-navbar:gym-core-app/src/app/core/interceptors/http-error-handling.service.ts

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlingService implements HttpInterceptor{

  constructor(private router: Router, private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
      console.log('HTTP Request started');
      return next.handle(request)
          .pipe(
              catchError((error: HttpErrorResponse) => {
                let errorMessage = this.handleError(error);
                return throwError(() => new Error(errorMessage));
              })
          );
  }

  setError(error: HttpErrorResponse): string {
      let errorMessage = 'Unknown error occured';
      if(error.error instanceof ErrorEvent) {
          // Client side error
          errorMessage = error.error.message;
      } else {
          // server side error
          if (error.status!==0) {          
              errorMessage = error.error.errorMessage;              
          }
      }
      return errorMessage;
  }

  private handleError(error: HttpErrorResponse) : string {
    switch(error.status) {
      case 404:
        return this.handleNotFound(error);
      case 400:
        return this.handleBadRequest(error);
      case 401:
      case 403:
        return this.handleAuthError(error);
      default:
        return error.message;
    }
  }
  
  private handleNotFound(error: HttpErrorResponse): string {
    this.router.navigate(['/404']);
    return error.message;
  }
  
  private handleBadRequest(error: HttpErrorResponse): string {
    if(this.router.url === '/register'){
      let message = '';
      var values : any[];
      values = Object.values(error.error);
      values.map((m: IdentityError) => {
         message += m.description + '<br>';
      })
  
      return message.slice(0, -4);
    }
    else{
      return error.error ? error.error : error.message;
    }
  }
  
  private handleAuthError(error: HttpErrorResponse): string {
    this.authService.logout();
    return error.message;
  }

}

