import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './search-form.html',
  styleUrl: './search-form.css',
})
export class SearchForm {}
