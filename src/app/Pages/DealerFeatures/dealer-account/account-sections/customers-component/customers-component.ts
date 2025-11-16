import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddCustomer } from '../../../../../components/Dealer/add-customer/add-customer';
import { Modalrelative } from '../../../../../components/shared/modalrelative/modalrelative';
import { ApiService } from '../../../../../services/api.service';
import { UserContextService } from '../../../../../services/shared/context/user-context.service';

@Component({
  selector: 'app-customers-component',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, Modalrelative, AddCustomer],
  templateUrl: './customers-component.html',
  styleUrls: ['./customers-component.css'],
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  userData: any = {};
  //
  isModalOpen = false;
  constructor(
    private UserContext: UserContextService,
    private API: ApiService
  ) {}

  ngOnInit(): void {
    this.userData = this.UserContext.getUser();
    this.getCustomer();
  }

  getCustomer() {
    this.API.get(`dealer/customers/${this.userData?.id}`).subscribe({
      next: (data: any) => {
        this.customers = data.data;
      },
      error: (err) => {},
    });
  }

  closeModal() {
    this.isModalOpen = !this.isModalOpen;
  }
}
