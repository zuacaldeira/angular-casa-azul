import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../../services/schedule';
import { DailySchedule, Language } from '../../models/kindergarten.model';

@Component({
  selector: 'app-schedule-view',
  imports: [CommonModule],
  templateUrl: './schedule-view.html',
  styleUrl: './schedule-view.scss',
})
export class ScheduleView implements OnInit {
  private readonly scheduleService = inject(ScheduleService);

  @Input() groupId = '';

  schedule: DailySchedule | null = null;
  languageDistribution: Record<Language, number> = { de: 0, pt: 0, fr: 0 };
  totalMinutes = 0;
  isBalanced = false;
  loading = false;
  selectedDate = new Date();

  ngOnInit(): void {
    if (this.groupId) {
      this.loadSchedule();
    }
  }

  loadSchedule(): void {
    this.loading = true;
    this.scheduleService.getScheduleByGroup(this.groupId, this.selectedDate).subscribe({
      next: (schedule) => {
        this.schedule = schedule;
        this.totalMinutes = this.scheduleService.calculateTotalMinutes(schedule.activities);
        this.languageDistribution = this.scheduleService.getLanguageDistribution(schedule.activities);
        this.isBalanced = this.scheduleService.isLanguageBalanced(schedule.activities);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error loading schedule:', err);
      },
    });
  }

  onDateChange(date: string): void {
    this.selectedDate = new Date(date);
    this.loadSchedule();
  }

  formatMinutes(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) {
      return `${mins}m`;
    }
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
}
