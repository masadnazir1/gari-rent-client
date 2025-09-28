import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-carousel.html',
  styleUrls: ['./hero-carousel.css'],
})
export class HeroCarousel implements OnInit, OnDestroy {
  slides = signal([
    {
      title: 'Welcome to GariRent',
      subtitle: 'Book your ride with ease',
      image: '/slider-1.jpg',
      carImage: '/car.png',
      button: 'Book Now',
    },
    {
      title: 'Luxury Cars',
      subtitle: 'Drive premium at affordable prices',
      image: '/slider-1.jpg',
      carImage: '/car.png',
      button: 'Explore',
    },
    {
      title: 'Anywhere, Anytime',
      subtitle: 'Your ride is just one click away',
      image: '/slider-1.jpg',
      carImage: '/car.png',
      button: 'Get Started',
    },
  ]);

  currentIndex = signal(0);
  autoplayInterval: any;

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, 3000); //change slide every 5 seconds
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
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
}
