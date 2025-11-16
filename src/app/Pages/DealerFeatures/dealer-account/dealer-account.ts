import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddVehicle } from '../../../components/Dealer/add-vehicle/add-vehicle';
import { ConfirmDialogComponent } from '../../../components/shared/confirm-dialog/confirm-dialog';
import { Modalrelative } from '../../../components/shared/modalrelative/modalrelative';
import { DealerHeader } from './account-sections/dealer-header/dealer-header';

import {
  faAdd,
  faBars,
  faBell,
  faCalendar,
  faCar,
  faCarAlt,
  faChevronLeft,
  faChevronRight,
  faComment,
  faDashboard,
  faShieldAlt,
  faShop,
  faSignOut,
  faStar,
  faTicket,
  faTimes,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../../services/shared/storage/local-storage.service';

type LazyComponentType = any;

@Component({
  selector: 'app-dealer-account',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgIf,
    NgFor,
    DealerHeader,
    Modalrelative,
    AddVehicle,
    ConfirmDialogComponent,
  ],
  templateUrl: './dealer-account.html',
  styleUrls: ['./dealer-account.css'],
})
export class DealerAccount {
  isconfirm: boolean = false;
  // Icons
  faAdd = faAdd;
  faDashboard = faDashboard;
  faUser = faUser;
  faCarAlt = faCarAlt;
  faCalendar = faCalendar;
  faShield = faShieldAlt;
  faBell = faBell;
  faCar = faCar;
  faUsers = faUsers;
  faBars = faBars;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faTimes = faTimes;
  faFeedback = faComment;
  faTicket = faTicket;
  faStar = faStar;
  faShop = faShop;
  faSignOut = faSignOut;

  //states
  sidebarCollapsed = false;
  isMobile = false;
  mobileDrawerOpen = false;
  isModalOpen: boolean = false;
  selectedKey = 'profile';
  selectedComponent?: LazyComponentType;

  menu = [
    { key: 'dashboard', label: 'Dashboard', icon: this.faDashboard },
    { key: 'bookings', label: 'Bookings', icon: this.faCalendar },
    { key: 'vehicles', label: 'Vehicles', icon: this.faCarAlt },
    { key: 'customers', label: 'Customers', icon: this.faUsers },
    { key: 'Website', label: 'Apki Website', icon: this.faShop },
    { key: 'reviews', label: 'Reviews', icon: this.faStar },
    { key: 'profile', label: 'Profile', icon: this.faUser },
  ];

  BottomTab = [
    { key: 'dashboard', label: 'Dashboard', icon: this.faDashboard },
    { key: 'bookings', label: 'Bookings', icon: this.faCalendar },
    { key: 'vehicles', label: 'vehicles', icon: this.faCarAlt },
    { key: 'profile', label: 'Profile', icon: this.faUser },
  ];

  constructor(private localStorage: LocalStorageService) {
    // On init: get the tab key from URL if available

    const params = new URLSearchParams(window.location.search);
    const tabFromUrl = params.get('tab');
    if (tabFromUrl && this.menu.some((m) => m.key === tabFromUrl)) {
      this.selectedKey = tabFromUrl;
    }

    this.loadComponent(this.selectedKey);
    this.isMobile = window.matchMedia('(max-width: 767px)').matches;
    window.addEventListener('resize', () => {
      this.isMobile = window.matchMedia('(max-width: 767px)').matches;
    });

    // Set initial responsive state
    this.handleResize();

    // Watch window resize
    window.addEventListener('resize', () => this.handleResize());
  }

  handleResize() {
    const isSmall = window.innerWidth < 1000;

    this.isMobile = isSmall;
    this.sidebarCollapsed = isSmall; // auto collapse when < 1000
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleDrawer() {
    this.mobileDrawerOpen = !this.mobileDrawerOpen;
  }

  async loadComponent(key: string) {
    this.selectedKey = key;

    // Update URL so refresh preserves the tab
    const url = new URL(window.location.href);
    url.searchParams.set('tab', key);
    window.history.replaceState({}, '', url.toString());

    this.mobileDrawerOpen = false; // close drawer after selection

    switch (key) {
      case 'profile': {
        const mod = await import(
          './account-sections/profile-component/profile-component'
        );
        this.selectedComponent = mod.ProfileComponent;
        break;
      }
      case 'bookings': {
        const mod = await import('./account-sections/my-bookings/my-bookings');
        this.selectedComponent = mod.MyBookings;
        break;
      }
      case 'notifications': {
        const mod = await import(
          './account-sections/notifications-component/notifications-component'
        );
        this.selectedComponent = mod.NotificationsComponent;
        break;
      }
      case 'vehicles': {
        const mod = await import(
          './account-sections/vehicles-component/vehicles-component'
        );
        this.selectedComponent = mod.VehiclesComponent;
        break;
      }
      case 'customers': {
        const mod = await import(
          './account-sections/customers-component/customers-component'
        );
        this.selectedComponent = mod.CustomersComponent;
        break;
      }
      case 'reviews': {
        const mod = await import('./account-sections/reviews/reviews');
        this.selectedComponent = mod.DealerReviews;
        break;
      }
      case 'dashboard': {
        const mod = await import('./account-sections/dashboard/dashboard');
        this.selectedComponent = mod.Dashboard;
        break;
      }
      default:
        this.selectedComponent = undefined;
        break;
    }
  }

  openModal() {
    this.isModalOpen = !this.isModalOpen;
    document.body.style.overflow = 'hidden'; // disable page scroll
  }
  closeModal() {
    this.isModalOpen = !this.isModalOpen;
    document.body.style.overflow = 'auto'; // enable page scroll
  }

  logout() {
    this.localStorage.clear();
    window.location.href = '/login';
    this.isconfirm = false;
  }
  handleHome() {
    window.location.href = '/';
  }
}
