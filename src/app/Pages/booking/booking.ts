import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { UserNavbarComponent } from '../../components/Navbars/user-navbar/user-navbar';
import { ApiService } from '../../services/api.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomDatepickerComponent } from '../../components/custom-datepicker/custom-datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastService } from '../../services/shared/toast/toast.service';
import { Toast } from '../../Interfaces/ToastInterface';

import {
  faCarSide,
  faUsers,
  faGasPump,
  faStar,
  faCalendarDays,
  faMapMarkerAlt,
  faCheckCircle,
  faDoorOpen,
  faSnowflake,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    UserNavbarComponent,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    CustomDatepickerComponent,
  ],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css'],
})
export class Booking implements OnInit {
  // Icons
  faCarSide = faCarSide;
  faUsers = faUsers;
  faGasPump = faGasPump;
  faStar = faStar;
  faCalendar = faCalendarDays;
  faMap = faMapMarkerAlt;
  faCheck = faCheckCircle;
  faDoor = faDoorOpen;
  faAC = faSnowflake;
  faMileage = faTachometerAlt;

  //
  pickedDate: string | null = null;

  // Car data
  car: any;
  mainImage: string = '';

  // Booking form state
  step = 1;
  startDate?: string;
  endDate?: string;
  days = 0;
  pickup = '';
  dropoff = '';
  totalPrice = 0;

  //date for api
  renterId = '68d0976819d0a06a96f6fdc9';
  dealerId = '68c6254e95915538b394578d';

  constructor(
    private router: Router,
    private API: ApiService,
    private toast: ToastService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.car = nav?.extras.state?.['car'];
    if (this.car) {
      this.mainImage = this.car.images[0];
    }
  }

  ngOnInit(): void {}

  setMainImage(image: string) {
    this.mainImage = image;
  }

  calculatePrice() {
    if (this.startDate && this.endDate) {
      console.log('CALC', this.startDate, this.endDate);
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
      this.days = diff > 0 ? diff : 0;
    }
    this.totalPrice = this.days * this.car.dailyRate;
  }

  nextStep() {
    if (this.step < 2) this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  BookVehicle() {
    // --- Validations ---
    if (!this.car || !this.car._id) {
      alert('Car details are missing. Please try again.');
      return;
    }

    if (!this.startDate || !this.endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      alert('Invalid date format.');
      return;
    }
    if (end <= start) {
      alert('End date must be after the start date.');
      return;
    }

    if (!this.pickup.trim()) {
      alert('Please enter a pickup location.');
      return;
    }
    if (!this.dropoff.trim()) {
      alert('Please enter a dropoff location.');
      return;
    }

    // Calculate price and days
    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    this.days = diff > 0 ? diff : 0;
    this.totalPrice = this.days * this.car.dailyRate;

    if (this.days <= 0) {
      alert('Booking duration must be at least 1 day.');
      return;
    }

    // --- API call ---
    this.API.post('bookings/create', {
      carId: this.car._id,
      renterId: this.renterId,
      dealerId: this.dealerId,
      startDate: this.startDate,
      endDate: this.endDate,
      pickupLocation: this.pickup.trim(),
      dropoffLocation: this.dropoff.trim(),
      totalPrice: this.totalPrice, // include calculated price
      days: this.days, // optional: useful for backend checks
    }).subscribe({
      next: (data) => {
        //show message
        this.showToast(
          'success',
          'Booking confirmed',
          'Booking confirmed successfully!',
          'View',
          () => {
            window.location.href = '/user-account?tab=bookings';
          }
        );

        this.resetBookingForm();
      },
      error: (error) => {
        console.error('Booking failed:', error);
        alert('Something went wrong while booking. Please try again.');
      },
    });
  }

  resetBookingForm() {
    this.step = 1;
    this.startDate = this.endDate = this.pickup = this.dropoff = '';
    this.days = 0;
    this.totalPrice = 0;
    this.mainImage = this.car?.images[0] || '';
  }

  confirmBooking() {
    this.BookVehicle();
    this.step = 1;
    this.startDate = this.endDate = this.pickup = this.dropoff = '';
    this.days = 0;
    this.totalPrice = 0;
    this.mainImage = this.car.images[0];
  }

  onDateSelected(date: string, datetype: string) {
    if (datetype === 'start') {
      this.startDate = date;
      console.log('Selected start date:', date);
    } else if (datetype === 'end') {
      this.endDate = date;
      console.log('Selected end  date:', date);
    }
    //calculatePrice
    this.calculatePrice();
    this.pickedDate = date;
  }

  /// show message

  showToast(
    type: Toast['type'],
    title: string,
    message: string,
    actionText: string,
    action?: () => void
  ) {
    this.toast.show({
      type: type,
      title: title,
      message: message,
      actionText: actionText,
      action: action,
      duration: 5000,
    });
  }
}
