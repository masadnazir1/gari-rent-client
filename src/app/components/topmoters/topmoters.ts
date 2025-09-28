import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

interface Brand {
  id: string;
  name: string;
  logo: string;
}

@Component({
  selector: 'app-topmoters',
  imports: [CommonModule],
  templateUrl: './topmoters.html',
  styleUrls: ['./topmoters.css'],
})
export class Topmoters implements OnInit {
  brands: Brand[] = [];

  constructor(private API: ApiService) {}

  ngOnInit(): void {
    this.GetBrands();
  }

  GetBrands() {
    this.API.get('barnds').subscribe({
      next: (res: any) => {
        console.log('BRANDS', res);
        if (res.success && Array.isArray(res.data)) {
          this.brands = res.data.map((b: any) => ({
            id: b._id,
            name: b.name,
            logo: b.logo,
          }));
        }
        console.log(this.brands);
      },
      error: (err) => {
        console.error('Error getting the brands', err);
      },
    });
  }
}
