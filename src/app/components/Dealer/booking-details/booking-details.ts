import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { UserContextService } from '../../../services/shared/context/user-context.service';
import { LoadingComponent } from '../../shared/loading/loading';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [DatePipe, FormsModule, LoadingComponent, CommonModule],
  templateUrl: './booking-details.html',
  styleUrls: ['./booking-details.css'],
})
export class BookingDetails implements OnInit {
  @Input() data: any;

  booking_status: string = '';
  payment_status: string = '';
  isLoading: boolean = false;
  userData: any = {};
  bookingData: any = [];
  //constructor
  constructor(
    private api: ApiService,
    private UserContext: UserContextService
  ) {}

  ngOnInit(): void {
    this.userData = this.UserContext.getUser();
  }

  ngOnChanges() {
    console.log('data', this.data);
    this.bookingData = this.data;
  }

  async updateBooking() {
    this.api
      .patch(`dealer/bookings/${this.bookingData?.booking?.id}`, {
        booking_status: this.booking_status || this.bookingData.booking?.status,
        payment_status:
          this.payment_status || this.bookingData.booking?.payment_status,
      })
      .subscribe({
        next: (response) => {
          console.log('response', response);
        },
      });
  }
}
