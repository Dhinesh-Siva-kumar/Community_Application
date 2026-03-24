export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  conversationId: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date; // For soft delete
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participantNames: string[];
  participantAvatars: string[];
  lastMessage?: string;
  lastMessageTime?: Date;
  lastMessageSenderId?: string;
  unreadCount: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface CreateMessageRequest {
  content: string;
  receiverId: string;
  conversationId?: string; // If not provided, will create new conversation
}

export interface MarkAsReadRequest {
  messageId: string;
  conversationId: string;
}
