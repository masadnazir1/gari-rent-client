import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheckCircle,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../services/api.service';
import { UserContextService } from '../../../services/shared/context/user-context.service';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './add-vehicle.html',
  styleUrls: ['./add-vehicle.css'],
})
export class AddVehicle implements OnInit {
  //
  //
  faTrashAlt = faTrashAlt;
  faCheckCircle = faCheckCircle;
  faPlus = faPlus;

  form = {
    dealer_id: 0,
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

  constructor(
    private API: ApiService,
    private UserContext: UserContextService
  ) {
    this.form.dealer_id = this.UserContext.getUser()?.id || 0;
  }
  selectedFiles: File[] = [];
  previews: string[] = [];
  brands: any[] = [];
  categories: any[] = [];
  loading = false;
  success = false;

  async getBrands() {
    try {
      this.API.get('/dealer/brands').subscribe({
        next: (data: any) => {
          if (data.statusCode === 200) {
            this.brands = data.data;
          }
        },
      });
    } catch (err) {
      console.error('error getting the brands names', err);
    }
  }

  async getCategories() {
    try {
      this.API.get('/dealer/categories').subscribe({
        next: (data: any) => {
          if (data.statusCode === 200) {
            this.categories = data.data;
          }
        },
      });
    } catch (err) {
      console.error('error getting the brands names', err);
    }
  }

  ngOnInit(): void {
    this.getBrands();
    this.getCategories();
  }

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
    formData.append('dealer_id', this.form?.dealer_id.toString());
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
        this.loading = false;
        this.success = true;
        window.location.reload;
      },
      error: (err) => {
        console.error('Error in addVehicles:', err);
        this.loading = false;
        alert('Error adding vehicle');
      },
    });
  }
}
