import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChildService } from '../../services/child';
import { Child, Language } from '../../models/kindergarten.model';

@Component({
  selector: 'app-child-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './child-list.html',
  styleUrl: './child-list.scss',
})
export class ChildList implements OnInit {
  private readonly childService = inject(ChildService);

  children: Child[] = [];
  filteredChildren: Child[] = [];
  loading = false;
  error: string | null = null;
  selectedLanguage: Language | null = null;

  ngOnInit(): void {
    this.loadChildren();
  }

  loadChildren(): void {
    this.loading = true;
    this.error = null;
    this.childService.getChildren().subscribe({
      next: (children) => {
        this.children = children;
        this.filteredChildren = children;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load children';
        this.loading = false;
        console.error('Error loading children:', err);
      },
    });
  }

  onFilterByLanguage(language: Language | null): void {
    this.selectedLanguage = language;
    if (language) {
      this.filteredChildren = this.childService.filterByLanguage(this.children, language);
    } else {
      this.filteredChildren = this.children;
    }
  }

  getAge(dateOfBirth: Date): number {
    return this.childService.calculateAge(dateOfBirth);
  }

  trackByChildId(_index: number, child: Child): string {
    return child.id;
  }
}
