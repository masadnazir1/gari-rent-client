import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { WELCOME10 } from '../../../../../../Data/couponsDescription';
import { ToastService } from '../../../../../services/shared/toast/toast.service';
import { Toast } from '../../../../../Interfaces/ToastInterface';
import { LocalStorageService } from '../../../../../services/shared/storage/local-storage.service';

@Component({
  selector: 'app-coupons',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './coupons.html',
  styleUrl: './coupons.css',
})
export class Coupons implements OnInit {
  WELCOME = WELCOME10;

  //icons
  faCopy = faCopy;
  //variables to store the data
  coupons: any[] = [];
  userId: string = '';
  //effect to run
  ngOnInit(): void {
    const user = this.localStorage.getItem<any>('user');
    if (user) {
      this.userId = user.id;
    } else {
    }
    this.getUserCoupon();
  }

  constructor(
    private API: ApiService,
    private toast: ToastService,
    private localStorage: LocalStorageService
  ) {}

  //methods and fuctions
  //get user coupons
  getUserCoupon() {
    this.API.get(`user/coupons/${this.userId}`).subscribe({
      next: (res: any) => {
        this.coupons = res.coupons;
      },
      //error
      error: (error) => {
        console.error('error fetching the coupons', error);
      },
    });
  }
  async UniversalFunction(action: string, value: any) {
    if (action === 'copy') {
      try {
        await navigator.clipboard.writeText(value);
        this.showToast(
          'success',
          'Code copied successfully',
          `Coupon code ${value} copied to clipboard.`,
          ''
        );
      } catch (err) {
        console.error('Failed to copy text to clipboard:', err);
        this.showToast(
          'error',
          'Failed to copy text. Please try again.',
          'error',
          ''
        );
      }
    }
  }

  showToast(
    type: Toast['type'],
    title: string,
    message: string,
    actionText: string,
    action?: () => void
  ) {
    this.toast.show({
      type: type,
      title: title,
      message: message,
      actionText: actionText,
      action: action,
      duration: 5000,
    });
  }
}
