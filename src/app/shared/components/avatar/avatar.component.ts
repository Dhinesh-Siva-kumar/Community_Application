import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Avatar Component
 * Displays user avatar with support for image or initials fallback
 */
@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  /**
   * Image source URL
   */
  @Input() src: string = '';

  /**
   * Alt text for image
   */
  @Input() alt: string = 'User avatar';

  /**
   * User name (for fallback initials)
   */
  @Input() name: string = '';

  /**
   * Avatar size (sm: 36px, md: 40px, lg: 52px, xl: 96px)
   */
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * Background color (primary, success, warning, error, info)
   */
  @Input() backgroundColor: 'primary' | 'success' | 'warning' | 'error' | 'info' = 'primary';

  /**
   * Custom CSS classes
   */
  @Input() customClass: string = '';

  /**
   * Get avatar initials from name
   */
  getInitials(): string {
    if (!this.name) return '';
    const parts = this.name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  }

  /**
   * Check if avatar should show image
   */
  showImage(): boolean {
    return !!this.src;
  }

  /**
   * Check if avatar should show initials
   */
  showInitials(): boolean {
    return !this.src && !!this.name;
  }

  /**
   * Get computed classes
   */
  getAvatarClasses(): string {
    const classes = ['avatar'];
    classes.push(`avatar-${this.size}`);
    classes.push(`avatar-bg-${this.backgroundColor}`);
    if (this.customClass) {
      classes.push(this.customClass);
    }
    return classes.join(' ');
  }
}
