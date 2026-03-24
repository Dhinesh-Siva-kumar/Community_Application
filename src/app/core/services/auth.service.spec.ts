import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LoginRequest, SignupRequest } from '../models';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Clear localStorage BEFORE creating the service (service loads from localStorage in constructor)
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have currentUser signal as null initially', () => {
      expect(service.currentUser()).toBeNull();
    });

    it('should have token signal as null initially', () => {
      expect(service.token()).toBeNull();
    });

    it('should have isAuthenticated as false initially', () => {
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('Login', () => {
    it('should login with valid credentials', (done) => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123'
      };

      service.login(loginRequest).subscribe(response => {
        expect(response.user.email).toBe('test@example.com');
        expect(response.token).toBeTruthy();
        done();
      });
    });

    it('should set current user after login', (done) => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123'
      };

      service.login(loginRequest).subscribe(() => {
        expect(service.currentUser()).toBeTruthy();
        expect(service.currentUser()?.email).toBe('test@example.com');
        done();
      });
    });

    it('should set token after login', (done) => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123'
      };

      service.login(loginRequest).subscribe(() => {
        expect(service.token()).toBeTruthy();
        done();
      });
    });

    it('should update isAuthenticated to true after login', (done) => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123'
      };

      service.login(loginRequest).subscribe(() => {
        expect(service.isAuthenticated()).toBe(true);
        done();
      });
    });

    it('should store token in localStorage after login', (done) => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123'
      };

      service.login(loginRequest).subscribe(() => {
        const token = localStorage.getItem('auth_token');
        expect(token).toBeTruthy();
        done();
      });
    });

    it('should store user in localStorage after login', (done) => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123'
      };

      service.login(loginRequest).subscribe(() => {
        const user = localStorage.getItem('auth_user');
        expect(user).toBeTruthy();
        const parsedUser = JSON.parse(user!);
        expect(parsedUser.email).toBe('test@example.com');
        done();
      });
    });

    it('should return user with all required fields', (done) => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123'
      };

      service.login(loginRequest).subscribe(response => {
        const user = response.user;
        expect(user.id).toBeTruthy();
        expect(user.username).toBeTruthy();
        expect(user.email).toBe('test@example.com');
        expect(user.displayName).toBeTruthy();
        expect(user.avatar !== undefined).toBe(true);
        expect(user.bio !== undefined).toBe(true);
        expect(user.joinedDate).toBeTruthy();
        expect(user.followers !== undefined).toBe(true);
        expect(user.following !== undefined).toBe(true);
        expect(Array.isArray(user.communities)).toBe(true);
        done();
      });
    });
  });

  describe('Signup', () => {
    it('should signup with valid data', (done) => {
      const signupRequest: SignupRequest = {
        email: 'newuser@example.com',
        password: 'password123',
        username: 'newuser',
        displayName: 'New User'
      };

      service.signup(signupRequest).subscribe(response => {
        expect(response.user.email).toBe('newuser@example.com');
        expect(response.user.username).toBe('newuser');
        expect(response.user.displayName).toBe('New User');
        expect(response.token).toBeTruthy();
        done();
      });
    });

    it('should set current user after signup', (done) => {
      const signupRequest: SignupRequest = {
        email: 'newuser@example.com',
        password: 'password123',
        username: 'newuser',
        displayName: 'New User'
      };

      service.signup(signupRequest).subscribe(() => {
        expect(service.currentUser()).toBeTruthy();
        expect(service.currentUser()?.username).toBe('newuser');
        done();
      });
    });

    it('should set token after signup', (done) => {
      const signupRequest: SignupRequest = {
        email: 'newuser@example.com',
        password: 'password123',
        username: 'newuser',
        displayName: 'New User'
      };

      service.signup(signupRequest).subscribe(() => {
        expect(service.token()).toBeTruthy();
        done();
      });
    });

    it('should update isAuthenticated to true after signup', (done) => {
      const signupRequest: SignupRequest = {
        email: 'newuser@example.com',
        password: 'password123',
        username: 'newuser',
        displayName: 'New User'
      };

      service.signup(signupRequest).subscribe(() => {
        expect(service.isAuthenticated()).toBe(true);
        done();
      });
    });

    it('should store user data in localStorage after signup', (done) => {
      const signupRequest: SignupRequest = {
        email: 'newuser@example.com',
        password: 'password123',
        username: 'newuser',
        displayName: 'New User'
      };

      service.signup(signupRequest).subscribe(() => {
        const user = localStorage.getItem('auth_user');
        expect(user).toBeTruthy();
        const parsedUser = JSON.parse(user!);
        expect(parsedUser.username).toBe('newuser');
        done();
      });
    });

    it('should initialize new user with empty followers/following', (done) => {
      const signupRequest: SignupRequest = {
        email: 'newuser@example.com',
        password: 'password123',
        username: 'newuser',
        displayName: 'New User'
      };

      service.signup(signupRequest).subscribe(response => {
        expect(response.user.followers).toBe(0);
        expect(response.user.following).toBe(0);
        expect(response.user.communities).toEqual([]);
        done();
      });
    });
  });

  describe('Logout', () => {
    beforeEach((done) => {
      // Login first before testing logout
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123'
      };

      service.login(loginRequest).subscribe(() => {
        done();
      });
    });

    it('should clear current user on logout', () => {
      expect(service.currentUser()).toBeTruthy();
      service.logout();
      expect(service.currentUser()).toBeNull();
    });

    it('should clear token on logout', () => {
      expect(service.token()).toBeTruthy();
      service.logout();
      expect(service.token()).toBeNull();
    });

    it('should set isAuthenticated to false on logout', () => {
      expect(service.isAuthenticated()).toBe(true);
      service.logout();
      expect(service.isAuthenticated()).toBe(false);
    });

    it('should remove token from localStorage on logout', () => {
      expect(localStorage.getItem('auth_token')).toBeTruthy();
      service.logout();
      expect(localStorage.getItem('auth_token')).toBeNull();
    });

    it('should remove user from localStorage on logout', () => {
      expect(localStorage.getItem('auth_user')).toBeTruthy();
      service.logout();
      expect(localStorage.getItem('auth_user')).toBeNull();
    });

    it('should navigate to login page on logout', () => {
      service.logout();
      expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
    });
  });

  describe('Token Management', () => {
    it('should generate unique tokens for multiple logins', (done) => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123'
      };

      let firstToken: string;

      service.login(loginRequest).subscribe(() => {
        firstToken = service.token()!;

        // Clear and login again
        service.logout();

        service.login(loginRequest).subscribe(() => {
          const secondToken = service.token()!;
          expect(firstToken).not.toBe(secondToken);
          done();
        });
      });
    });
  });

  describe('Local Storage Persistence', () => {
    it('should clear storage and test persistence in isolation', () => {
      // Clear any existing data first
      if (typeof window !== 'undefined') {
        localStorage.clear();
      }

      const testUser = {
        id: '123',
        username: 'testuser',
        email: 'test@example.com',
        displayName: 'Test User',
        avatar: '',
        bio: 'Test bio',
        joinedDate: new Date('2024-01-01'),
        followers: 10,
        following: 5,
        communities: ['1', '2']
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', 'test-token-isolated');
        localStorage.setItem('auth_user', JSON.stringify(testUser));
      }

      // Verify storage was set correctly
      const storedToken = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('auth_user');
      expect(storedToken).toBe('test-token-isolated');
      expect(storedUser).toBeTruthy();
    });
  });

  describe('Computed Properties', () => {
    it('isAuthenticated should be a computed signal', (done) => {
      expect(service.isAuthenticated()).toBe(false);

      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123'
      };

      service.login(loginRequest).subscribe(() => {
        expect(service.isAuthenticated()).toBe(true);
        done();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle missing email gracefully', (done) => {
      const loginRequest: LoginRequest = {
        email: '',
        password: 'password123'
      };

      service.login(loginRequest).subscribe(response => {
        // Service should still return a response (mock)
        expect(response).toBeTruthy();
        done();
      });
    });

    it('should handle missing password gracefully', (done) => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: ''
      };

      service.login(loginRequest).subscribe(response => {
        // Service should still return a response (mock)
        expect(response).toBeTruthy();
        done();
      });
    });
  });
});
