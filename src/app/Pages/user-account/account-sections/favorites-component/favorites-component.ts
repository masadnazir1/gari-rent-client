import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FavoriteCar {
  id: string;
  name: string;
  category: string;
  image: string;
  dailyRate: number;
  location: string;
  status: 'available' | 'unavailable';
}

@Component({
  selector: 'app-favorites-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites-component.html',
  styleUrls: ['./favorites-component.css'],
})
export class FavoritesComponent {
  favorites: FavoriteCar[] = [
    {
      id: '1',
      name: 'Toyota Corolla',
      category: 'Sedan',
      image: '/usershashky.jpg',
      dailyRate: 50,
      location: 'Lahore, Punjab',
      status: 'available',
    },
    {
      id: '2',
      name: 'Honda Civic',
      category: 'Sedan',
      image: '/usershashky.jpg',
      dailyRate: 60,
      location: 'Karachi, Sindh',
      status: 'available',
    },
    {
      id: '3',
      name: 'Range Rover Evoque',
      category: 'Luxury SUV',
      image: '/usershashky.jpg',
      dailyRate: 120,
      location: 'Islamabad, Pakistan',
      status: 'unavailable',
    },
  ];

  removeFavorite(id: string) {
    this.favorites = this.favorites.filter((car) => car.id !== id);
  }

  bookNow(car: FavoriteCar) {
    alert(`Booking started for ${car.name}`);
    // later → route to booking flow with carId
  }
}
