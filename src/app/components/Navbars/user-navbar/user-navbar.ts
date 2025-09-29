import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import {
  faBell,
  faUser,
  faCar,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { ModalrelativeComponent } from '../../shared/dropdown/dropdown';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
    ModalrelativeComponent,
  ],
  templateUrl: './user-navbar.html',
  styleUrl: './user-navbar.css',
})
export class UserNavbarComponent {
  faBell = faBell;
  faUser = faUser;
  faCar = faCar;
  faMessage = faMessage;

  //
  ismodal = false;
  //
  constructor(private ROUTER: Router) {}

  ModelToggle() {
    // this.ROUTER.navigate(['/user-account']);
    this.ismodal = !this.ismodal;
  }
  Profile() {
    this.ROUTER.navigate(['/user-account']);
  }
  home() {
    this.ROUTER.navigate(['/home']);
  }
}
