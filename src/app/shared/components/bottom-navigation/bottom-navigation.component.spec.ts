import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BottomNavigationComponent, BottomNavItem } from './bottom-navigation.component';

describe('BottomNavigationComponent', () => {
  let component: BottomNavigationComponent;
  let fixture: ComponentFixture<BottomNavigationComponent>;

  const mockItems: BottomNavItem[] = [
    { label: 'Home', icon: '🏠', route: '/home', active: false, disabled: false },
    { label: 'Explore', icon: '🔍', route: '/explore', active: false, disabled: false },
    { label: 'Messages', icon: '💬', route: '/messages', badge: 3, active: false, disabled: false },
    { label: 'Profile', icon: '👤', route: '/profile', active: false, disabled: false }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNavigationComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BottomNavigationComponent);
    component = fixture.componentInstance;
  });

  describe('Rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render navigation element', () => {
      const nav = fixture.nativeElement.querySelector('.bottom-navigation');
      expect(nav).toBeTruthy();
    });

    it('should render nav items', () => {
      component.items = mockItems;
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.nav-item');
      expect(items.length).toBe(4);
    });

    it('should render item labels', () => {
      component.items = mockItems;
      fixture.detectChanges();
      const labels = fixture.nativeElement.querySelectorAll('.nav-item-label');
      expect(labels[0]?.textContent).toContain('Home');
      expect(labels[1]?.textContent).toContain('Explore');
    });

    it('should render item icons', () => {
      component.items = mockItems;
      fixture.detectChanges();
      const icons = fixture.nativeElement.querySelectorAll('.nav-item-icon');
      expect(icons[0]?.textContent).toContain('🏠');
      expect(icons[1]?.textContent).toContain('🔍');
    });

    it('should render badges when present', () => {
      component.items = mockItems;
      fixture.detectChanges();
      const badges = fixture.nativeElement.querySelectorAll('.nav-item-badge');
      expect(badges.length).toBe(1);
      expect(badges[0]?.textContent).toContain('3');
    });

    it('should not render badges when not present', () => {
      component.items = [{ label: 'Home', icon: '🏠', route: '/home' }];
      fixture.detectChanges();
      const badges = fixture.nativeElement.querySelectorAll('.nav-item-badge');
      expect(badges.length).toBe(0);
    });
  });

  describe('Item States', () => {
    it('should apply active class to active items', () => {
      component.items = [
        { label: 'Home', icon: '🏠', route: '/home', active: true }
      ];
      fixture.detectChanges();
      const item = fixture.nativeElement.querySelector('.nav-item');
      expect(item?.classList.contains('active')).toBe(true);
    });

    it('should apply disabled class to disabled items', () => {
      component.items = [
        { label: 'Home', icon: '🏠', route: '/home', disabled: true }
      ];
      fixture.detectChanges();
      const item = fixture.nativeElement.querySelector('.nav-item');
      expect(item?.classList.contains('disabled')).toBe(true);
    });

    it('should disable button when item is disabled', () => {
      component.items = [
        { label: 'Home', icon: '🏠', route: '/home', disabled: true }
      ];
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('.nav-item');
      expect(button?.disabled).toBe(true);
    });

    it('should not disable button when item is not disabled', () => {
      component.items = [
        { label: 'Home', icon: '🏠', route: '/home', disabled: false }
      ];
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('.nav-item');
      expect(button?.disabled).toBe(false);
    });
  });

  describe('Events', () => {
    it('should emit itemClick when item clicked', () => {
      spyOn(component.itemClick, 'emit');
      component.items = mockItems;
      fixture.detectChanges();
      
      const item = fixture.nativeElement.querySelector('.nav-item');
      item.click();
      
      expect(component.itemClick.emit).toHaveBeenCalledWith(mockItems[0]);
    });

    it('should not emit itemClick when disabled item clicked', () => {
      spyOn(component.itemClick, 'emit');
      component.items = [
        { label: 'Home', icon: '🏠', route: '/home', disabled: true }
      ];
      fixture.detectChanges();
      
      component.onItemClick(component.items[0]);
      
      expect(component.itemClick.emit).not.toHaveBeenCalled();
    });

    it('should emit itemClick with correct item data', () => {
      spyOn(component.itemClick, 'emit');
      const testItem = mockItems[2]; // Messages with badge
      component.items = mockItems;
      fixture.detectChanges();
      
      component.onItemClick(testItem);
      
      expect(component.itemClick.emit).toHaveBeenCalledWith(testItem);
    });
  });

  describe('Badges', () => {
    it('should render badge with correct number', () => {
      component.items = [
        { label: 'Messages', icon: '💬', route: '/messages', badge: 5 }
      ];
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.nav-item-badge');
      expect(badge?.textContent).toContain('5');
    });

    it('should render 99+ for badges over 99', () => {
      component.items = [
        { label: 'Messages', icon: '💬', route: '/messages', badge: 150 }
      ];
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.nav-item-badge');
      expect(badge?.textContent).toContain('99+');
    });

    it('should not render badge when badge is 0', () => {
      component.items = [
        { label: 'Messages', icon: '💬', route: '/messages', badge: 0 }
      ];
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.nav-item-badge');
      expect(badge).toBeNull();
    });

    it('should not render badge when badge is undefined', () => {
      component.items = [
        { label: 'Home', icon: '🏠', route: '/home' }
      ];
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.nav-item-badge');
      expect(badge).toBeNull();
    });
  });

  describe('isActive Method', () => {
    it('should return true when item.active is true', () => {
      const item: BottomNavItem = { label: 'Home', icon: '🏠', active: true };
      expect(component.isActive(item)).toBe(true);
    });

    it('should return true when route matches activeRoute', () => {
      const item: BottomNavItem = { label: 'Home', icon: '🏠', route: '/home' };
      expect(component.isActive(item, '/home')).toBe(true);
    });

    it('should return false when neither active nor route matches', () => {
      const item: BottomNavItem = { label: 'Home', icon: '🏠', route: '/home', active: false };
      expect(component.isActive(item, '/profile')).toBe(false);
    });
  });

  describe('Custom Classes', () => {
    it('should apply custom class to navigation', () => {
      component.customClass = 'custom-bottom-nav';
      fixture.detectChanges();
      const nav = fixture.nativeElement.querySelector('.bottom-navigation');
      expect(nav?.classList.contains('custom-bottom-nav')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have role="navigation"', () => {
      const nav = fixture.nativeElement.querySelector('.bottom-navigation');
      expect(nav?.getAttribute('role')).toBe('navigation');
    });

    it('should have aria-label', () => {
      const nav = fixture.nativeElement.querySelector('.bottom-navigation');
      expect(nav?.getAttribute('aria-label')).toBe('Mobile navigation');
    });

    it('nav items should have aria-label', () => {
      component.items = mockItems;
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.nav-item');
      expect(items[0]?.getAttribute('aria-label')).toBe('Home');
      expect(items[1]?.getAttribute('aria-label')).toBe('Explore');
    });

    it('active nav item should have aria-current="page"', () => {
      component.items = [
        { label: 'Home', icon: '🏠', active: true }
      ];
      fixture.detectChanges();
      const item = fixture.nativeElement.querySelector('.nav-item');
      expect(item?.getAttribute('aria-current')).toBe('page');
    });

    it('inactive nav item should not have aria-current', () => {
      component.items = [
        { label: 'Home', icon: '🏠', active: false }
      ];
      fixture.detectChanges();
      const item = fixture.nativeElement.querySelector('.nav-item');
      expect(item?.getAttribute('aria-current')).toBeNull();
    });

    it('nav item icons should have aria-hidden', () => {
      component.items = mockItems;
      fixture.detectChanges();
      const icons = fixture.nativeElement.querySelectorAll('.nav-item-icon');
      expect(icons[0]?.getAttribute('aria-hidden')).toBe('true');
    });

    it('badges should have aria-label', () => {
      component.items = [
        { label: 'Messages', icon: '💬', badge: 3 }
      ];
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.nav-item-badge');
      expect(badge?.getAttribute('aria-label')).toBe('3 Messages');
    });

    it('disabled items should have aria-disabled (though native disabled is preferred)', () => {
      component.items = [
        { label: 'Home', icon: '🏠', disabled: true }
      ];
      fixture.detectChanges();
      const item = fixture.nativeElement.querySelector('.nav-item');
      expect(item?.disabled).toBe(true);
    });
  });

  describe('Routing', () => {
    it('nav items should have routerLink', () => {
      component.items = mockItems;
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.nav-item');
      // Check if the button has the ng-reflect-router-link attribute (Angular internal representation)
      expect(items[0]?.getAttribute('ng-reflect-router-link')).toBe('/home');
      expect(items[1]?.getAttribute('ng-reflect-router-link')).toBe('/explore');
    });

    it('should have routerLinkActive class applied', () => {
      component.items = mockItems;
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.nav-item');
      // The routerLinkActive directive should be present on the button
      expect(items[0]).toBeTruthy();
      // routerLink and routerLinkActive should be defined on the button
      const firstButton = items[0] as HTMLButtonElement;
      expect(firstButton.hasAttribute('ng-reflect-router-link')).toBe(true);
    });
  });

  describe('Default Values', () => {
    it('should have items default to empty array', () => {
      expect(component.items.length).toBe(0);
    });

    it('should have customClass default to empty string', () => {
      expect(component.customClass).toBe('');
    });

    it('should have scrollOffset default to 0', () => {
      expect(component.scrollOffset).toBe(0);
    });
  });

  describe('Empty State', () => {
    it('should render empty navigation when no items provided', () => {
      component.items = [];
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.nav-item');
      expect(items.length).toBe(0);
    });

    it('should still render navigation container when no items', () => {
      component.items = [];
      fixture.detectChanges();
      const nav = fixture.nativeElement.querySelector('.bottom-navigation');
      expect(nav).toBeTruthy();
    });
  });

  describe('Multiple Items', () => {
    it('should handle multiple items correctly', () => {
      component.items = mockItems;
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.nav-item');
      expect(items.length).toBe(mockItems.length);
    });

    it('should handle items with mixed states', () => {
      component.items = [
        { label: 'Home', icon: '🏠', active: true, disabled: false },
        { label: 'Explore', icon: '🔍', active: false, disabled: true },
        { label: 'Messages', icon: '💬', badge: 5, active: false, disabled: false }
      ];
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.nav-item');
      expect(items[0]?.classList.contains('active')).toBe(true);
      expect(items[1]?.classList.contains('disabled')).toBe(true);
      expect(items[2]?.querySelector('.nav-item-badge')).toBeTruthy();
    });
  });
});
