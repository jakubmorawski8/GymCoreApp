import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gym-core-app';
  userIsLogged = false;
  
  /**
   *
   */
  constructor(private authService : AuthService) {
    this.authService.loggedUserSubject.subscribe({
      next: (v) => 
      {
        this.userIsLogged = v ? true : false;
      },
      error: (e) => {

      },});
    }

    logout() : void {
      this.authService.logout();
  }

}