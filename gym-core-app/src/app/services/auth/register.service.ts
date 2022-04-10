import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterCredentials } from '../../models/register-credentials';

const registerURL: string = environment.url + "Accounts/register";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  constructor(private httpClient: HttpClient) { }

  register(credentials: RegisterCredentials): Observable<any> {
    return this.httpClient.post(registerURL, credentials, httpOptions);
  }
}