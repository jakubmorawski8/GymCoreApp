import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { LoginCredentials } from 'src/app/core/models/login-credentials';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  private subscribtion: Subscription = new Subscription();

  loginForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [
      null,
      Validators.compose([Validators.required, Validators.minLength(5)]),
    ],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.loggedUser) {
      this.router.navigateByUrl('/');
    }
  }

  get form() {
    return this.loginForm.controls;
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const credentials = new LoginCredentials(
      this.form['email'].value,
      this.form['password'].value
    );
    this.subscribtion.add(
      this.authService
        .login(credentials)
        .pipe(first())
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/');
          },
          error: (error)=>{
            alert(error);
          }
        })
    );
  }
}
