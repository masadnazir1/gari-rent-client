import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Toast } from '../../Interfaces/ToastInterface';
import { ApiService } from '../../services/api.service';
import { LocalStorageService } from '../../services/shared/storage/local-storage.service';
import { ToastService } from '../../services/shared/toast/toast.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class Signup implements OnInit {
  faUserPlus = faUserPlus;
  isLoading: boolean = false;
  fullName: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  userRole: string | null = null;

  //

  constructor(
    private API: ApiService,
    private router: Router,
    private LocalStorage: LocalStorageService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const role = this.LocalStorage.getItem<any>('signuprolekey');

    if (role) {
      this.userRole = role;
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      //call the api

      this.isLoading = true;
      this.API.post('auth/user/register', {
        fullName: this.fullName,
        email: this.email,
        phone: this.phone,
        password: this.password,
        role: 'dealer',
      }).subscribe({
        next: (data: any) => {
          this.isLoading = false;
          this.showToast(
            'info',
            'Account created ',
            `Account created for ${data.user.full_name} `,
            ''
          );

          const autoLoginPayload: any = {
            dealer_id: data.user?.id,
            email: this.email,
            password: this.password,
          };

          this.LocalStorage.setItem('auto-login', autoLoginPayload);

          this.Naviagte('/create-business-profile');
        },

        error: (error: any) => {
          this.isLoading = false;

          if (error.status === 400) {
            this.showToast(
              'info',
              'Account already exist',
              error.error.message + ' ' + 'login instead',
              ''
            );
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

  /// show message
  showToast(
    type: Toast['type'],
    title: string,
    message: string,
    actionText: string,
    action?: () => void
  ) {
    this.toast.show({
      type: type,
      title: title,
      message: message,
      actionText: actionText,
      action: action,
      duration: 5000,
    });
  }
}
