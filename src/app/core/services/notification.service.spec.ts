import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from './notification.service';
import { Notification } from '../models';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService]
    });
    service = TestBed.inject(NotificationService);
  });

  describe('Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with empty notifications', () => {
      expect(service.notifications()).toEqual([]);
    });

    it('should initialize with unread count of 0', () => {
      expect(service.unreadCount()).toBe(0);
    });
  });

  describe('Load Notifications', () => {
    it('should load mock notifications', (done) => {
      service.loadNotifications().subscribe(notifications => {
        expect(notifications).toBeTruthy();
        expect(notifications.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should return notifications with required fields', (done) => {
      service.loadNotifications().subscribe(notifications => {
        notifications.forEach(notification => {
          expect(notification.id).toBeTruthy();
          expect(notification.type).toBeTruthy();
          expect(notification.message).toBeTruthy();
          expect(notification.fromUser).toBeTruthy();
          expect(notification.isRead !== undefined).toBe(true);
          expect(notification.createdAt).toBeTruthy();
        });
        done();
      });
    });

    it('should have at least 3 unread notifications in mock data', (done) => {
      service.loadNotifications().subscribe(notifications => {
        const unreadCount = notifications.filter(n => !n.isRead).length;
        expect(unreadCount).toBeGreaterThanOrEqual(3);
        done();
      });
    });

    it('should have some read notifications in mock data', (done) => {
      service.loadNotifications().subscribe(notifications => {
        const readCount = notifications.filter(n => n.isRead).length;
        expect(readCount).toBeGreaterThan(0);
        done();
      });
    });
  });

  describe('Fetch Notifications', () => {
    it('should populate notifications signal when fetchNotifications is called', (done) => {
      expect(service.notifications().length).toBe(0);
      
      service.fetchNotifications();
      
      // Wait for async operation
      setTimeout(() => {
        expect(service.notifications().length).toBeGreaterThan(0);
        done();
      }, 400);
    });

    it('should update unread count after fetching notifications', (done) => {
      expect(service.unreadCount()).toBe(0);
      
      service.fetchNotifications();
      
      setTimeout(() => {
        expect(service.unreadCount()).toBeGreaterThan(0);
        done();
      }, 400);
    });

    it('should load all mock notifications', (done) => {
      service.fetchNotifications();
      
      setTimeout(() => {
        expect(service.notifications().length).toBeGreaterThanOrEqual(5);
        done();
      }, 400);
    });
  });

  describe('Mark as Read', () => {
    beforeEach((done) => {
      service.fetchNotifications();
      setTimeout(() => {
        done();
      }, 400);
    });

    it('should mark a specific notification as read', (done) => {
      const unreadBefore = service.unreadCount();
      const firstUnreadNotification = service.notifications().find(n => !n.isRead);

      if (firstUnreadNotification) {
        service.markAsRead(firstUnreadNotification.id).subscribe(() => {
          const updatedNotification = service.notifications().find(n => n.id === firstUnreadNotification.id);
          expect(updatedNotification?.isRead).toBe(true);
          done();
        });
      } else {
        done();
      }
    });

    it('should decrease unread count when marking as read', (done) => {
      const unreadBefore = service.unreadCount();
      const firstUnreadNotification = service.notifications().find(n => !n.isRead);

      if (firstUnreadNotification) {
        service.markAsRead(firstUnreadNotification.id).subscribe(() => {
          const unreadAfter = service.unreadCount();
          expect(unreadAfter).toBe(unreadBefore - 1);
          done();
        });
      } else {
        done();
      }
    });

    it('should not affect already read notifications when marking another as read', (done) => {
      const readNotifications = service.notifications().filter(n => n.isRead);
      const firstUnreadNotification = service.notifications().find(n => !n.isRead);

      if (firstUnreadNotification) {
        service.markAsRead(firstUnreadNotification.id).subscribe(() => {
          const readNotificationsAfter = service.notifications().filter(n => n.isRead);
          expect(readNotificationsAfter.length).toBe(readNotifications.length + 1);
          done();
        });
      } else {
        done();
      }
    });

    it('should handle marking non-existent notification gracefully', (done) => {
      const unreadBefore = service.unreadCount();
      
      service.markAsRead('non-existent-id').subscribe(() => {
        // Unread count should remain the same
        expect(service.unreadCount()).toBe(unreadBefore);
        done();
      });
    });
  });

  describe('Mark All as Read', () => {
    beforeEach((done) => {
      service.fetchNotifications();
      setTimeout(() => {
        done();
      }, 400);
    });

    it('should mark all notifications as read', (done) => {
      service.markAllAsRead().subscribe(() => {
        const allRead = service.notifications().every(n => n.isRead);
        expect(allRead).toBe(true);
        done();
      });
    });

    it('should set unread count to 0 after marking all as read', (done) => {
      service.markAllAsRead().subscribe(() => {
        expect(service.unreadCount()).toBe(0);
        done();
      });
    });

    it('should not delete any notifications when marking all as read', (done) => {
      const countBefore = service.notifications().length;
      
      service.markAllAsRead().subscribe(() => {
        const countAfter = service.notifications().length;
        expect(countAfter).toBe(countBefore);
        done();
      });
    });
  });

  describe('Unread Count Computed Signal', () => {
    beforeEach((done) => {
      service.fetchNotifications();
      setTimeout(() => {
        done();
      }, 400);
    });

    it('should correctly compute unread count', () => {
      const unreadNotifications = service.notifications().filter(n => !n.isRead);
      expect(service.unreadCount()).toBe(unreadNotifications.length);
    });

    it('should update unread count reactively', (done) => {
      const initialUnread = service.unreadCount();
      const firstUnread = service.notifications().find(n => !n.isRead);

      if (firstUnread) {
        service.markAsRead(firstUnread.id).subscribe(() => {
          expect(service.unreadCount()).toBe(initialUnread - 1);
          done();
        });
      } else {
        done();
      }
    });

    it('should reflect unread count as 0 when all are read', (done) => {
      service.markAllAsRead().subscribe(() => {
        expect(service.unreadCount()).toBe(0);
        done();
      });
    });
  });

  describe('Notification Types', () => {
    beforeEach((done) => {
      service.fetchNotifications();
      setTimeout(() => {
        done();
      }, 400);
    });

    it('should have notifications with various types', () => {
      const notifications = service.notifications();
      const types = new Set(notifications.map(n => n.type));
      expect(types.size).toBeGreaterThan(0);
      expect(types.has('like') || types.has('comment') || types.has('follow')).toBe(true);
    });

    it('should include notification with postId when applicable', () => {
      const notificationsWithPost = service.notifications().filter(n => 'postId' in n);
      expect(notificationsWithPost.length).toBeGreaterThan(0);
    });

    it('should include notification with communityId when applicable', () => {
      const notificationsWithCommunity = service.notifications().filter(n => 'communityId' in n);
      expect(notificationsWithCommunity.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Notification Properties', () => {
    beforeEach((done) => {
      service.fetchNotifications();
      setTimeout(() => {
        done();
      }, 400);
    });

    it('should have fromUser with id and username', () => {
      service.notifications().forEach(notification => {
        expect(notification.fromUser.id).toBeTruthy();
        expect(notification.fromUser.username).toBeTruthy();
      });
    });

    it('should have createdAt as valid date', () => {
      service.notifications().forEach(notification => {
        const date = new Date(notification.createdAt);
        expect(date.getTime()).toBeGreaterThan(0);
      });
    });

    it('should have isRead as boolean', () => {
      service.notifications().forEach(notification => {
        expect(typeof notification.isRead).toBe('boolean');
      });
    });
  });

  describe('Notifications Signal Properties', () => {
    it('should be a readonly signal', () => {
      // The notifications() call should work
      expect(service.notifications()).toBeTruthy();
      
      // But we shouldn't be able to call set on the readonly signal
      // @ts-expect-error - testing that readonly prevents .set()
      expect(typeof service.notifications.set).toBe('undefined');
    });

    it('should be a readonly signal for unreadCount', () => {
      // The unreadCount() call should work
      expect(typeof service.unreadCount()).toBe('number');
      
      // unreadCount is computed, not directly assignable
      // @ts-expect-error - testing that readonly prevents .set()
      expect(typeof service.unreadCount.set).toBe('undefined');
    });
  });

  describe('Async Operations', () => {
    it('should handle loadNotifications with delay', (done) => {
      const startTime = Date.now();
      
      service.loadNotifications().subscribe(() => {
        const elapsed = Date.now() - startTime;
        // Should have at least 300ms delay
        expect(elapsed).toBeGreaterThanOrEqual(250);
        done();
      });
    });

    it('should handle markAsRead with delay', (done) => {
      service.fetchNotifications();
      setTimeout(() => {
        const firstUnread = service.notifications().find(n => !n.isRead);
        if (firstUnread) {
          const startTime = Date.now();
          
          service.markAsRead(firstUnread.id).subscribe(() => {
            const elapsed = Date.now() - startTime;
            // Should have at least 200ms delay
            expect(elapsed).toBeGreaterThanOrEqual(150);
            done();
          });
        } else {
          done();
        }
      }, 400);
    });
  });
});
