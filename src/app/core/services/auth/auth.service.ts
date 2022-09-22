import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap, throwError } from 'rxjs';
import { LoggedUser } from 'src/app/core/models/logged-user';
import { LoginCredentials } from 'src/app/core/models/login-credentials';
import { environment } from 'src/environments/environment';
import { RegisterCredentials } from '../../models/register-credentials';
import { TokenStorageService } from './token-storage.service';

const registerURL: string = environment.url + "Accounts/register";
const loginURL: string = environment.url + "Accounts/login";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedUserSubject: BehaviorSubject<LoggedUser | null>;
  
  constructor(private httpClient: HttpClient, private router: Router, private session: TokenStorageService) {
    this.loggedUserSubject = new BehaviorSubject<LoggedUser | null>(session.getApplicationUser());
   }

  public get loggedUser(): LoggedUser | null {
    return this.loggedUserSubject.value;
  }

  register(credentials: RegisterCredentials): Observable<any> {
    return this.httpClient.post(registerURL, credentials, httpOptions);
  }

  login(credentials: LoginCredentials): Observable<any> {
    return this.httpClient.post<any>(loginURL, credentials, httpOptions).pipe(
      map(user => {
        this.session.setApplicationUser(user.email, user.token);
        this.loggedUserSubject.next(user);
        return user.token;
      })
    );
  }

  logout(): void {
    this.session.signOut();
    this.loggedUserSubject.next(null);
    this.router.navigateByUrl('/login');
  }
}