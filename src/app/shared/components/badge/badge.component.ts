import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  @Input() variant: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() customClass: string = '';

  getBadgeClasses(): string {
    const classes = ['badge', `badge-${this.variant}`];
    if (this.size !== 'md') {
      classes.push(`badge-${this.size}`);
    }
    if (this.customClass) {
      classes.push(this.customClass);
    }
    return classes.join(' ');
  }
}
