import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true, // ✅ Mark as standalone
  imports: [CommonModule, RouterModule], // ✅ Allowed now
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'], // ✅ fixed typo
})
export class Navbar {
  isScrolled = false;
  menuOpen = false;

  constructor(private router: Router) {} // ✅ correct injection

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  Naviage(path: string) {
    this.router.navigate([path]);
  }
}
