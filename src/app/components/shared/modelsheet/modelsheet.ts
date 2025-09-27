import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modelsheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modelsheet.html',
  styleUrls: ['./modelsheet.css'],
})
export class ModelsheetComponent {
  @Input() title = '';
  @Input() showFooter = true;
  @Input() closeOnBackdrop = true;

  @Output() closed = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();

  visible = false;

  @HostBinding('class.is-mobile') isMobile = false;

  constructor() {
    this.updateIsMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.updateIsMobile());
    }
  }

  updateIsMobile() {
    this.isMobile =
      typeof window !== 'undefined'
        ? window.matchMedia('(max-width: 768px)').matches
        : false;
  }

  open() {
    this.visible = true;
    this.opened.emit();
    document.body.style.overflow = 'hidden';
  }
  close() {
    this.visible = false;
    this.closed.emit();
    document.body.style.overflow = '';
  }
  toggle() {
    this.visible = !this.visible;
    if (this.visible) this.opened.emit();
    else this.closed.emit();
  }

  onOverlayClick() {
    if (this.closeOnBackdrop) this.close();
  }
}
