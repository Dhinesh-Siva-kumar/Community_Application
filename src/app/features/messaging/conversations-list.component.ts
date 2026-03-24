import { Component, OnInit, inject, signal, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MessagingService } from '../../core/services/messaging.service';
import { AuthService } from '../../core/services/auth.service';
import { Conversation } from '../../core/models';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-conversations-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    AvatarComponent
  ],
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.scss']
})
export class ConversationsListComponent implements OnInit {
  private messagingService = inject(MessagingService);
  private authService = inject(AuthService);
  private router = inject(Router);

  conversations = signal<Conversation[]>([]);
  isLoading = signal(false);
  searchTerm = signal('');
  filteredConversations = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.conversations();
    return this.conversations().filter(conv =>
      conv.participantNames.some(name => name.toLowerCase().includes(term))
    );
  });

  conversationSelected = output<Conversation>();

  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.loadConversations();
    this.setupSearch();
  }

  private loadConversations(): void {
    this.isLoading.set(true);
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.messagingService.getConversations(currentUser.id).subscribe({
        next: (convs) => {
          this.conversations.set(convs);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        }
      });
    }
  }

  private setupSearch(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm.set(term);
    });
  }

  onSearch(term: string): void {
    this.searchSubject.next(term);
  }

  selectConversation(conversation: Conversation): void {
    this.conversationSelected.emit(conversation);
    this.router.navigate(['/messaging', conversation.id]);
  }

  getTotalUnread(): number {
    return this.conversations().reduce((sum, conv) => sum + conv.unreadCount, 0);
  }

  getOtherParticipant(conversation: Conversation): string {
    // Filter out 'You' to get the other participant
    return conversation.participantNames.find(name => name !== 'You') || 'Unknown';
  }

  formatTime(date: Date | undefined): string {
    if (!date) return '';
    const now = new Date();
    const time = new Date(date);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return time.toLocaleDateString();
  }

  refreshConversations(): void {
    this.loadConversations();
  }
}
