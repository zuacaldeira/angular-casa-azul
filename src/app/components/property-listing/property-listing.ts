import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../services/property';
import { Property, SearchFilters } from '../../models/property.model';

@Component({
  selector: 'app-property-listing',
  imports: [CommonModule],
  templateUrl: './property-listing.html',
  styleUrl: './property-listing.scss',
})
export class PropertyListing implements OnInit {
  private readonly propertyService = inject(PropertyService);

  properties: Property[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.loading = true;
    this.error = null;
    this.propertyService.getProperties().subscribe({
      next: (properties) => {
        this.properties = properties;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load properties';
        this.loading = false;
        console.error('Error loading properties:', err);
      },
    });
  }

  onSearch(filters: SearchFilters): void {
    this.loading = true;
    this.error = null;
    this.propertyService.searchProperties(filters).subscribe({
      next: (properties) => {
        this.properties = properties;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Search failed';
        this.loading = false;
        console.error('Error searching properties:', err);
      },
    });
  }

  trackByPropertyId(_index: number, property: Property): string {
    return property.id;
  }
}
