import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterCredentials } from 'src/app/core/models/register-credentials';
import { AuthService } from 'src/app/core/services/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
 

  registerForm = this.fb.group({
    email: [null,Validators.required],
    username: [null, Validators.required],
    firstname:[null,Validators.required],
    lastname:[null,Validators.required],
    password: ['', [
      Validators.required, 
      Validators.pattern(/([^a-zA-Z\d])+([a-zA-Z\d])+|([a-zA-Z\d])+([^a-zA-Z\d])+/)
]]
  });

  constructor(private fb: FormBuilder, private registerService: AuthService,
    private router: Router) { }
  onSubmit(): void {
    let registerCredentials : RegisterCredentials =
    {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      username: this.registerForm.get('username')?.value,
      firstname: this.registerForm.get('firstname')?.value,
      lastname: this.registerForm.get('lastname')?.value
    };

    this.registerService.register(registerCredentials).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (error) => {        
        alert(error)
      },
      complete: () => console.info('complete')
    }
    );
  }  
}
