export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  fromUser: {
    id: string;
    username: string;
    avatar: string;
  };
  postId?: string;
  communityId?: string;
  isRead: boolean;
  createdAt: Date;
}

export type NotificationType = 'like' | 'comment' | 'follow' | 'mention' | 'community_invite' | 'post';
