import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Post, CreatePostRequest, Comment, CreateCommentRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly API_URL = '/api/posts';

  constructor(private http: HttpClient) {}

  private mockPosts: Post[] = [
    {
      id: '1',
      title: 'Getting Started with Angular 19 Signals',
      content: 'Angular 19 introduces powerful new signal-based reactivity. Signals provide a way to notify interested consumers when a value changes. This makes state management more predictable and performant. Let me walk you through the key concepts...',
      imageUrl: '',
      author: { id: '1', username: 'angular_dev', displayName: 'Angular Dev', avatar: '' },
      community: { id: '1', name: 'Angular', icon: 'code' },
      likes: 42,
      comments: 12,
      isLiked: false,
      createdAt: new Date('2026-03-14T10:30:00'),
      updatedAt: new Date('2026-03-14T10:30:00')
    },
    {
      id: '2',
      title: 'Best Practices for REST API Design',
      content: 'Designing a good REST API is crucial for application scalability. Here are 10 practices I follow in every project: 1) Use proper HTTP methods, 2) Version your APIs, 3) Use pagination, 4) Return appropriate status codes...',
      author: { id: '2', username: 'backend_guru', displayName: 'Backend Guru', avatar: '' },
      community: { id: '2', name: 'Web Development', icon: 'web' },
      likes: 87,
      comments: 23,
      isLiked: true,
      createdAt: new Date('2026-03-13T15:00:00'),
      updatedAt: new Date('2026-03-13T15:00:00')
    },
    {
      id: '3',
      title: 'CSS Grid vs Flexbox: When to Use What',
      content: 'A common question in web development is when to use CSS Grid versus Flexbox. Both are powerful layout tools, but they serve different purposes. Grid is great for two-dimensional layouts, while Flexbox excels at one-dimensional...',
      author: { id: '3', username: 'css_wizard', displayName: 'CSS Wizard', avatar: '' },
      community: { id: '3', name: 'Design', icon: 'palette' },
      likes: 65,
      comments: 18,
      isLiked: false,
      createdAt: new Date('2026-03-12T09:15:00'),
      updatedAt: new Date('2026-03-12T09:15:00')
    },
    {
      id: '4',
      title: 'Building Scalable Microservices with Node.js',
      content: 'Microservices architecture allows you to build applications as a collection of small, independently deployable services. In this post, I share my experience building a production-grade microservices system using Node.js, Docker, and Kubernetes.',
      author: { id: '4', username: 'node_ninja', displayName: 'Node Ninja', avatar: '' },
      community: { id: '2', name: 'Web Development', icon: 'web' },
      likes: 54,
      comments: 9,
      isLiked: false,
      createdAt: new Date('2026-03-11T14:45:00'),
      updatedAt: new Date('2026-03-11T14:45:00')
    },
    {
      id: '5',
      title: 'The Future of AI in Software Development',
      content: 'AI is transforming how we write code. From intelligent code completion to automated testing and code review, AI tools are becoming indispensable. Let me share my thoughts on where this is heading and how developers can prepare...',
      author: { id: '5', username: 'ai_explorer', displayName: 'AI Explorer', avatar: '' },
      community: { id: '4', name: 'Technology', icon: 'memory' },
      likes: 112,
      comments: 34,
      isLiked: true,
      createdAt: new Date('2026-03-10T11:00:00'),
      updatedAt: new Date('2026-03-10T11:00:00')
    }
  ];

  getFeed(): Observable<Post[]> {
    // return this.http.get<Post[]>(`${this.API_URL}/feed`);
    return of(this.mockPosts).pipe(delay(500));
  }

  getPostById(id: string): Observable<Post> {
    // return this.http.get<Post>(`${this.API_URL}/${id}`);
    const post = this.mockPosts.find(p => p.id === id) || this.mockPosts[0];
    return of(post).pipe(delay(300));
  }

  getPostsByCommunity(communityId: string): Observable<Post[]> {
    // return this.http.get<Post[]>(`${this.API_URL}/community/${communityId}`);
    return of(this.mockPosts.filter(p => p.community.id === communityId)).pipe(delay(400));
  }

  getPostsByUser(userId: string): Observable<Post[]> {
    // return this.http.get<Post[]>(`${this.API_URL}/user/${userId}`);
    return of(this.mockPosts.filter(p => p.author.id === userId)).pipe(delay(400));
  }

  createPost(request: CreatePostRequest): Observable<Post> {
    // return this.http.post<Post>(this.API_URL, request);
    const newPost: Post = {
      id: (this.mockPosts.length + 1).toString(),
      title: request.title,
      content: request.content,
      imageUrl: request.imageUrl,
      author: { id: '1', username: 'demo_user', displayName: 'Demo User', avatar: '' },
      community: { id: request.communityId, name: 'Angular', icon: 'code' },
      likes: 0,
      comments: 0,
      isLiked: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockPosts.unshift(newPost);
    return of(newPost).pipe(delay(500));
  }

  likePost(postId: string): Observable<Post> {
    // return this.http.post<Post>(`${this.API_URL}/${postId}/like`, {});
    const post = this.mockPosts.find(p => p.id === postId);
    if (post) {
      post.isLiked = !post.isLiked;
      post.likes += post.isLiked ? 1 : -1;
    }
    return of(post!).pipe(delay(200));
  }

  getComments(postId: string): Observable<Comment[]> {
    // return this.http.get<Comment[]>(`${this.API_URL}/${postId}/comments`);
    const mockComments: Comment[] = [
      {
        id: '1',
        content: 'Great post! This really helped me understand the concept better.',
        author: { id: '2', username: 'tech_fan', displayName: 'Tech Fan', avatar: '' },
        postId,
        likes: 5,
        isLiked: false,
        createdAt: new Date('2026-03-14T12:00:00')
      },
      {
        id: '2',
        content: 'Thanks for sharing! I\'ve been looking for a clear explanation like this.',
        author: { id: '3', username: 'learner_42', displayName: 'Learner 42', avatar: '' },
        postId,
        likes: 3,
        isLiked: true,
        createdAt: new Date('2026-03-14T13:30:00')
      },
      {
        id: '3',
        content: 'Could you also cover some advanced patterns in a follow-up post?',
        author: { id: '4', username: 'curious_dev', displayName: 'Curious Dev', avatar: '' },
        postId,
        likes: 8,
        isLiked: false,
        createdAt: new Date('2026-03-14T14:15:00')
      }
    ];
    return of(mockComments).pipe(delay(400));
  }

  addComment(request: CreateCommentRequest): Observable<Comment> {
    // return this.http.post<Comment>(`${this.API_URL}/${request.postId}/comments`, request);
    const newComment: Comment = {
      id: Date.now().toString(),
      content: request.content,
      author: { id: '1', username: 'demo_user', displayName: 'Demo User', avatar: '' },
      postId: request.postId,
      likes: 0,
      isLiked: false,
      createdAt: new Date()
    };
    return of(newComment).pipe(delay(300));
  }
}
