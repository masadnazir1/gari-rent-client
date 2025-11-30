import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Modalrelative } from '../../../../../components/shared/modalrelative/modalrelative';
import { ApiService } from '../../../../../services/api.service';
import { UserContextService } from '../../../../../services/shared/context/user-context.service';

@Component({
  selector: 'app-vehicles-component',
  standalone: true,
  imports: [CommonModule, FormsModule, Modalrelative],
  templateUrl: './vehicles-component.html',
  styleUrls: ['./vehicles-component.css'],
})
export class VehiclesComponent implements OnInit {
  vehicles: any[] = [];
  vehicleToEdit: any = {};

  isLoading = true;
  selectedStatus: string = 'all';
  vehicleStatuses: string[] = ['All', 'Available', 'Unavailable'];
  userId: any | null = null;
  isModalOpen = false;

  form = {
    description: this.vehicleToEdit.description,
    fuel: this.vehicleToEdit?.fuel,
    ac: this.vehicleToEdit?.ac,
    year: this.vehicleToEdit?.year,
    mileage: this.vehicleToEdit?.mileage,
    status: this.vehicleToEdit?.status,
    badge: this.vehicleToEdit?.badge,
    daily_rate: this.vehicleToEdit?.daily_rate,
  };

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

  openModal(vehicle: any) {
    document.body.style.overflow = 'hidden';
    this.vehicleToEdit = vehicle;
    this.isModalOpen = !this.isModalOpen;

    (this.form.description = this.vehicleToEdit.description),
      (this.form.fuel = this.vehicleToEdit?.fuel),
      (this.form.ac = this.vehicleToEdit?.ac),
      (this.form.year = this.vehicleToEdit?.year),
      (this.form.mileage = this.vehicleToEdit?.mileage),
      (this.form.status = this.vehicleToEdit?.status),
      (this.form.badge = this.vehicleToEdit?.badge),
      (this.form.daily_rate = this.vehicleToEdit?.daily_rate);
  }

  //
  //
  //
  closeModal() {
    this.isModalOpen = !this.isModalOpen;
    document.body.style.overflow = 'auto';
  }

  updateVehicle() {
    this.isLoading = true;
    this.api
      .patch(`dealer/vehicle/${this.userId}/${this.vehicleToEdit?.id}`, {
        description: this.form.description,
        fuel: this.form.fuel,
        ac: this.form.ac,
        year: this.form.year,
        mileage: this.form.mileage,
        status: this.form.status,
        badge: this.form.badge,
        daily_rate: this.form.daily_rate,
      })
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;

          this.isModalOpen = !this.isModalOpen;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        },
      });
  }
}
