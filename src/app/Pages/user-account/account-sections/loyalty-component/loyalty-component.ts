import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faGift,
  faTrophy,
  faStar,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

interface RewardTier {
  name: string;
  pointsRequired: number;
  perks: string[];
  icon: string;
}

@Component({
  selector: 'app-loyalty-component',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './loyalty-component.html',
  styleUrls: ['./loyalty-component.css'],
})
export class LoyaltyComponent {
  currentPoints = 2200;

  rewardTiers: RewardTier[] = [
    {
      name: 'Silver',
      pointsRequired: 1000,
      perks: ['5% off rentals', 'Priority support'],
      icon: 'star',
    },
    {
      name: 'Gold',
      pointsRequired: 2500,
      perks: ['10% off rentals', 'Free upgrade once/month'],
      icon: 'trophy',
    },
    {
      name: 'Platinum',
      pointsRequired: 5000,
      perks: ['15% off rentals', 'VIP support', 'Exclusive deals'],
      icon: 'gift',
    },
  ];

  constructor(library: FaIconLibrary) {
    library.addIcons(faGift, faTrophy, faStar, faArrowRight);
  }

  getNextTier(): RewardTier | null {
    return (
      this.rewardTiers.find(
        (tier) => tier.pointsRequired > this.currentPoints
      ) || null
    );
  }

  pointsToNextTier(): number {
    const nextTier = this.getNextTier();
    return nextTier ? nextTier.pointsRequired - this.currentPoints : 0;
  }
}
