import { Component, computed, output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { CreatePostDialogComponent } from '../../shared/components/create-post/create-post.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { LocationBadgeComponent } from '../../shared/components/location-badge/location-badge.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ButtonComponent,
    AvatarComponent,
    InputComponent,
    LocationBadgeComponent,
    CreatePostDialogComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() currentLocation?: { postcode: string; area: string; distance?: number };
  @Input() showSearch: boolean = true;
  @Input() showLocationBadge: boolean = true;
  @Input() customClass: string = '';

  searchQuery = '';
  searchFocused = false;
  showMobileMenu = false;

  menuToggle = output<void>();
  searchSubmit = output<string>();
  locationClick = output<void>();

  readonly userInitials = computed(() => {
    const name = this.authService.currentUser()?.displayName ?? '';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return (parts[0]?.[0] ?? 'U').toUpperCase();
  });

  readonly userName = computed(() => {
    return this.authService.currentUser()?.displayName ?? 'User';
  });

  constructor(
    public authService: AuthService,
    public notificationService: NotificationService
  ) {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.searchSubmit.emit(this.searchQuery);
    }
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
    this.menuToggle.emit();
  }

  onLocationClick(): void {
    this.locationClick.emit();
  }

  logout(): void {
    this.authService.logout();
  }
}


