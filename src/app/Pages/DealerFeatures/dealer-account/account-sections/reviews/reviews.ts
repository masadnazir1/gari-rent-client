// reviews.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faStar,
  faUserCircle,
  faCarSide,
} from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '../../../../../services/shared/toast/toast.service';
import { Toast } from '../../../../../Interfaces/ToastInterface';
import { LocalStorageService } from '../../../../../services/shared/storage/local-storage.service';
import { UserContextService } from '../../../../../services/shared/context/user-context.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './reviews.html',
  styleUrls: ['./reviews.css'],
})
export class DealerReviews implements OnInit {
  faStar = faStar;
  faUserCircle = faUserCircle;
  faCarSide = faCarSide;

  reviews: any[] = [];
  avgRating = 0;
  totalReviews = 0;
  ratingDistribution = [0, 0, 0, 0, 0];
  loading = true;

  constructor(
    private API: ApiService,
    private toast: ToastService,
    private LocalStorage: LocalStorageService,
    private UserContext: UserContextService
  ) {}

  ngOnInit(): void {
    const dealer = this.UserContext.getUser();
    if (!dealer?.id) return;
    this.fetchReviews(dealer.id);
  }

  fetchReviews(dealerId: number) {
    this.API.get(`dealer/reviews/${dealerId}`).subscribe({
      next: (res: any) => {
        this.reviews = res.data || [];
        this.totalReviews = this.reviews.length;
        this.avgRating = this.calculateAverageRating(this.reviews);
        this.ratingDistribution = this.getRatingDistribution(this.reviews);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showToast(
          'error',
          'Fetch Failed',
          'Unable to load reviews',
          'Retry'
        );
      },
    });
  }

  calculateAverageRating(reviews: any[]): number {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((a, r) => a + r.rating, 0);
    return +(sum / reviews.length).toFixed(1);
  }

  getRatingDistribution(reviews: any[]): number[] {
    const dist = [0, 0, 0, 0, 0];
    reviews.forEach((r) => {
      if (r.rating >= 1 && r.rating <= 5) dist[r.rating - 1]++;
    });
    return dist.reverse(); // [5★→1★]
  }

  showToast(
    type: Toast['type'],
    title: string,
    message: string,
    actionText: string,
    action?: () => void
  ) {
    this.toast.show({
      type,
      title,
      message,
      actionText,
      action,
      duration: 5000,
    });
  }
}
