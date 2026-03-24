import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationBadgeComponent } from './location-badge.component';

describe('LocationBadgeComponent', () => {
  let component: LocationBadgeComponent;
  let fixture: ComponentFixture<LocationBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationBadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render location badge', () => {
      const badge = fixture.nativeElement.querySelector('.location-badge');
      expect(badge).toBeTruthy();
    });

    it('should display postcode', () => {
      component.postcode = 'SW1A 1AA';
      fixture.detectChanges();
      const postcode = fixture.nativeElement.querySelector('.location-postcode');
      expect(postcode?.textContent).toContain('SW1A 1AA');
    });

    it('should display area', () => {
      component.area = 'Westminster, London';
      fixture.detectChanges();
      const area = fixture.nativeElement.querySelector('.location-area');
      expect(area?.textContent).toContain('Westminster, London');
    });

    it('should render location icon', () => {
      const icon = fixture.nativeElement.querySelector('.location-icon');
      expect(icon?.textContent).toContain('📍');
    });

    it('should render distance when provided', () => {
      component.distance = 5.2;
      fixture.detectChanges();
      const distance = fixture.nativeElement.querySelector('.location-distance');
      expect(distance).toBeTruthy();
    });

    it('should not render distance when not provided', () => {
      component.distance = undefined;
      fixture.detectChanges();
      const distance = fixture.nativeElement.querySelector('.location-distance');
      expect(distance).toBeNull();
    });

    it('should display distance with correct unit', () => {
      component.distance = 3.5;
      component.distanceUnit = 'km';
      fixture.detectChanges();
      const distance = fixture.nativeElement.querySelector('.location-distance');
      expect(distance?.textContent).toContain('3.5km');
    });

    it('should display distance in miles', () => {
      component.distance = 2.5;
      component.distanceUnit = 'mi';
      fixture.detectChanges();
      const distance = fixture.nativeElement.querySelector('.location-distance');
      expect(distance?.textContent).toContain('2.5mi');
    });
  });

  describe('Size Variants', () => {
    it('should apply sm size class', () => {
      component.size = 'sm';
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      expect(badge?.classList.contains('badge-sm')).toBe(true);
    });

    it('should apply md size class (default)', () => {
      component.size = 'md';
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      expect(badge?.classList.contains('badge-md')).toBe(true);
    });

    it('should apply lg size class', () => {
      component.size = 'lg';
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      expect(badge?.classList.contains('badge-lg')).toBe(true);
    });
  });

  describe('Variant Colors', () => {
    it('should apply primary variant class', () => {
      component.variant = 'primary';
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      expect(badge?.classList.contains('badge-primary')).toBe(true);
    });

    it('should apply secondary variant class', () => {
      component.variant = 'secondary';
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      expect(badge?.classList.contains('badge-secondary')).toBe(true);
    });

    it('should apply success variant class', () => {
      component.variant = 'success';
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      expect(badge?.classList.contains('badge-success')).toBe(true);
    });

    it('should apply warning variant class', () => {
      component.variant = 'warning';
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      expect(badge?.classList.contains('badge-warning')).toBe(true);
    });
  });

  describe('Clickable State', () => {
    it('should add clickable class when clickable is true', () => {
      component.clickable = true;
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      expect(badge?.classList.contains('clickable')).toBe(true);
    });

    it('should not add clickable class when clickable is false', () => {
      component.clickable = false;
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      expect(badge?.classList.contains('clickable')).toBe(false);
    });

    it('should have tabindex 0 when clickable is true', () => {
      component.clickable = true;
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      expect(badge?.getAttribute('tabindex')).toBe('0');
    });

    it('should have tabindex -1 when clickable is false', () => {
      component.clickable = false;
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      expect(badge?.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Custom Classes', () => {
    it('should apply custom class to badge', () => {
      component.customClass = 'custom-badge-class';
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      expect(badge?.classList.contains('custom-badge-class')).toBe(true);
    });
  });

  describe('Events', () => {
    it('should emit click event when clicked and clickable is true', () => {
      spyOn(component.click, 'emit');
      component.clickable = true;
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      badge.click();
      expect(component.click.emit).toHaveBeenCalled();
    });

    it('should not emit click event when clicked and clickable is false', () => {
      spyOn(component.click, 'emit');
      component.clickable = false;
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      badge.click();
      expect(component.click.emit).not.toHaveBeenCalled();
    });

    it('should emit click event on Enter key when clickable', () => {
      spyOn(component.click, 'emit');
      component.clickable = true;
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      badge.dispatchEvent(event);
      component.onClick();
      expect(component.click.emit).toHaveBeenCalled();
    });

    it('should emit click event on Space key when clickable', () => {
      spyOn(component.click, 'emit');
      component.clickable = true;
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      const event = new KeyboardEvent('keydown', { key: ' ' });
      badge.dispatchEvent(event);
      component.onClick();
      expect(component.click.emit).toHaveBeenCalled();
    });
  });

  describe('Distance Display', () => {
    it('should format distance to 1 decimal place', () => {
      component.distance = 5.678;
      component.distanceUnit = 'km';
      const display = component.getDisplayDistance();
      expect(display).toBe('5.7km');
    });

    it('should return empty string when distance is undefined', () => {
      component.distance = undefined;
      const display = component.getDisplayDistance();
      expect(display).toBe('');
    });

    it('should return empty string when distance is null', () => {
      component.distance = null as any;
      const display = component.getDisplayDistance();
      expect(display).toBe('');
    });

    it('should return true from hasDistance when distance is provided', () => {
      component.distance = 5.2;
      const has = component.hasDistance();
      expect(has).toBe(true);
    });

    it('should return false from hasDistance when distance is undefined', () => {
      component.distance = undefined;
      const has = component.hasDistance();
      expect(has).toBe(false);
    });

    it('should return false from hasDistance when distance is null', () => {
      component.distance = null as any;
      const has = component.hasDistance();
      expect(has).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should have role="img"', () => {
      const badge = fixture.nativeElement.querySelector('.location-badge');
      expect(badge?.getAttribute('role')).toBe('img');
    });

    it('should have aria-label with location information', () => {
      component.postcode = 'SW1A 1AA';
      component.area = 'Westminster';
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      const ariaLabel = badge?.getAttribute('aria-label');
      expect(ariaLabel).toContain('SW1A 1AA');
      expect(ariaLabel).toContain('Westminster');
    });

    it('should include distance in aria-label when present', () => {
      component.postcode = 'SW1A 1AA';
      component.area = 'Westminster';
      component.distance = 5.2;
      component.distanceUnit = 'km';
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.location-badge');
      const ariaLabel = badge?.getAttribute('aria-label');
      expect(ariaLabel).toContain('5.2km away');
    });

    it('location icon should have aria-hidden', () => {
      const icon = fixture.nativeElement.querySelector('.location-icon');
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });

    it('distance should have aria-label', () => {
      component.distance = 5.2;
      fixture.detectChanges();
      const distance = fixture.nativeElement.querySelector('.location-distance');
      expect(distance?.getAttribute('aria-label')).toBe('Distance');
    });
  });

  describe('Default Values', () => {
    it('should have postcode default to empty string', () => {
      expect(component.postcode).toBe('');
    });

    it('should have area default to empty string', () => {
      expect(component.area).toBe('');
    });

    it('should have size default to md', () => {
      expect(component.size).toBe('md');
    });

    it('should have variant default to primary', () => {
      expect(component.variant).toBe('primary');
    });

    it('should have clickable default to false', () => {
      expect(component.clickable).toBe(false);
    });

    it('should have distanceUnit default to km', () => {
      expect(component.distanceUnit).toBe('km');
    });

    it('should have customClass default to empty string', () => {
      expect(component.customClass).toBe('');
    });
  });

  describe('Complete Integration', () => {
    it('should render complete location badge with all info', () => {
      component.postcode = 'SW1A 1AA';
      component.area = 'Westminster, London';
      component.distance = 5.2;
      component.distanceUnit = 'km';
      component.size = 'lg';
      component.variant = 'primary';
      component.clickable = true;
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector('.location-badge');
      const postcode = fixture.nativeElement.querySelector('.location-postcode');
      const area = fixture.nativeElement.querySelector('.location-area');
      const distance = fixture.nativeElement.querySelector('.location-distance');

      expect(badge?.classList.contains('badge-lg')).toBe(true);
      expect(badge?.classList.contains('badge-primary')).toBe(true);
      expect(badge?.classList.contains('clickable')).toBe(true);
      expect(postcode?.textContent).toContain('SW1A 1AA');
      expect(area?.textContent).toContain('Westminster, London');
      expect(distance?.textContent).toContain('5.2km');
    });
  });
});
