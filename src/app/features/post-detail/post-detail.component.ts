import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Post, Comment, CreateCommentRequest } from '../../core/models';
import { PostService } from '../../core/services/post.service';
import { AuthService } from '../../core/services/auth.service';
import { CommentComponent } from '../../shared/components/comment/comment.component';
import { TimeAgoPipe } from '../../shared/pipes';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    CommentComponent,
    TimeAgoPipe
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private authService = inject(AuthService);
  private router = inject(Router);

  post = signal<Post | null>(null);
  comments = signal<Comment[]>([]);
  loading = signal(true);
  newCommentContent = signal('');

  readonly isAuthor = computed(() => {
    const currentUser = this.authService.currentUser();
    const postData = this.post();
    return currentUser && postData && currentUser.id === postData.author.id;
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const postId = params['id'];
      if (postId) {
        this.loadPost(postId);
        this.loadComments(postId);
      }
    });
  }

  loadPost(postId: string): void {
    this.loading.set(true);
    // In a real app, we'd have a getPostById method
    // For now, we'll find it from the service
    this.postService.getFeed().subscribe({
      next: (posts) => {
        const foundPost = posts.find(p => p.id === postId);
        if (foundPost) {
          this.post.set(foundPost);
        }
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  loadComments(postId: string): void {
    this.postService.getComments(postId).subscribe({
      next: (comments) => {
        this.comments.set(comments);
      },
      error: (error) => {
        console.error('Error loading comments:', error);
        this.comments.set([]);
      }
    });
  }

  onLike(): void {
    if (!this.post()) return;
    this.postService.likePost(this.post()!.id).subscribe({
      next: (updatedPost) => {
        this.post.set(updatedPost);
      },
      error: (error) => {
        console.error('Error liking post:', error);
      }
    });
  }

  onEdit(): void {
    if (this.post()) {
      this.router.navigate(['/post', this.post()!.id, 'edit']);
    }
  }

  onDelete(): void {
    if (!this.post()) return;
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(this.post()!.id).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error deleting post:', error);
        }
      });
    }
  }

  onCommentLike(commentId: string): void {
    // TODO: Implement comment like in service
    console.log('Like comment:', commentId);
  }

  onCommentReply(commentId: string): void {
    // TODO: Implement reply functionality
    console.log('Reply to comment:', commentId);
  }

  addComment(): void {
    if (!this.post() || !this.newCommentContent().trim()) return;

    const request: CreateCommentRequest = {
      content: this.newCommentContent(),
      postId: this.post()!.id
    };
    this.postService.addComment(request).subscribe({
      next: (newComment) => {
        this.comments.update(comments => [...comments, newComment]);
        this.newCommentContent.set('');
      },
      error: (error) => {
        console.error('Error adding comment:', error);
      }
    });
  }

  updateCommentContent(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.newCommentContent.set(target.value);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }
}
