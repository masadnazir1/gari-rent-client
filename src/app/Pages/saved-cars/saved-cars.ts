import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CarCard } from '../../components/BookingPage/car-card/car-card';
import { CommonModule } from '@angular/common';
import { UserNavbarComponent } from '../../components/Navbars/user-navbar/user-navbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-saved-cars',
  imports: [CarCard, CommonModule, UserNavbarComponent, FontAwesomeModule],
  templateUrl: './saved-cars.html',
  styleUrl: './saved-cars.css',
})
export class SavedCars implements OnInit {
  faSave = faSave;
  carsList: any[] = [];
  //
  constructor(private API: ApiService, private router: Router) {}

  //
  ngOnInit(): void {
    this.fetchFavCars();
  }

  fetchFavCars() {
    this.API.get(`saved/68d0976819d0a06a96f6fdc9`).subscribe({
      next: (res: any) => {
        this.carsList = res.cars.map((car: any) => ({
          ...car,
          saved: true,
        }));
      },
      error: (err) => {
        console.error('Error fetching cars:', err);
      },
    });
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
