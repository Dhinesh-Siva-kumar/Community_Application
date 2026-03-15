import { Component, OnInit, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Community } from '../../core/models';
import { CommunityService } from '../../core/services/community.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  /** Controlled by MainLayoutComponent — drives mobile open/close */
  isOpen = input<boolean>(false);

  /** Emitted when the close button or a nav link is clicked on mobile */
  closeRequest = output<void>();

  joinedCommunities = signal<Community[]>([]);

  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
    this.communityService.getJoinedCommunities().subscribe(communities => {
      this.joinedCommunities.set(communities);
    });
  }

  onNavClick(): void {
    this.closeRequest.emit();
  }
}
