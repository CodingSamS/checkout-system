import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];

  showSuccess(text: string) {
    this.toasts.push({
      text: text,
      className: 'badge bg-success text-light'
    });
  }

  showDanger(text: string) {
    this.toasts.push({
      text: text,
      className: 'badge bg-danger'
    });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t != toast);
  }

}
