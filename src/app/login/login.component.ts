import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private service: AuthService, private router: Router) {
    sessionStorage.clear();
  }

  result: any;
  error: string = ''; 

  loginform = this.builder.group({
    email: this.builder.control('', [Validators.required, Validators.email]),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
      if (this.loginform.valid) {
        const email = this.loginform.value.email;
        const password = this.loginform.value.password;
        this.service.GetUserbyCode(email, password).subscribe(
          (item: any) => {
            this.result = item;
            this.service.saveAuthInfo(this.result.user);
            console.log()
            this.service.login();    
            //console.log('API Response:', this.result);
            this.router.navigate(['/']);
          },
          (error) => {
            this.error = 'Invalid email or password. Please try again.'; 
            console.warn('Email ou senha inválidas, verifique as credenciais digitadas e tente novamente.');
            console.error('API Error:', error);

          }
        );
      } else {
        this.error = 'Email ou senha inválidas, verifique as credenciais digitadas e tente novamente.';
        console.warn('Email ou senha inválidas, verifique as credenciais digitadas e tente novamente.');
      }
    }
  }