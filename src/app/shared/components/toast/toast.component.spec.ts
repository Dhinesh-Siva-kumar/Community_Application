import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
  });

  describe('Rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render toast when isVisible is true', () => {
      component.isVisible = true;
      component.message = 'Test message';
      fixture.detectChanges();
      const toast = fixture.nativeElement.querySelector('.toast');
      expect(toast).toBeTruthy();
    });

    it('should not render toast when isVisible is false', () => {
      component.isVisible = false;
      fixture.detectChanges();
      const toast = fixture.nativeElement.querySelector('.toast');
      expect(toast).toBeNull();
    });

    it('should display message text', () => {
      component.isVisible = true;
      component.message = 'Success! Operation completed';
      fixture.detectChanges();
      const message = fixture.nativeElement.querySelector('.toast-message');
      expect(message?.textContent).toContain('Success! Operation completed');
    });

    it('should render close button when showCloseButton is true', () => {
      component.isVisible = true;
      component.showCloseButton = true;
      fixture.detectChanges();
      const closeBtn = fixture.nativeElement.querySelector('.toast-close-btn');
      expect(closeBtn).toBeTruthy();
    });

    it('should not render close button when showCloseButton is false', () => {
      component.isVisible = true;
      component.showCloseButton = false;
      fixture.detectChanges();
      const closeBtn = fixture.nativeElement.querySelector('.toast-close-btn');
      expect(closeBtn).toBeNull();
    });
  });

  describe('Variants', () => {
    it('should apply success variant class', () => {
      component.isVisible = true;
      component.variant = 'success';
      fixture.detectChanges();
      const toast = fixture.nativeElement.querySelector('.toast');
      expect(toast?.classList.contains('toast-success')).toBe(true);
    });

    it('should apply error variant class', () => {
      component.isVisible = true;
      component.variant = 'error';
      fixture.detectChanges();
      const toast = fixture.nativeElement.querySelector('.toast');
      expect(toast?.classList.contains('toast-error')).toBe(true);
    });

    it('should apply warning variant class', () => {
      component.isVisible = true;
      component.variant = 'warning';
      fixture.detectChanges();
      const toast = fixture.nativeElement.querySelector('.toast');
      expect(toast?.classList.contains('toast-warning')).toBe(true);
    });

    it('should apply info variant class (default)', () => {
      component.isVisible = true;
      component.variant = 'info';
      fixture.detectChanges();
      const toast = fixture.nativeElement.querySelector('.toast');
      expect(toast?.classList.contains('toast-info')).toBe(true);
    });
  });

  describe('Positions', () => {
    const positions = [
      'top-start',
      'top-center',
      'top-end',
      'bottom-start',
      'bottom-center',
      'bottom-end'
    ];

    positions.forEach((position) => {
      it(`should apply ${position} position class`, () => {
        component.isVisible = true;
        component.position = position as any;
        fixture.detectChanges();
        const toast = fixture.nativeElement.querySelector('.toast');
        expect(toast?.classList.contains(`position-${position}`)).toBe(true);
      });
    });
  });

  describe('Icons', () => {
    it('should display success icon for success variant', () => {
      component.variant = 'success';
      const icon = component.getIcon();
      expect(icon).toBe('✓');
    });

    it('should display error icon for error variant', () => {
      component.variant = 'error';
      const icon = component.getIcon();
      expect(icon).toBe('✕');
    });

    it('should display warning icon for warning variant', () => {
      component.variant = 'warning';
      const icon = component.getIcon();
      expect(icon).toBe('⚠');
    });

    it('should display info icon for info variant', () => {
      component.variant = 'info';
      const icon = component.getIcon();
      expect(icon).toBe('ⓘ');
    });

    it('should render icon in toast', () => {
      component.isVisible = true;
      component.variant = 'success';
      fixture.detectChanges();
      const icon = fixture.nativeElement.querySelector('.toast-icon');
      expect(icon?.textContent).toContain('✓');
    });
  });

  describe('Auto Dismiss', () => {
    it('should auto-dismiss after duration when autoDismiss is true', fakeAsync(() => {
      component.autoDismiss = true;
      component.duration = 1000;
      component.ngOnInit();
      expect(component.isVisible).toBe(true);
      tick(1000);
      expect(component.isVisible).toBe(false);
    }));

    it('should not auto-dismiss when autoDismiss is false', fakeAsync(() => {
      component.autoDismiss = false;
      component.duration = 1000;
      component.ngOnInit();
      expect(component.isVisible).toBe(true);
      tick(1500);
      expect(component.isVisible).toBe(true);
    }));

    it('should use custom duration for auto-dismiss', fakeAsync(() => {
      component.autoDismiss = true;
      component.duration = 2500;
      component.ngOnInit();
      tick(2000);
      expect(component.isVisible).toBe(true);
      tick(500);
      expect(component.isVisible).toBe(false);
    }));
  });

  describe('Events', () => {
    it('should emit close event when onClose is called', () => {
      spyOn(component.close, 'emit');
      component.onClose();
      expect(component.close.emit).toHaveBeenCalled();
    });

    it('should emit close event when close button is clicked', () => {
      spyOn(component.close, 'emit');
      component.isVisible = true;
      component.showCloseButton = true;
      fixture.detectChanges();
      const closeBtn = fixture.nativeElement.querySelector('.toast-close-btn');
      closeBtn.click();
      expect(component.close.emit).toHaveBeenCalled();
    });

    it('should set isVisible to false when closed', () => {
      component.isVisible = true;
      component.onClose();
      expect(component.isVisible).toBe(false);
    });
  });

  describe('Hover Behavior', () => {
    it('should pause auto-dismiss on mouse enter', fakeAsync(() => {
      component.autoDismiss = true;
      component.duration = 1000;
      component.isVisible = true;
      component.ngOnInit();
      tick(500);
      component.onMouseEnter();
      tick(600);
      expect(component.isVisible).toBe(true);
    }));

    it('should resume auto-dismiss on mouse leave', fakeAsync(() => {
      component.autoDismiss = true;
      component.duration = 1000;
      component.isVisible = true;
      component.ngOnInit();
      tick(500);
      component.onMouseEnter();
      tick(600);
      component.onMouseLeave();
      tick(1000);
      expect(component.isVisible).toBe(false);
    }));

    it('should not resume dismiss on mouse leave if already closed', fakeAsync(() => {
      component.autoDismiss = true;
      component.duration = 100;
      component.isVisible = true;
      component.ngOnInit();
      tick(100);
      component.isVisible = false;
      component.onMouseLeave();
      // Should not throw error
      expect(component.isVisible).toBe(false);
    }));
  });

  describe('Accessibility', () => {
    it('should have role="alert" on toast', () => {
      component.isVisible = true;
      fixture.detectChanges();
      const toast = fixture.nativeElement.querySelector('.toast');
      expect(toast?.getAttribute('role')).toBe('alert');
    });

    it('should have aria-live="assertive" for error variant', () => {
      component.isVisible = true;
      component.variant = 'error';
      fixture.detectChanges();
      const toast = fixture.nativeElement.querySelector('.toast');
      expect(toast?.getAttribute('aria-live')).toBe('assertive');
    });

    it('should have aria-live="polite" for non-error variants', () => {
      component.isVisible = true;
      component.variant = 'success';
      fixture.detectChanges();
      const toast = fixture.nativeElement.querySelector('.toast');
      expect(toast?.getAttribute('aria-live')).toBe('polite');
    });

    it('should have aria-atomic="true"', () => {
      component.isVisible = true;
      fixture.detectChanges();
      const toast = fixture.nativeElement.querySelector('.toast');
      expect(toast?.getAttribute('aria-atomic')).toBe('true');
    });

    it('close button should have aria-label', () => {
      component.isVisible = true;
      component.showCloseButton = true;
      fixture.detectChanges();
      const closeBtn = fixture.nativeElement.querySelector('.toast-close-btn');
      expect(closeBtn?.getAttribute('aria-label')).toBe('Close notification');
    });

    it('icon should have aria-hidden', () => {
      component.isVisible = true;
      fixture.detectChanges();
      const icon = fixture.nativeElement.querySelector('.toast-icon');
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });

    it('close button × should have aria-hidden', () => {
      component.isVisible = true;
      component.showCloseButton = true;
      fixture.detectChanges();
      const span = fixture.nativeElement.querySelector('.toast-close-btn span');
      expect(span?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Custom Classes', () => {
    it('should apply custom class to toast', () => {
      component.isVisible = true;
      component.customClass = 'custom-toast-class';
      fixture.detectChanges();
      const toast = fixture.nativeElement.querySelector('.toast');
      expect(toast?.classList.contains('custom-toast-class')).toBe(true);
    });
  });

  describe('Lifecycle', () => {
    it('should clear dismiss timer on ngOnDestroy', fakeAsync(() => {
      spyOn(window, 'clearTimeout');
      component.autoDismiss = true;
      component.duration = 5000;
      component.ngOnInit();
      component.ngOnDestroy();
      expect(window.clearTimeout).toHaveBeenCalled();
    }));

    it('should clear timer when closed manually', () => {
      spyOn(window, 'clearTimeout');
      component.autoDismiss = true;
      component.ngOnInit();
      component.onClose();
      expect(window.clearTimeout).toHaveBeenCalled();
    });
  });

  describe('Default Values', () => {
    it('should have message default to empty string', () => {
      expect(component.message).toBe('');
    });

    it('should have variant default to info', () => {
      expect(component.variant).toBe('info');
    });

    it('should have position default to bottom-end', () => {
      expect(component.position).toBe('bottom-end');
    });

    it('should have autoDismiss default to true', () => {
      expect(component.autoDismiss).toBe(true);
    });

    it('should have duration default to 5000ms', () => {
      expect(component.duration).toBe(5000);
    });

    it('should have customClass default to empty string', () => {
      expect(component.customClass).toBe('');
    });

    it('should have showCloseButton default to true', () => {
      expect(component.showCloseButton).toBe(true);
    });

    it('should have isVisible default to true', () => {
      expect(component.isVisible).toBe(true);
    });
  });
});
