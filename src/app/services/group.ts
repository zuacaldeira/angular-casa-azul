import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group, Language } from '../models/kindergarten.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/groups';

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl);
  }

  getGroupById(id: string): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/${id}`);
  }

  getGroupsByLanguage(language: Language): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl, { params: { language } });
  }

  createGroup(group: Partial<Group>): Observable<Group> {
    return this.http.post<Group>(this.apiUrl, group);
  }

  updateGroup(id: string, updates: Partial<Group>): Observable<Group> {
    return this.http.put<Group>(`${this.apiUrl}/${id}`, updates);
  }

  hasCapacity(group: Group): boolean {
    return group.childIds.length < group.capacity;
  }

  getRemainingCapacity(group: Group): number {
    return Math.max(0, group.capacity - group.childIds.length);
  }

  isAgeEligible(group: Group, childAge: number): boolean {
    return childAge >= group.ageRange.min && childAge <= group.ageRange.max;
  }

  findEligibleGroups(groups: Group[], childAge: number, preferredLanguage: Language): Group[] {
    return groups.filter(
      (group) =>
        this.hasCapacity(group) &&
        this.isAgeEligible(group, childAge) &&
        group.language === preferredLanguage
    );
  }
}
