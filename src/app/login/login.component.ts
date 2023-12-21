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

  loginform = this.builder.group({
    email: this.builder.control('', [Validators.required, Validators.email]),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.GetUserbyCode().subscribe(
        (item: any) => {
          this.result = item;
          sessionStorage.setItem('userId', this.result.id);
          sessionStorage.setItem('username', this.result.email);
      
          console.log('JWT Token:', this.result.jwtToken);
          // Configurar o token JWT
          this.service.setAuthToken(this.result.jwtToken);
      
          // Navegar para a página principal ou outra página desejada
          this.router.navigate(['']);
        },
        (error) => {
          console.error('Error during login:', error);
        }
      );
    } else {
      console.warn('Please enter valid data.');
    }
  }
}