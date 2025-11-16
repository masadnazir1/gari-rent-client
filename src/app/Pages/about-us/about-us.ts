import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageHeader } from '../../components/shared/page-header/page-header';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, PageHeader],
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.css'],
})
export class AboutUs {
  testimonials = [
    {
      text: 'Garirent made booking a car as easy as ordering food. Loved it!',
      rating: 5,
      name: 'Ali R.',
    },
    {
      text: 'As a dealer, I now get more bookings every week. Great platform!',
      rating: 4,
      name: 'Ahmed K.',
    },
    {
      text: 'Transparent prices and reliable cars. Highly recommended.',
      rating: 5,
      name: 'Sara M.',
    },
  ];

  constructor(private library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
