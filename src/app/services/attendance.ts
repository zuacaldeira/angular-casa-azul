import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AttendanceRecord } from '../models/kindergarten.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/attendance';

  getAttendanceByChild(childId: string, startDate: Date, endDate: Date): Observable<AttendanceRecord[]> {
    const params = {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };
    return this.http.get<AttendanceRecord[]>(`${this.apiUrl}/child/${childId}`, { params });
  }

  getAttendanceByGroup(groupId: string, date: Date): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>(`${this.apiUrl}/group/${groupId}`, {
      params: { date: date.toISOString() },
    });
  }

  recordAttendance(record: Partial<AttendanceRecord>): Observable<AttendanceRecord> {
    return this.http.post<AttendanceRecord>(this.apiUrl, record);
  }

  updateAttendance(id: string, updates: Partial<AttendanceRecord>): Observable<AttendanceRecord> {
    return this.http.put<AttendanceRecord>(`${this.apiUrl}/${id}`, updates);
  }

  calculateAttendanceRate(records: AttendanceRecord[]): number {
    if (records.length === 0) {
      return 0;
    }

    const presentCount = records.filter((r) => r.status === 'present').length;
    return Math.round((presentCount / records.length) * 100);
  }

  getAbsenceStreak(records: AttendanceRecord[]): number {
    let streak = 0;

    const sorted = [...records].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    for (const record of sorted) {
      if (record.status !== 'present') {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  validateCheckInOut(checkIn: Date | undefined, checkOut: Date | undefined): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (checkIn && checkOut) {
      if (new Date(checkOut) <= new Date(checkIn)) {
        errors.push('Check-out time must be after check-in time');
      }

      const diffMs = new Date(checkOut).getTime() - new Date(checkIn).getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      if (diffHours > 10) {
        errors.push('Child cannot stay longer than 10 hours');
      }
    }

    return { valid: errors.length === 0, errors };
  }
}
