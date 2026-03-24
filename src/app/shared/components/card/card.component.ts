import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Card Component
 * Reusable card container with support for different variants
 * primary: Basic card with shadow
 * elevated: Card that lifts on hover
 * interactive: Clickable card
 * flat: Card with minimal styling
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  /**
   * Card variant
   * default: Basic card with shadow
   * elevated: Card that lifts on hover
   * interactive: Clickable card
   * flat: Card with border only
   */
  @Input() variant: 'default' | 'elevated' | 'interactive' | 'flat' = 'default';

  /**
   * Card size variant
   * default: Standard padding
   * compact: Reduced padding
   * large: Increased padding
   */
  @Input() size: 'default' | 'compact' | 'large' = 'default';

  /**
   * Color variant for borders and accent
   * primary: Blue accent
   * success: Green accent
   * warning: Orange accent
   * error: Red accent
   * info: Blue info accent
   */
  @Input() colorVariant: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'none' = 'none';

  /**
   * Custom CSS classes
   */
  @Input() customClass: string = '';

  /**
   * Card click event (only emitted for interactive cards)
   */
  @Output() clicked = new EventEmitter<void>();

  /**
   * Handle card click
   */
  onClick(): void {
    if (this.variant === 'interactive') {
      this.clicked.emit();
    }
  }

  /**
   * Get computed class list for card element
   */
  getCardClasses(): string {
    const classes = ['card'];

    // Add variant class
    if (this.variant !== 'default') {
      classes.push(`card-${this.variant}`);
    }

    // Add size class
    if (this.size !== 'default') {
      classes.push(`card-${this.size}`);
    }

    // Add color variant class
    if (this.colorVariant !== 'none') {
      classes.push(`card-${this.colorVariant}`);
    }

    // Add interactive cursor style
    if (this.variant === 'interactive') {
      classes.push('cursor-pointer');
    }

    // Add custom classes
    if (this.customClass) {
      classes.push(this.customClass);
    }

    return classes.join(' ');
  }
}
