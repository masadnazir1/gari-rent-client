import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCar,
  faCalendarCheck,
  faChartLine,
  faRobot,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pricing-section',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './pricing-section.html',
  styleUrls: ['./pricing-section.css'],
})
export class PricingSectionComponent {
  faIcons = [faCar, faCalendarCheck, faChartLine, faRobot];

  plans = [
    {
      name: 'Free Plan',
      price: '0 PKR/month',
      features: [
        { icon: faCar, label: '5 cars' },
        { icon: faCalendarCheck, label: 'Limited bookings' },
        { icon: faChartLine, label: 'Medium reporting features' },
        { icon: faRobot, label: 'Limited AI assistant' },
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Premium Plan',
      price: '999 PKR/month',
      features: [
        { icon: faCar, label: 'Unlimited cars' },
        { icon: faCalendarCheck, label: 'Unlimited bookings' },
        { icon: faChartLine, label: 'Advanced reporting features' },
        { icon: faRobot, label: 'Advanced AI assistant' },
      ],
      cta: 'Get Premium',
      popular: true,
    },
  ];
}
