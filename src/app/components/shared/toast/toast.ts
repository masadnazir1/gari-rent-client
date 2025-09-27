import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../services/shared/toast/toast.service';
import { CommonModule } from '@angular/common';
import { Toast } from '../../../Interfaces/ToastInterface';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toasts$.subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  remove(id?: number) {
    if (id) this.toastService.remove(id);
  }

  handleAction(toast: Toast) {
    if (toast.action) {
      toast.action();
    }
    this.remove(toast.id);
  }
}
