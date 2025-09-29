import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup {
  faUserPlus = faUserPlus;
  isLoading: boolean = false;
  fullName: string = 'Muhammad Asad Nazir';
  email: string = 'masadnazir1@gmail.com';
  phone: string = '+923208648637';
  password: string = 'masadnazir1@';

  //
  constructor(private API: ApiService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      //call the api

      this.isLoading = true;
      this.API.post('auth/user/register', {
        fullName: this.fullName,
        email: this.email,
        phone: this.phone,
        password: this.password,
      }).subscribe({
        next: (data) => {
          this.isLoading = false;
        },

        error: (error: any) => {
          console.error('Errr while logining', error);
          this.isLoading = false;

          if (error.status === 400) {
            this.Naviagte('/login');

            this.isLoading = false;
          }
        },
      });
    }
  }

  Naviagte(path: string) {
    this.router.navigate([path]);
  }
}
