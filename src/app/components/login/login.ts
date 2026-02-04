import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  loading = false;
  error: string | null = null;

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.error = 'Please enter email and password';
      return;
    }

    this.loading = true;
    this.error = null;

    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        this.loading = false;
        this.notificationService.showSuccess(`Welcome, ${user.firstName}!`);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Login failed. Please check your credentials.';
        console.error('Login error:', err);
      },
    });
  }
}
