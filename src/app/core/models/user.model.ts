export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  avatar: string;
  bio: string;
  joinedDate: Date;
  followers: number;
  following: number;
  communities: string[];
}

export interface UserProfile extends User {
  isFollowing?: boolean;    // Whether current user follows this user
  isFollowedBy?: boolean;   // Whether this user follows current user
  isBlocked?: boolean;      // Whether current user has blocked this user
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  displayName: string;
}
