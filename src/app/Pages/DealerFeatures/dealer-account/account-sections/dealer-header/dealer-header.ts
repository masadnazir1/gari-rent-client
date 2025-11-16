import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faShop } from '@fortawesome/free-solid-svg-icons';
import { AddVehicle } from '../../../../../components/Dealer/add-vehicle/add-vehicle';
import { Modalrelative } from '../../../../../components/shared/modalrelative/modalrelative';
import { ApiService } from '../../../../../services/api.service';
import { UserContextService } from '../../../../../services/shared/context/user-context.service';

@Component({
  selector: 'app-dealer-header',
  imports: [CommonModule, FaIconComponent, AddVehicle, Modalrelative],
  standalone: true,
  templateUrl: './dealer-header.html',
  styleUrls: ['./dealer-header.css'],
})
export class DealerHeader implements OnInit {
  businessData: any = null;
  User: any | null = null;
  searchTerm = '';
  faShop = faShop;
  faPlus = faPlus;
  isModalOpen: boolean = false;

  constructor(
    private API: ApiService,
    private userContext: UserContextService
  ) {}

  ngOnInit(): void {
    this.User = this.userContext.getUser();

    this.getDealerData();
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
  }

  onWebsiteClick() {
    alert('Notification clicked');
  }

  getDealerData() {
    this.API.get(`dealer/${this.User?.id}`).subscribe({
      next: (res: any) => {
        if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
          this.businessData = res.data[0];
        } else {
          console.warn('Dealer data empty or invalid format');
          this.businessData = null;
        }
      },
      error: (err) => {
        console.error('Error fetching dealer data:', err);
        this.businessData = null;
      },
    });
  }

  openModal() {
    this.isModalOpen = !this.isModalOpen;
    document.body.style.overflow = 'hidden'; // disable page scroll
  }
  closeModal() {
    this.isModalOpen = !this.isModalOpen;
    document.body.style.overflow = 'auto'; // enable page scroll
  }
}
