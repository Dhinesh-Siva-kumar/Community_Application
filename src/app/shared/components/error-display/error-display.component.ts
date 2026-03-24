import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-display.component.html',
  styleUrl: './error-display.component.scss'
})
export class ErrorDisplayComponent {
  @Input() title: string = 'Error';
  @Input() message: string = '';
  @Input() details: string[] = [];
  @Input() dismissible: boolean = true;
  @Input() customClass: string = '';
  @Output() dismissed = new EventEmitter<void>();

  isDismissed: boolean = false;

  dismiss(): void {
    this.isDismissed = true;
    this.dismissed.emit();
  }
}
