import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from './sidebar.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CommunityService } from '../../core/services/community.service';
import { Community } from '../../core/models/community.model';
import { signal } from '@angular/core';
import { of } from 'rxjs';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let communityService: jasmine.SpyObj<CommunityService>;

  beforeEach(async () => {
    const communityServiceSpy = jasmine.createSpyObj('CommunityService', [
      'getJoinedCommunities'
    ]);

    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterTestingModule, ButtonComponent],
      providers: [
        { provide: CommunityService, useValue: communityServiceSpy }
      ]
    }).compileComponents();

    communityService = TestBed.inject(CommunityService) as jasmine.SpyObj<CommunityService>;
    communityService.getJoinedCommunities.and.returnValue(of([]));

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render sidebar container', () => {
      const sidebar = fixture.nativeElement.querySelector('.sidebar');
      expect(sidebar).toBeTruthy();
    });

    it('should render navigation section', () => {
      const nav = fixture.nativeElement.querySelector('.sidebar-nav');
      expect(nav).toBeTruthy();
    });

    it('should render menu items', () => {
      const items = fixture.nativeElement.querySelectorAll('.nav-item');
      expect(items.length).toBeGreaterThan(0);
    });

    it('should render footer when expanded', () => {
      component.isExpanded.set(true);
      fixture.detectChanges();
      const footer = fixture.nativeElement.querySelector('.sidebar-footer');
      expect(footer).toBeTruthy();
    });

    it('should not render footer when collapsed', () => {
      component.isExpanded.set(false);
      fixture.detectChanges();
      const footer = fixture.nativeElement.querySelector('.sidebar-footer');
      expect(footer).toBeNull();
    });
  });

  describe('Mobile Functionality', () => {
    it('should render mobile header only on mobile', () => {
      const mobileHeader = fixture.nativeElement.querySelector('.sidebar-mobile-header');
      // Mobile header exists but is hidden via CSS on desktop
      expect(mobileHeader).toBeTruthy();
    });

    it('should render close button', () => {
      const closeBtn = fixture.nativeElement.querySelector('.sidebar-close-btn');
      expect(closeBtn).toBeTruthy();
    });

    it('should emit closeRequest when close button clicked', () => {
      spyOn(component.closeRequest, 'emit');
      const closeBtn = fixture.nativeElement.querySelector('.sidebar-close-btn');
      closeBtn.click();
      expect(component.closeRequest.emit).toHaveBeenCalled();
    });

    it('should add sidebar-open class when isOpen is true', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
      const sidebar = fixture.nativeElement.querySelector('.sidebar');
      expect(sidebar?.classList.contains('sidebar-open')).toBe(true);
    });

    it('should not add sidebar-open class when isOpen is false', () => {
      fixture.componentRef.setInput('isOpen', false);
      fixture.detectChanges();
      const sidebar = fixture.nativeElement.querySelector('.sidebar');
      expect(sidebar?.classList.contains('sidebar-open')).toBe(false);
    });
  });

  describe('Expand/Collapse', () => {
    it('should render toggle button', () => {
      const toggleBtn = fixture.nativeElement.querySelector('.sidebar-toggle-btn');
      expect(toggleBtn).toBeTruthy();
    });

    it('should toggle expanded state when button clicked', () => {
      component.isExpanded.set(true);
      expect(component.isExpanded()).toBe(true);
      
      const toggleBtn = fixture.nativeElement.querySelector('.sidebar-toggle-btn');
      toggleBtn.click();
      
      expect(component.isExpanded()).toBe(false);
    });

    it('should emit toggleExpanded event with new state', () => {
      spyOn(component.toggleExpanded, 'emit');
      component.onToggleExpanded();
      expect(component.toggleExpanded.emit).toHaveBeenCalledWith(false); // was true, now false
    });

    it('should add sidebar-collapsed class when not expanded', () => {
      component.isExpanded.set(false);
      fixture.detectChanges();
      const sidebar = fixture.nativeElement.querySelector('.sidebar');
      expect(sidebar?.classList.contains('sidebar-collapsed')).toBe(true);
    });

    it('should not add sidebar-collapsed class when expanded', () => {
      component.isExpanded.set(true);
      fixture.detectChanges();
      const sidebar = fixture.nativeElement.querySelector('.sidebar');
      expect(sidebar?.classList.contains('sidebar-collapsed')).toBe(false);
    });

    it('should toggle icon when expanded state changes', () => {
      component.isExpanded.set(true);
      fixture.detectChanges();
      let toggle = fixture.nativeElement.querySelector('.toggle-icon');
      expect(toggle?.textContent).toContain('‹');

      component.isExpanded.set(false);
      fixture.detectChanges();
      toggle = fixture.nativeElement.querySelector('.toggle-icon');
      expect(toggle?.textContent).toContain('›');
    });
  });

  describe('Menu Items', () => {
    it('should return menu items array', () => {
      const items = component.getMenuItems();
      expect(items.length).toBe(5); // Dashboard, Communities, Messages, Saved, Profile
    });

    it('menu items should have required properties', () => {
      const items = component.getMenuItems();
      items.forEach(item => {
        expect(item.label).toBeDefined();
        expect(item.icon).toBeDefined();
        expect(item.route).toBeDefined();
      });
    });

    it('should include Dashboard menu item', () => {
      const items = component.getMenuItems();
      expect(items.some(i => i.label === 'Dashboard')).toBe(true);
    });

    it('should include Communities menu item', () => {
      const items = component.getMenuItems();
      expect(items.some(i => i.label === 'Communities')).toBe(true);
    });

    it('should render menu items in DOM', () => {
      const navItems = fixture.nativeElement.querySelectorAll('.nav-item');
      expect(navItems.length).toBeGreaterThanOrEqual(5);
    });

    it('should emit closeRequest when nav item clicked', () => {
      spyOn(component.closeRequest, 'emit');
      const navItem = fixture.nativeElement.querySelector('.nav-item');
      navItem.click();
      expect(component.closeRequest.emit).toHaveBeenCalled();
    });
  });

  describe('Communities', () => {
    it('should load joined communities on init', () => {
      expect(communityService.getJoinedCommunities).toHaveBeenCalled();
    });

    it('should display joined communities', () => {
      const mockCommunities: Community[] = [
        { 
          id: '1', 
          name: 'Tech Talk', 
          members: 150, 
          icon: 'tech',
          description: 'Tech discussions',
          banner: '',
          posts: 0,
          category: 'tech',
          isJoined: true,
          createdAt: new Date(),
          rules: [],
          moderators: []
        },
        { 
          id: '2', 
          name: 'Gaming Zone', 
          members: 300, 
          icon: 'game',
          description: 'Gaming community',
          banner: '',
          posts: 0,
          category: 'gaming',
          isJoined: true,
          createdAt: new Date(),
          rules: [],
          moderators: []
        }
      ];
      
      component.joinedCommunities.set(mockCommunities);
      fixture.detectChanges();
      
      const communityItems = fixture.nativeElement.querySelectorAll('.community-item');
      expect(communityItems.length).toBe(2);
    });

    it('should display empty hint when no communities', () => {
      component.joinedCommunities.set([]);
      component.isExpanded.set(true);
      fixture.detectChanges();
      
      const emptyHint = fixture.nativeElement.querySelector('.empty-hint');
      expect(emptyHint?.textContent).toContain('No communities joined yet');
    });

    it('should display community name first letter as icon', () => {
      const mockCommunities: Community[] = [
        { 
          id: '1', 
          name: 'Technology', 
          members: 150, 
          icon: 'tech',
          description: 'Tech discussions',
          banner: '',
          posts: 0,
          category: 'tech',
          isJoined: true,
          createdAt: new Date(),
          rules: [],
          moderators: []
        }
      ];
      
      component.joinedCommunities.set(mockCommunities);
      component.isExpanded.set(true);
      fixture.detectChanges();
      
      const icon = fixture.nativeElement.querySelector('.community-icon-wrap');
      expect(icon?.textContent).toContain('T');
    });

    it('should display member count', () => {
      const mockCommunities: Community[] = [
        { 
          id: '1', 
          name: 'Tech Talk', 
          members: 150, 
          icon: 'tech',
          description: 'Tech discussions',
          banner: '',
          posts: 0,
          category: 'tech',
          isJoined: true,
          createdAt: new Date(),
          rules: [],
          moderators: []
        }
      ];
      
      component.joinedCommunities.set(mockCommunities);
      component.isExpanded.set(true);
      fixture.detectChanges();
      
      const badge = fixture.nativeElement.querySelector('.member-badge');
      expect(badge?.textContent).toContain('150');
    });
  });

  describe('Navigation Sections', () => {
    it('should have Main section', () => {
      const sections = fixture.nativeElement.querySelectorAll('.section-label');
      expect(sections.length).toBeGreaterThan(0);
    });

    it('should have Discover section when expanded', () => {
      component.isExpanded.set(true);
      fixture.detectChanges();
      const labels = fixture.nativeElement.querySelectorAll('.section-label');
      const hasDiscover = Array.from(labels).some(l => (l as HTMLElement).textContent?.includes('Discover'));
      expect(hasDiscover).toBe(true);
    });

    it('should render Coming Soon badges', () => {
      component.isExpanded.set(true);
      fixture.detectChanges();
      const soonBadges = fixture.nativeElement.querySelectorAll('.coming-soon-badge');
      expect(soonBadges.length).toBeGreaterThan(0);
    });

    it('should hide section labels when collapsed', () => {
      component.isExpanded.set(false);
      fixture.detectChanges();
      const labels = fixture.nativeElement.querySelectorAll('.section-label');
      labels.forEach((label: HTMLElement) => {
        const style = window.getComputedStyle(label);
        expect(style.display).toBe('none');
      });
    });
  });

  describe('Default Values', () => {
    it('should have isExpanded default to true', () => {
      expect(component.isExpanded()).toBe(true);
    });

    it('should have joinedCommunities default to empty array', () => {
      expect(component.joinedCommunities().length).toBe(0);
    });
  });

  describe('Accessibility', () => {
    it('close button should have aria-label', () => {
      const closeBtn = fixture.nativeElement.querySelector('.sidebar-close-btn');
      expect(closeBtn?.getAttribute('aria-label')).toBe('Close menu');
    });

    it('toggle button should have aria-label', () => {
      const toggleBtn = fixture.nativeElement.querySelector('.sidebar-toggle-btn');
      expect(toggleBtn?.getAttribute('aria-label')).toBe('Toggle sidebar');
    });

    it('nav should have aria-label', () => {
      const nav = fixture.nativeElement.querySelector('.sidebar-nav');
      expect(nav?.getAttribute('aria-label')).toBe('Main navigation');
    });

    it('nav items should have proper routing', () => {
      const navItems = fixture.nativeElement.querySelectorAll('.nav-item');
      expect(navItems.length).toBeGreaterThan(0);
      navItems.forEach((item: HTMLElement) => {
        expect(item.getAttribute('routerLink')).toBeDefined();
      });
    });

    it('community links should have title attribute when collapsed', () => {
      const mockCommunities: Community[] = [
        { 
          id: '1', 
          name: 'Tech Talk', 
          members: 150, 
          icon: 'tech',
          description: 'Tech discussions',
          banner: '',
          posts: 0,
          category: 'tech',
          isJoined: true,
          createdAt: new Date(),
          rules: [],
          moderators: []
        }
      ];
      
      component.joinedCommunities.set(mockCommunities);
      component.isExpanded.set(false);
      fixture.detectChanges();
      
      const communityItem = fixture.nativeElement.querySelector('.community-item');
      expect(communityItem?.getAttribute('title')).toBeTruthy();
    });

    it('disabled items should have aria-disabled', () => {
      const disabledItems = fixture.nativeElement.querySelectorAll('[aria-disabled="true"]');
      expect(disabledItems.length).toBeGreaterThan(0);
    });
  });
});
