import { Component, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { CreatePostDialogComponent } from '../../shared/components/create-post/create-post.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  searchQuery = '';
  searchFocused = false;

  menuToggle = output<void>();

  readonly userInitials = computed(() => {
    const name = this.authService.currentUser()?.displayName ?? '';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return (parts[0]?.[0] ?? 'U').toUpperCase();
  });

  constructor(
    public authService: AuthService,
    public notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  onSearch(): void {
    console.log('Searching for:', this.searchQuery);
  }

  openCreatePost(): void {
    this.dialog.open(CreatePostDialogComponent, {
      width: '620px',
      maxWidth: '95vw',
      panelClass: 'create-post-dialog-panel'
    });
  }

  logout(): void {
    this.authService.logout();
  }
}

