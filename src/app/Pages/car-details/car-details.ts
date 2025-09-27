import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faDoorClosed,
  faCogs,
  faGasPump,
  faStar,
  faCalendar,
  faCar,
  faPhone,
  faEnvelope,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RouterModule],
  templateUrl: './car-details.html',
  styleUrl: './car-details.css',
})
export class CarDetailsComponent {
  @Input() car: any;
  @Input() dealer: any;
  @Input() suggestedCars: any[] = [];

  // FontAwesome Icons
  faUser = faUser;
  faDoor = faDoorClosed;
  faCogs = faCogs;
  faGas = faGasPump;
  faStar = faStar;
  faCalendar = faCalendar;
  faCar = faCar;
  faPhone = faPhone;
  faEmail = faEnvelope;
  faChat = faCommentDots;

  // Booking Form
  bookingForm: FormGroup;

  // Tabs
  selectedTab: 'overview' | 'specs' | 'reviews' | 'faq' = 'overview';

  // Main image for gallery
  mainImage: string = '';

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      guests: [1],
    });

    this.initializeDummyData();
    this.mainImage = this.car.images[0]; // Default main image
  }

  selectTab(tab: 'overview' | 'specs' | 'reviews' | 'faq') {
    this.selectedTab = tab;
  }

  // Update main image on thumbnail click
  selectMainImage(img: string) {
    this.mainImage = img;
  }

  bookNow() {
    if (this.bookingForm.valid) {
      alert('Booking submitted!'); // Replace with actual API call
    }
  }

  private initializeDummyData() {
    if (!this.car) {
      this.car = {
        name: 'Toyota Corolla 2023',
        category: 'Sedan',
        pricePerDay: 5000,
        rating: 4.5,
        seats: 5,
        doors: 4,
        transmission: 'Automatic',
        fuel: 'Petrol',
        description: 'Comfortable sedan for city and highway driving.',
        images: ['/car1.jpg', '/car2.jpg', '/car3.jpg'],
        reviews: [
          { user: 'Ali', comment: 'Great car!', rating: 5 },
          { user: 'Sara', comment: 'Smooth ride.', rating: 4 },
        ],
        faq: [
          { question: 'Can I cancel?', answer: 'Yes, 24h before rental.' },
          { question: 'Insurance included?', answer: 'Yes, fully covered.' },
        ],
      };
    }

    if (!this.dealer) {
      this.dealer = {
        name: 'City Car Rentals',
        avatar: '/usershashky.jpg',
        rating: 5,
        contact: {
          phone: '+92 300 1234567',
          email: 'info@citycars.com',
        },
      };
    }

    if (!this.suggestedCars || this.suggestedCars.length === 0) {
      this.suggestedCars = [
        { name: 'Honda Civic', pricePerDay: 5200, image: '/car1.jpg' },
        { name: 'Nissan Altima', pricePerDay: 4800, image: '/car2.jpg' },
        { name: 'Suzuki Swift', pricePerDay: 3500, image: '/car3.jpg' },
      ];
    }
  }
}
