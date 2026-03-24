import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserProfile, Post } from '../../core/models';
import { AuthService } from '../../core/services/auth.service';
import { PostService } from '../../core/services/post.service';
import { UserService } from '../../core/services/user.service';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    PostCardComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private postService = inject(PostService);
  private userService = inject(UserService);

  user = signal<UserProfile | null>(null);
  currentUser = signal<UserProfile | null>(null);
  userPosts = signal<Post[]>([]);
  loading = signal(true);
  activeTab = signal<'posts' | 'comments' | 'saved'>('posts');
  isOwnProfile = signal(false);
  isFollowing = signal(false);
  followLoading = signal(false);

  tabs = [
    { id: 'posts',    label: 'Posts',    icon: 'article' },
    { id: 'comments', label: 'Comments', icon: 'chat_bubble_outline' },
    { id: 'saved',    label: 'Saved',    icon: 'bookmark_border' }
  ];

  ngOnInit(): void {
    // Get current logged-in user
    const current = this.authService.currentUser();
    if (current) {
      // Cast to UserProfile (current user is always the one we're looking at unless route has ID)
      this.currentUser.set(current as unknown as UserProfile);
    }

    // Check if viewing specific user profile from route
    this.route.params.subscribe(params => {
      if (params['id']) {
        // Viewing another user's profile
        this.loadUserProfile(params['id']);
      } else {
        // Viewing own profile
        if (current) {
          this.user.set(current as unknown as UserProfile);
          this.isOwnProfile.set(true);
          this.loadUserPosts(current.id);
        }
        this.loading.set(false);
      }
    });
  }

  private loadUserProfile(userId: string): void {
    this.loading.set(true);
    this.userService.getUserProfile(userId).subscribe({
      next: (profile) => {
        if (profile) {
          this.user.set(profile);
          this.isFollowing.set(profile.isFollowing ?? false);
          const currentId = this.currentUser()?.id;
          this.isOwnProfile.set(currentId === userId);
          this.loadUserPosts(userId);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
        this.loading.set(false);
      }
    });
  }

  private loadUserPosts(userId: string): void {
    this.postService.getPostsByUser(userId).subscribe({
      next: (posts) => {
        this.userPosts.set(posts);
      },
      error: (error) => {
        console.error('Error loading user posts:', error);
        this.userPosts.set([]);
      }
    });
  }

  onFollow(): void {
    if (!this.user() || this.followLoading()) return;

    this.followLoading.set(true);
    
    if (this.isFollowing()) {
      this.userService.unfollowUser(this.user()!.id).subscribe({
        next: (updated) => {
          this.user.set(updated);
          this.isFollowing.set(false);
          this.followLoading.set(false);
        },
        error: (error) => {
          console.error('Error unfollowing user:', error);
          this.followLoading.set(false);
        }
      });
    } else {
      this.userService.followUser(this.user()!.id).subscribe({
        next: (updated) => {
          this.user.set(updated);
          this.isFollowing.set(true);
          this.followLoading.set(false);
        },
        error: (error) => {
          console.error('Error following user:', error);
          this.followLoading.set(false);
        }
      });
    }
  }

  onLike(postId: string): void {
    this.postService.likePost(postId).subscribe({
      next: (updatedPost) => {
        this.userPosts.update(posts => posts.map(p => p.id === postId ? updatedPost : p));
      },
      error: (error) => {
        console.error('Error liking post:', error);
      }
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }

  changeTab(tabId: string): void {
    this.activeTab.set(tabId as any);
  }
}


