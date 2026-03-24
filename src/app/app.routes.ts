import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'landing',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingPageComponent)
  },
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'communities',
        loadChildren: () => import('./features/communities/communities.routes').then(m => m.COMMUNITY_ROUTES)
      },
      {
        path: 'community/:id',
        loadComponent: () => import('./features/communities/community-detail/community-detail.component').then(m => m.CommunityDetailComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
      },
       {
         path: 'profile/:id',
         loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent)
       },
       {
         path: 'post/:id',
         loadComponent: () => import('./features/post-detail/post-detail.component').then(m => m.PostDetailComponent)
       },
       {
         path: 'search',
         loadComponent: () => import('./features/search/search-results.component').then(m => m.SearchResultsComponent)
       },
        {
          path: 'notifications',
          loadComponent: () => import('./features/notifications/notifications.component').then(m => m.NotificationsComponent)
        },
        {
          path: 'messaging',
          loadComponent: () => import('./features/messaging/messaging.component').then(m => m.MessagingComponent),
          children: [
            {
              path: ':id',
              loadComponent: () => import('./features/messaging/message-thread.component').then(m => m.MessageThreadComponent)
            },
            { path: '', redirectTo: '', pathMatch: 'full' }
          ]
        },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'landing' }
];
