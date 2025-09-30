import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ToastService } from '../../services/shared/toast/toast.service';
import { LocalStorageService } from '../../services/shared/storage/local-storage.service';
import { ModalrelativeComponent } from '../shared/dropdown/dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faCalendarDay,
  faSignOut,
  faDashboard,
} from '@fortawesome/free-solid-svg-icons';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-navbar',
  standalone: true, //
  imports: [
    CommonModule,
    RouterModule,
    ModalrelativeComponent,
    FontAwesomeModule,
    ConfirmDialogComponent,
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {
  [x: string]: any;
  //FontAwesome icons
  UserIcon = faUser;
  BookingIcons = faCalendarDay;
  LogoutIcon = faSignOut;
  isconfirm = false;
  faDashboard = faDashboard;

  //States
  isScrolled = false;
  menuOpen = false;
  islogedin = false;
  hideButton = true;
  ismodal: boolean = false;
  userData: any = null;
  constructor(
    private router: Router,
    private toast: ToastService,
    private localStorage: LocalStorageService
  ) {}
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  //effect
  ngOnInit(): void {
    const userData = this.localStorage.getItem<any>('user');
    if (userData) {
      this.hideButton = false;
      this.userData = userData;
      console.log(userData);
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  Naviage(path: string) {
    this.router.navigate([path]);
  }
  home() {
    this.router.navigate(['/home']);
  }

  showToast() {
    this.toast.show({
      type: 'info',
      title: 'Working on',
      message: 'Your file has been uploaded successfully.',
      icon: '/icon.png',
      // actionText: 'View',
      // action: () => {
      //   alert('Viewing uploaded file...');
      // },
      duration: 5000,
    });
  }

  ModelToggle() {
    // this.ROUTER.navigate(['/user-account']);
    this.ismodal = !this.ismodal;
  }
  Profile() {
    window.location.href = '/user-account?tab=profile';
  }
  Bookings() {
    window.location.href = '/user-account?tab=bookings';
  }
  Dashboard() {
    window.location.href = '/user-account?tab=dashboard';
  }

  logout() {
    this.localStorage.clear();
    window.location.href = '/login';
    this.isconfirm = false;
  }
}
