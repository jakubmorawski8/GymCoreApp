import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { IdentityError } from 'src/app/core/models/identity-error';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlingService implements HttpInterceptor{

  constructor(private _router: Router) { }

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

  private handleError = (error: HttpErrorResponse) : string => {
    if(error.status === 404){
      return this.handleNotFound(error);
    }
    else if(error.status === 400){
      return this.handleBadRequest(error);
    }
    else
    {
      return error.message;
    }
  }
  
  private handleNotFound = (error: HttpErrorResponse): string => {
    this._router.navigate(['/404']);
    return error.message;
  }
  
  private handleBadRequest = (error: HttpErrorResponse): string => {
    if(this._router.url === '/register'){
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
  

}

