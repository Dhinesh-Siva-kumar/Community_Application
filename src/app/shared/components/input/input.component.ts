import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Input Component
 * Reusable text input with support for different states and configurations
 */
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  /**
   * Input type (text, email, password, search, url, tel, number)
   */
  @Input() type: string = 'text';

  /**
   * Placeholder text
   */
  @Input() placeholder: string = '';

  /**
   * Input label
   */
  @Input() label: string = '';

  /**
   * Helper text below input
   */
  @Input() helperText: string = '';

  /**
   * Error message (if present, shows error state)
   */
  @Input() errorMessage: string = '';

  /**
   * Success message
   */
  @Input() successMessage: string = '';

  /**
   * Disabled state
   */
  @Input() disabled: boolean = false;

  /**
   * Required field indicator
   */
  @Input() required: boolean = false;

  /**
   * Input size (sm, md, lg)
   */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Icon on left side (icon name or SVG)
   */
  @Input() iconLeft: string = '';

  /**
   * Icon on right side
   */
  @Input() iconRight: string = '';

  /**
   * Custom CSS classes
   */
  @Input() customClass: string = '';

  /**
   * Value change event
   */
  @Output() valueChange = new EventEmitter<string>();

  /**
   * Focus event
   */
  @Output() focused = new EventEmitter<void>();

  /**
   * Blur event
   */
  @Output() blurred = new EventEmitter<void>();

  // ControlValueAccessor implementation
  value: string = '';
  isFocused: boolean = false;
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Handle input value change
   */
  onInputChange(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  /**
   * Handle input focus
   */
  onInputFocus(): void {
    this.isFocused = true;
    this.focused.emit();
  }

  /**
   * Handle input blur
   */
  onInputBlur(): void {
    this.isFocused = false;
    this.onTouched();
    this.blurred.emit();
  }

  /**
   * Get input wrapper classes
   */
  getWrapperClasses(): string {
    const classes = ['form-group'];
    if (this.errorMessage) {
      classes.push('has-error');
    }
    if (this.successMessage) {
      classes.push('has-success');
    }
    return classes.join(' ');
  }

  /**
   * Get input element classes
   */
  getInputClasses(): string {
    const classes = [];
    if (this.size !== 'md') {
      classes.push(`input-${this.size}`);
    }
    if (this.errorMessage) {
      classes.push('input-error');
    }
    if (this.successMessage) {
      classes.push('input-success');
    }
    if (this.iconLeft) {
      classes.push('has-icon-left');
    }
    if (this.iconRight) {
      classes.push('has-icon-right');
    }
    if (this.customClass) {
      classes.push(this.customClass);
    }
    return classes.join(' ');
  }
}
