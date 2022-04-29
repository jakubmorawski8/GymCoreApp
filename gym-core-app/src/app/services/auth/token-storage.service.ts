import { Injectable } from '@angular/core';
import { LoggedUser } from 'src/app/models/logged-user';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getUser(): string | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  public getApplicationUser(): LoggedUser | null {
    const token = this.getToken();
    const user = this.getUser();
    return user && token ? new LoggedUser(user, token) : null;
  }

  public setApplicationUser(user: string, token: string): void {
    this.saveUser(user);
    this.saveToken(token);
  }

  private saveUser(user: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

}
