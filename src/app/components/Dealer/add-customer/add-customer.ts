import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import {
  FontAwesomeModule,
  FaIconComponent,
} from '@fortawesome/angular-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, FaIconComponent, FontAwesomeModule],
  templateUrl: './add-customer.html',
  styleUrls: ['./add-customer.css'],
})
export class AddCustomer {
  form = {
    dealerId: '6',
    full_name: '',
    email: '',
    phone: '',
    address: '',
  };
  loading = false;
  success = false;

  constructor(private API: ApiService) {}

  faCheckCircle = faCheckCircle;

  addCustomer() {
    this.loading = true;
    this.API.post('dealer/customers/', this.form).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.success = true;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
