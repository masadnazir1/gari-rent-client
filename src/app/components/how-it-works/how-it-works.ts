import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  imports: [CommonModule],
  templateUrl: './how-it-works.html',
  styleUrls: ['./how-it-works.css'],
})
export class HowItWorksComponent {
  steps = [
    {
      number: '1',
      title: 'Register Dealership',
      desc: 'Create your account and set up your dealership profile in minutes.',
    },
    {
      number: '2',
      title: 'Add Car Listings',
      desc: 'Upload photos and details of your vehicles to build your online fleet.',
    },
    {
      number: '3',
      title: 'Accept Bookings',
      desc: 'Go live and start accepting online reservations from customers.',
    },
  ];
}
