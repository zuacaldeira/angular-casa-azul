import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Child, EnrollmentRequest, Language } from '../models/kindergarten.model';

@Injectable({
  providedIn: 'root',
})
export class ChildService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/children';

  getChildren(): Observable<Child[]> {
    return this.http.get<Child[]>(this.apiUrl);
  }

  getChildById(id: string): Observable<Child> {
    return this.http.get<Child>(`${this.apiUrl}/${id}`);
  }

  getChildrenByGroup(groupId: string): Observable<Child[]> {
    return this.http.get<Child[]>(`${this.apiUrl}/group/${groupId}`);
  }

  enrollChild(request: EnrollmentRequest): Observable<Child> {
    return this.http.post<Child>(`${this.apiUrl}/enroll`, request);
  }

  updateChild(id: string, updates: Partial<Child>): Observable<Child> {
    return this.http.put<Child>(`${this.apiUrl}/${id}`, updates);
  }

  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  validateEnrollment(request: EnrollmentRequest): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!request.childFirstName?.trim()) {
      errors.push('Child first name is required');
    }

    if (!request.childLastName?.trim()) {
      errors.push('Child last name is required');
    }

    if (!request.dateOfBirth) {
      errors.push('Date of birth is required');
    } else {
      const age = this.calculateAge(request.dateOfBirth);
      if (age < 2) {
        errors.push('Child must be at least 2 years old');
      }
      if (age > 6) {
        errors.push('Child must be 6 years old or younger');
      }
    }

    if (!request.preferredLanguages || request.preferredLanguages.length === 0) {
      errors.push('At least one preferred language is required');
    } else {
      const validLanguages: Language[] = ['de', 'pt', 'fr'];
      const invalid = request.preferredLanguages.filter((l) => !validLanguages.includes(l));
      if (invalid.length > 0) {
        errors.push(`Invalid languages: ${invalid.join(', ')}`);
      }
    }

    if (!request.parentEmail?.trim()) {
      errors.push('Parent email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.parentEmail)) {
      errors.push('Invalid email format');
    }

    if (!request.parentPhone?.trim()) {
      errors.push('Parent phone is required');
    }

    return { valid: errors.length === 0, errors };
  }

  filterByLanguage(children: Child[], language: Language): Child[] {
    return children.filter((child) => child.languages.includes(language));
  }
}
