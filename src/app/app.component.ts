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
        if(v)
        {
          this.userIsLogged = true;
        }
        else
        {
          this.userIsLogged = false;
        }
      },
      error: (e) => {

      },});
    }

    
  ngAfterViewInit() {
    if(this.authService.loggedUser)
    {
      this.userIsLogged = true;
    }
  }
}