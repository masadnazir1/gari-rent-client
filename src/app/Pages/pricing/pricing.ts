import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheck,
  faCalculator,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { RouterModule, Router } from '@angular/router';
import { PageHeader } from '../../components/shared/page-header/page-header';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
    PageHeader,
  ],
  templateUrl: './pricing.html',
  styleUrls: ['./pricing.css'],
})
export class PricingComponent {
  // Icons
  faCheck = faCheck;
  faCalculator = faCalculator;
  faInfo = faInfoCircle;

  // Dealer tiers
  dealerTiers = [
    {
      id: 'starter',
      name: 'Starter',
      priceLabel: '₨1000 / month',
      monthly: 1000,
      bullets: ['List up to 3 cars', 'Weekly payouts', 'Basic support'],
    },
    {
      id: 'pro',
      name: 'Pro',
      priceLabel: '₨2000 / month',
      monthly: 2000,
      bullets: ['List up to 10 cars', 'Priority payouts', 'Dedicated support'],
    },
    {
      id: 'premium',
      name: 'Premium',
      priceLabel: '₨3000 / month',
      monthly: 3000,
      bullets: [
        'Unlimited car listings',
        'Fastest payouts',
        'Dedicated manager & promo tools',
      ],
    },
  ];

  // Calculator form
  calcForm: FormGroup;

  estimate = { dealerNet: 0 };

  constructor(private fb: FormBuilder, public router: Router) {
    this.calcForm = this.fb.group({
      days: new FormControl(3),
      avgPrice: new FormControl(50),
    });

    this.calculate(); // initial calculation
    this.calcForm.valueChanges.subscribe(() => this.calculate());
  }

  // Helper getters for template to avoid type errors
  get daysControl(): FormControl {
    return this.calcForm.get('days') as FormControl;
  }

  get avgPriceControl(): FormControl {
    return this.calcForm.get('avgPrice') as FormControl;
  }

  calculate() {
    const val = this.calcForm.value;
    const days = Number(val.days) || 0;
    const avg = Number(val.avgPrice) || 0;
    const renterTotal = days * avg;
    const commissionRate = 10; // 10% commission
    const dealerNet = renterTotal * (1 - commissionRate / 100);
    this.estimate = { dealerNet };
  }

  selectTier(tier: any) {
    this.router.navigate(['/partner']);
  }
}
