import { Component, OnInit, HostListener } from '@angular/core';
import { FilterPanel } from '../../components/BookingPage/filter-panel/filter-panel';
import { CarCard } from '../../components/BookingPage/car-card/car-card';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { UserNavbarComponent } from '../../components/Navbars/user-navbar/user-navbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute } from '@angular/router';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [
    FilterPanel,
    CarCard,
    CommonModule,
    FontAwesomeModule,
    UserNavbarComponent,
  ],
  templateUrl: './CarsPage.html',
  styleUrl: './CarsPage.css',
})
export class CarsPage implements OnInit {
  downarrow = faChevronDown;
  uparrow = faChevronUp;
  carsList: any[] = [];
  totalCars = 0;
  currentPage = 1;
  limit = 6; // cars per page
  filters: any = {};
  showFilters = true; // by default filters are visible

  brand: string | null = null;

  constructor(
    private API: ApiService,
    private ROUTER: Router,
    private route: ActivatedRoute
  ) {}
  // Listen for window resize
  // Listen for window resize
  @HostListener('window:resize', ['$event'])
  //
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    this.updateFilterState(width);
  }

  private updateFilterState(width: number) {
    if (width <= 992) {
      this.showFilters = false; // hide filters on mobile
    } else {
      this.showFilters = true; // show filters on desktop
    }
  }

  ngOnInit(): void {
    this.brand = this.route.snapshot.queryParamMap.get('Brand');

    if (this.brand) {
      this.filters.Brand = this.brand; //overwrite Brand if query exists
    }

    this.fetchAllCars();
  }

  // When filter panel changes
  onFilterChange(filters: any) {
    this.filters = filters;

    this.currentPage = 1; // reset pagination
    this.fetchAllCars();
  }

  // Fetch cars with filters + pagination
  fetchAllCars() {
    const query = new URLSearchParams({
      ...this.filters,
      page: this.currentPage.toString(),
      limit: this.limit.toString(),
    });

    this.API.get(`cars?${query.toString()}`).subscribe({
      next: (res: any) => {
        this.carsList = res.cars;
        this.totalCars = res.count;
      },
      error: (err) => {
        console.error('Error fetching cars:', err);
      },
    });
  }

  // Pagination controls
  nextPage() {
    if (this.currentPage * this.limit < this.totalCars) {
      this.currentPage++;
      this.fetchAllCars();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchAllCars();
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
}
