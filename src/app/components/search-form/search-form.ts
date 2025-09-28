import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomDatepickerComponent } from '../custom-datepicker/custom-datepicker';
import { Modalrelative } from '../shared/modalrelative/modalrelative';
@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    Modalrelative,
    CustomDatepickerComponent,
  ],
  templateUrl: './search-form.html',
  styleUrl: './search-form.css',
})
export class SearchForm {
  Destination: string = '  Select Now';
  PeopleSelected: string = 'Chose Here';
  isModalOpen = false;

  modalOptions: string[] = [];
  modalType: string = 'Select';
  locations: string[] = [
    'Islamabad',
    'Karachi',
    'Lahore',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Hyderabad',
    'Gujranwala',
    'Bahawalpur',
    'Sukkur',
    'Abbottabad',
    'Mardan',
  ];
  PeopleQuantity: string[] = [
    '1 Person',
    '2 People',
    '3 People',
    '4 People',
    '5 People',
    '6 People',
    '7 People',
    '8 People',
    '9 People',
    '10+ People',
  ];

  //constructor
  constructor(private router: Router) {}
  //
  //
  openModalFor(type: string) {
    if (type === 'Destination') {
      this.modalOptions = this.locations;
    } else if (type === 'People') {
      this.modalOptions = this.PeopleQuantity;
    }
    this.modalType = type;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden'; // disable page scroll
  }

  onDateSelected(date: string, datetype: string) {
    console.log(date);
  }
  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto'; // re-enable page scroll
  }

  SetOption(item: string) {
    if (this.locations.includes(item)) {
      console.log(true);
      this.Destination = item;
      this.isModalOpen = false;
    } else if (this.PeopleQuantity.includes(item)) {
      console.log(true);
      this.PeopleSelected = item;
      this.isModalOpen = false;
    }
  }
  ExploreAll() {
    this.router.navigate(['/cars']);
  }
}
