import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeader {
  @Input() background: string = '/assets/default-bg.jpg';
  @Input() heading: string = 'Default Heading';
  @Input() description: string = 'Default description text goes here.';
}
