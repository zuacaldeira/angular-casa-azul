import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/property.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/auth';
  private readonly currentUser = new BehaviorSubject<User | null>(null);

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((user) => {
        this.currentUser.next(user);
      })
    );
  }

  logout(): void {
    this.currentUser.next(null);
    localStorage.removeItem('auth_token');
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  isAuthenticated(): boolean {
    return !!this.currentUser.value;
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
