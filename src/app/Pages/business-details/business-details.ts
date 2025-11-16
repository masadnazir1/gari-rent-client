import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthResponse } from '../../Interfaces/loginResponse';
import { Toast } from '../../Interfaces/ToastInterface';
import { ToastService } from '../../services/shared/toast/toast.service';

import { ApiService } from '../../services/api.service';
import { UserContextService } from '../../services/shared/context/user-context.service';
import { LocalStorageService } from '../../services/shared/storage/local-storage.service';

@Component({
  selector: 'app-business-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './business-details.html',
  styleUrls: ['./business-details.css'],
})
export class BusinessDetailsComponent implements OnInit {
  dealerId = '';
  business_name = '';
  website_url = '';
  description = '';
  established_year = '';
  registration_number = '';
  tax_id = '';
  address = '';
  contact_email = '';
  contact_phone = '';
  image: File | null = null;

  submitting = false;
  successMessage = '';
  errorMessage = '';
  currentStep = 1;
  loginData: any = {};
  isLoading: boolean = false;

  constructor(
    private api: ApiService,
    private LocalStorage: LocalStorageService,
    private UserContext: UserContextService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loginData = this.LocalStorage.getItem('auto-login');
    this.dealerId = this.loginData.dealer_id;
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.image = input.files[0];
    }
  }

  nextStep() {
    if (this.currentStep === 1 && (!this.business_name || !this.image)) {
      this.errorMessage = 'Business name and logo are required';
      return;
    }
    this.errorMessage = '';
    if (this.currentStep < 4) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  async submit() {
    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    formData.append('dealerId', this.dealerId);
    formData.append('business_name', this.business_name);
    formData.append('website_url', this.website_url);
    formData.append('description', this.description);
    formData.append('established_year', this.established_year);
    formData.append('registration_number', this.registration_number);
    formData.append('tax_id', this.tax_id);
    formData.append('address', this.address);
    formData.append('contact_email', this.contact_email);
    formData.append('contact_phone', this.contact_phone);
    if (this.image) formData.append('image', this.image);

    try {
      this.api.post('/dealer/add-buisness-details', formData).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.successMessage = 'Business details submitted successfully!';
          }
        },
      });
      this.currentStep = 4; // mark as completed
    } catch (err: any) {
      this.errorMessage = err?.message || 'Submission failed';
    } finally {
      this.submitting = false;
    }
  }

  get progressPercentage(): number {
    return ((this.currentStep - 1) / 3) * 100;
  }

  getStepMessage() {
    switch (this.currentStep) {
      case 1:
        return 'Step 1 of 3: Add your business name and logo. Just the start!';
      case 2:
        return 'Step 2 of 3: Add website, description, and established year. Almost there!';
      case 3:
        return 'Step 3 of 3: Add registration, tax, address, and contact info. Last step!';
      default:
        return '';
    }
  }

  loginTheUser() {
    //call the login api
    this.isLoading = true;
    this.api
      .post<AuthResponse>('auth/user/login', {
        email: this.loginData?.email,
        password: this.loginData?.password,
      })
      .subscribe({
        next: (data: any) => {
          this.isLoading = false;

          //set the userid in the context
          // after login
          this.UserContext.setUser({
            ...data.user,
            token: data.token,
          });

          //set the local storage
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          this.showToast(
            'success',
            'Login Successful',
            'User account has been logged in successfully.',
            ''
          );

          if (data.user.role === 'renter') {
            window.location.href = '/user-account?tab=dashboard';
          } else if (data.user.role === 'dealer') {
            window.location.href = '/dealer-account?tab=dashboard';
          }
        },

        error: (error: any) => {
          console.error('Errr while logining', error);
          this.isLoading = false;
        },
      });
  }

  /// show message
  showToast(
    type: Toast['type'],
    title: string,
    message: string,
    actionText: string,
    action?: () => void
  ) {
    this.toast.show({
      type: type,
      title: title,
      message: message,
      actionText: actionText,
      action: action,
      duration: 5000,
    });
  }
}
