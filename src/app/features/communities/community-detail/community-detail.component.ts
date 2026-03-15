import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Community, Post } from '../../../core/models';
import { CommunityService } from '../../../core/services/community.service';
import { PostService } from '../../../core/services/post.service';
import { PostCardComponent } from '../../../shared/components/post-card/post-card.component';

@Component({
  selector: 'app-community-detail',
  standalone: true,
  imports: [ CommonModule, RouterModule, MatIconModule, PostCardComponent ],
  templateUrl: './community-detail.component.html',
  styleUrl: './community-detail.component.scss'
})
export class CommunityDetailComponent implements OnInit {
  community = signal<Community | null>(null);
  posts = signal<Post[]>([]);
  loading = signal(true);
  activeTab: 'posts' | 'about' | 'members' = 'posts';

  tabs = [
    { id: 'posts',   label: 'Posts',   icon: 'article' },
    { id: 'about',   label: 'About',   icon: 'info_outline' },
    { id: 'members', label: 'Members', icon: 'people_outline' }
  ];

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
      this.communityService.leaveCommunity(c.id).subscribe(updated => this.community.set(updated));
    } else {
      this.communityService.joinCommunity(c.id).subscribe(updated => this.community.set(updated));
    }
  }

  onLike(postId: string): void {
    this.postService.likePost(postId).subscribe(updatedPost => {
      this.posts.update(posts => posts.map(p => p.id === postId ? updatedPost : p));
    });
  }
}

