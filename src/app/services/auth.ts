import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Teacher, Parent, Language } from '../models/kindergarten.model';

export type StaffUser = (Teacher | Parent) & { type: 'teacher' | 'parent' };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/auth';
  private readonly currentUser = new BehaviorSubject<StaffUser | null>(null);

  login(email: string, password: string): Observable<StaffUser> {
    return this.http.post<StaffUser>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((user) => {
        this.currentUser.next(user);
      })
    );
  }

  logout(): void {
    this.currentUser.next(null);
    localStorage.removeItem('auth_token');
  }

  getCurrentUser(): Observable<StaffUser | null> {
    return this.currentUser.asObservable();
  }

  isAuthenticated(): boolean {
    return !!this.currentUser.value;
  }

  isTeacher(): boolean {
    return this.currentUser.value?.type === 'teacher';
  }

  isParent(): boolean {
    return this.currentUser.value?.type === 'parent';
  }

  getUserLanguage(): Language {
    const user = this.currentUser.value;
    if (!user) {
      return 'de';
    }
    if (user.type === 'parent') {
      return (user as Parent).preferredLanguage;
    }
    return (user as Teacher).languages[0] ?? 'de';
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
