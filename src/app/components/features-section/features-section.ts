import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCar,
  faCalendarAlt,
  faMoneyBillWave,
  faTools,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-features-section',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './features-section.html',
  styleUrls: ['./features-section.css'],
})
export class FeaturesSectionComponent {
  faCar = faCar;
  faCalendarAlt = faCalendarAlt;
  faMoneyBillWave = faMoneyBillWave;
  faTools = faTools;

  features = [
    {
      icon: this.faCar,
      title: 'Car Management',
      desc: 'Easily add, update, and manage your car listings in one centralized dashboard.',
    },
    {
      icon: this.faCalendarAlt,
      title: 'Booking Control',
      desc: 'Track ongoing, pending, and completed bookings with real-time insights.',
    },
    {
      icon: this.faMoneyBillWave,
      title: 'Earnings Insights',
      desc: 'Visualize monthly or yearly earnings and export detailed financial reports.',
    },
    {
      icon: this.faTools,
      title: 'Maintenance Tracking',
      desc: 'Stay ahead of servicing schedules to keep your fleet running efficiently.',
    },
  ];
}
