import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Post, Comment, CreateCommentRequest } from '../../core/models';
import { PostService } from '../../core/services/post.service';
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

  post = signal<Post | null>(null);
  comments = signal<Comment[]>([]);
  loading = signal(true);
  newCommentContent = signal('');

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
    this.postService.getComments(postId).subscribe(comments => {
      this.comments.set(comments);
    });
  }

  onLike(): void {
    if (!this.post()) return;
    this.postService.likePost(this.post()!.id).subscribe(updatedPost => {
      this.post.set(updatedPost);
    });
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
    this.postService.addComment(request).subscribe(newComment => {
      this.comments.update(comments => [...comments, newComment]);
      this.newCommentContent.set('');
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
