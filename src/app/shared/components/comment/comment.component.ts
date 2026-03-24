import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Comment } from '../../../core/models';
import { TimeAgoPipe } from '../../pipes';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    TimeAgoPipe
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  comment = input.required<Comment>();
  level = input<number>(0); // Nesting level for indentation
  liked = output<string>();
  replied = output<string>();

  onLike(): void {
    this.liked.emit(this.comment().id);
  }

  onReply(): void {
    this.replied.emit(this.comment().id);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }

  getIndentClass(): string {
    return `indent-level-${Math.min(this.level(), 2)}`; // Max 2 levels of visual indent
  }
}
