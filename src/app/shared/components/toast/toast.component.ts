import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() message: string = '';
  @Input() variant: ToastVariant = 'info';
  @Input() position: ToastPosition = 'bottom-end';
  @Input() autoDismiss: boolean = true;
  @Input() duration: number = 5000; // in milliseconds
  @Input() customClass: string = '';
  @Input() showCloseButton: boolean = true;

  @Output() close = new EventEmitter<void>();

  isVisible: boolean = true;
  private dismissTimeout: any;

  ngOnInit() {
    if (this.autoDismiss) {
      this.startDismissTimer();
    }
  }

  ngOnDestroy() {
    this.clearDismissTimer();
  }

  private startDismissTimer() {
    this.clearDismissTimer();
    this.dismissTimeout = setTimeout(() => {
      this.onClose();
    }, this.duration);
  }

  private clearDismissTimer() {
    if (this.dismissTimeout) {
      clearTimeout(this.dismissTimeout);
      this.dismissTimeout = null;
    }
  }

  onClose() {
    this.isVisible = false;
    this.clearDismissTimer();
    this.close.emit();
  }

  onMouseEnter() {
    if (this.autoDismiss) {
      this.clearDismissTimer();
    }
  }

  onMouseLeave() {
    if (this.autoDismiss && this.isVisible) {
      this.startDismissTimer();
    }
  }

  getIcon(): string {
    switch (this.variant) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ⓘ';
    }
  }
}
