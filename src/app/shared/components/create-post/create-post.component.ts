import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreatePostRequest } from '../../../core/models';

// ──────────────────────────────────────────────
// Trigger card (shown on dashboard)
// ──────────────────────────────────────────────
@Component({
  selector: 'app-create-post-card',
  standalone: true,
  imports: [ CommonModule, MatIconModule, MatDialogModule ],
  template: `
    <div class="cp-trigger" (click)="openDialog()">
      <div class="cp-trigger-top">
        <div class="cp-avatar">DU</div>
        <div class="cp-placeholder">What's on your mind? Share with the community…</div>
      </div>
      <div class="cp-trigger-actions">
        <button class="cp-action-btn" (click)="$event.stopPropagation(); openDialog()">
          <mat-icon>image</mat-icon> Image
        </button>
        <button class="cp-action-btn" (click)="$event.stopPropagation(); openDialog()">
          <mat-icon>link</mat-icon> Link
        </button>
        <button class="cp-action-btn" (click)="$event.stopPropagation(); openDialog()">
          <mat-icon>poll</mat-icon> Poll
        </button>
      </div>
    </div>
  `,
  styleUrl: './create-post.component.scss'
})
export class CreatePostCardComponent {
  postCreated = output<CreatePostRequest>();

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePostDialogComponent, {
      width: '620px',
      maxWidth: '95vw',
      panelClass: 'create-post-dialog-panel'
    });

    dialogRef.afterClosed().subscribe((result: CreatePostRequest | undefined) => {
      if (result) this.postCreated.emit(result);
    });
  }
}

