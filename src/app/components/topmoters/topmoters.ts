import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topmoters',
  imports: [CommonModule],
  templateUrl: './topmoters.html',
  styleUrl: './topmoters.css',
})
export class Topmoters {
  brands = [
    { name: 'Audi', logo: '/car.png' },
    { name: 'BMW', logo: '/car.png' },
    { name: 'Mercedes Benz', logo: '/car.png' },
    { name: 'Tesla Motors', logo: '/car.png' },
    { name: 'Volkswagen', logo: '/car.png' },
    { name: 'Porsche', logo: '/car.png' },
  ];
}
