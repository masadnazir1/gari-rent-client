import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faShop } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../../services/api.service';
import { UserContextService } from '../../../../../services/shared/context/user-context.service';

@Component({
  selector: 'app-dealer-header',
  imports: [CommonModule, FaIconComponent],
  standalone: true,
  templateUrl: './dealer-header.html',
  styleUrls: ['./dealer-header.css'],
})
export class DealerHeader implements OnInit {
  businessData: any = null;
  User: any | null = null;
  searchTerm = '';
  faShop = faShop;

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
}
