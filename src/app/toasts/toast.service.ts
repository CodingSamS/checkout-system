import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  showSuccess(text: string) {
    this.toasts.push({
      text: text,
      className: 'badge bg-success text-light',
      delay: 2000
    });
  }

  showDanger(text: string) {
    this.toasts.push({
      text: text,
      className: 'badge bg-danger',
      delay: 5000
    });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t != toast);
  }

}
