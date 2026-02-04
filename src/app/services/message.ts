import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Message } from '../models/kindergarten.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/messages';
  private readonly unreadCount = new BehaviorSubject<number>(0);

  getMessages(userId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/user/${userId}`);
  }

  sendMessage(message: Partial<Message>): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message);
  }

  markAsRead(messageId: string): Observable<Message> {
    return this.http.put<Message>(`${this.apiUrl}/${messageId}/read`, {}).pipe(
      tap(() => {
        const current = this.unreadCount.value;
        if (current > 0) {
          this.unreadCount.next(current - 1);
        }
      })
    );
  }

  getUnreadCount(): Observable<number> {
    return this.unreadCount.asObservable();
  }

  updateUnreadCount(count: number): void {
    this.unreadCount.next(Math.max(0, count));
  }

  countUnread(messages: Message[]): number {
    return messages.filter((m) => !m.read).length;
  }

  filterByLanguage(messages: Message[], language: string): Message[] {
    return messages.filter((m) => m.language === language);
  }
}