// ──────────────────────────────────────────────
// Dialog component
// ──────────────────────────────────────────────
@Component({
  selector: 'app-create-post-dialog',
  standalone: true,
  imports: [ CommonModule, FormsModule, MatIconModule, MatDialogModule ],
  template: `
    <!-- Header -->
    <div class="cpd-header">
      <div class="cpd-header-left">
        <div class="cpd-header-icon"><mat-icon>edit_note</mat-icon></div>
        <div>
          <h2>Create a Post</h2>
          <p>Share something with the community</p>
        </div>
      </div>
      <button class="cpd-close" mat-dialog-close><mat-icon>close</mat-icon></button>
    </div>

    <!-- Post type tabs -->
    <div class="cpd-type-tabs">
      @for (type of postTypes; track type.id) {
        <button class="cpd-type-btn" [class.active]="activeType === type.id" (click)="activeType = type.id">
          <mat-icon>{{ type.icon }}</mat-icon>
          {{ type.label }}
        </button>
      }
    </div>

    <!-- Body -->
    <div class="cpd-body">

      <!-- Community -->
      <div class="cpd-field">
        <label class="cpd-label">Post to</label>
        <div class="cpd-select-wrap">
          <mat-icon class="cpd-select-icon">group</mat-icon>
          <select class="cpd-select" [(ngModel)]="communityId">
            <option value="1">🅰 Angular</option>
            <option value="2">🌐 Web Development</option>
            <option value="3">🎨 Design</option>
            <option value="4">💻 Technology</option>
            <option value="5">📦 Open Source</option>
            <option value="6">⚙️ DevOps</option>
          </select>
          <mat-icon class="cpd-select-caret">expand_more</mat-icon>
        </div>
      </div>

      <!-- Title -->
      <div class="cpd-field">
        <label class="cpd-label">Title <span class="required">*</span></label>
        <div class="cpd-input-wrap" [class.has-value]="title.length > 0">
          <input
            class="cpd-input"
            type="text"
            [(ngModel)]="title"
            placeholder="Give your post a compelling title…"
            maxlength="200"
          />
          <span class="cpd-count">{{ title.length }}/200</span>
        </div>
      </div>

      <!-- Content -->
      @if (activeType === 'text' || activeType === 'poll') {
        <div class="cpd-field">
          <label class="cpd-label">Content <span class="required">*</span></label>
          <div class="cpd-textarea-wrap" [class.has-value]="content.length > 0">
            <textarea
              class="cpd-textarea"
              [(ngModel)]="content"
              placeholder="Share your thoughts, ideas, or questions…"
              rows="6"
              maxlength="5000"
            ></textarea>
            <span class="cpd-count bottom">{{ content.length }}/5000</span>
          </div>
        </div>
      }

      <!-- Image URL -->
      @if (activeType === 'image') {
        <div class="cpd-field">
          <label class="cpd-label">Image URL <span class="required">*</span></label>
          <div class="cpd-input-wrap" [class.has-value]="imageUrl.length > 0">
            <mat-icon class="cpd-prefix-icon">image</mat-icon>
            <input
              class="cpd-input has-prefix"
              type="url"
              [(ngModel)]="imageUrl"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          @if (imageUrl) {
            <div class="cpd-preview">
              <img [src]="imageUrl" alt="Preview" (error)="imageUrl = ''" />
            </div>
          }
        </div>
        <div class="cpd-field">
          <label class="cpd-label">Caption</label>
          <div class="cpd-textarea-wrap" [class.has-value]="content.length > 0">
            <textarea class="cpd-textarea" [(ngModel)]="content" placeholder="Add a caption…" rows="3" maxlength="500"></textarea>
          </div>
        </div>
      }

      <!-- Link -->
      @if (activeType === 'link') {
        <div class="cpd-field">
          <label class="cpd-label">Link URL <span class="required">*</span></label>
          <div class="cpd-input-wrap" [class.has-value]="imageUrl.length > 0">
            <mat-icon class="cpd-prefix-icon">link</mat-icon>
            <input
              class="cpd-input has-prefix"
              type="url"
              [(ngModel)]="imageUrl"
              placeholder="https://…"
            />
          </div>
        </div>
        <div class="cpd-field">
          <label class="cpd-label">Description</label>
          <div class="cpd-textarea-wrap" [class.has-value]="content.length > 0">
            <textarea class="cpd-textarea" [(ngModel)]="content" placeholder="Describe the link…" rows="3" maxlength="500"></textarea>
          </div>
        </div>
      }

    </div>

    <!-- Footer -->
    <div class="cpd-footer">
      <button class="cpd-btn-cancel" mat-dialog-close>Cancel</button>
      <button class="cpd-btn-post" [class.disabled]="!isValid()" (click)="submit()">
        <mat-icon>send</mat-icon>
        Post
      </button>
    </div>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; }

    /* Header */
    .cpd-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 20px 24px 16px;
      border-bottom: 1px solid #e5e7eb;
    }
    .cpd-header-left { display: flex; align-items: center; gap: 14px; }
    .cpd-header-icon {
      width: 44px; height: 44px; border-radius: 14px;
      background: linear-gradient(135deg, #5865f2 0%, #eb459e 100%);
      display: flex; align-items: center; justify-content: center;
      mat-icon { color: #fff; font-size: 22px; width: 22px; height: 22px; }
    }
    .cpd-header h2 { font-size: 17px; font-weight: 800; color: #0f0f1a; margin: 0 0 2px; }
    .cpd-header p  { font-size: 12.5px; color: #9ca3af; margin: 0; }
    .cpd-close {
      width: 36px; height: 36px; border-radius: 10px;
      border: 1.5px solid #e5e7eb; background: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s;
      mat-icon { font-size: 18px; width: 18px; height: 18px; color: #6b7280; }
      &:hover { background: #f9fafb; }
    }

    /* Type tabs */
    .cpd-type-tabs {
      display: flex; gap: 4px; padding: 12px 24px;
      border-bottom: 1px solid #e5e7eb;
      overflow-x: auto;
    }
    .cpd-type-btn {
      display: flex; align-items: center; gap: 6px;
      padding: 7px 14px; border-radius: 10px;
      border: 1.5px solid #e5e7eb; background: none;
      font-size: 13px; font-weight: 600; color: #6b7280;
      cursor: pointer; transition: all 0.15s; white-space: nowrap;
      mat-icon { font-size: 16px; width: 16px; height: 16px; }
      &:hover { border-color: #5865f2; color: #5865f2; }
      &.active { background: #ede9fe; border-color: #5865f2; color: #5865f2; }
    }

    /* Body */
    .cpd-body { padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; overflow-y: auto; max-height: 52vh; }

    /* Field */
    .cpd-label { display: block; font-size: 12.5px; font-weight: 700; color: #374151; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.04em; }
    .required { color: #ef4444; }

    /* Select */
    .cpd-select-wrap {
      position: relative;
      .cpd-select-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 18px; width: 18px; height: 18px; color: #9ca3af; pointer-events: none; }
      .cpd-select-caret { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); font-size: 18px; width: 18px; height: 18px; color: #9ca3af; pointer-events: none; }
    }
    .cpd-select {
      width: 100%; padding: 11px 36px 11px 38px;
      border: 1.5px solid #e5e7eb; border-radius: 10px;
      font-size: 14px; color: #374151; background: #fff;
      appearance: none; outline: none; cursor: pointer; box-sizing: border-box;
      transition: border-color 0.15s, box-shadow 0.15s;
      &:focus { border-color: #5865f2; box-shadow: 0 0 0 3px rgba(88,101,242,0.12); }
    }

    /* Input */
    .cpd-input-wrap {
      position: relative;
      .cpd-prefix-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 18px; width: 18px; height: 18px; color: #9ca3af; pointer-events: none; }
    }
    .cpd-input {
      width: 100%; padding: 11px 52px 11px 14px;
      border: 1.5px solid #e5e7eb; border-radius: 10px;
      font-size: 14px; color: #374151; outline: none; box-sizing: border-box;
      transition: border-color 0.15s, box-shadow 0.15s;
      &::placeholder { color: #d1d5db; }
      &:focus { border-color: #5865f2; box-shadow: 0 0 0 3px rgba(88,101,242,0.12); }
      &.has-prefix { padding-left: 40px; }
    }
    .cpd-input-wrap.has-value .cpd-input { border-color: #a5b4fc; }

    /* Textarea */
    .cpd-textarea-wrap { position: relative; }
    .cpd-textarea {
      width: 100%; padding: 12px 14px;
      border: 1.5px solid #e5e7eb; border-radius: 10px;
      font-size: 14px; color: #374151; resize: vertical; outline: none;
      line-height: 1.6; box-sizing: border-box; font-family: inherit;
      transition: border-color 0.15s, box-shadow 0.15s;
      &::placeholder { color: #d1d5db; }
      &:focus { border-color: #5865f2; box-shadow: 0 0 0 3px rgba(88,101,242,0.12); }
    }
    .cpd-textarea-wrap.has-value .cpd-textarea { border-color: #a5b4fc; }

    /* Char count */
    .cpd-count {
      position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
      font-size: 11px; color: #9ca3af; pointer-events: none;
      &.bottom { top: auto; bottom: 10px; transform: none; }
    }

    /* Image preview */
    .cpd-preview {
      margin-top: 8px; border-radius: 10px; overflow: hidden; border: 1.5px solid #e5e7eb;
      img { display: block; width: 100%; max-height: 200px; object-fit: cover; }
    }

    /* Footer */
    .cpd-footer {
      display: flex; align-items: center; justify-content: flex-end; gap: 10px;
      padding: 16px 24px; border-top: 1px solid #e5e7eb;
    }
    .cpd-btn-cancel {
      padding: 10px 20px; border-radius: 10px;
      border: 1.5px solid #e5e7eb; background: none;
      font-size: 14px; font-weight: 600; color: #6b7280; cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
      &:hover { background: #f9fafb; border-color: #d1d5db; }
    }
    .cpd-btn-post {
      display: flex; align-items: center; gap: 7px;
      padding: 10px 22px; border-radius: 10px; border: none;
      background: linear-gradient(135deg, #5865f2 0%, #eb459e 100%);
      color: #fff; font-size: 14px; font-weight: 700; cursor: pointer;
      transition: opacity 0.2s, transform 0.15s;
      mat-icon { font-size: 17px; width: 17px; height: 17px; }
      &:hover { opacity: 0.9; transform: translateY(-1px); }
      &.disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
    }
  `]
})
export class CreatePostDialogComponent {
  title = '';
  content = '';
  communityId = '1';
  imageUrl = '';
  activeType = 'text';

  postTypes = [
    { id: 'text',  label: 'Text',  icon: 'notes' },
    { id: 'image', label: 'Image', icon: 'image' },
    { id: 'link',  label: 'Link',  icon: 'link' },
    { id: 'poll',  label: 'Poll',  icon: 'poll' }
  ];

  constructor(private dialogRef: MatDialogRef<CreatePostDialogComponent>) {}

  isValid(): boolean {
    if (!this.title.trim()) return false;
    if (this.activeType === 'image') return !!this.imageUrl.trim();
    if (this.activeType === 'link') return !!this.imageUrl.trim();
    return this.content.trim().length > 0;
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

