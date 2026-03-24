import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MessagingService } from '../../core/services/messaging.service';
import { AuthService } from '../../core/services/auth.service';
import { Message, Conversation, CreateMessageRequest } from '../../core/models';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';

@Component({
  selector: 'app-message-thread',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDividerModule,
    AvatarComponent
  ],
  templateUrl: './message-thread.component.html',
  styleUrls: ['./message-thread.component.scss']
})
export class MessageThreadComponent implements OnInit {
  private messagingService = inject(MessagingService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  conversation = signal<Conversation | null>(null);
  messages = signal<Message[]>([]);
  isLoading = signal(false);
  isSending = signal(false);
  newMessage = signal('');
  currentUserId = signal('');
  selectedMessage: Message | null = null;

  otherParticipantName = computed(() => {
    const conv = this.conversation();
    if (!conv) return 'Unknown';
    return conv.participantNames.find(name => name !== 'You') || 'Unknown';
  });

  isCurrentUserMessage = (message: Message): boolean => {
    return message.senderId === this.currentUserId();
  };

  ngOnInit(): void {
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.currentUserId.set(currentUser.id);
    }

    this.route.paramMap.subscribe(params => {
      const conversationId = params.get('id');
      if (conversationId) {
        this.loadConversation(conversationId);
        this.loadMessages(conversationId);
        // Mark conversation as read
        this.messagingService.markConversationAsRead(conversationId).subscribe();
      }
    });
  }

  private loadConversation(conversationId: string): void {
    this.messagingService.getConversation(conversationId).subscribe({
      next: (conv) => {
        this.conversation.set(conv);
      },
      error: () => {
        // Handle error silently
      }
    });
  }

  private loadMessages(conversationId: string): void {
    this.isLoading.set(true);
    this.messagingService.getMessages(conversationId, 1, 50).subscribe({
      next: (msgs) => {
        this.messages.set(msgs);
        this.isLoading.set(false);
        this.scrollToBottom();
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  sendMessage(): void {
    if (!this.newMessage().trim() || !this.conversation()) return;

    const currentUser = this.authService.currentUser();
    if (!currentUser) return;

    this.isSending.set(true);
    const request: CreateMessageRequest = {
      content: this.newMessage(),
      receiverId: this.getReceiverId(),
      conversationId: this.conversation()?.id
    };

    this.messagingService.sendMessage(request, currentUser.id).subscribe({
      next: (message) => {
        this.messages.update(msgs => [...msgs, message]);
        this.newMessage.set('');
        this.isSending.set(false);
        this.scrollToBottom();

        // Update conversation
        const conv = this.conversation();
        if (conv) {
          conv.lastMessage = message.content;
          conv.lastMessageTime = message.createdAt;
          conv.lastMessageSenderId = message.senderId;
        }
      },
      error: () => {
        this.isSending.set(false);
      }
    });
  }

  private getReceiverId(): string {
    const conv = this.conversation();
    if (!conv) return '';
    // Find participant that is not current user
    const receiverIndex = this.currentUserId() === conv.participantIds[0] ? 1 : 0;
    return conv.participantIds[receiverIndex];
  }

  deleteMessage(message: Message): void {
    if (!this.conversation()) return;

    this.messagingService.deleteMessage(message.id, this.conversation()!.id).subscribe({
      next: () => {
        this.messages.update(msgs => msgs.filter(m => m.id !== message.id));
      },
      error: () => {
        // Handle error silently
      }
    });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const messageContainer = document.querySelector('.messages-container');
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    }, 0);
  }

  goBack(): void {
    this.router.navigate(['/messaging']);
  }

  formatTime(date: Date | undefined): string {
    if (!date) return '';
    const time = new Date(date);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
