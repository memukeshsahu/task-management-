import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LoginRequest } from '../../core/models/request/login-request';
import { AuthService } from '../../core/services/auth-service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loginForm :FormGroup= this.fb.group({
    phoneNumber: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });




  onSubmit() {
console.log(this.loginForm.value)
    const request: LoginRequest = {

      phoneNumber: this.loginForm.value.phoneNumber,
      password: this.loginForm.value.password
    };

    this.authService.login(request)
      .subscribe(
        {
          next: (response) => {
            console.log(response);
            localStorage.setItem('token', response.data.token)
            this.router.navigate(['/tasks'])

          },
          error: (error) => {
            console.error(error);
          }
        }
      )

  }

}
