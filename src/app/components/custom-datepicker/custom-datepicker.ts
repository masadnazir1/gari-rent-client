import { Component, EventEmitter, Output } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendar,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-custom-datepicker',
  standalone: true,
  imports: [DatePipe, CommonModule, FontAwesomeModule],
  templateUrl: './custom-datepicker.html',
  styleUrl: './custom-datepicker.css',
})
export class CustomDatepickerComponent {
  showCalendar = false;
  selectedDate: Date | null = null;
  currentDate = new Date();
  days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  calendarDays: Date[] = [];
  blanks: number[] = [];

  faCalendar = faCalendar;
  faLeft = faChevronLeft;
  faRight = faChevronRight;

  // 🔹 Original event (full Date object)
  @Output() dateChange = new EventEmitter<Date>();

  // 🔹 New event (formatted YYYY-MM-DD string)
  @Output() dateStringChange = new EventEmitter<string>();

  constructor() {
    this.generateCalendar();
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

  generateCalendar() {
    const start = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const end = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );

    this.blanks = Array(start.getDay()).fill(0);
    this.calendarDays = [];

    for (let i = 1; i <= end.getDate(); i++) {
      this.calendarDays.push(
        new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i)
      );
    }
  }

  prevMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    this.generateCalendar();
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.showCalendar = false;

    // 🔹 Emit full date object
    this.dateChange.emit(date);

    // 🔹 Emit formatted YYYY-MM-DD
    const formatted = this.formatDate(date);
    this.dateStringChange.emit(formatted);
  }

  // Utility to format as YYYY-MM-DD
  private formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return today.toDateString() === date.toDateString();
  }

  isSelected(date: Date): boolean {
    return this.selectedDate?.toDateString() === date.toDateString();
  }
}
