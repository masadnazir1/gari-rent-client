import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTrashAlt,
  faCheckCircle,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './add-vehicle.html',
  styleUrls: ['./add-vehicle.css'],
})
export class AddVehicle {
  faTrashAlt = faTrashAlt;
  faCheckCircle = faCheckCircle;
  faPlus = faPlus;

  form = {
    dealer_id: '6',
    brand_id: '',
    carName: '',
    category_id: '',
    description: '',
    badge: '',
    doors: '',
    seats: '',
    transmission: 'auto',
    fuel: 'petrol',
    daily_rate: '',
    status: 'available',
    location: '',
    ac: false,
    year: '',
    mileage: '',
  };

  selectedFiles: File[] = [];
  previews: string[] = [];
  loading = false;
  success = false;

  constructor(private API: ApiService) {}

  onFilesSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    const totalFiles = this.selectedFiles.length + files.length;

    if (totalFiles > 10) {
      alert('Maximum 10 images allowed.');
      return;
    }

    for (const file of files) {
      this.selectedFiles.push(file);
      const reader = new FileReader();
      reader.onload = (e: any) => this.previews.push(e.target.result);
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
    this.previews.splice(index, 1);
  }

  addVehicle() {
    this.loading = true;

    const formData = new FormData();
    formData.append('dealer_id', this.form.dealer_id);
    formData.append('brand_id', String(Number(this.form.brand_id)));
    formData.append('category_id', String(Number(this.form.category_id)));
    formData.append('carName', this.form.carName);
    formData.append('description', this.form.description);
    formData.append('badge', this.form.badge);
    formData.append('doors', String(Number(this.form.doors)));
    formData.append('seats', String(Number(this.form.seats)));
    formData.append('transmission', this.form.transmission);
    formData.append('fuel', this.form.fuel);
    formData.append('daily_rate', String(Number(this.form.daily_rate)));
    formData.append('status', this.form.status);
    formData.append('location', this.form.location);
    formData.append('ac', String(this.form.ac));
    formData.append('year', String(Number(this.form.year)));
    formData.append('mileage', String(Number(this.form.mileage)));

    for (const file of this.selectedFiles) {
      formData.append('images', file);
    }

    this.API.post('dealer/vehicle/add', formData).subscribe({
      next: (res: any) => {
        console.log('Vehicle added:', res);
        this.loading = false;
        this.success = true;
      },
      error: (err) => {
        console.error('Error in addVehicles:', err);
        this.loading = false;
        alert('Error adding vehicle');
      },
    });
  }
}
