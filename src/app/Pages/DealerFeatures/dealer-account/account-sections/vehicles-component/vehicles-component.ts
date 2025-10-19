import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../../services/api.service';
import { UserContextService } from '../../../../../services/shared/context/user-context.service';

@Component({
  selector: 'app-vehicles-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicles-component.html',
  styleUrls: ['./vehicles-component.css'],
})
export class VehiclesComponent implements OnInit {
  vehicles: any[] = [];
  isLoading = true;
  selectedStatus: string = 'all';
  vehicleStatuses: string[] = ['All', 'Available', 'Rented', 'Maintenance'];
  userId: any | null = null;

  constructor(
    private api: ApiService,
    private userContext: UserContextService
  ) {}

  ngOnInit() {
    const user = this.userContext.getUser();
    this.userId = user?.id;

    this.fetchVehicles();
  }

  fetchVehicles() {
    this.isLoading = true;
    this.api.get(`dealer/vehicle/${this.userId}`).subscribe({
      next: (res: any) => {
        this.vehicles = res?.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  onStatusClick(status: string) {
    this.selectedStatus = status.toLowerCase();
  }

  get filteredVehicles() {
    if (this.selectedStatus === 'all') return this.vehicles;
    return this.vehicles.filter(
      (v) => v.status.toLowerCase() === this.selectedStatus
    );
  }
}
