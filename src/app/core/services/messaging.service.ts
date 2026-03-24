import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Message, Conversation, CreateMessageRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private http = inject(HttpClient);
  private readonly API_URL = '/api/messages';

  // Mock conversations data
  private mockConversations: Map<string, Conversation> = new Map([
    ['conv-1', {
      id: 'conv-1',
      participantIds: ['current-user', '2'],
      participantNames: ['You', 'Jane Smith'],
      participantAvatars: ['', ''],
      lastMessage: 'That sounds great! Let\'s catch up soon.',
      lastMessageTime: new Date(Date.now() - 3600000), // 1 hour ago
      lastMessageSenderId: '2',
      unreadCount: 2,
      updatedAt: new Date(Date.now() - 3600000),
      createdAt: new Date('2024-03-01')
    }],
    ['conv-2', {
      id: 'conv-2',
      participantIds: ['current-user', '4'],
      participantNames: ['You', 'Sarah Wilson'],
      participantAvatars: ['', ''],
      lastMessage: 'Thanks for the feedback on my project!',
      lastMessageTime: new Date(Date.now() - 7200000), // 2 hours ago
      lastMessageSenderId: 'current-user',
      unreadCount: 0,
      updatedAt: new Date(Date.now() - 7200000),
      createdAt: new Date('2024-02-15')
    }],
    ['conv-3', {
      id: 'conv-3',
      participantIds: ['current-user', '1'],
      participantNames: ['You', 'John Doe'],
      participantAvatars: ['', ''],
      lastMessage: 'Are you attending the tech meetup next week?',
      lastMessageTime: new Date(Date.now() - 86400000), // 1 day ago
      lastMessageSenderId: '1',
      unreadCount: 1,
      updatedAt: new Date(Date.now() - 86400000),
      createdAt: new Date('2024-01-20')
    }]
  ]);

  // Mock messages data
  private mockMessages: Map<string, Message[]> = new Map([
    ['conv-1', [
      {
        id: 'msg-1',
        content: 'Hey Jane! How have you been?',
        senderId: 'current-user',
        senderName: 'You',
        senderAvatar: '',
        receiverId: '2',
        conversationId: 'conv-1',
        isRead: true,
        createdAt: new Date(Date.now() - 7200000)
      },
      {
        id: 'msg-2',
        content: 'I\'ve been great! Working on some exciting new design projects.',
        senderId: '2',
        senderName: 'Jane Smith',
        senderAvatar: '',
        receiverId: 'current-user',
        conversationId: 'conv-1',
        isRead: true,
        createdAt: new Date(Date.now() - 6300000)
      },
      {
        id: 'msg-3',
        content: 'That sounds amazing! Tell me more about them.',
        senderId: 'current-user',
        senderName: 'You',
        senderAvatar: '',
        receiverId: '2',
        conversationId: 'conv-1',
        isRead: true,
        createdAt: new Date(Date.now() - 5400000)
      },
      {
        id: 'msg-4',
        content: 'I\'m redesigning an e-commerce platform. Really fun work!',
        senderId: '2',
        senderName: 'Jane Smith',
        senderAvatar: '',
        receiverId: 'current-user',
        conversationId: 'conv-1',
        isRead: false,
        createdAt: new Date(Date.now() - 3600000)
      },
      {
        id: 'msg-5',
        content: 'That sounds great! Let\'s catch up soon.',
        senderId: '2',
        senderName: 'Jane Smith',
        senderAvatar: '',
        receiverId: 'current-user',
        conversationId: 'conv-1',
        isRead: false,
        createdAt: new Date(Date.now() - 3600000)
      }
    ]],
    ['conv-2', [
      {
        id: 'msg-6',
        content: 'Hi Sarah! Just wanted to check on the project status.',
        senderId: 'current-user',
        senderName: 'You',
        senderAvatar: '',
        receiverId: '4',
        conversationId: 'conv-2',
        isRead: true,
        createdAt: new Date(Date.now() - 14400000)
      },
      {
        id: 'msg-7',
        content: 'Everything is on track! We\'re almost done with phase 2.',
        senderId: '4',
        senderName: 'Sarah Wilson',
        senderAvatar: '',
        receiverId: 'current-user',
        conversationId: 'conv-2',
        isRead: true,
        createdAt: new Date(Date.now() - 10800000)
      },
      {
        id: 'msg-8',
        content: 'Thanks for the feedback on my project!',
        senderId: 'current-user',
        senderName: 'You',
        senderAvatar: '',
        receiverId: '4',
        conversationId: 'conv-2',
        isRead: true,
        createdAt: new Date(Date.now() - 7200000)
      }
    ]],
    ['conv-3', [
      {
        id: 'msg-9',
        content: 'Hey John! Been a while!',
        senderId: 'current-user',
        senderName: 'You',
        senderAvatar: '',
        receiverId: '1',
        conversationId: 'conv-3',
        isRead: true,
        createdAt: new Date(Date.now() - 172800000)
      },
      {
        id: 'msg-10',
        content: 'I know! We should grab coffee soon.',
        senderId: '1',
        senderName: 'John Doe',
        senderAvatar: '',
        receiverId: 'current-user',
        conversationId: 'conv-3',
        isRead: true,
        createdAt: new Date(Date.now() - 129600000)
      },
      {
        id: 'msg-11',
        content: 'Are you attending the tech meetup next week?',
        senderId: '1',
        senderName: 'John Doe',
        senderAvatar: '',
        receiverId: 'current-user',
        conversationId: 'conv-3',
        isRead: false,
        createdAt: new Date(Date.now() - 86400000)
      }
    ]]
  ]);

  /**
   * Get all conversations for the current user
   */
  getConversations(userId: string): Observable<Conversation[]> {
    // return this.http.get<Conversation[]>(`${this.API_URL}/conversations?userId=${userId}`);
    const conversations = Array.from(this.mockConversations.values());
    return of(conversations).pipe(delay(350));
  }

  /**
   * Get a specific conversation by ID
   */
  getConversation(conversationId: string): Observable<Conversation | null> {
    // return this.http.get<Conversation>(`${this.API_URL}/conversations/${conversationId}`);
    const conversation = this.mockConversations.get(conversationId);
    return of(conversation || null).pipe(delay(300));
  }

  /**
   * Get messages for a conversation with pagination
   */
  getMessages(conversationId: string, page: number = 1, pageSize: number = 20): Observable<Message[]> {
    // return this.http.get<Message[]>(`${this.API_URL}/conversations/${conversationId}/messages?page=${page}&pageSize=${pageSize}`);
    const messages = this.mockMessages.get(conversationId) || [];
    const startIndex = (page - 1) * pageSize;
    const paginatedMessages = messages.slice(startIndex, startIndex + pageSize);
    return of(paginatedMessages).pipe(delay(400));
  }

  /**
   * Send a message
   */
  sendMessage(request: CreateMessageRequest, currentUserId: string): Observable<Message> {
    // return this.http.post<Message>(`${this.API_URL}/messages`, request);
    const messageId = `msg-${Date.now()}`;
    const conversationId = request.conversationId || this.createOrGetConversation(currentUserId, request.receiverId);

    const message: Message = {
      id: messageId,
      content: request.content,
      senderId: currentUserId,
      senderName: 'You',
      senderAvatar: '',
      receiverId: request.receiverId,
      conversationId: conversationId,
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add message to mock data
    const conversationMessages = this.mockMessages.get(conversationId) || [];
    conversationMessages.push(message);
    this.mockMessages.set(conversationId, conversationMessages);

    // Update conversation
    const conversation = this.mockConversations.get(conversationId);
    if (conversation) {
      conversation.lastMessage = request.content;
      conversation.lastMessageTime = new Date();
      conversation.lastMessageSenderId = currentUserId;
      conversation.updatedAt = new Date();
    }

    return of(message).pipe(delay(300));
  }

  /**
   * Mark a message as read
   */
  markAsRead(messageId: string, conversationId: string): Observable<Message | null> {
    // return this.http.put<Message>(`${this.API_URL}/messages/${messageId}/read`, {});
    const conversationMessages = this.mockMessages.get(conversationId);
    if (conversationMessages) {
      const message = conversationMessages.find(m => m.id === messageId);
      if (message) {
        message.isRead = true;
        message.updatedAt = new Date();

        // Update unread count in conversation
        const conversation = this.mockConversations.get(conversationId);
        if (conversation) {
          conversation.unreadCount = Math.max(0, conversation.unreadCount - 1);
        }

        return of(message).pipe(delay(200));
      }
    }
    return of(null).pipe(delay(200));
  }

  /**
   * Mark all messages in a conversation as read
   */
  markConversationAsRead(conversationId: string): Observable<boolean> {
    // return this.http.put<boolean>(`${this.API_URL}/conversations/${conversationId}/read`, {});
    const conversationMessages = this.mockMessages.get(conversationId);
    if (conversationMessages) {
      conversationMessages.forEach(msg => {
        if (!msg.isRead) {
          msg.isRead = true;
          msg.updatedAt = new Date();
        }
      });

      // Reset unread count
      const conversation = this.mockConversations.get(conversationId);
      if (conversation) {
        conversation.unreadCount = 0;
      }
    }
    return of(true).pipe(delay(250));
  }

  /**
   * Delete a message (soft delete)
   */
  deleteMessage(messageId: string, conversationId: string): Observable<boolean> {
    // return this.http.delete<boolean>(`${this.API_URL}/messages/${messageId}`);
    const conversationMessages = this.mockMessages.get(conversationId);
    if (conversationMessages) {
      const index = conversationMessages.findIndex(m => m.id === messageId);
      if (index > -1) {
        conversationMessages[index].deletedAt = new Date();
        return of(true).pipe(delay(300));
      }
    }
    return of(false).pipe(delay(300));
  }

  /**
   * Create a new conversation or get existing one
   */
  private createOrGetConversation(userId1: string, userId2: string): string {
    // Check if conversation already exists
    for (const [convId, conversation] of this.mockConversations.entries()) {
      if (conversation.participantIds.includes(userId1) && conversation.participantIds.includes(userId2)) {
        return convId;
      }
    }

    // Create new conversation
    const newConvId = `conv-${Date.now()}`;
    const newConversation: Conversation = {
      id: newConvId,
      participantIds: [userId1, userId2],
      participantNames: ['You', 'Participant'],
      participantAvatars: ['', ''],
      lastMessage: undefined,
      lastMessageTime: undefined,
      lastMessageSenderId: undefined,
      unreadCount: 0,
      updatedAt: new Date(),
      createdAt: new Date()
    };

    this.mockConversations.set(newConvId, newConversation);
    this.mockMessages.set(newConvId, []);
    return newConvId;
  }

  /**
   * Search conversations by participant name
   */
  searchConversations(searchTerm: string): Observable<Conversation[]> {
    // return this.http.get<Conversation[]>(`${this.API_URL}/conversations/search?q=${searchTerm}`);
    const filtered = Array.from(this.mockConversations.values()).filter(conv => {
      return conv.participantNames.some(name => 
        name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    return of(filtered).pipe(delay(300));
  }
}
