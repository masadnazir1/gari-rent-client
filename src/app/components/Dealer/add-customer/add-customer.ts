import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  FaIconComponent,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../services/api.service';
import { UserContextService } from '../../../services/shared/context/user-context.service';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, FaIconComponent, FontAwesomeModule],
  templateUrl: './add-customer.html',
  styleUrls: ['./add-customer.css'],
})
export class AddCustomer implements OnInit {
  form = {
    dealerId: '6',
    full_name: '',
    email: '',
    phone: '',
    address: '',
  };

  userData: any = {};
  loading = false;
  success = false;

  constructor(
    private API: ApiService,
    private UserContext: UserContextService
  ) {}

  faCheckCircle = faCheckCircle;

  ngOnInit(): void {
    this.userData = this.UserContext.getUser();
    this.form.dealerId = this.userData?.id;
  }

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
