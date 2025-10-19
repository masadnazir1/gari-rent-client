import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContextService } from '../../../../../services/shared/context/user-context.service';
import { ApiService } from '../../../../../services/api.service';
import { Modalrelative } from '../../../../../components/shared/modalrelative/modalrelative';
import { AddCustomer } from '../../../../../components/Dealer/add-customer/add-customer';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-customers-component',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, Modalrelative, AddCustomer],
  templateUrl: './customers-component.html',
  styleUrls: ['./customers-component.css'],
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  //
  isModalOpen = false;
  constructor(
    private UserContext: UserContextService,
    private API: ApiService
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    this.API.get(`dealer/customers/${6}`).subscribe({
      next: (data: any) => {
        console.log(data);
        this.customers = data.data;
      },
      error: (err) => {},
    });
  }

  closeModal() {
    this.isModalOpen = !this.isModalOpen;
  }
}
