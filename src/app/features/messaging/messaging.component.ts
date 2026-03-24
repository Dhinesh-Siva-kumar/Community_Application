import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConversationsListComponent } from './conversations-list.component';
import { MessageThreadComponent } from './message-thread.component';

@Component({
  selector: 'app-messaging',
  standalone: true,
  imports: [CommonModule, RouterModule, ConversationsListComponent, MessageThreadComponent],
  template: `
    <div class="messaging-container">
      <div class="conversations-sidebar" [class.mobile-hidden]="showMessageThread">
        <app-conversations-list></app-conversations-list>
      </div>
      <div class="message-thread-area" [class.mobile-show]="showMessageThread">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .messaging-container {
      display: flex;
      height: 100%;
      width: 100%;
    }

    .conversations-sidebar {
      width: 350px;
      border-right: 1px solid #e0e0e0;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .message-thread-area {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    @media (max-width: 768px) {
      .conversations-sidebar {
        width: 100%;
        position: absolute;
        height: 100%;
        z-index: 10;
        display: none;

        &:not(.mobile-hidden) {
          display: flex;
        }
      }

      .mobile-hidden {
        display: none !important;
      }

      .message-thread-area {
        width: 100%;

        &.mobile-show {
          display: flex;
        }
      }
    }
  `]
})
export class MessagingComponent {
  showMessageThread = false;
}
