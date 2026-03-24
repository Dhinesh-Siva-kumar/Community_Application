import { Component, OnInit, OnDestroy, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PostService } from '../../core/services/post.service';
import { UserService } from '../../core/services/user.service';
import { CommunityService } from '../../core/services/community.service';
import { Post, UserProfile, Community } from '../../core/models';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PostCardComponent,
    EmptyStateComponent,
    ButtonComponent,
    AvatarComponent
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  query = signal('');
  selectedTab = signal<'all' | 'posts' | 'users' | 'communities'>('all');
  isLoading = signal(false);
  
  posts = signal<Post[]>([]);
  users = signal<UserProfile[]>([]);
  communities = signal<Community[]>([]);
  
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  readonly filteredPosts = computed(() => {
    const tab = this.selectedTab();
    if (tab === 'all' || tab === 'posts') {
      return this.posts();
    }
    return [];
  });

  readonly filteredUsers = computed(() => {
    const tab = this.selectedTab();
    if (tab === 'all' || tab === 'users') {
      return this.users();
    }
    return [];
  });

  readonly filteredCommunities = computed(() => {
    const tab = this.selectedTab();
    if (tab === 'all' || tab === 'communities') {
      return this.communities();
    }
    return [];
  });

  readonly hasResults = computed(() => {
    return this.posts().length > 0 || this.users().length > 0 || this.communities().length > 0;
  });

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    public userService: UserService,
    private communityService: CommunityService
  ) {}

  ngOnInit(): void {
    // Get initial query from route params
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const q = params['q'] || '';
        this.query.set(q);
        if (q) {
          this.performSearch(q);
        }
      });

    // Setup search with debouncing
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(q => {
        if (q.trim()) {
          this.performSearch(q);
        } else {
          this.clearResults();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchChange(event: any): void {
    const query = event.target?.value || '';
    this.query.set(query);
    this.searchSubject.next(query);
  }

  private performSearch(query: string): void {
    this.isLoading.set(true);
    const lowerQuery = query.toLowerCase();

    // Search posts by title and content
    this.postService.getFeed().subscribe(allPosts => {
      const matchedPosts = allPosts.filter(p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.content.toLowerCase().includes(lowerQuery)
      );
      this.posts.set(matchedPosts);
    });

    // Search users by username and display name
    this.userService.searchUsers(query).subscribe(matchedUsers => {
      this.users.set(matchedUsers);
    });

    // Search communities by name
    this.communityService.searchCommunities(query).subscribe(matchedCommunities => {
      this.communities.set(matchedCommunities);
      this.isLoading.set(false);
    });
  }

  private clearResults(): void {
    this.posts.set([]);
    this.users.set([]);
    this.communities.set([]);
  }

  selectTab(tab: 'all' | 'posts' | 'users' | 'communities'): void {
    this.selectedTab.set(tab);
  }

  getResultsCount(): number {
    return this.posts().length + this.users().length + this.communities().length;
  }

  onFollowUser(user: UserProfile): void {
    this.userService.followUser(user.id).subscribe(updatedUser => {
      this.users.update(users => users.map(u => u.id === user.id ? updatedUser : u));
    });
  }

  onUnfollowUser(user: UserProfile): void {
    this.userService.unfollowUser(user.id).subscribe(updatedUser => {
      this.users.update(users => users.map(u => u.id === user.id ? updatedUser : u));
    });
  }
}
