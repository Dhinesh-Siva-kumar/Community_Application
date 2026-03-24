import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { User, UserProfile } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/users';

  // Mock user data for demo
  private mockUsers: Map<string, UserProfile> = new Map([
    ['1', {
      id: '1',
      username: 'john_doe',
      email: 'john@example.com',
      displayName: 'John Doe',
      avatar: '',
      bio: 'Software engineer passionate about web development',
      joinedDate: new Date('2024-01-15'),
      followers: 142,
      following: 87,
      communities: ['1', '2', '3'],
      isFollowing: false,
      isFollowedBy: true,
      isBlocked: false
    }],
    ['2', {
      id: '2',
      username: 'jane_smith',
      email: 'jane@example.com',
      displayName: 'Jane Smith',
      avatar: '',
      bio: 'Product designer | UI/UX enthusiast',
      joinedDate: new Date('2024-02-20'),
      followers: 256,
      following: 120,
      communities: ['2', '4', '5'],
      isFollowing: true,
      isFollowedBy: false,
      isBlocked: false
    }],
    ['3', {
      id: '3',
      username: 'alex_chen',
      email: 'alex@example.com',
      displayName: 'Alex Chen',
      avatar: '',
      bio: 'Full-stack developer & open source contributor',
      joinedDate: new Date('2024-03-10'),
      followers: 89,
      following: 45,
      communities: ['1', '3'],
      isFollowing: false,
      isFollowedBy: false,
      isBlocked: false
    }],
    ['4', {
      id: '4',
      username: 'sarah_wilson',
      email: 'sarah@example.com',
      displayName: 'Sarah Wilson',
      avatar: '',
      bio: 'Community builder & event organizer',
      joinedDate: new Date('2024-01-25'),
      followers: 198,
      following: 156,
      communities: ['2', '4'],
      isFollowing: true,
      isFollowedBy: true,
      isBlocked: false
    }],
    ['5', {
      id: '5',
      username: 'mike_johnson',
      email: 'mike@example.com',
      displayName: 'Mike Johnson',
      avatar: '',
      bio: 'DevOps engineer | Cloud infrastructure',
      joinedDate: new Date('2024-02-05'),
      followers: 76,
      following: 92,
      communities: ['1', '3', '4'],
      isFollowing: false,
      isFollowedBy: false,
      isBlocked: false
    }]
  ]);

  // Track current user's following state
  private userFollowing = signal<Set<string>>(new Set(['2', '4'])); // Demo: current user follows users 2 and 4

  /**
   * Get user profile by ID
   */
  getUserProfile(userId: string): Observable<UserProfile> {
    // return this.http.get<UserProfile>(`${this.API_URL}/${userId}`);
    const user = this.mockUsers.get(userId);
    if (user) {
      // Update isFollowing status based on current user's following list
      user.isFollowing = this.userFollowing().has(userId);
      return of({ ...user }).pipe(delay(300));
    }
    return of(null as any).pipe(delay(300));
  }

  /**
   * Get user by username
   */
  getUserByUsername(username: string): Observable<UserProfile | null> {
    for (const user of this.mockUsers.values()) {
      if (user.username === username) {
        user.isFollowing = this.userFollowing().has(user.id);
        return of({ ...user }).pipe(delay(300));
      }
    }
    return of(null).pipe(delay(300));
  }

  /**
   * Follow a user
   */
  followUser(userId: string): Observable<UserProfile> {
    // return this.http.post<UserProfile>(`${this.API_URL}/${userId}/follow`, {});
    const user = this.mockUsers.get(userId);
    if (user) {
      this.userFollowing.update(following => new Set([...following, userId]));
      user.followers += 1;
      user.isFollowing = true;
      return of({ ...user }).pipe(delay(300));
    }
    return of(null as any).pipe(delay(300));
  }

  /**
   * Unfollow a user
   */
  unfollowUser(userId: string): Observable<UserProfile> {
    // return this.http.delete<UserProfile>(`${this.API_URL}/${userId}/follow`);
    const user = this.mockUsers.get(userId);
    if (user) {
      const updated = new Set(this.userFollowing());
      updated.delete(userId);
      this.userFollowing.set(updated);
      user.followers = Math.max(0, user.followers - 1);
      user.isFollowing = false;
      return of({ ...user }).pipe(delay(300));
    }
    return of(null as any).pipe(delay(300));
  }

  /**
   * Get followers of a user
   */
  getFollowers(userId: string): Observable<UserProfile[]> {
    // return this.http.get<UserProfile[]>(`${this.API_URL}/${userId}/followers`);
    // Demo: return first 3 users as followers
    const followers: UserProfile[] = [];
    let count = 0;
    for (const [id, user] of this.mockUsers.entries()) {
      if (id !== userId && count < 3) {
        user.isFollowing = this.userFollowing().has(user.id);
        followers.push({ ...user });
        count++;
      }
    }
    return of(followers).pipe(delay(300));
  }

  /**
   * Get users that a user is following
   */
  getFollowing(userId: string): Observable<UserProfile[]> {
    // return this.http.get<UserProfile[]>(`${this.API_URL}/${userId}/following`);
    // Demo: return 2-3 users that the user follows
    const following: UserProfile[] = [];
    let count = 0;
    for (const [id, user] of this.mockUsers.entries()) {
      if (id !== userId && count < 3) {
        user.isFollowing = this.userFollowing().has(user.id);
        following.push({ ...user });
        count++;
      }
    }
    return of(following).pipe(delay(300));
  }

  /**
   * Search for users
   */
  searchUsers(query: string): Observable<UserProfile[]> {
    // return this.http.get<UserProfile[]>(`${this.API_URL}/search`, { params: { q: query } });
    const lowerQuery = query.toLowerCase();
    const results: UserProfile[] = [];
    for (const user of this.mockUsers.values()) {
      if (
        user.displayName.toLowerCase().includes(lowerQuery) ||
        user.username.toLowerCase().includes(lowerQuery) ||
        user.bio.toLowerCase().includes(lowerQuery)
      ) {
        user.isFollowing = this.userFollowing().has(user.id);
        results.push({ ...user });
      }
    }
    return of(results).pipe(delay(300));
  }

  /**
   * Get recommended users to follow
   */
  getRecommendedUsers(limit: number = 5): Observable<UserProfile[]> {
    const recommended: UserProfile[] = [];
    let count = 0;
    
    for (const user of this.mockUsers.values()) {
      if (!this.userFollowing().has(user.id) && count < limit) {
        user.isFollowing = false;
        recommended.push({ ...user });
        count++;
      }
    }
    return of(recommended).pipe(delay(300));
  }
}
