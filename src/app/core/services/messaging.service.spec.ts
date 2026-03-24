import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessagingService } from './messaging.service';
import { Message, Conversation } from '../models';

describe('MessagingService', () => {
  let service: MessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getConversations', () => {
    it('should return all conversations for a user', (done) => {
      service.getConversations('current-user').subscribe(conversations => {
        expect(conversations).toBeTruthy();
        expect(conversations.length).toBeGreaterThan(0);
        expect(conversations[0].id).toBeTruthy();
        expect(conversations[0].participantIds).toBeTruthy();
        done();
      });
    });

    it('should return conversations with proper structure', (done) => {
      service.getConversations('current-user').subscribe(conversations => {
        conversations.forEach(conv => {
          expect(conv.id).toBeTruthy();
          expect(conv.participantIds).toBeTruthy();
          expect(conv.participantNames).toBeTruthy();
          expect(conv.unreadCount).toBeDefined();
          expect(conv.updatedAt).toBeTruthy();
          expect(conv.createdAt).toBeTruthy();
          expect(conv.participantIds.length).toBe(2);
        });
        done();
      });
    });
  });

  describe('getConversation', () => {
    it('should return a specific conversation by ID', (done) => {
      service.getConversation('conv-1').subscribe(conversation => {
        expect(conversation).toBeTruthy();
        expect(conversation?.id).toBe('conv-1');
        expect(conversation?.participantIds).toContain('current-user');
        done();
      });
    });

    it('should return null for non-existent conversation', (done) => {
      service.getConversation('non-existent').subscribe(conversation => {
        expect(conversation).toBeNull();
        done();
      });
    });

    it('should have correct participant information', (done) => {
      service.getConversation('conv-1').subscribe(conversation => {
        expect(conversation?.participantNames.length).toBe(2);
        expect(conversation?.participantAvatars.length).toBe(2);
        done();
      });
    });
  });

  describe('getMessages', () => {
    it('should return messages for a conversation', (done) => {
      service.getMessages('conv-1').subscribe(messages => {
        expect(messages).toBeTruthy();
        expect(messages.length).toBeGreaterThan(0);
        expect(messages[0].id).toBeTruthy();
        expect(messages[0].content).toBeTruthy();
        expect(messages[0].senderId).toBeTruthy();
        done();
      });
    });

    it('should return empty array for non-existent conversation', (done) => {
      service.getMessages('non-existent').subscribe(messages => {
        expect(messages).toEqual([]);
        done();
      });
    });

    it('should support pagination', (done) => {
      service.getMessages('conv-1', 1, 2).subscribe(messages => {
        expect(messages.length).toBeLessThanOrEqual(2);
        done();
      });
    });

    it('should return messages with proper structure', (done) => {
      service.getMessages('conv-1').subscribe(messages => {
        messages.forEach(msg => {
          expect(msg.id).toBeTruthy();
          expect(msg.content).toBeTruthy();
          expect(msg.senderId).toBeTruthy();
          expect(msg.senderName).toBeTruthy();
          expect(msg.receiverId).toBeTruthy();
          expect(msg.conversationId).toBeTruthy();
          expect(typeof msg.isRead).toBe('boolean');
          expect(msg.createdAt instanceof Date).toBe(true);
        });
        done();
      });
    });
  });

  describe('sendMessage', () => {
    it('should create and return a new message', (done) => {
      const request = {
        content: 'Test message',
        receiverId: '2',
        conversationId: 'conv-1'
      };

      service.sendMessage(request, 'current-user').subscribe(message => {
        expect(message).toBeTruthy();
        expect(message.content).toBe('Test message');
        expect(message.senderId).toBe('current-user');
        expect(message.receiverId).toBe('2');
        expect(message.isRead).toBe(false);
        done();
      });
    });

    it('should add message to conversation', (done) => {
      const request = {
        content: 'New test message',
        receiverId: '2',
        conversationId: 'conv-1'
      };

      service.sendMessage(request, 'current-user').subscribe(() => {
        service.getMessages('conv-1').subscribe(messages => {
          const newMessage = messages.find(m => m.content === 'New test message');
          expect(newMessage).toBeTruthy();
          done();
        });
      });
    });

    it('should update conversation lastMessage', (done) => {
      const request = {
        content: 'Update conversation test',
        receiverId: '2',
        conversationId: 'conv-1'
      };

      service.sendMessage(request, 'current-user').subscribe(() => {
        service.getConversation('conv-1').subscribe(conv => {
          expect(conv?.lastMessage).toBe('Update conversation test');
          done();
        });
      });
    });

    it('should create new conversation if not provided', (done) => {
      const request = {
        content: 'Test new conversation',
        receiverId: '5'
      };

      service.sendMessage(request, 'current-user').subscribe(message => {
        expect(message.conversationId).toBeTruthy();
        expect(message.conversationId.startsWith('conv-')).toBe(true);
        done();
      });
    });

    it('should have createdAt timestamp', (done) => {
      const request = {
        content: 'Timestamp test',
        receiverId: '2',
        conversationId: 'conv-1'
      };

      service.sendMessage(request, 'current-user').subscribe(message => {
        expect(message.createdAt).toBeTruthy();
        expect(message.createdAt instanceof Date).toBe(true);
        done();
      });
    });
  });

  describe('markAsRead', () => {
    it('should mark a message as read', (done) => {
      service.markAsRead('msg-4', 'conv-1').subscribe(message => {
        expect(message).toBeTruthy();
        expect(message?.isRead).toBe(true);
        done();
      });
    });

    it('should return null for non-existent message', (done) => {
      service.markAsRead('non-existent', 'conv-1').subscribe(message => {
        expect(message).toBeNull();
        done();
      });
    });

    it('should update unread count in conversation', (done) => {
      service.markAsRead('msg-4', 'conv-1').subscribe(() => {
        service.getConversation('conv-1').subscribe(conv => {
          expect(conv?.unreadCount).toBeLessThan(2); // Was 2 initially
          done();
        });
      });
    });

    it('should set updatedAt timestamp', (done) => {
      service.markAsRead('msg-4', 'conv-1').subscribe(message => {
        expect(message?.updatedAt).toBeTruthy();
        expect(message?.updatedAt instanceof Date).toBe(true);
        done();
      });
    });
  });

  describe('markConversationAsRead', () => {
    it('should mark all messages in conversation as read', (done) => {
      service.markConversationAsRead('conv-1').subscribe(result => {
        expect(result).toBe(true);
        service.getMessages('conv-1').subscribe(messages => {
          messages.forEach(msg => {
            expect(msg.isRead).toBe(true);
          });
          done();
        });
      });
    });

    it('should reset unread count to 0', (done) => {
      service.markConversationAsRead('conv-1').subscribe(() => {
        service.getConversation('conv-1').subscribe(conv => {
          expect(conv?.unreadCount).toBe(0);
          done();
        });
      });
    });

    it('should return true for successful operation', (done) => {
      service.markConversationAsRead('conv-3').subscribe(result => {
        expect(result).toBe(true);
        done();
      });
    });
  });

  describe('deleteMessage', () => {
    it('should soft delete a message', (done) => {
      service.deleteMessage('msg-1', 'conv-1').subscribe(result => {
        expect(result).toBe(true);
        service.getMessages('conv-1').subscribe(messages => {
          const deletedMessage = messages.find(m => m.id === 'msg-1');
          expect(deletedMessage?.deletedAt).toBeTruthy();
          done();
        });
      });
    });

    it('should return false for non-existent message', (done) => {
      service.deleteMessage('non-existent', 'conv-1').subscribe(result => {
        expect(result).toBe(false);
        done();
      });
    });

    it('should set deletedAt timestamp', (done) => {
      service.deleteMessage('msg-6', 'conv-2').subscribe(() => {
        service.getMessages('conv-2').subscribe(messages => {
          const deletedMessage = messages.find(m => m.id === 'msg-6');
          expect(deletedMessage?.deletedAt instanceof Date).toBe(true);
          done();
        });
      });
    });
  });

  describe('searchConversations', () => {
    it('should search conversations by participant name', (done) => {
      service.searchConversations('Jane').subscribe(results => {
        expect(results.length).toBeGreaterThan(0);
        expect(results.some(c => c.participantNames.some(n => n.includes('Jane')))).toBe(true);
        done();
      });
    });

    it('should be case-insensitive', (done) => {
      service.searchConversations('jane').subscribe(results => {
        expect(results.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should return empty array for no matches', (done) => {
      service.searchConversations('NonExistentPerson').subscribe(results => {
        expect(results.length).toBe(0);
        done();
      });
    });

    it('should find conversations with partial match', (done) => {
      service.searchConversations('Sarah').subscribe(results => {
        expect(results.some(c => c.participantNames.some(n => n.includes('Sarah')))).toBe(true);
        done();
      });
    });
  });

  describe('Message structure validation', () => {
    it('should have all required Message fields', (done) => {
      service.getMessages('conv-1').subscribe(messages => {
        messages.forEach(msg => {
          expect(msg.id).toBeTruthy();
          expect(msg.content).toBeTruthy();
          expect(msg.senderId).toBeTruthy();
          expect(msg.senderName).toBeTruthy();
          expect(msg.receiverId).toBeTruthy();
          expect(msg.conversationId).toBeTruthy();
          expect(typeof msg.isRead).toBe('boolean');
          expect(msg.createdAt instanceof Date).toBe(true);
        });
        done();
      });
    });
  });

  describe('Conversation structure validation', () => {
    it('should have all required Conversation fields', (done) => {
      service.getConversations('current-user').subscribe(conversations => {
        conversations.forEach(conv => {
          expect(conv.id).toBeTruthy();
          expect(Array.isArray(conv.participantIds)).toBe(true);
          expect(Array.isArray(conv.participantNames)).toBe(true);
          expect(Array.isArray(conv.participantAvatars)).toBe(true);
          expect(typeof conv.unreadCount).toBe('number');
          expect(conv.updatedAt instanceof Date).toBe(true);
          expect(conv.createdAt instanceof Date).toBe(true);
        });
        done();
      });
    });
  });
});
