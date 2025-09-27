import { Component } from '@angular/core';
import { HeroCarousel } from '../../components/hero-carousel/hero-carousel';
import { SearchForm } from '../../components/search-form/search-form';
import { Topmoters } from '../../components/topmoters/topmoters';
import { CarCardComponent } from '../../components/car-card/car-card';
import { cars } from '../../../Data/cars';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  imports: [
    HeroCarousel,
    SearchForm,
    Topmoters,
    CarCardComponent,
    CommonModule,
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  title = 'Most Popular Cars'; // you can make this @Input() as well

  cars = cars;
}
