import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

import {
  faUser,
  faDoorClosed,
  faCogs,
  faGasPump,
  faCar,
  faStar,
  faCertificate,
} from '@fortawesome/free-solid-svg-icons';
import { Navbar } from '../../navbar/navbar';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './car-card.html',
  styleUrls: ['./car-card.css'],
})
export class CarCard implements OnInit, OnChanges {
  @Input() car: any;

  constructor(private ROUTER: Router) {}

  // icons
  faUser = faUser;
  faDoor = faDoorClosed;
  faCogs = faCogs;
  faFuel = faGasPump;
  faCar = faCar;
  faStar = faStar;
  faCertificate = faCertificate;

  ngOnInit() {
    // console.log('hello');
    // console.log(this.car);
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['car']) {
    //     'CarCard received new car input:',
    //     changes['car'].currentValue
    //   );
    // }
  }

  goToBooking(car: any) {
    this.ROUTER.navigate(['/book'], { state: { car } });
  }
  goToDetails(car: any) {
    console.log('car', car);
    this.ROUTER.navigate(['/car-details'], { state: { car } });
  }
}
