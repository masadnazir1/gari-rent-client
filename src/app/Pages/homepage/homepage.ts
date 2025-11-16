import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeroCarousel } from '../../components/hero-carousel/hero-carousel';
import { ApiService } from '../../services/api.service';
import { FeaturesSectionComponent } from '../../components/features-section/features-section';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works';
import { DashboardPreviewComponent } from '../../components/dashboard-preview/dashboard-preview';
import { PricingSectionComponent } from '../../components/pricing-section/pricing-section';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css'],
  imports: [
    CommonModule,
    HowItWorksComponent,
    FeaturesSectionComponent,
    HeroCarousel,
    DashboardPreviewComponent,
    PricingSectionComponent,
  ],
})
export class Homepage {
  constructor(private API: ApiService, private router: Router) {}
}
