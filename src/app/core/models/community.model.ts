export interface Community {
  id: string;
  name: string;
  description: string;
  icon: string;
  banner: string;
  members: number;
  posts: number;
  category: string;
  isJoined: boolean;
  createdAt: Date;
  rules: CommunityRule[];
  moderators: CommunityModerator[];
}

export interface CommunityRule {
  id: string;
  title: string;
  description: string;
}

export interface CommunityModerator {
  id: string;
  username: string;
  avatar: string;
}

export interface CommunityCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}
