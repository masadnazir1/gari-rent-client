import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendarDay,
  faDashboard,
  faHeart,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { UserContextService } from '../../services/shared/context/user-context.service';
import { LocalStorageService } from '../../services/shared/storage/local-storage.service';
import { ToastService } from '../../services/shared/toast/toast.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog';
import { ModalrelativeComponent } from '../shared/dropdown/dropdown';

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
  faHeart = faHeart;

  //States
  isScrolled = false;
  menuOpen = false;
  islogedin = false;
  hideButton = true;
  ismodal: boolean = false;
  userData: any = null;
  userRole: string | undefined | null;
  constructor(
    private router: Router,
    private toast: ToastService,
    private localStorage: LocalStorageService,
    private UserContext: UserContextService
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
    }

    const role = this.UserContext.getUser();
    this.userRole = role?.role;
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

      duration: 5000,
    });
  }

  //naviagte to the role-selection
  roleSelection() {
    this.router.navigate(['create']);
  }

  ModelToggle() {
    this.ismodal = !this.ismodal;
  }
  Profile(role: string | null | undefined) {
    if (role && role === 'dealer') {
      window.location.href = '/dealer-account?tab=profile';
    } else if (role === 'rentor') {
      window.location.href = '/user-account?tab=profile';
    }
  }
  Saved() {
    window.location.href = '/saved';
  }
  Bookings(role: string | null | undefined) {
    if (role && role === 'dealer') {
      window.location.href = '/dealer-account?tab=bookings';
    } else if (role === 'rentor') {
      window.location.href = '/user-account?tab=bookings';
    }
  }
  Dashboard(role: string | null | undefined) {
    window.location.href = '/user-account?tab=dashboard';

    if (role && role === 'dealer') {
      window.location.href = '/dealer-account?tab=dashboard';
    } else if (role === 'rentor') {
      window.location.href = '/user-account?tab=dashboard';
    }
  }

  logout() {
    this.localStorage.clear();
    window.location.href = '/login';
    this.isconfirm = false;
  }
}
