import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  displayName = '';
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  hidePassword = true;
  loading = signal(false);
  error = signal('');

  // Password strength
  strengthClass = '';
  strengthLabel = '';
  strengthWidth = '0%';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  updateStrength(): void {
    const pw = this.password;
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score <= 1) {
      this.strengthClass = 'strength-weak';
      this.strengthLabel = 'Weak';
      this.strengthWidth = '25%';
    } else if (score <= 2) {
      this.strengthClass = 'strength-fair';
      this.strengthLabel = 'Fair';
      this.strengthWidth = '50%';
    } else if (score <= 3) {
      this.strengthClass = 'strength-good';
      this.strengthLabel = 'Good';
      this.strengthWidth = '75%';
    } else {
      this.strengthClass = 'strength-strong';
      this.strengthLabel = 'Strong';
      this.strengthWidth = '100%';
    }
  }

  onSubmit(): void {
    if (!this.displayName || !this.username || !this.email || !this.password) {
      this.error.set('Please fill in all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error.set('Passwords do not match');
      return;
    }

    if (this.password.length < 6) {
      this.error.set('Password must be at least 6 characters');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.authService.signup({
      displayName: this.displayName,
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Signup failed. Please try again.');
      }
    });
  }
}
