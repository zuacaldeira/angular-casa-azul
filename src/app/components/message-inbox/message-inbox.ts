import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message';
import { AuthService } from '../../services/auth';
import { Message } from '../../models/kindergarten.model';

@Component({
  selector: 'app-message-inbox',
  imports: [CommonModule],
  templateUrl: './message-inbox.html',
  styleUrl: './message-inbox.scss',
})
export class MessageInbox implements OnInit {
  private readonly messageService = inject(MessageService);
  private readonly authService = inject(AuthService);

  messages: Message[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading = true;
    this.error = null;

    this.authService.getCurrentUser().subscribe((user) => {
      if (!user) {
        this.loading = false;
        return;
      }

      this.messageService.getMessages(user.id).subscribe({
        next: (messages) => {
          this.messages = messages;
          this.messageService.updateUnreadCount(this.messageService.countUnread(messages));
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load messages';
          this.loading = false;
          console.error('Error loading messages:', err);
        },
      });
    });
  }

  onMarkAsRead(messageId: string): void {
    this.messageService.markAsRead(messageId).subscribe({
      next: (updated) => {
        const index = this.messages.findIndex((m) => m.id === messageId);
        if (index >= 0) {
          this.messages[index] = updated;
        }
      },
      error: (err) => console.error('Error marking message as read:', err),
    });
  }
}
