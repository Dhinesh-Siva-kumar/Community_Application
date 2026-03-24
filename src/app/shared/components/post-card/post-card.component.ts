import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Post } from '../../../core/models';
import { AuthService } from '../../../core/services/auth.service';
import { TimeAgoPipe, TruncatePipe } from '../../pipes';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    TimeAgoPipe,
    TruncatePipe
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  post = input.required<Post>();
  liked = output<string>();
  commented = output<string>();
  edited = output<string>();
  deleted = output<string>();

  readonly isAuthor = computed(() => {
    const currentUser = this.authService.currentUser();
    return currentUser?.id === this.post().author.id;
  });

  constructor(private authService: AuthService) {}

  onLike(): void {
    this.liked.emit(this.post().id);
  }

  onComment(): void {
    this.commented.emit(this.post().id);
  }

  onEdit(): void {
    this.edited.emit(this.post().id);
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.deleted.emit(this.post().id);
    }
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }
}
