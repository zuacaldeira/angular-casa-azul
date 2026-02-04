import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, StaffUser } from '../../services/auth';
import { ChildService } from '../../services/child';
import { Child } from '../../models/kindergarten.model';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-parent-portal',
  imports: [CommonModule],
  templateUrl: './parent-portal.html',
  styleUrl: './parent-portal.scss',
})
export class ParentPortal implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly childService = inject(ChildService);
  private readonly router = inject(Router);

  user$: Observable<StaffUser | null> = of(null);
  children: Child[] = [];
  loading = false;

  ngOnInit(): void {
    this.user$ = this.authService.getCurrentUser();
    this.loading = true;

    this.authService.getCurrentUser().pipe(
      switchMap((user) => {
        if (user && user.type === 'parent') {
          return this.childService.getChildren();
        }
        return of([]);
      })
    ).subscribe({
      next: (children) => {
        this.children = children;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error loading children:', err);
      },
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
