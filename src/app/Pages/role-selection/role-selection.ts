import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/shared/storage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-selection',
  standalone: true,
  templateUrl: './role-selection.html',
  styleUrls: ['./role-selection.css'],
})
export class RoleSelection {
  selectedRole: 'dealer' | 'renter' | null = null;

  constructor(
    private LocalStorage: LocalStorageService,
    private router: Router
  ) {}

  selectRole(role: 'dealer' | 'renter') {
    this.selectedRole = role;
  }

  continue() {
    if (!this.selectedRole) return;

    this.LocalStorage.setItem('signuprolekey', this.selectedRole);
    this.router.navigate(['create']);
  }
}
