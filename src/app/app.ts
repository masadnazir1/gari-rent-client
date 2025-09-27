import { Component, signal } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { filter } from 'rxjs/operators';
import { ToastComponent } from './components/shared/toast/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, CommonModule, Footer, RouterModule, ToastComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('garirent');

  // Signal to control navbar visibility
  showNavbar = signal(true);

  constructor(private library: FaIconLibrary, private router: Router) {
    library.addIconPacks(fas, far, fab);

    // Hide navbar on specific routes
    const hiddenRoutes = [
      '/booking',
      '/login',
      '/forgot-assword',
      '/car-details',
      '/create',
      '/reset-assword',
      '/address-age',
      '/user-account',
      '/book',
      '/cars',
    ];

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const cleanUrl = event.urlAfterRedirects.split('?')[0];
        this.showNavbar.set(
          !hiddenRoutes.some((route) => cleanUrl.startsWith(route))
        );
      });
  }
}
