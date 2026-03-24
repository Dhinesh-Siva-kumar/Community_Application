import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Notification } from '../models';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly API_URL = '/api/notifications';

  private notificationsSignal = signal<Notification[]>([]);
  readonly notifications = this.notificationsSignal.asReadonly();
  readonly unreadCount = computed(() => this.notificationsSignal().filter(n => !n.isRead).length);

  constructor(private http: HttpClient) {}

  private mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'like',
      message: 'liked your post "Getting Started with Angular 19 Signals"',
      fromUser: { id: '2', username: 'tech_fan', avatar: '' },
      postId: '1',
      isRead: false,
      createdAt: new Date('2026-03-14T15:30:00')
    },
    {
      id: '2',
      type: 'comment',
      message: 'commented on your post "Best Practices for REST API Design"',
      fromUser: { id: '3', username: 'learner_42', avatar: '' },
      postId: '2',
      isRead: false,
      createdAt: new Date('2026-03-14T14:00:00')
    },
    {
      id: '3',
      type: 'follow',
      message: 'started following you',
      fromUser: { id: '4', username: 'curious_dev', avatar: '' },
      isRead: false,
      createdAt: new Date('2026-03-14T12:30:00')
    },
    {
      id: '4',
      type: 'community_invite',
      message: 'invited you to join "Open Source" community',
      fromUser: { id: '5', username: 'oss_champion', avatar: '' },
      communityId: '5',
      isRead: true,
      createdAt: new Date('2026-03-13T18:00:00')
    },
    {
      id: '5',
      type: 'mention',
      message: 'mentioned you in a comment',
      fromUser: { id: '6', username: 'angular_dev', avatar: '' },
      postId: '3',
      isRead: true,
      createdAt: new Date('2026-03-13T10:15:00')
    }
  ];

  loadNotifications(): Observable<Notification[]> {
    // return this.http.get<Notification[]>(this.API_URL);
    return of(this.mockNotifications).pipe(delay(300));
  }

  fetchNotifications(): void {
    this.loadNotifications().subscribe({
      next: (notifications) => {
        this.notificationsSignal.set(notifications);
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
        this.notificationsSignal.set([]);
      }
    });
  }

  markAsRead(notificationId: string): Observable<void> {
    const notification = this.mockNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
    }
    this.notificationsSignal.update(list =>
      list.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
    return of(void 0).pipe(delay(200));
  }

  markAllAsRead(): Observable<void> {
    this.mockNotifications.forEach(n => n.isRead = true);
    this.notificationsSignal.update(list =>
      list.map(n => ({ ...n, isRead: true }))
    );
    return of(void 0).pipe(delay(200));
  }
}
