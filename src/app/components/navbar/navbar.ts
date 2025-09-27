import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ToastService } from '../../services/shared/toast/toast.service';

@Component({
  selector: 'app-navbar',
  standalone: true, //
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  isScrolled = false;
  menuOpen = false;

  constructor(private router: Router, private toast: ToastService) {}
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

  showToast() {
    this.toast.show({
      type: 'info',
      title: 'Working on',
      message: 'Your file has been uploaded successfully.',
      icon: '/icon.png',
      // actionText: 'View',
      // action: () => {
      //   alert('Viewing uploaded file...');
      // },
      duration: 5000,
    });
  }
}
