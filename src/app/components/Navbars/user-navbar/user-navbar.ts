import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/shared/storage/local-storage.service';
import {
  faBell,
  faUser,
  faCar,
  faCalendarDay,
  faSignOut,
  faDashboard,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { ModalrelativeComponent } from '../../shared/dropdown/dropdown';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
    ModalrelativeComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './user-navbar.html',
  styleUrl: './user-navbar.css',
})
export class UserNavbarComponent {
  faBell = faBell;
  faUser = faUser;
  faCar = faCar;
  faMessage = faMessage;
  //FontAwesome icons
  UserIcon = faUser;
  BookingIcons = faCalendarDay;
  LogoutIcon = faSignOut;
  isconfirm = false;
  faDashboard = faDashboard;

  //
  ismodal = false;
  isNotificationmodal: boolean = false;
  //
  constructor(
    private ROUTER: Router,
    private localStoareg: LocalStorageService
  ) {}

  ModelToggle() {
    // this.ROUTER.navigate(['/user-account']);
    this.ismodal = !this.ismodal;
  }
  Profile() {
    this.ROUTER.navigate(['/user-account']);
  }
  home() {
    this.ROUTER.navigate(['/home']);
  }
  navigateTo(path: string) {
    window.location.href = path;
  }

  logout() {
    this.localStoareg.clear();
    this.ROUTER.navigate(['/login']);
  }
}
