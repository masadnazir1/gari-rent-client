import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import {
  faUser,
  faDoorClosed,
  faCogs,
  faGasPump,
  faHeart,
  faCar,
  faStar,
  faCertificate,
  faHeartBroken,
} from '@fortawesome/free-solid-svg-icons';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ConfirmDialogComponent],
  templateUrl: './car-card.html',
  styleUrls: ['./car-card.css'],
})
export class CarCard implements OnChanges {
  @Input() car: any;

  constructor(private ROUTER: Router, private API: ApiService) {}

  // icons
  faUser = faUser;
  faDoor = faDoorClosed;
  faCogs = faCogs;
  faFuel = faGasPump;
  faCar = faCar;
  faStar = faStar;
  faHeartBroken = faHeartBroken;
  faHeart = faHeart;
  faCertificate = faCertificate;

  isconfirm = false;

  ngOnChanges(changes: SimpleChanges) {}

  goToBooking(car: any) {
    this.ROUTER.navigate(['/book'], { state: { car } });
  }
  goToDetails(car: any) {
    this.ROUTER.navigate(['/car-details'], { state: { car } });
  }
  ReMoveFav(car: any) {
    this.isconfirm = true;
    console.log(car);
    this.API.delete(`saved`, {
      userId: '68d0976819d0a06a96f6fdc9',
      carId: car._id,
    }).subscribe({
      next: (res: any) => {
        if (res.success) {
          window.location.reload();
        }
      },
      error: (err) => {
        console.error('Error fetching cars:', err);
      },
    });
  }

  addToFav(carid: string) {
    this.API.post(`saved/save`, {
      userId: '68d0976819d0a06a96f6fdc9',
      carId: carid,
    }).subscribe({
      next: (res: any) => {},
      error: (err) => {
        console.error('Error fetching cars:', err);
      },
    });
  }
}
