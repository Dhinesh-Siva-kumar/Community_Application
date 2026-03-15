import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { User, Post } from '../../core/models';
import { AuthService } from '../../core/services/auth.service';
import { PostService } from '../../core/services/post.service';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ CommonModule, RouterModule, MatIconModule, PostCardComponent ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user = signal<User | null>(null);
  userPosts = signal<Post[]>([]);
  loading = signal(true);
  activeTab: 'posts' | 'comments' | 'saved' = 'posts';

  tabs = [
    { id: 'posts',    label: 'Posts',    icon: 'article' },
    { id: 'comments', label: 'Comments', icon: 'chat_bubble_outline' },
    { id: 'saved',    label: 'Saved',    icon: 'bookmark_border' }
  ];

  constructor(private authService: AuthService, private postService: PostService) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.user.set(currentUser);
      this.postService.getPostsByUser(currentUser.id).subscribe(posts => {
        this.userPosts.set(posts);
        this.loading.set(false);
      });
    } else {
      this.loading.set(false);
    }
  }

  onLike(postId: string): void {
    this.postService.likePost(postId).subscribe(updatedPost => {
      this.userPosts.update(posts => posts.map(p => p.id === postId ? updatedPost : p));
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }
}

