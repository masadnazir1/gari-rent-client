import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cars } from '../../../Data/cars';

@Component({
  selector: 'app-car-card',
  imports: [CommonModule], // Only needed if using standalone components
  templateUrl: './car-card.html',
  styleUrls: ['./car-card.css'], // fix typo from styleUrl to styleUrls
})
export class CarCardComponent {
  @Input() car: any; // This should be a single car, not the whole array
}
