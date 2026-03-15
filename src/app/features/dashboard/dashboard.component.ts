import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Post, Community } from '../../core/models';
import { PostService } from '../../core/services/post.service';
import { CommunityService } from '../../core/services/community.service';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';
import { CreatePostCardComponent } from '../../shared/components/create-post/create-post.component';
import { CreatePostRequest } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    PostCardComponent,
    CreatePostCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  posts = signal<Post[]>([]);
  trendingCommunities = signal<Community[]>([]);
  loading = signal(true);
  selectedFilter = signal('latest');

  filters = ['latest', 'popular', 'following'];
  filterIcons: Record<string, string> = {
    latest: 'schedule',
    popular: 'local_fire_department',
    following: 'people'
  };
  topics = ['Angular', 'TypeScript', 'React', 'Node.js', 'Python', 'AI/ML', 'DevOps', 'CSS', 'UI/UX', 'Open Source'];

  constructor(
    private postService: PostService,
    private communityService: CommunityService
  ) {}

  ngOnInit(): void {
    this.loadFeed();
    this.loadTrending();
  }

  loadFeed(): void {
    this.loading.set(true);
    this.postService.getFeed().subscribe(posts => {
      this.posts.set(posts);
      this.loading.set(false);
    });
  }

  loadTrending(): void {
    this.communityService.getCommunities().subscribe(communities => {
      this.trendingCommunities.set(communities.slice(0, 4));
    });
  }

  onFilterChange(filter: string): void {
    this.selectedFilter.set(filter);
    this.loadFeed();
  }

  onLike(postId: string): void {
    this.postService.likePost(postId).subscribe(updatedPost => {
      this.posts.update(posts => posts.map(p => p.id === postId ? updatedPost : p));
    });
  }

  onComment(postId: string): void {
    console.log('Comment on post:', postId);
  }

  onPostCreated(request: CreatePostRequest): void {
    this.postService.createPost(request).subscribe(newPost => {
      this.posts.update(posts => [newPost, ...posts]);
    });
  }
}

