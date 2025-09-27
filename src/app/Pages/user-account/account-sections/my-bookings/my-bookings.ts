import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ApiService } from '../../../../services/api.service';

import {
  faUser,
  faComment,
  faShieldAlt,
  faBell,
  faCar,
  faCalendar,
  faCoins,
  faBars,
  faChevronLeft,
  faChevronRight,
  faListDots,
  faTimes,
  faMapPin,
} from '@fortawesome/free-solid-svg-icons';
import { Booking } from '../../../../Interfaces/BookingInterface';
import { ConfirmDialogComponent } from '../../../../components/shared/confirm-dialog/confirm-dialog';
import { LoadingComponent } from '../../../../components/shared/loading/loading';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    CommonModule,
    FaIconComponent,
    ConfirmDialogComponent,
    LoadingComponent,
  ],
  templateUrl: './my-bookings.html',
  styleUrls: ['./my-bookings.css'],
})
export class MyBookings implements OnInit {
  // icons
  faUser = faUser;
  faComment = faComment;
  faShieldAlt = faShieldAlt;
  faBell = faBell;
  faCar = faCar;
  faCalendar = faCalendar;
  faCoins = faCoins;
  faBars = faBars;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faTimes = faTimes;
  faMapPin = faMapPin;
  ThreeDots = faListDots;

  isLoading = false;

  activeTab: 'upcoming' | 'past' = 'upcoming';
  BookingIdDelete: string | null = null;
  activeBookingId: string | null = null;
  isDialogOpen = false;
  userId = '';
  endPoint = `bookings/user/upcoming?userId=`;
  UpcommingEndPoint = `bookings/user/upcoming?userId=`;
  pastEndPoint = `bookings/user/past?userId=`;
  constructor(private API: ApiService) {}

  ngOnInit(): void {
    const UserData = localStorage.getItem('user');
    if (UserData) {
      const user = JSON.parse(UserData);
      this.userId = user._id;
    }
    this.getUpCommingg();
  }

  bookings: Booking[] = [];

  get upcomingBookings() {
    return this.bookings.filter((b) => b.status === 'upcoming');
  }

  get pastBookings() {
    return this.bookings.filter((b) => b.status !== 'upcoming');
  }

  //api to get the upcomming bookings
  getUpCommingg() {
    this.isLoading = true;
    this.API.get<{ bookings: any[] }>(
      `${this.endPoint}${this.userId}`
    ).subscribe({
      next: (res) => {
        // Map API bookings -> your Booking[]
        this.bookings = res.bookings.map((b) => ({
          id: b._id,
          car: {
            name: b.carId.name,
            image: b.carId.images[0] || '/default-car.png',
            type: b.carId.category,
          },
          pickupLocation: b.pickupLocation,
          dropoffLocation: b.dropoffLocation,
          pickupDate: b.startDate,
          dropoffDate: b.endDate,
          price: b.totalPrice,
          status: this.activeTab === 'upcoming' ? 'upcoming' : 'completed',
        }));

        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching bookings', error);
        this.isLoading = false;
      },
    });
  }

  cancelBooking(id: string) {
    this.isLoading = true;
    this.API.patch<{ bookings: any[] }>(`bookings/${id}/cancel/`, {}).subscribe(
      {
        next: (res) => {
          this.isLoading = false;
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Error deleting the booking', error);
          this.isLoading = false;
        },
      }
    );
  }

  toggleOptions(id: string) {
    this.activeBookingId = this.activeBookingId === id ? null : id;
  }
  switchTab(tab: 'upcoming' | 'past') {
    this.activeTab = tab;
    if (tab === 'upcoming') {
      this.endPoint = this.UpcommingEndPoint;
      this.getUpCommingg();
    } else if (tab === 'past') {
      this.endPoint = this.pastEndPoint;
      this.getUpCommingg();
    }
  }

  openConfirmDialog(id: string) {
    this.BookingIdDelete = id;
    this.isDialogOpen = true;
  }

  cancelBookingNow() {
    if (this.BookingIdDelete) {
      this.cancelBooking(this.BookingIdDelete);
    }

    this.isDialogOpen = false;
    this.isDialogOpen = false;
  }

  extendBooking(id: string) {
    alert(`Booking #${id} extension requested!`);
  }

  viewBooking(id: string) {
    alert(`Viewing details for booking #${id}`);
  }

  downloadInvoice(id: string) {
    alert(`Invoice for booking #${id} downloaded!`);
  }

  rebook(id: string) {
    alert(`Booking #${id} rebooked!`);
  }

  contactSupport(id: string) {
    alert(`Support request opened for booking #${id}`);
  }
}
