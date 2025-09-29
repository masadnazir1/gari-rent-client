import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AuthResponse } from '../../Interfaces/loginResponse';

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
  constructor(private API: ApiService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      //call the login api
      this.isLoading = true;
      this.API.post<AuthResponse>('/auth/user/login', {
        email: this.email,
        password: this.password,
      }).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.Naviagte('/user-account');
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
