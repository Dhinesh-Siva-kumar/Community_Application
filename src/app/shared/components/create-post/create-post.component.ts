import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreatePostRequest } from '../../../core/models';

@Component({
  selector: 'app-create-post-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  template: `
    <mat-card class="create-post-trigger" appearance="outlined" (click)="openDialog()">
      <mat-card-content>
        <div class="trigger-content">
          <div class="avatar-placeholder">DU</div>
          <div class="input-placeholder">What's on your mind? Share with the community...</div>
        </div>
        <div class="trigger-actions">
          <button mat-button><mat-icon>image</mat-icon> Image</button>
          <button mat-button><mat-icon>link</mat-icon> Link</button>
          <button mat-button><mat-icon>poll</mat-icon> Poll</button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './create-post.component.scss'
})
export class CreatePostCardComponent {
  postCreated = output<CreatePostRequest>();

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      panelClass: 'create-post-dialog'
    });

    dialogRef.afterClosed().subscribe((result: CreatePostRequest | undefined) => {
      if (result) {
        this.postCreated.emit(result);
      }
    });
  }
}

@Component({
  selector: 'app-create-post-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule
  ],
  template: `
    <h2 mat-dialog-title>Create a Post</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Community</mat-label>
        <mat-select [(ngModel)]="communityId">
          <mat-option value="1">Angular</mat-option>
          <mat-option value="2">Web Development</mat-option>
          <mat-option value="3">Design</mat-option>
          <mat-option value="4">Technology</mat-option>
          <mat-option value="5">Open Source</mat-option>
          <mat-option value="6">DevOps</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Title</mat-label>
        <input matInput [(ngModel)]="title" placeholder="Give your post a title" maxlength="200" />
        <mat-hint align="end">{{ title.length }} / 200</mat-hint>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Content</mat-label>
        <textarea matInput [(ngModel)]="content" placeholder="Share your thoughts..." rows="6" maxlength="5000"></textarea>
        <mat-hint align="end">{{ content.length }} / 5000</mat-hint>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Image URL (optional)</mat-label>
        <input matInput [(ngModel)]="imageUrl" placeholder="https://..." />
        <mat-icon matPrefix>image</mat-icon>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" (click)="submit()" [disabled]="!isValid()">
        Post
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width { width: 100%; margin-bottom: 8px; }
    mat-dialog-content { display: flex; flex-direction: column; min-width: 300px; }
  `]
})
export class CreatePostDialogComponent {
  title = '';
  content = '';
  communityId = '1';
  imageUrl = '';

  constructor(private dialogRef: MatDialogRef<CreatePostDialogComponent>) {}

  isValid(): boolean {
    return this.title.trim().length > 0 && this.content.trim().length > 0;
  }

  submit(): void {
    if (this.isValid()) {
      this.dialogRef.close({
        title: this.title.trim(),
        content: this.content.trim(),
        communityId: this.communityId,
        imageUrl: this.imageUrl.trim() || undefined
      } as CreatePostRequest);
    }
  }
}
