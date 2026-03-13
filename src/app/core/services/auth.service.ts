import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, of, delay } from 'rxjs';
import { User, AuthResponse, LoginRequest, SignupRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = '/api/auth';

  private currentUserSignal = signal<User | null>(null);
  private tokenSignal = signal<string | null>(null);

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.currentUserSignal());
  readonly token = this.tokenSignal.asReadonly();

  constructor(private http: HttpClient, private router: Router) {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      const user = localStorage.getItem('auth_user');
      if (token && user) {
        this.tokenSignal.set(token);
        this.currentUserSignal.set(JSON.parse(user));
      }
    }
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    // Mock login for demo — replace with real API call:
    // return this.http.post<AuthResponse>(`${this.API_URL}/login`, request)
    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '1',
        username: 'demo_user',
        email: request.email,
        displayName: 'Demo User',
        avatar: '',
        bio: 'Angular developer & community enthusiast 🚀',
        joinedDate: new Date('2024-01-15'),
        followers: 128,
        following: 64,
        communities: ['1', '2', '3']
      }
    };

    return of(mockResponse).pipe(
      delay(800),
      tap(response => this.handleAuth(response))
    );
  }

  signup(request: SignupRequest): Observable<AuthResponse> {
    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '2',
        username: request.username,
        email: request.email,
        displayName: request.displayName,
        avatar: '',
        bio: '',
        joinedDate: new Date(),
        followers: 0,
        following: 0,
        communities: []
      }
    };

    return of(mockResponse).pipe(
      delay(800),
      tap(response => this.handleAuth(response))
    );
  }

  logout(): void {
    this.currentUserSignal.set(null);
    this.tokenSignal.set(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
    this.router.navigate(['/auth/login']);
  }

  private handleAuth(response: AuthResponse): void {
    this.currentUserSignal.set(response.user);
    this.tokenSignal.set(response.token);
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify(response.user));
    }
  }
}
