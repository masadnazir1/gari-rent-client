import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Modalrelative } from '../../../../../components/shared/modalrelative/modalrelative';
import { ApiService } from '../../../../../services/api.service';

import {
  faBars,
  faBell,
  faCalendar,
  faCar,
  faCheckCircle,
  faChevronLeft,
  faChevronRight,
  faCoins,
  faComment,
  faListDots,
  faMapPin,
  faShieldAlt,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { BookingDetails } from '../../../../../components/Dealer/booking-details/booking-details';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [FormsModule, CommonModule, Modalrelative, BookingDetails],
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
  faCheckCircle = faCheckCircle;
  isLoading = false;

  activeTab: 'upcoming' | 'past' = 'upcoming';
  BookingIdDelete: string | null = null;
  activeBookingId: string | null = null;
  isDialogOpen = false;
  userId = '';
  endPoint = `bookings/user/upcoming?userId=`;
  UpcommingEndPoint = `bookings/user/upcoming?userId=`;
  pastEndPoint = `bookings/user/past?userId=`;
  isModalOpen: boolean = false;
  bookings: any[] = [];
  bookingDetails: any;

  //
  rating = 0;
  feedbackText = '';
  submitted = false;
  //
  bookingStatuses = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];
  selectedStatus: string = '';
  //
  constructor(private API: ApiService, private router: Router) {}

  ngOnInit(): void {
    const UserData = localStorage.getItem('user');
    if (UserData) {
      const user = JSON.parse(UserData);
      this.userId = user.id;
    }
    this.getBookings();
  }
  onStatusClick(status: string) {
    this.selectedStatus = status;
    //
    if (status === 'All') {
      this.getBookings();
      return;
    }
    this.API.get(
      `dealer/bookings/status/${this.userId}?status=${status.toLowerCase()}`
    ).subscribe({
      next: (res: any) => {
        if (res.success && Array.isArray(res.data)) {
          this.bookings = res.data;
        }
      },
      error: (err) => {
        console.error('error getting bookings by status');
      },
    });
  }

  getBookings() {
    this.selectedStatus = 'All';
    this.API.get(`dealer/dashboard/recent/${this.userId}`).subscribe({
      next: (res: any) => {
        if (res.success && Array.isArray(res.data)) {
          this.bookings = res.data;
        }
      },
      error: (err) => {
        console.error('error getting recent bookings');
      },
    });
  }
  getBookingsDetails(booking_id: string) {
    this.API.get(`dealer/bookings/details/${booking_id}`).subscribe({
      next: (res: any) => {
        console.log('data of booking details', res.data);
        if (res.success) {
          console.log('data of booking details', res.data);
          this.bookingDetails = res?.data;
        }
      },
      error: (err) => {
        console.error('error getting bookings details', err);
      },
    });
  }

  openModal(booking_id: string) {
    this.getBookingsDetails(booking_id);
    this.isModalOpen = !this.isModalOpen;

    document.body.style.overflow = 'hidden'; // disable page scroll
  }
  closeModal() {
    this.isModalOpen = !this.isModalOpen;
    document.body.style.overflow = 'auto'; // enable page scroll
  }
}
