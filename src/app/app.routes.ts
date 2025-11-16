import { Routes } from '@angular/router';
import { DealerAccount } from './Pages/DealerFeatures/dealer-account/dealer-account';
import { AboutUs } from './Pages/about-us/about-us';
import { BusinessDetailsComponent } from './Pages/business-details/business-details';
import { ContactUsComponent } from './Pages/contact-us/contact-us';
import { ForgotPassword } from './Pages/forgot-password/forgot-password';
import { Homepage } from './Pages/homepage/homepage';
import { Login } from './Pages/login/login';
import { PricingComponent } from './Pages/pricing/pricing';
import { ResetPassword } from './Pages/reset-password/reset-password';
import { Signup } from './Pages/signup/signup';

export const routes: Routes = [
  { path: 'home', component: Homepage },
  { path: 'about', component: AboutUs },
  { path: 'contact', component: ContactUsComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'login', component: Login },
  { path: 'create', component: Signup },
  { path: 'forgot-assword', component: ForgotPassword },
  { path: 'reset-assword', component: ResetPassword },
  { path: 'create-business-profile', component: BusinessDetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'booking' },
  //
  //Dealer Routes
  { path: 'dealer-account', component: DealerAccount },
];
