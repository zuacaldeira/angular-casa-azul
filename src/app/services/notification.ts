import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notifications = new BehaviorSubject<string[]>([]);

  showSuccess(message: string): void {
    const current = this.notifications.value;
    this.notifications.next([...current, message]);

    setTimeout(() => {
      const updated = this.notifications.value.filter((m) => m !== message);
      this.notifications.next(updated);
    }, 5000);
  }

  showError(message: string): void {
    const errorMessage = `Error: ${message}`;
    const current = this.notifications.value;
    this.notifications.next([...current, errorMessage]);

    setTimeout(() => {
      const updated = this.notifications.value.filter((m) => m !== errorMessage);
      this.notifications.next(updated);
    }, 5000);
  }

  getNotifications(): Observable<string[]> {
    return this.notifications.asObservable();
  }

  clearAll(): void {
    this.notifications.next([]);
  }
}
