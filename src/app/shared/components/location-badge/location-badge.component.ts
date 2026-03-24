import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface LocationData {
  postcode: string;
  area: string;
  distance?: number; // in kilometers
  distanceUnit?: 'km' | 'mi';
}

export type LocationBadgeSize = 'sm' | 'md' | 'lg';
export type LocationBadgeVariant = 'primary' | 'secondary' | 'success' | 'warning';

@Component({
  selector: 'app-location-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-badge.component.html',
  styleUrl: './location-badge.component.scss'
})
export class LocationBadgeComponent {
  @Input() postcode: string = '';
  @Input() area: string = '';
  @Input() distance?: number;
  @Input() distanceUnit: 'km' | 'mi' = 'km';
  @Input() size: LocationBadgeSize = 'md';
  @Input() variant: LocationBadgeVariant = 'primary';
  @Input() clickable: boolean = false;
  @Input() customClass: string = '';

  @Output() click = new EventEmitter<void>();

  onClick() {
    if (this.clickable) {
      this.click.emit();
    }
  }

  getDisplayDistance(): string {
    if (this.distance === undefined || this.distance === null) {
      return '';
    }
    return `${this.distance.toFixed(1)}${this.distanceUnit}`;
  }

  hasDistance(): boolean {
    return this.distance !== undefined && this.distance !== null;
  }
}
