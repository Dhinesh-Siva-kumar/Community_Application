import { Component, OnInit, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Community } from '../../core/models';
import { CommunityService } from '../../core/services/community.service';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  /** Controlled by MainLayoutComponent — drives mobile open/close */
  isOpen = input<boolean>(false);

  /** Controls sidebar expanded/collapsed state on desktop */
  isExpanded = signal<boolean>(true);

  /** Emitted when the close button or a nav link is clicked on mobile */
  closeRequest = output<void>();

  /** Emitted when sidebar expand/collapse toggle is clicked */
  toggleExpanded = output<boolean>();

  joinedCommunities = signal<Community[]>([]);

  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
    this.communityService.getJoinedCommunities().subscribe({
      next: (communities) => {
        this.joinedCommunities.set(communities);
      },
      error: (error) => {
        console.error('Error loading joined communities:', error);
        this.joinedCommunities.set([]);
      }
    });
  }

  onNavClick(): void {
    this.closeRequest.emit();
  }

  onToggleExpanded(): void {
    const newState = !this.isExpanded();
    this.isExpanded.set(newState);
    this.toggleExpanded.emit(newState);
  }

  getMenuItems() {
    return [
      { label: 'Dashboard', icon: '📊', route: '/dashboard' },
      { label: 'Communities', icon: '🏘️', route: '/communities' },
      { label: 'Messages', icon: '💬', route: '/messaging' },
      { label: 'Profile', icon: '👤', route: '/profile' }
    ];
  }
}

