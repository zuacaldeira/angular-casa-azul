import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailySchedule, ScheduleActivity, Language } from '../models/kindergarten.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/schedules';

  getScheduleByGroup(groupId: string, date: Date): Observable<DailySchedule> {
    return this.http.get<DailySchedule>(`${this.apiUrl}/group/${groupId}`, {
      params: { date: date.toISOString() },
    });
  }

  getWeeklySchedule(groupId: string, weekStart: Date): Observable<DailySchedule[]> {
    return this.http.get<DailySchedule[]>(`${this.apiUrl}/group/${groupId}/week`, {
      params: { start: weekStart.toISOString() },
    });
  }

  createSchedule(schedule: Partial<DailySchedule>): Observable<DailySchedule> {
    return this.http.post<DailySchedule>(this.apiUrl, schedule);
  }

  updateSchedule(id: string, updates: Partial<DailySchedule>): Observable<DailySchedule> {
    return this.http.put<DailySchedule>(`${this.apiUrl}/${id}`, updates);
  }

  calculateTotalMinutes(activities: ScheduleActivity[]): number {
    return activities.reduce((sum, activity) => sum + activity.durationMinutes, 0);
  }

  getLanguageDistribution(activities: ScheduleActivity[]): Record<Language, number> {
    const distribution: Record<Language, number> = { de: 0, pt: 0, fr: 0 };

    for (const activity of activities) {
      distribution[activity.language] += activity.durationMinutes;
    }

    return distribution;
  }

  isLanguageBalanced(activities: ScheduleActivity[], tolerancePercent: number = 10): boolean {
    const distribution = this.getLanguageDistribution(activities);
    const total = this.calculateTotalMinutes(activities);

    if (total === 0) {
      return true;
    }

    const activeLanguages = (Object.keys(distribution) as Language[]).filter(
      (lang) => distribution[lang] > 0
    );

    if (activeLanguages.length <= 1) {
      return true;
    }

    const expectedPercent = 100 / activeLanguages.length;

    for (const lang of activeLanguages) {
      const actualPercent = (distribution[lang] / total) * 100;
      if (Math.abs(actualPercent - expectedPercent) > tolerancePercent) {
        return false;
      }
    }

    return true;
  }

  validateActivity(activity: ScheduleActivity): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!activity.description?.trim()) {
      errors.push('Activity description is required');
    }

    if (activity.durationMinutes <= 0) {
      errors.push('Duration must be greater than 0');
    }

    if (activity.durationMinutes > 180) {
      errors.push('Activity cannot exceed 3 hours');
    }

    const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
    if (!timeRegex.test(activity.time)) {
      errors.push('Time must be in HH:mm format');
    }

    const validLanguages: Language[] = ['de', 'pt', 'fr'];
    if (!validLanguages.includes(activity.language)) {
      errors.push('Invalid language');
    }

    return { valid: errors.length === 0, errors };
  }
}
