export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: PostAuthor;
  community: PostCommunity;
  likes: number;
  comments: number;
  isLiked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostAuthor {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
}

export interface PostCommunity {
  id: string;
  name: string;
  icon: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  communityId: string;
  imageUrl?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: PostAuthor;
  postId: string;
  likes: number;
  isLiked: boolean;
  createdAt: Date;
  replies?: Comment[];
}

export interface CreateCommentRequest {
  content: string;
  postId: string;
  parentCommentId?: string;
}
