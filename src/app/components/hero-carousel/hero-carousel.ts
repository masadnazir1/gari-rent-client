import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-carousel.html',
  styleUrls: ['./hero-carousel.css'],
})
export class HeroCarousel implements OnInit, OnDestroy {
  // Slides tailored for Dealer landing hero (headline + subtext + CTAs)
  slides = signal([
    {
      title: 'Manage Your Car Rentals with Ease',
      subtitle:
        'TapRide helps you handle bookings, cars, and earnings from a single dashboard.',
      image: '/slider-1.jpg',
      mockupImage: '/dashboard/dashboardTop.png',
      primaryBtn: 'Register as Dealer',
      secondaryBtn: 'Login',
    },
    {
      title: 'Add & Manage Cars Quickly',
      subtitle: 'Create listings, set availability and pricing in seconds.',
      image: '/hero-bg-2.jpg',
      mockupImage: '/dashboard/addcars.png',
      primaryBtn: 'Register as Dealer',
      secondaryBtn: 'Learn More',
    },
    {
      title: 'Track Bookings & Earnings',
      subtitle: 'View bookings, earnings reports and payouts in one place.',
      image: '/hero-bg-3.jpg',
      mockupImage: '/dashboard/bookings.png',
      primaryBtn: 'Get Started',
      secondaryBtn: 'Contact Sales',
    },
  ]);

  constructor(private router: Router) {}

  currentIndex = signal(0);
  autoplayInterval: any;

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    // change slide every 3 seconds
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, 3000);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  next() {
    this.currentIndex.update((i) => (i + 1) % this.slides().length);
  }

  prev() {
    this.currentIndex.update(
      (i) => (i - 1 + this.slides().length) % this.slides().length
    );
  }

  goToSlide(index: number) {
    this.currentIndex.set(index);
  }

  // Helper used in template for safe binding
  trackByIndex(_: number, __: any) {
    return _;
  }

  goToRoute(path: string) {
    this.router.navigate([path]);
  }
}
