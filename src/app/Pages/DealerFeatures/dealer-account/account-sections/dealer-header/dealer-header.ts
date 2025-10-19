import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../../services/api.service';
import { LocalStorageService } from '../../../../../services/shared/storage/local-storage.service';
import { UserContextService } from '../../../../../services/shared/context/user-context.service';

@Component({
  selector: 'app-dealer-header',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './dealer-header.html',
  styleUrls: ['./dealer-header.css'],
})
export class DealerHeader implements OnInit {
  businessData: any = null;
  User: any | null = null;
  searchTerm = '';

  constructor(
    private API: ApiService,
    private LocalStorage: LocalStorageService,
    private userContext: UserContextService
  ) {}

  ngOnInit(): void {
    this.User = this.userContext.getUser();

    console.log(this.User);
    this.getDealerData();
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    console.log('Searching:', this.searchTerm);
  }

  onNotificationClick() {
    console.log('Notification clicked');
  }

  getDealerData() {
    this.API.get('dealer/6').subscribe({
      next: (res: any) => {
        if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
          this.businessData = res.data[0];

          console.log('businessData', this.businessData);
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
