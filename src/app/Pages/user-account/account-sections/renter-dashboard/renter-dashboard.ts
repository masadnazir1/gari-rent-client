import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiService } from '../../../../services/api.service';
import { LocalStorageService } from '../../../../services/shared/storage/local-storage.service';
import { Booking } from '../../../../Interfaces/BookingInterface';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from 'chart.js';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {
  faClock,
  faSearch,
  faTicket,
  faHeadset,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons';

//Register required Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement
);

@Component({
  selector: 'app-renter-dashboard',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, BaseChartDirective],
  templateUrl: './renter-dashboard.html',
  styleUrls: ['./renter-dashboard.css'], //styleUrls
})
export class RenterDashboard implements OnInit {
  faClock = faClock;
  faSearch = faSearch;
  faTicket = faTicket;
  faHeadset = faHeadset;
  faBookmark = faBookmark;

  //
  ischartdata = true;
  bookings: Booking[] = [];
  userId = '';
  endPoint = `bookings/user/upcoming?userId=`;
  isLoading = false;
  userdata: any = null;
  chartLabels = [];
  chartdatasets = [];
  spending: number | null = null;
  percentage: string = '';
  //constructor
  constructor(
    private API: ApiService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.localStorage.getItem<any>('user');
    if (user) {
      this.userdata = user;
      this.userId = user._id;
    } else {
    }
    this.getChartData();
    this.getUpComming();
  }

  //Chart configuration
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#000' },
      },
      y: { display: false },
    },
  };

  barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        data: [], //values
        backgroundColor: 'rgba(16, 183, 248, 1)', // soft green
        borderRadius: 50, // round bars
        barThickness: 20,
      },
    ],
  };

  Items = [
    { key: 'explore', label: 'Explore Cars', icon: this.faSearch },
    { key: 'coupons', label: 'My Coupons', icon: this.faTicket },
    { key: 'saved', label: 'My Saved', icon: this.faBookmark },
    { key: 'support', label: 'Support', icon: this.faHeadset },
  ];

  getChartData() {
    console.log('ID', this.userId);
    this.API.get(`dashboard/chart/${this.userId}`).subscribe({
      next: (res: any) => {
        if (!res || !res.datasets || res.datasets.length === 0) {
          console.error('Invalid chart data received:', res);
          return;
        }

        // Assign chart data
        this.barChartData = res;
        this.chartLabels = res.labels || [];

        // Sum all data values safely
        this.spending = (res.datasets[0].data || []).reduce(
          (sum: number, value: number) => sum + value,
          0
        );

        // Set percentage
        this.percentage = res.percentage ?? 0;
        if (res.labels.length === 0) {
          this.ischartdata = false;
        }
      },
      error: (err) => {
        console.error('Error fetching chart data:', err);
      },
    });
  }

  //api to get the upcomming bookings
  getUpComming() {
    this.isLoading = true;
    this.API.get<{ bookings: any[] }>(
      `${this.endPoint}${this.userId}`
    ).subscribe({
      next: (res) => {
        // Map API bookings -> your Booking[]
        this.bookings = res.bookings.map((b) => ({
          id: b._id,
          car: {
            name: b.carId.name,
            image: b.carId.images[0] || '/default-car.png',
            type: b.carId.category,
            status: b.status,
          },
          pickupLocation: b.pickupLocation,
          dropoffLocation: b.dropoffLocation,
          pickupDate: b.startDate,
          dropoffDate: b.endDate,
          price: b.totalPrice,
          status: 'upcoming',
        }));

        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching bookings', error);
        this.isLoading = false;
      },
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
