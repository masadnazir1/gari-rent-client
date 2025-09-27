import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.html',
  styleUrls: ['./loading.css'],
})
export class LoadingComponent {
  /** Diameter of loader circle */
  @Input() size = 40;

  /** Logo URL */
  @Input() logo = 'assets/logo.png';

  /** Animation speed in seconds */
  @Input() speed = 1.2;

  /** Text to show next to loader */
  @Input() text = 'Just a sec...';
}
