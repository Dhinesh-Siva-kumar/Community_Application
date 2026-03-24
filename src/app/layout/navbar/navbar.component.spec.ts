import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { LocationBadgeComponent } from '../../shared/components/location-badge/location-badge.component';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { signal } from '@angular/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout', 'currentUser']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['markAllAsRead', 'markAsRead'], {
      unreadCount: signal(0),
      notifications: signal([])
    });

    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        RouterTestingModule,
        FormsModule,
        ButtonComponent,
        AvatarComponent,
        InputComponent,
        LocationBadgeComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render navbar container', () => {
      const navbar = fixture.nativeElement.querySelector('.navbar');
      expect(navbar).toBeTruthy();
    });

    it('should render brand link', () => {
      const brand = fixture.nativeElement.querySelector('.nav-brand');
      expect(brand).toBeTruthy();
    });

    it('should display brand name', () => {
      const brandName = fixture.nativeElement.querySelector('.brand-name');
      expect(brandName?.textContent).toContain('Community');
    });

    it('should render search bar by default', () => {
      component.showSearch = true;
      fixture.detectChanges();
      const search = fixture.nativeElement.querySelector('.nav-search');
      expect(search).toBeTruthy();
    });

    it('should not render search bar when showSearch is false', () => {
      component.showSearch = false;
      fixture.detectChanges();
      const search = fixture.nativeElement.querySelector('.nav-search');
      expect(search).toBeNull();
    });

    it('should render notification icon', () => {
      const notifBtn = fixture.nativeElement.querySelector('.nav-icon-btn');
      expect(notifBtn).toBeTruthy();
    });

    it('should render avatar button', () => {
      const avatarBtn = fixture.nativeElement.querySelector('.nav-user');
      expect(avatarBtn).toBeTruthy();
    });

    it('should render hamburger button', () => {
      const hamburger = fixture.nativeElement.querySelector('.nav-hamburger');
      expect(hamburger).toBeTruthy();
    });
  });

  describe('Location Badge', () => {
    it('should render location badge when showLocationBadge is true and location provided', () => {
      component.showLocationBadge = true;
      component.currentLocation = { postcode: 'SW1A 1AA', area: 'Westminster' };
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('app-location-badge');
      expect(badge).toBeTruthy();
    });

    it('should not render location badge when showLocationBadge is false', () => {
      component.showLocationBadge = false;
      component.currentLocation = { postcode: 'SW1A 1AA', area: 'Westminster' };
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('app-location-badge');
      expect(badge).toBeNull();
    });

    it('should not render location badge when location is not provided', () => {
      component.showLocationBadge = true;
      component.currentLocation = undefined;
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('app-location-badge');
      expect(badge).toBeNull();
    });

    it('should emit locationClick when location badge clicked', () => {
      spyOn(component.locationClick, 'emit');
      component.onLocationClick();
      expect(component.locationClick.emit).toHaveBeenCalled();
    });
  });

  describe('Search', () => {
    it('should toggle search focused state', () => {
      expect(component.searchFocused).toBe(false);
      component.searchFocused = true;
      fixture.detectChanges();
      expect(component.searchFocused).toBe(true);
    });

    it('should emit searchSubmit event with query', () => {
      spyOn(component.searchSubmit, 'emit');
      component.searchQuery = 'test query';
      component.onSearch();
      expect(component.searchSubmit.emit).toHaveBeenCalledWith('test query');
    });

    it('should not emit searchSubmit when query is empty', () => {
      spyOn(component.searchSubmit, 'emit');
      component.searchQuery = '';
      component.onSearch();
      expect(component.searchSubmit.emit).not.toHaveBeenCalled();
    });

    it('should not emit searchSubmit when query is whitespace only', () => {
      spyOn(component.searchSubmit, 'emit');
      component.searchQuery = '   ';
      component.onSearch();
      expect(component.searchSubmit.emit).not.toHaveBeenCalled();
    });

    it('should apply active class to search when focused', () => {
      component.showSearch = true;
      component.searchFocused = true;
      fixture.detectChanges();
      const search = fixture.nativeElement.querySelector('.nav-search');
      expect(search?.classList.contains('active')).toBe(true);
    });

    it('should remove active class from search when not focused', () => {
      component.showSearch = true;
      component.searchFocused = false;
      fixture.detectChanges();
      const search = fixture.nativeElement.querySelector('.nav-search');
      expect(search?.classList.contains('active')).toBe(false);
    });
  });

  describe('Menu Toggle', () => {
    it('should toggle mobile menu visibility', () => {
      expect(component.showMobileMenu).toBe(false);
      component.toggleMobileMenu();
      expect(component.showMobileMenu).toBe(true);
      component.toggleMobileMenu();
      expect(component.showMobileMenu).toBe(false);
    });

    it('should emit menuToggle event when hamburger clicked', () => {
      spyOn(component.menuToggle, 'emit');
      component.toggleMobileMenu();
      expect(component.menuToggle.emit).toHaveBeenCalled();
    });
  });

  describe('Notifications', () => {
    it('should display notification badge when unread count > 0', () => {
      (notificationService.unreadCount as jasmine.Spy).and.returnValue(3);
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.nav-badge');
      expect(badge).toBeTruthy();
      expect(badge?.textContent).toContain('3');
    });

    it('should show 9+ for unread count > 9', () => {
      (notificationService.unreadCount as jasmine.Spy).and.returnValue(15);
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.nav-badge');
      expect(badge?.textContent).toContain('9+');
    });

    it('should not display notification badge when unread count is 0', () => {
      (notificationService.unreadCount as jasmine.Spy).and.returnValue(0);
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.nav-badge');
      expect(badge).toBeNull();
    });
  });

  describe('User Menu', () => {
    it('should display user menu', () => {
      const userMenu = fixture.nativeElement.querySelector('.nav-user-menu');
      expect(userMenu).toBeTruthy();
    });

    it('should display user email in menu header', () => {
      authService.currentUser.and.returnValue({ email: 'user@example.com' } as any);
      fixture.detectChanges();
      const email = fixture.nativeElement.querySelector('.user-email');
      expect(email?.textContent).toContain('user@example.com');
    });

    it('should call logout when logout button clicked', () => {
      component.logout();
      expect(authService.logout).toHaveBeenCalled();
    });
  });

  describe('User Initials', () => {
    it('should compute initials from full name', () => {
      authService.currentUser.and.returnValue({
        displayName: 'John Doe'
      } as any);
      expect(component.userInitials()).toBe('JD');
    });

    it('should handle single name', () => {
      authService.currentUser.and.returnValue({
        displayName: 'John'
      } as any);
      expect(component.userInitials()).toBe('J');
    });

    it('should handle empty name', () => {
      authService.currentUser.and.returnValue({
        displayName: ''
      } as any);
      expect(component.userInitials()).toBe('U');
    });

    it('should handle null user', () => {
      authService.currentUser.and.returnValue(null);
      expect(component.userInitials()).toBe('U');
    });
  });

  describe('Custom Classes', () => {
    it('should apply custom class to navbar', () => {
      component.customClass = 'custom-navbar-class';
      fixture.detectChanges();
      const navbar = fixture.nativeElement.querySelector('.navbar');
      expect(navbar?.classList.contains('custom-navbar-class')).toBe(true);
    });
  });

  describe('Default Values', () => {
    it('should have showSearch default to true', () => {
      expect(component.showSearch).toBe(true);
    });

    it('should have showLocationBadge default to true', () => {
      expect(component.showLocationBadge).toBe(true);
    });

    it('should have showMobileMenu default to false', () => {
      expect(component.showMobileMenu).toBe(false);
    });

    it('should have searchFocused default to false', () => {
      expect(component.searchFocused).toBe(false);
    });

    it('should have searchQuery default to empty string', () => {
      expect(component.searchQuery).toBe('');
    });

    it('should have customClass default to empty string', () => {
      expect(component.customClass).toBe('');
    });
  });

  describe('Accessibility', () => {
    it('hamburger button should have aria-label', () => {
      const hamburger = fixture.nativeElement.querySelector('.nav-hamburger');
      expect(hamburger?.getAttribute('aria-label')).toBe('Toggle menu');
    });

    it('brand link should have aria-label', () => {
      const brand = fixture.nativeElement.querySelector('.nav-brand');
      expect(brand?.getAttribute('aria-label')).toBe('Community home');
    });

    it('search input should have aria-label', () => {
      component.showSearch = true;
      fixture.detectChanges();
      const searchInput = fixture.nativeElement.querySelector('.nav-search-input');
      expect(searchInput?.getAttribute('aria-label')).toBe('Search');
    });

    it('notification button should have aria-label', () => {
      const notifBtn = fixture.nativeElement.querySelector('.nav-icon-btn');
      expect(notifBtn?.getAttribute('aria-label')).toBe('Notifications');
    });

    it('notification button should have aria-badge when unread count > 0', () => {
      (notificationService.unreadCount as jasmine.Spy).and.returnValue(3);
      fixture.detectChanges();
      const notifBtn = fixture.nativeElement.querySelector('.nav-icon-btn');
      expect(notifBtn?.getAttribute('aria-badge')).toBe('3');
    });
  });
});
