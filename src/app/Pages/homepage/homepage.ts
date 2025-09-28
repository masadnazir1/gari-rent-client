import { Component, OnInit } from '@angular/core';
import { HeroCarousel } from '../../components/hero-carousel/hero-carousel';
import { SearchForm } from '../../components/search-form/search-form';
import { Topmoters } from '../../components/topmoters/topmoters';
import { CarCard } from '../../components/BookingPage/car-card/car-card';
import { cars } from '../../../Data/cars';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [HeroCarousel, SearchForm, Topmoters, CarCard, CommonModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {
  title = 'Most Popular Cars';
  carsList: any[] = [];
  cars = cars;

  //constructor
  constructor(private API: ApiService, private router: Router) {}
  ngOnInit(): void {
    this.fetchAllCars();
  }

  fetchAllCars() {
    this.API.get(`cars`).subscribe({
      next: (res: any) => {
        this.carsList = res.cars;
      },
      error: (err: any) => {
        console.error('Error fetching cars:', err);
      },
    });
  }

  AllCars() {
    this.router.navigate(['/cars']);
  }
}
