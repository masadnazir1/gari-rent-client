import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave, faLocationDot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-address-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './address-page.html',
  styleUrls: ['./address-page.css'],
})
export class AddressPage {
  // FontAwesome icons
  faSave = faSave;
  faLocationDot = faLocationDot;

  // Country list (common + can type manually)
  countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'India',
    'Pakistan',
    'Germany',
    'France',
    'Mexico',
    'Brazil',
  ];

  // Form
  form: FormGroup;

  // Geolocation error message
  geoError = '';

  // For showing that geolocation lookup is in progress
  fetchingLocation = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        street: ['', [Validators.required, Validators.minLength(2)]],
        city: ['', [Validators.required]],
        province: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zip: ['', [Validators.required]],
        latitude: [{ value: '', disabled: true }],
        longitude: [{ value: '', disabled: true }],
      },
      {
        validators: [this.zipCountryValidator.bind(this)],
      }
    );
  }

  // Custom validator: checks zip/postal format based on country (basic common rules)
  zipCountryValidator(group: AbstractControl): ValidationErrors | null {
    const country = (group.get('country')?.value ?? '').toString().trim();
    const zip = (group.get('zip')?.value ?? '').toString().trim();

    if (!country || !zip) return null; // other validators handle required

    const validators: { [k: string]: RegExp } = {
      'United States': /^\d{5}(-\d{4})?$/i, // 12345 or 12345-6789
      Canada: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, // A1A 1A1
      'United Kingdom': /^[A-Za-z0-9]{2,4}\s?[A-Za-z0-9]{2,3}$/, // rough UK pattern
      Australia: /^\d{4}$/,
      India: /^\d{6}$/,
      Pakistan: /^\d{5}$/,
      Germany: /^\d{5}$/,
      France: /^\d{5}$/,
      Mexico: /^\d{5}$/,
      Brazil: /^\d{5}-?\d{3}$/,
    };

    const pattern = validators[country];
    if (pattern) {
      if (!pattern.test(zip)) {
        return { zipInvalidForCountry: true };
      }
    }
    // if no pattern defined for that country, allow any non-empty zip (could extend)
    return null;
  }

  // Convenience getters for template
  get street() {
    return this.form.get('street');
  }
  get city() {
    return this.form.get('city');
  }
  get province() {
    return this.form.get('province');
  }
  get country() {
    return this.form.get('country');
  }
  get zip() {
    return this.form.get('zip');
  }
  get latitude() {
    return this.form.get('latitude');
  }
  get longitude() {
    return this.form.get('longitude');
  }

  // Use browser geolocation
  useCurrentLocation() {
    if (!('geolocation' in navigator)) {
      this.geoError = 'Geolocation is not supported by this browser.';
      return;
    }

    this.geoError = '';
    this.fetchingLocation = true;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.fetchingLocation = false;
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        // Fill the readonly controls
        this.form.patchValue({
          latitude: lat.toFixed(6),
          longitude: lng.toFixed(6),
        });
        // Also enable them and then disable again to ensure value shown (they are disabled controls)
        // (patchValue works for disabled controls only after passing { onlySelf: false } — but patchValue will set disabled fields as well)
      },
      (err) => {
        this.fetchingLocation = false;
        if (err.code === err.PERMISSION_DENIED) {
          this.geoError =
            'Could not fetch location. Please allow browser location access or enter manually.';
        } else {
          this.geoError = 'Could not fetch location. ' + (err.message || '');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  }

  // Save action
  saveAddress() {
    // touch all controls to show validation
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    // Prepare final value (include coords)
    const payload = {
      street: this.street?.value,
      city: this.city?.value,
      province: this.province?.value,
      country: this.country?.value,
      zip: this.zip?.value,
      latitude: this.latitude?.value || null,
      longitude: this.longitude?.value || null,
    };

    // Replace with real save logic (API call)
    alert('Address saved successfully. Check console for payload.');
  }

  // Computed preview line
  get previewLine(): string {
    const s = this.street?.value || '';
    const c = this.city?.value || '';
    const p = this.province?.value || '';
    const co = this.country?.value || '';
    const z = this.zip?.value || '';
    const parts = [s, c, p, co].filter(Boolean).join(', ');
    return parts ? `📍 ${parts}${z ? ' ' + z : ''}` : '';
  }

  // small helper to show zip-country error in template
  zipHasCountryError(): boolean {
    return (
      !!this.form.errors?.['zipInvalidForCountry'] ||
      !!this.form.get('zip')?.errors?.['zipInvalidForCountry']
    );
  }
}
