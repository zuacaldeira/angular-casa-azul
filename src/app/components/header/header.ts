import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { MessageService } from '../../services/message';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  unreadCount$: Observable<number> = this.messageService.getUnreadCount();

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  get isTeacher(): boolean {
    return this.authService.isTeacher();
  }

  get isParent(): boolean {
    return this.authService.isParent();
  }

  get userLanguage(): string {
    return this.authService.getUserLanguage();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
