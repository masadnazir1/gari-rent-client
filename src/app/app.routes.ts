import { Routes } from '@angular/router';
import { Homepage } from './Pages/homepage/homepage';
import { AboutUs } from './Pages/about-us/about-us';
import { ContactUsComponent } from './Pages/contact-us/contact-us';
import { PricingComponent } from './Pages/pricing/pricing';
import { Login } from './Pages/login/login';
import { Signup } from './Pages/signup/signup';
import { ForgotPassword } from './Pages/forgot-password/forgot-password';
import { ResetPassword } from './Pages/reset-password/reset-password';
import { DealerAccount } from './Pages/DealerFeatures/dealer-account/dealer-account';

export const routes: Routes = [
  { path: 'home', component: Homepage },
  { path: 'about', component: AboutUs },
  { path: 'contact', component: ContactUsComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'login', component: Login },
  { path: 'create', component: Signup },
  { path: 'forgot-assword', component: ForgotPassword },
  { path: 'reset-assword', component: ResetPassword },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'booking' },
  //
  //Dealer Routes
  { path: 'dealer-account', component: DealerAccount },
];
