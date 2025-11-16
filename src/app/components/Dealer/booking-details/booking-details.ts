import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './booking-details.html',
  styleUrls: ['./booking-details.css'],
})
export class BookingDetails {
  @Input() data: any;
}
