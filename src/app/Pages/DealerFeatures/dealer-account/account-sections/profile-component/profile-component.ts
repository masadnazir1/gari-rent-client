import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faPen,
  faTimes,
  faSave,
  faCamera,
  faEnvelope,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  role: 'renter' | 'dealer';
  profileImage?: string;
}

@Component({
  selector: 'app-profile-component',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './profile-component.html',
  styleUrls: ['./profile-component.css'],
})
export class ProfileComponent implements OnInit {
  // Dummy user for testing (will later come from API)
  user: UserProfile = {
    name: 'Ali Khan',
    email: 'ali.khan@example.com',
    phone: '+92 300 1234567',
    role: 'renter',
    profileImage: 'https://via.placeholder.com/150x150.png?text=Ali+Khan',
  };

  isEditing = false;
  tempUser!: UserProfile;

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (user) {
      const userData = JSON.parse(user);
      // Map API response to your UserProfile model
      this.user = {
        name: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        profileImage:
          userData.profileImage ||
          'https://via.placeholder.com/150x150.png?text=User',
      };
    } else {
    }
  }

  constructor(library: FaIconLibrary) {
    library.addIcons(
      faPen,
      faTimes,
      faSave,
      faCamera,
      faEnvelope,
      faPhone,
      faUser
    );
  }

  startEdit() {
    this.tempUser = { ...this.user };
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveEdit() {
    this.user = { ...this.tempUser };
    this.isEditing = false;
    // Later: Call API here (PUT /users/:id)
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.tempUser.profileImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
