import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ApiService } from '../../../../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  faCheckCircle,
  faMapPin,
} from '@fortawesome/free-solid-svg-icons';
import { Booking } from '../../../../../Interfaces/BookingInterface';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [FormsModule, CommonModule],
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
      error: (err) => {},
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
      error: (err) => {},
    });
  }
}
