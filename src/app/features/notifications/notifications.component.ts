import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NotificationService } from '../../core/services/notification.service';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    TimeAgoPipe
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {
  constructor(public notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.fetchNotifications();
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'like': return 'favorite';
      case 'comment': return 'chat_bubble';
      case 'follow': return 'person_add';
      case 'mention': return 'alternate_email';
      case 'community_invite': return 'group_add';
      case 'post': return 'article';
      default: return 'notifications';
    }
  }

  getNotificationColor(type: string): string {
    switch (type) {
      case 'like': return '#e53935';
      case 'comment': return '#1e88e5';
      case 'follow': return '#6366f1';
      case 'mention': return '#f59e0b';
      case 'community_invite': return '#10b981';
      case 'post': return '#8b5cf6';
      default: return '#999';
    }
  }

  markAsRead(id: string): void {
    this.notificationService.markAsRead(id).subscribe();
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe();
  }
}
