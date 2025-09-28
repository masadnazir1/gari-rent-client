import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modalrelative',
  imports: [CommonModule],
  templateUrl: './modalrelative.html',
  styleUrl: './modalrelative.css',
})
export class Modalrelative {
  @Input() title: string = ''; // Modal title
  @Input() isOpen: boolean = false; // Show/hide modal
  @Input() size: 'sm' | 'md' | 'lg' = 'md'; // Modal size
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
