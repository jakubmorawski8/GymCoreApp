import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterCredentials } from 'src/app/models/register-credentials';
import { RegisterService } from 'src/app/services/auth/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
 

  registerForm = this.fb.group({
    email: [null,Validators.required],
    username: [null, Validators.required],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(5)])
    ],
    shipping: ['free', Validators.required]
  });

  constructor(private fb: FormBuilder, private registerService: RegisterService) { }
  onSubmit(): void {
    let registerCredentials : RegisterCredentials =
    {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      username: this.registerForm.get('username')?.value
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
