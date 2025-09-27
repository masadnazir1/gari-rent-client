import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiService } from '../../../services/api.service';
import { ModelsheetComponent } from '../../shared/modelsheet/modelsheet';
import {
  faCarSide,
  faGasPump,
  faCog,
  faTachometerAlt,
  faCalendarAlt,
  faDollarSign,
  faSnowflake,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, ModelsheetComponent],
  templateUrl: './filter-panel.html',
  styleUrls: ['./filter-panel.css'],
})
export class FilterPanel implements OnInit {
  // FontAwesome icons
  faCar = faCarSide;
  faFuel = faGasPump;
  faTransmission = faCog;
  faMileage = faTachometerAlt;
  faYear = faCalendarAlt;
  faPrice = faDollarSign;
  faAC = faSnowflake;
  downarrow = faChevronDown;
  //
  Categories: any[] = []; // full Categories objects
  CategoriesNames: any[] = []; // full Categories objects
  //
  brands: any[] = []; // full brand objects
  brandNames: string[] = []; // just names
  transmissions = ['Automatic', 'Manual', 'CVT'];
  fuels = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  acOptions = ['Yes', 'No'];
  years: string[] = Array.from({ length: 30 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  selectedCategory = '';
  selectedBrand = 'All';
  selectedTransmission = '';
  selectedFuel = '';
  selectedAC = '';
  selectedYear = '';
  minPrice = null;
  maxPrice = null;
  minMileage = null;
  maxMileage = null;

  // Add state for current modal usage
  modalOptions: string[] = [];
  modalType: string = '';

  @ViewChild(ModelsheetComponent) modal!: ModelsheetComponent;
  @Output() filterChange = new EventEmitter<any>();

  ngOnInit(): void {
    this.getBrands();
  }
  //constructor
  constructor(private API: ApiService) {}

  getBrands() {
    this.API.get<any>('/barnds').subscribe({
      next: (data) => {
        // Store all brand objects
        this.brands = data.data;

        // Extract brand names
        this.brandNames = data.data.map((b: any) => b.name);
        console.log(this.brandNames); // ["Toyota", "Kia", "Chevrolet", ...]
      },
      error: (error) => {
        console.log('Error getting brands ', error);
      },
    });
  }
  getcategories() {
    this.API.get<any>('/categories').subscribe({
      next: (data) => {
        console.log(data.categories);
        // Store all brand objects
        this.Categories = data.categories;
        // Create a new array with just brand names
        // Extract just brand names
        this.CategoriesNames = data.categories.map((c: any) => c.name);
        console.log(this.CategoriesNames); // ["Toyota", "Kia", "Chevrolet", ...]
      },
      error: (error) => {
        console.log('Error getting categories ', error);
      },
    });
  }

  applyFilter() {
    this.filterChange.emit({
      category: this.selectedCategory,
      transmission: this.selectedTransmission,
      fuel: this.selectedFuel,
      ac: this.selectedAC === 'Yes' ? 1 : this.selectedAC === 'No' ? 0 : '',
      year: this.selectedYear,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      minMileage: this.minMileage,
      maxMileage: this.maxMileage,
    });
  }

  resetFilter() {
    this.selectedCategory = '';
    this.selectedTransmission = '';
    this.selectedFuel = '';
    this.selectedAC = '';
    this.selectedYear = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.minMileage = null;
    this.maxMileage = null;
    this.applyFilter();
  }

  openModal() {
    this.modal.open();
  }

  closeModal() {
    this.modal.close();
  }
  setActiveBrand(name: string) {
    this.selectedBrand = name;
    this.getcategories();
    this.modal.close();
  }

  openModalFor(type: string, options: string[]) {
    // guard for category
    if (
      type === 'category' &&
      (!this.Categories || this.Categories.length === 0)
    ) {
      alert('Kindly select the brand first');
      return; // stop here, do not open modal
    }
    this.modalType = type;
    this.modalOptions = options;
    this.modal.open();
  }

  //
  setActiveOption(option: string) {
    switch (this.modalType) {
      case 'brand':
        this.selectedBrand = option;
        this.getcategories();
        break;
      case 'category':
        this.selectedCategory = option;

        break;
      case 'transmission':
        this.selectedTransmission = option;
        break;
      case 'fuel':
        this.selectedFuel = option;
        break;
      case 'ac':
        this.selectedAC = option;
        break;
      case 'year':
        this.selectedYear = option;
        break;
    }
    this.modal.close();
  }
}
