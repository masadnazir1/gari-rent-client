import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthResponse } from '../../Interfaces/loginResponse';
import { UserContextService } from '../../services/shared/context/user-context.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  faSignIn = faRightToBracket;
  faGoogle = faGoogle;
  isLoading: boolean = false;
  email: string = 'masadnazir1@gmail.com';
  password: string = 'masadnazir1@';
  rememberMe: boolean = true;

  //
  constructor(
    private API: ApiService,
    private router: Router,
    private UserContext: UserContextService
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      //call the login api
      this.isLoading = true;
      this.API.post<AuthResponse>('auth/user/login', {
        email: this.email,
        password: this.password,
      }).subscribe({
        next: (data) => {
          this.isLoading = false;

          //set the userid in the context
          this.UserContext.setUserId(data.user.id);
          if (data.user.role === 'dealer') {
            window.location.href = '/dealer-account?tab=dashboard';
          } else if (data.user.role === 'rentor') {
            window.location.href = '/user-account?tab=dashboard';
          }

          //set the local storage
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
        },

        error: (error: any) => {
          console.error('Errr while logining', error);
          this.isLoading = false;
        },
      });
    }
  }

  Naviagte(path: string) {
    this.router.navigate([path]);
  }
}
