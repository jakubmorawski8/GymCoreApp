import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterCredentials } from 'src/app/models/register-credentials';
import { AuthService } from 'src/app/services/auth/auth.service';


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
      // Validators.pattern(/([^a-zA-Z\d])+([a-zA-Z\d])+|([a-zA-Z\d])+([^a-zA-Z\d])+/)
]]
  });

  constructor(private fb: FormBuilder, private registerService: AuthService) { }
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
      next: (v) => console.log(v),
      error: (e) => {
        
        var response = e as HttpErrorResponse;
        var firsterror = response.error[Object.keys(response.error)[0]]
        alert(firsterror)
      },
      complete: () => console.info('complete')
    }
    );
  }  
}
