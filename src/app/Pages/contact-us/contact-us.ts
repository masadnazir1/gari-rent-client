import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageHeader } from '../../components/shared/page-header/page-header';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
    PageHeader,
  ],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})
export class ContactUsComponent {
  contactForm: FormGroup;
  sending = false;
  errorMessage = '';
  successMessage = '';

  topics = ['Booking Issue', 'Payment', 'Partnership', 'Technical Support'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.contactForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      contactType: ['email'],
      contact: ['', [Validators.required, Validators.email]],
      role: ['renter', Validators.required],
      topic: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      attachment: [null],
    });
  }

  // ✅ Typed getters for form controls
  get fullName() {
    return this.contactForm.get('fullName');
  }
  get contact() {
    return this.contactForm.get('contact');
  }
  get topic() {
    return this.contactForm.get('topic');
  }
  get message() {
    return this.contactForm.get('message');
  }

  onContactTypeChange(type: 'email' | 'phone') {
    this.contactForm.patchValue({ contactType: type });
    if (type === 'email') {
      this.contact?.setValidators([Validators.required, Validators.email]);
    } else {
      this.contact?.setValidators([
        Validators.required,
        Validators.pattern(/^\+?[0-9]{7,15}$/),
      ]);
    }
    this.contact?.updateValueAndValidity();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.contactForm.patchValue({ attachment: input.files[0] });
    }
  }

  submit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.sending = true;
    this.errorMessage = '';
    this.successMessage = '';

    // simulate API call
    setTimeout(() => {
      this.sending = false;
      this.successMessage = 'Your message has been sent successfully!';
      this.contactForm.reset({ contactType: 'email', role: 'renter' });
    }, 1500);
  }

  goToPartner() {
    this.router.navigate(['/partner']);
  }
}
