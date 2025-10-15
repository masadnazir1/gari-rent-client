import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faStar,
  faPaperPlane,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-feedback-component',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './feedback-component.html',
  styleUrls: ['./feedback-component.css'],
})
export class FeedbackComponent {
  rating = 0;
  feedbackText = '';
  submitted = false;

  constructor(library: FaIconLibrary) {
    library.addIcons(faStar, faPaperPlane, faCommentDots);
  }

  setRating(star: number) {
    this.rating = star;
  }

  submitFeedback() {
    if (this.rating > 0 && this.feedbackText.trim()) {
      this.submitted = true;
      // API call (POST /feedback)
    }
  }
}
