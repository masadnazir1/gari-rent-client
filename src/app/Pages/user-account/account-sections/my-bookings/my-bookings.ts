import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ApiService } from '../../../../services/api.service';
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
import { Booking } from '../../../../Interfaces/BookingInterface';
import { ConfirmDialogComponent } from '../../../../components/shared/confirm-dialog/confirm-dialog';
import { LoadingComponent } from '../../../../components/shared/loading/loading';
import { Modalrelative } from '../../../../components/shared/modalrelative/modalrelative';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    FaIconComponent,
    ConfirmDialogComponent,
    LoadingComponent,
    Modalrelative,
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

  //
  rating = 0;
  feedbackText = '';
  submitted = false;
  //
  constructor(private API: ApiService, private router: Router) {}

  ngOnInit(): void {
    const UserData = localStorage.getItem('user');
    if (UserData) {
      const user = JSON.parse(UserData);
      this.userId = user.id;
    }
    this.getUpCommingg();
  }

  bookings: Booking[] = [];
  tobeReviewd: any[] = [];

  allBookingsData: any[] = [];
  ActiveBooking: Booking[] = [];

  get upcomingBookings() {
    return this.bookings.filter((b) => b.status === 'upcoming');
  }

  get pastBookings() {
    return this.bookings.filter((b) => b.status !== 'upcoming');
  }

  //api to get the upcomming bookings
  getUpCommingg() {
    this.isLoading = true;
    this.API.get<{ data: any[] }>(`${this.endPoint}${this.userId}`).subscribe({
      next: (res: any) => {
        const bookings = res?.data || [];

        this.bookings = bookings.map((b: any) => ({
          id: b.id,
          car: {
            id: b.car.id,
            name: b.car.name,
            brand: b.car.brand?.name,
            category: b.car.category?.name,
            image: b.car.images?.[0] || '/default-car.png',
            year: b.car.year,
            transmission: b.car.transmission,
            fuel: b.car.fuel,
            ac: b.car.ac,
            location: b.car.location,
            dealer: {
              id: b.car.dealer?.id,
              name: b.car.dealer?.full_name,
              business: b.car.dealer?.business,
              phone: b.car.dealer?.phone,
              email: b.car.dealer?.email,
            },
          },
          pickupLocation: b.pickup_location,
          dropoffLocation: b.dropoff_location,
          pickupDate: b.start_date,
          dropoffDate: b.end_date,
          totalPrice: Number(b.total_price),
          discount: Number(b.discount),
          finalAmount: Number(b.final_amount),
          status: b.status,
          paymentStatus: b.payment_status,
          coupon: b.coupon
            ? {
                code: b.coupon.code,
                discountType: b.coupon.discount_type,
                discountValue: b.coupon.discount_value,
              }
            : null,
        }));

        console.log('Mapped Bookings:', this.bookings);
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
          this.getUpCommingg();
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
    this.activeBookingId = this.activeBookingId === id ? null : id;
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
    this.activeBookingId = this.activeBookingId === id ? null : id;
    alert(`Booking #${id} extension requested!`);
  }

  viewBooking(id: string) {
    this.activeBookingId = this.activeBookingId === id ? null : id;
    alert(`Viewing details for booking #${id}`);
  }

  downloadInvoice(id: string) {
    this.activeBookingId = this.activeBookingId === id ? null : id;
    alert(`Invoice for booking #${id} downloaded!`);
  }

  rebook(id: string) {
    alert(`Booking #${id} rebooked!`);
  }

  contactSupport(id: string) {
    this.activeBookingId = this.activeBookingId === id ? null : id;
    alert(`Support request opened for booking #${id}`);
  }

  gotoCarsPage() {
    this.router.navigate(['/cars']);
  }

  goToDetails(id: any) {
    this.ActiveBooking = this.allBookingsData.filter(
      (booking) => booking?.id === id
    );

    this.router.navigate(['/car-details'], {
      state: { car: this.allBookingsData[0].carId },
    });
  }

  OpenModal(booking: any) {
    this.tobeReviewd = this.allBookingsData.filter((b: any) => {
      return booking.id == b.id;
    });

    this.isModalOpen = true;
    document.body.style.overflow = 'hidden'; // disable page scroll
  }
  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto'; // re-enable page scroll
  }

  submitFeedback() {
    this.API.post('user/reviews/', {
      bookingId: this.tobeReviewd[0].id,
      raterId: this.userId,
      dealerId: this.tobeReviewd[0].dealerId,
      carId: this.tobeReviewd[0].carId.id,
      rating: this.rating,
      comment: this.feedbackText,
    }).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.submitted = true;
        }
      },

      error: (err) => {},
    });
  }

  setRating(star: number) {
    this.rating = star;
  }
}
