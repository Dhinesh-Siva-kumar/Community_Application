import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { CreatePostRequest, CreateCommentRequest } from '../models';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });
    service = TestBed.inject(PostService);
  });

  describe('Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Get Feed', () => {
    it('should return all posts in feed', (done) => {
      service.getFeed().subscribe(posts => {
        expect(posts).toBeTruthy();
        expect(posts.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should return at least 5 mock posts', (done) => {
      service.getFeed().subscribe(posts => {
        expect(posts.length).toBeGreaterThanOrEqual(5);
        done();
      });
    });

    it('should have posts with required fields', (done) => {
      service.getFeed().subscribe(posts => {
        posts.forEach(post => {
          expect(post.id).toBeTruthy();
          expect(post.title).toBeTruthy();
          expect(post.content).toBeTruthy();
          expect(post.author).toBeTruthy();
          expect(post.author.id).toBeTruthy();
          expect(post.author.username).toBeTruthy();
          expect(post.community).toBeTruthy();
          expect(post.likes >= 0).toBe(true);
          expect(post.comments >= 0).toBe(true);
          expect(typeof post.isLiked).toBe('boolean');
          expect(post.createdAt).toBeTruthy();
        });
        done();
      });
    });

    it('should have posts sorted by date', (done) => {
      service.getFeed().subscribe(posts => {
        for (let i = 1; i < posts.length; i++) {
          const prevDate = new Date(posts[i - 1].createdAt).getTime();
          const currDate = new Date(posts[i].createdAt).getTime();
          expect(prevDate).toBeGreaterThanOrEqual(currDate);
        }
        done();
      });
    });
  });

  describe('Get Post By ID', () => {
    it('should return specific post by id', (done) => {
      service.getPostById('1').subscribe(post => {
        expect(post.id).toBe('1');
        expect(post.title).toBe('Getting Started with Angular 19 Signals');
        done();
      });
    });

    it('should return first post for non-existent id', (done) => {
      service.getPostById('invalid-id').subscribe(post => {
        expect(post.id).toBe('1');
        done();
      });
    });

    it('should return post with correct author', (done) => {
      service.getPostById('2').subscribe(post => {
        expect(post.author.username).toBe('backend_guru');
        done();
      });
    });

    it('should return post with correct community', (done) => {
      service.getPostById('3').subscribe(post => {
        expect(post.community.name).toBe('Design');
        done();
      });
    });
  });

  describe('Get Posts By Community', () => {
    it('should return posts from specific community', (done) => {
      service.getPostsByCommunity('2').subscribe(posts => {
        posts.forEach(post => {
          expect(post.community.id).toBe('2');
        });
        done();
      });
    });

    it('should return Web Development community posts', (done) => {
      service.getPostsByCommunity('2').subscribe(posts => {
        expect(posts.length).toBeGreaterThan(0);
        const allWeb = posts.every(p => p.community.id === '2');
        expect(allWeb).toBe(true);
        done();
      });
    });

    it('should handle empty community gracefully', (done) => {
      service.getPostsByCommunity('99').subscribe(posts => {
        expect(Array.isArray(posts)).toBe(true);
        done();
      });
    });
  });

  describe('Get Posts By User', () => {
    it('should return posts from specific user', (done) => {
      service.getPostsByUser('1').subscribe(posts => {
        posts.forEach(post => {
          expect(post.author.id).toBe('1');
        });
        done();
      });
    });

    it('should return user with id 1 posts', (done) => {
      service.getPostsByUser('1').subscribe(posts => {
        expect(posts.length).toBeGreaterThan(0);
        expect(posts[0].author.id).toBe('1');
        done();
      });
    });

    it('should return empty array for non-existent user', (done) => {
      service.getPostsByUser('99').subscribe(posts => {
        expect(posts.length).toBe(0);
        done();
      });
    });
  });

  describe('Create Post', () => {
    it('should create a new post', (done) => {
      const createRequest: CreatePostRequest = {
        title: 'New Post',
        content: 'This is a new post content',
        imageUrl: '',
        communityId: '1'
      };

      service.createPost(createRequest).subscribe(post => {
        expect(post.title).toBe('New Post');
        expect(post.content).toBe('This is a new post content');
        expect(post.community.id).toBe('1');
        done();
      });
    });

    it('should set new post with 0 likes', (done) => {
      const createRequest: CreatePostRequest = {
        title: 'Test Post',
        content: 'Test content',
        imageUrl: '',
        communityId: '1'
      };

      service.createPost(createRequest).subscribe(post => {
        expect(post.likes).toBe(0);
        expect(post.comments).toBe(0);
        done();
      });
    });

    it('should set new post as not liked', (done) => {
      const createRequest: CreatePostRequest = {
        title: 'Test Post',
        content: 'Test content',
        imageUrl: '',
        communityId: '1'
      };

      service.createPost(createRequest).subscribe(post => {
        expect(post.isLiked).toBe(false);
        done();
      });
    });

    it('should set current date as createdAt', (done) => {
      const createRequest: CreatePostRequest = {
        title: 'Test Post',
        content: 'Test content',
        imageUrl: '',
        communityId: '1'
      };

      const beforeTime = new Date();
      service.createPost(createRequest).subscribe(post => {
        const afterTime = new Date();
        const postTime = new Date(post.createdAt);
        
        expect(postTime.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
        expect(postTime.getTime()).toBeLessThanOrEqual(afterTime.getTime());
        done();
      });
    });

    it('should add new post to feed', (done) => {
      const initialCount = 0;
      
      service.getFeed().subscribe(initialPosts => {
        const initialLength = initialPosts.length;

        const createRequest: CreatePostRequest = {
          title: 'New Post',
          content: 'Content',
          imageUrl: '',
          communityId: '1'
        };

        service.createPost(createRequest).subscribe(() => {
          service.getFeed().subscribe(updatedPosts => {
            expect(updatedPosts.length).toBeGreaterThan(initialLength);
            done();
          });
        });
      });
    });
  });

  describe('Like Post', () => {
    it('should toggle like status on post', (done) => {
      service.getPostById('1').subscribe(postBefore => {
        const wasLiked = postBefore.isLiked;

        service.likePost('1').subscribe(post => {
          expect(post.isLiked).toBe(!wasLiked);
          done();
        });
      });
    });

    it('should increase likes when liking an unliked post', (done) => {
      service.getPostById('1').subscribe(postBefore => {
        const initialLikes = postBefore.likes;
        const initialLiked = postBefore.isLiked;

        service.likePost('1').subscribe(post => {
          // Should toggle the like status
          expect(post.isLiked).not.toBe(initialLiked);
          // If we liked it, count should increase; if we unliked it, count should decrease
          if (post.isLiked) {
            expect(post.likes).toBe(initialLikes + 1);
          } else {
            expect(post.likes).toBe(initialLikes - 1);
          }
          done();
        });
      });
    });

    it('should handle liking non-existent post gracefully', (done) => {
      service.likePost('invalid-id').subscribe(
        post => {
          expect(post).toBeUndefined();
          done();
        },
        () => {
          // Error is acceptable
          done();
        }
      );
    });
  });

  describe('Get Comments', () => {
    it('should return comments for a post', (done) => {
      service.getComments('1').subscribe(comments => {
        expect(comments).toBeTruthy();
        expect(comments.length).toBeGreaterThan(0);
        done();
      });
    });

    it('should return at least 3 mock comments', (done) => {
      service.getComments('1').subscribe(comments => {
        expect(comments.length).toBeGreaterThanOrEqual(3);
        done();
      });
    });

    it('should have comments with required fields', (done) => {
      service.getComments('1').subscribe(comments => {
        comments.forEach(comment => {
          expect(comment.id).toBeTruthy();
          expect(comment.content).toBeTruthy();
          expect(comment.author).toBeTruthy();
          expect(comment.author.id).toBeTruthy();
          expect(comment.author.username).toBeTruthy();
          expect(comment.postId).toBe('1');
          expect(comment.likes >= 0).toBe(true);
          expect(typeof comment.isLiked).toBe('boolean');
          expect(comment.createdAt).toBeTruthy();
        });
        done();
      });
    });

    it('should have some liked comments in mock data', (done) => {
      service.getComments('1').subscribe(comments => {
        const likedComments = comments.filter(c => c.isLiked);
        expect(likedComments.length).toBeGreaterThan(0);
        done();
      });
    });
  });

  describe('Add Comment', () => {
    it('should create a new comment', (done) => {
      const createRequest: CreateCommentRequest = {
        content: 'This is a great post!',
        postId: '1'
      };

      service.addComment(createRequest).subscribe(comment => {
        expect(comment.content).toBe('This is a great post!');
        expect(comment.postId).toBe('1');
        done();
      });
    });

    it('should set new comment with 0 likes', (done) => {
      const createRequest: CreateCommentRequest = {
        content: 'Test comment',
        postId: '1'
      };

      service.addComment(createRequest).subscribe(comment => {
        expect(comment.likes).toBe(0);
        done();
      });
    });

    it('should set new comment as not liked', (done) => {
      const createRequest: CreateCommentRequest = {
        content: 'Test comment',
        postId: '1'
      };

      service.addComment(createRequest).subscribe(comment => {
        expect(comment.isLiked).toBe(false);
        done();
      });
    });

    it('should set current date as createdAt', (done) => {
      const createRequest: CreateCommentRequest = {
        content: 'Test comment',
        postId: '1'
      };

      const beforeTime = new Date();
      service.addComment(createRequest).subscribe(comment => {
        const afterTime = new Date();
        const commentTime = new Date(comment.createdAt);
        
        expect(commentTime.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
        expect(commentTime.getTime()).toBeLessThanOrEqual(afterTime.getTime());
        done();
      });
    });
  });

  describe('Post Properties', () => {
    it('should have Angular post in feed', (done) => {
      service.getFeed().subscribe(posts => {
        const angularPost = posts.find(p => p.title === 'Getting Started with Angular 19 Signals');
        expect(angularPost).toBeTruthy();
        expect(angularPost?.community.name).toBe('Angular');
        done();
      });
    });

    it('should have posts with varying engagement', (done) => {
      service.getFeed().subscribe(posts => {
        const likes = posts.map(p => p.likes);
        const maxLikes = Math.max(...likes);
        const minLikes = Math.min(...likes);
        expect(maxLikes).toBeGreaterThan(minLikes);
        done();
      });
    });

    it('should have posts from different communities', (done) => {
      service.getFeed().subscribe(posts => {
        const communities = new Set(posts.map(p => p.community.id));
        expect(communities.size).toBeGreaterThan(1);
        done();
      });
    });
  });

  describe('Async Operations', () => {
    it('should handle getFeed with delay', (done) => {
      const startTime = Date.now();

      service.getFeed().subscribe(() => {
        const elapsed = Date.now() - startTime;
        expect(elapsed).toBeGreaterThanOrEqual(450);
        done();
      });
    });

    it('should handle getPostById with delay', (done) => {
      const startTime = Date.now();

      service.getPostById('1').subscribe(() => {
        const elapsed = Date.now() - startTime;
        expect(elapsed).toBeGreaterThanOrEqual(250);
        done();
      });
    });

    it('should handle createPost with delay', (done) => {
      const startTime = Date.now();

      const createRequest: CreatePostRequest = {
        title: 'Test',
        content: 'Test',
        imageUrl: '',
        communityId: '1'
      };

      service.createPost(createRequest).subscribe(() => {
        const elapsed = Date.now() - startTime;
        expect(elapsed).toBeGreaterThanOrEqual(450);
        done();
      });
    });

    it('should handle getComments with delay', (done) => {
      const startTime = Date.now();

      service.getComments('1').subscribe(() => {
        const elapsed = Date.now() - startTime;
        expect(elapsed).toBeGreaterThanOrEqual(350);
        done();
      });
    });
  });
});
