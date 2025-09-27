import { Component } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserNavbarComponent } from '../../components/Navbars/user-navbar/user-navbar';
import {
  faUser,
  faComment,
  faShieldAlt,
  faBell,
  faCar,
  faCalendar,
  faCoins,
  faBars,
  faChevronLeft,
  faChevronRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

type LazyComponentType = any;

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, NgIf, NgFor, UserNavbarComponent],
  templateUrl: './user-account.html',
  styleUrls: ['./user-account.css'],
})
export class UserAccount {
  // Icons
  faUser = faUser;
  faCalendar = faCalendar;
  faShield = faShieldAlt;
  faBell = faBell;
  faCar = faCar;
  faCoins = faCoins;
  faBars = faBars;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faTimes = faTimes;
  faFeedback = faComment;

  sidebarCollapsed = false;
  isMobile = false;
  mobileDrawerOpen = false;

  selectedKey = 'profile';
  selectedComponent?: LazyComponentType;

  menu = [
    { key: 'profile', label: 'Profile', icon: this.faUser },
    { key: 'bookings', label: 'Bookings', icon: this.faCalendar },
    { key: 'feedback', label: 'Feedback', icon: this.faFeedback },
    { key: 'loyalty', label: 'Loyalty', icon: this.faCoins },
  ];

  BottomTab = [
    { key: 'profile', label: 'Profile', icon: this.faUser },
    { key: 'bookings', label: 'Bookings', icon: this.faCalendar },
    { key: 'feedback', label: 'Feedback', icon: this.faFeedback },
    { key: 'loyalty', label: 'Loyalty', icon: this.faCoins },
  ];

  constructor() {
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
      case 'feedback': {
        const mod = await import(
          './account-sections/feedback-component/feadback-component'
        );
        this.selectedComponent = mod.FeedbackComponent;
        break;
      }
      case 'loyalty': {
        const mod = await import(
          './account-sections/loyalty-component/loyalty-component'
        );
        this.selectedComponent = mod.LoyaltyComponent;
        break;
      }
      default:
        this.selectedComponent = undefined;
        break;
    }
  }
}
