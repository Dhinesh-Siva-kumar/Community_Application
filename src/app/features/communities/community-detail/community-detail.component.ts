import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Community, Post } from '../../../core/models';
import { CommunityService } from '../../../core/services/community.service';
import { PostService } from '../../../core/services/post.service';
import { PostCardComponent } from '../../../shared/components/post-card/post-card.component';

@Component({
  selector: 'app-community-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    PostCardComponent
  ],
  templateUrl: './community-detail.component.html',
  styleUrl: './community-detail.component.scss'
})
export class CommunityDetailComponent implements OnInit {
  community = signal<Community | null>(null);
  posts = signal<Post[]>([]);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private communityService: CommunityService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.communityService.getCommunityById(id).subscribe(community => {
        this.community.set(community);
        this.loading.set(false);
      });

      this.postService.getPostsByCommunity(id).subscribe(posts => {
        this.posts.set(posts);
      });
    }
  }

  toggleJoin(): void {
    const c = this.community();
    if (!c) return;

    if (c.isJoined) {
      this.communityService.leaveCommunity(c.id).subscribe(updated => {
        this.community.set(updated);
      });
    } else {
      this.communityService.joinCommunity(c.id).subscribe(updated => {
        this.community.set(updated);
      });
    }
  }

  onLike(postId: string): void {
    this.postService.likePost(postId).subscribe(updatedPost => {
      this.posts.update(posts =>
        posts.map(p => p.id === postId ? updatedPost : p)
      );
    });
  }
}
