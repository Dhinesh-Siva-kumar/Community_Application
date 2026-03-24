import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../core/services/notification.service';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [ CommonModule, RouterModule, MatIconModule, TimeAgoPipe ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {
  activeFilter: 'all' | 'unread' = 'all';

  filteredNotifications = computed(() => {
    const all = this.notificationService.notifications();
    return this.activeFilter === 'unread' ? all.filter(n => !n.isRead) : all;
  });

  constructor(public notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.fetchNotifications();
  }

  getNotificationIcon(type: string): string {
    const icons: Record<string, string> = {
      like: 'favorite', comment: 'chat_bubble', follow: 'person_add',
      mention: 'alternate_email', community_invite: 'group_add', post: 'article'
    };
    return icons[type] ?? 'notifications';
  }

  getNotificationColor(type: string): string {
    const colors: Record<string, string> = {
      like: '#ef4444', comment: '#3b82f6', follow: '#5865f2',
      mention: '#f59e0b', community_invite: '#10b981', post: '#8b5cf6'
    };
    return colors[type] ?? '#9ca3af';
  }

  markAsRead(id: string): void {
    this.notificationService.markAsRead(id).subscribe({
      error: (error) => {
        console.error('Error marking notification as read:', error);
      }
    });
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe({
      error: (error) => {
        console.error('Error marking all notifications as read:', error);
      }
    });
  }
}
