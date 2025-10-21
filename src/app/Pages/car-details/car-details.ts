import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserNavbarComponent } from '../../components/Navbars/user-navbar/user-navbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendarAlt,
  faRoad,
  faGasPump,
  faCogs,
  faPhone,
  faComments,
  faMapMarkerAlt,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, UserNavbarComponent, FontAwesomeModule],
  templateUrl: './car-details.html',
  styleUrl: './car-details.css',
})
export class CarDetailsComponent {
  @Input() car: any;
  mainImage = '';

  faCalendar = faCalendarAlt;
  faMileage = faRoad;
  faFuel = faGasPump;
  faGear = faCogs;
  faPhone = faPhone;
  faChat = faComments;
  faLocation = faMapMarkerAlt;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['car']) {
      this.car = nav.extras.state['car'];
      console.log('Car state', this.car);
    }

    if (this.car?.images?.length) {
      this.mainImage = this.car.images[0];
    }
  }

  selectMainImage(img: string) {
    this.mainImage = img;
  }
  goToBooking(car: any) {
    this.router.navigate(['/book'], { state: { car } });
  }
}
