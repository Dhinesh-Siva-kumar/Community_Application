import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface BottomNavItem {
  label: string;
  icon: string;
  route?: string;
  badge?: number;
  active?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'app-bottom-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bottom-navigation.component.html',
  styleUrl: './bottom-navigation.component.scss'
})
export class BottomNavigationComponent {
  @Input() items: BottomNavItem[] = [];
  @Input() customClass: string = '';
  @Input() scrollOffset: number = 0;

  @Output() itemClick = new EventEmitter<BottomNavItem>();

  onItemClick(item: BottomNavItem): void {
    if (!item.disabled) {
      this.itemClick.emit(item);
    }
  }

  isActive(item: BottomNavItem, activeRoute?: string): boolean {
    return item.active || (activeRoute !== undefined && item.route === activeRoute) || false;
  }
}

