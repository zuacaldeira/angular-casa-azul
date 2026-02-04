import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GroupService } from '../../services/group';
import { Group, Language } from '../../models/kindergarten.model';

@Component({
  selector: 'app-group-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './group-dashboard.html',
  styleUrl: './group-dashboard.scss',
})
export class GroupDashboard implements OnInit {
  private readonly groupService = inject(GroupService);

  groups: Group[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.loading = true;
    this.error = null;
    this.groupService.getGroups().subscribe({
      next: (groups) => {
        this.groups = groups;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load groups';
        this.loading = false;
        console.error('Error loading groups:', err);
      },
    });
  }

  getRemainingCapacity(group: Group): number {
    return this.groupService.getRemainingCapacity(group);
  }

  getLanguageLabel(language: Language): string {
    const labels: Record<Language, string> = {
      de: 'Deutsch',
      pt: 'Portugu\u00eas',
      fr: 'Fran\u00e7ais',
    };
    return labels[language] ?? language;
  }

  trackByGroupId(_index: number, group: Group): string {
    return group.id;
  }
}
