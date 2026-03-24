import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    SidebarComponent
  ],
  template: `
    <app-navbar 
      (menuToggle)="toggleSidebar()"
      (searchSubmit)="onSearch($event)"
    ></app-navbar>
    <div class="layout-wrapper">
      @if (sidebarOpen()) {
        <div class="sidebar-backdrop" (click)="closeSidebar()"></div>
      }
      <app-sidebar [isOpen]="sidebarOpen()" (closeRequest)="closeSidebar()"></app-sidebar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  sidebarOpen = signal(false);

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    try {
      this.notificationService.fetchNotifications();
    } catch (error) {
      console.error('Error initializing notifications in main layout:', error);
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  onSearch(query: string): void {
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }
}
