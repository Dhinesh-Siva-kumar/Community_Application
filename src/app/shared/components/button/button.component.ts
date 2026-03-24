import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Button Component
 * Reusable button with support for multiple variants (primary, secondary, outline)
 * and states (default, hover, active, disabled, loading)
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  /**
   * Button variant type
   * primary: Primary action button (blue background)
   * secondary: Secondary action button (light blue background)
   * outline: Outlined button (transparent background, border)
   * fab: Floating action button (circular)
   */
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'fab' = 'primary';

  /**
   * Button size
   * sm: 36px height
   * md: 40px height (default)
   * lg: 48px height
   */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Disabled state - prevents interaction
   */
  @Input() disabled: boolean = false;

  /**
   * Loading state - shows spinner, disables interaction
   */
  @Input() loading: boolean = false;

  /**
   * Full width button (100% width)
   */
  @Input() fullWidth: boolean = false;

  /**
   * Custom CSS classes to add to button
   */
  @Input() customClass: string = '';

  /**
   * Button click event
   */
  @Output() clicked = new EventEmitter<void>();

  /**
   * Handle button click
   */
  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }

  /**
   * Get computed class list for button element
   */
  getButtonClasses(): string {
    const classes = [];

    // Add variant class
    classes.push(`btn-${this.variant}`);

    // Add size class
    if (this.size !== 'md') {
      classes.push(`btn-${this.size}`);
    }

    // Add full width class
    if (this.fullWidth) {
      classes.push('btn-full-width');
    }

    // Add loading class
    if (this.loading) {
      classes.push('loading');
    }

    // Add custom classes
    if (this.customClass) {
      classes.push(this.customClass);
    }

    return classes.join(' ');
  }
}
