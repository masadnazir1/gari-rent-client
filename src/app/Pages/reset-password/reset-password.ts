import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLock, faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css'],
})
export class ResetPassword {
  faLock = faLock;
  faKey = faKey;

  newPassword: string = '';
  confirmPassword: string = '';
  submitted: boolean = false;

  onSubmit(form: NgForm) {
    if (form.valid && this.newPassword === this.confirmPassword) {
      this.submitted = true;
    }
  }
}
