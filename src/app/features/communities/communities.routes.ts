import { Routes } from '@angular/router';

export const COMMUNITY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./community-list/community-list.component').then(m => m.CommunityListComponent)
  }
];
