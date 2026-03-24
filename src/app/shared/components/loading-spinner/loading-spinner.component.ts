import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color: 'primary' | 'white' | 'inherit' = 'primary';
  @Input() label: string = '';
  @Input() customClass: string = '';

  getSpinnerClasses(): string {
    const classes = ['spinner', `spinner-${this.size}`, `spinner-${this.color}`];
    if (this.customClass) {
      classes.push(this.customClass);
    }
    return classes.join(' ');
  }
}
