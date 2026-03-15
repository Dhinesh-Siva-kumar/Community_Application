import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
    <app-navbar (menuToggle)="toggleSidebar()"></app-navbar>
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

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.fetchNotifications();
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }
}
