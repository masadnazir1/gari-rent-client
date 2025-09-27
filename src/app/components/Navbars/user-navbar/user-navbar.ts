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

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FontAwesomeModule],
  templateUrl: './user-navbar.html',
  styleUrl: './user-navbar.css',
})
export class UserNavbarComponent {
  faBell = faBell;
  faUser = faUser;
  faCar = faCar;
  faMessage = faMessage;

  //
  //
  constructor(private ROUTER: Router) {}

  Profile() {
    this.ROUTER.navigate(['/user-account']);
  }
}
