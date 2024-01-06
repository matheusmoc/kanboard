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
        const email = this.loginform.value.email;
        const password = this.loginform.value.password;
        this.service.GetUserbyCode(email, password).subscribe(
          (item: any) => {
            this.result = item;
            this.service.saveAuthInfo(this.result.id, this.result.email);
            this.service.login();    
            console.log('API Response:', this.result);
            // Navegar para a página principal ou outra página desejada
            this.router.navigate(['/']);
          },
        );
      } else {
        console.warn('Please enter valid data.');
      }
    }
  }