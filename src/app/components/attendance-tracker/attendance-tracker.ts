import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../../services/attendance';
import { ChildService } from '../../services/child';
import { AttendanceRecord, Child } from '../../models/kindergarten.model';

@Component({
  selector: 'app-attendance-tracker',
  imports: [CommonModule],
  templateUrl: './attendance-tracker.html',
  styleUrl: './attendance-tracker.scss',
})
export class AttendanceTracker implements OnInit {
  private readonly attendanceService = inject(AttendanceService);
  private readonly childService = inject(ChildService);

  @Input() groupId = '';

  children: Child[] = [];
  records: AttendanceRecord[] = [];
  attendanceRate = 0;
  loading = false;
  today = new Date();

  ngOnInit(): void {
    if (this.groupId) {
      this.loadData();
    }
  }

  loadData(): void {
    this.loading = true;

    this.childService.getChildrenByGroup(this.groupId).subscribe({
      next: (children) => {
        this.children = children;
      },
      error: (err) => console.error('Error loading children:', err),
    });

    this.attendanceService.getAttendanceByGroup(this.groupId, this.today).subscribe({
      next: (records) => {
        this.records = records;
        this.attendanceRate = this.attendanceService.calculateAttendanceRate(records);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error loading attendance:', err);
      },
    });
  }

  markPresent(childId: string): void {
    this.attendanceService
      .recordAttendance({
        childId,
        date: this.today,
        checkIn: new Date(),
        status: 'present',
      })
      .subscribe({
        next: (record) => {
          this.records = [...this.records, record];
          this.attendanceRate = this.attendanceService.calculateAttendanceRate(this.records);
        },
        error: (err) => console.error('Error recording attendance:', err),
      });
  }

  markAbsent(childId: string, status: 'absent' | 'sick' | 'vacation'): void {
    this.attendanceService
      .recordAttendance({
        childId,
        date: this.today,
        status,
      })
      .subscribe({
        next: (record) => {
          this.records = [...this.records, record];
          this.attendanceRate = this.attendanceService.calculateAttendanceRate(this.records);
        },
        error: (err) => console.error('Error recording attendance:', err),
      });
  }

  getChildRecord(childId: string): AttendanceRecord | undefined {
    return this.records.find((r) => r.childId === childId);
  }
}
