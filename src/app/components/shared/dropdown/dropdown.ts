import { Component, Input, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class ModalrelativeComponent {
  @Input() isOpen: boolean = false;

  constructor(private eRef: ElementRef) {}

  // Close when clicked outside
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    if (this.isOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
