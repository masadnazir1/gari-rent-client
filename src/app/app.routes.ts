import { Routes } from '@angular/router';
import { CarsPage } from './Pages/CarsPage/CarsPage';
import { Homepage } from './Pages/homepage/homepage';
import { AboutUs } from './Pages/about-us/about-us';
import { ContactUsComponent } from './Pages/contact-us/contact-us';
import { PricingComponent } from './Pages/pricing/pricing';
import { CarDetailsComponent } from './Pages/car-details/car-details';
import { Login } from './Pages/login/login';
import { Signup } from './Pages/signup/signup';
import { ForgotPassword } from './Pages/forgot-password/forgot-password';
import { ResetPassword } from './Pages/reset-password/reset-password';
import { AddressPage } from './Pages/address-page/address-page';
import { UserAccount } from './Pages/user-account/user-account';
import { Booking } from './Pages/booking/booking';
import { SavedCars } from './Pages/saved-cars/saved-cars';

export const routes: Routes = [
  { path: 'cars', component: CarsPage },
  { path: 'saved', component: SavedCars },
  { path: 'home', component: Homepage },
  { path: 'about', component: AboutUs },
  { path: 'contact', component: ContactUsComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'car-details', component: CarDetailsComponent },
  { path: 'login', component: Login },
  { path: 'create', component: Signup },
  { path: 'address-age', component: AddressPage },
  { path: 'forgot-assword', component: ForgotPassword },
  { path: 'reset-assword', component: ResetPassword },
  { path: 'book', component: Booking },
  { path: 'user-account', component: UserAccount },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'booking' },
];
