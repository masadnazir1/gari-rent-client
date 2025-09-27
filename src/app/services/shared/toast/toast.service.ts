import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../../../Interfaces/ToastInterface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  private counter = 0;

  show(toast: Toast) {
    const newToast: Toast = {
      id: ++this.counter,
      duration: toast.duration || 3000,
      ...toast,
    };

    const current = this.toastsSubject.value;
    this.toastsSubject.next([...current, newToast]);

    // Auto remove after duration
    setTimeout(() => this.remove(newToast.id!), newToast.duration);
  }

  remove(id: number) {
    const updated = this.toastsSubject.value.filter((t) => t.id !== id);
    this.toastsSubject.next(updated);
  }
}
