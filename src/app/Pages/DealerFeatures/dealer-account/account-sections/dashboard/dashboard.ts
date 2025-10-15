import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiService } from '../../../../../services/api.service';
import { LocalStorageService } from '../../../../../services/shared/storage/local-storage.service';
import { Booking } from '../../../../../Interfaces/BookingInterface';

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
  selector: 'app-dashboard',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'], //styleUrls
})
export class Dashboard implements OnInit {
  faClock = faClock;
  faSearch = faSearch;
  faTicket = faTicket;
  faHeadset = faHeadset;
  faBookmark = faBookmark;

  //
  mainCards: any[] = [];
  bookings: any[] = [];
  monthlyChange: any = null;
  ischartdata = true;
  userId = '';
  isLoading = false;
  userdata: any = null;
  chartLabels = [];
  chartdatasets = [];
  monthlyRev: number | null = null;
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
      this.userId = user.id;
    } else {
    }
    this.setDashboardData();
    this.getBookings();
  }

  //Chart configuration
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
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

  setDashboardData() {
    this.API.get(`dealer/dashboard/${this.userId}`, {}).subscribe({
      next: (res: any) => {
        const chartData = res.data.chart_data || [];
        this.monthlyRev = res.data.monthly_change[0].current_month_revenue;
        this.monthlyChange = res.data.monthly_change;
        const stats = {
          TotalCars: res.data.totalCars,
          TotalBookings: res.data.totalBookings,
          TotalEarnings: res.data.totalEarnings,
          PendingPayouts: res.data.pendingPayouts,
        };

        this.mainCards = Object.entries(stats).map(([key, value]) => ({
          label: key,
          value: value,
        }));

        // Filter out empty months and map values
        const labels = chartData
          .map((item: any) => item.month)
          .filter((month: string | null) => month !== null);

        const dataValues = chartData
          .filter((item: any) => item.month !== null)
          .map((item: any) => parseFloat(item.current_year_revenue));

        // Update chart data properly
        this.barChartData = {
          labels,
          datasets: [
            {
              data: dataValues,
              backgroundColor: 'rgba(16, 183, 248, 1)',
              borderRadius: 1,
              barThickness: 30,
            },
          ],
        };
      },
      error: (err: any) => {
        console.error('Error fetching chart data:', err);
      },
    });
  }

  getBookings() {
    this.API.get(`dealer/dashboard/recent/${this.userId}`).subscribe({
      next: (res: any) => {
        if (res.success && Array.isArray(res.data)) {
          this.bookings = res.data;
        }
      },
      error: (err) => {},
    });
  }

  navigateTo(path: string) {
    if (path === 'explore') {
      this.router.navigate(['/cars']);
    } else {
      this.router.navigate([path]);
    }
  }
}
