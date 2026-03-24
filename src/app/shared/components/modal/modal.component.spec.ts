import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ButtonComponent } from '../button/button.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent, ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not render modal overlay when isOpen is false', () => {
      component.isOpen = false;
      fixture.detectChanges();
      const overlay = fixture.nativeElement.querySelector('.modal-overlay');
      expect(overlay).toBeNull();
    });

    it('should render modal overlay when isOpen is true', () => {
      component.isOpen = true;
      fixture.detectChanges();
      const overlay = fixture.nativeElement.querySelector('.modal-overlay');
      expect(overlay).toBeTruthy();
    });

    it('should render modal with title', () => {
      component.isOpen = true;
      component.title = 'Test Modal Title';
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector('.modal-title');
      expect(title?.textContent).toContain('Test Modal Title');
    });

    it('should render close button when showCloseButton is true', () => {
      component.isOpen = true;
      component.showCloseButton = true;
      fixture.detectChanges();
      const closeBtn = fixture.nativeElement.querySelector('.modal-close-btn');
      expect(closeBtn).toBeTruthy();
    });

    it('should not render close button when showCloseButton is false', () => {
      component.isOpen = true;
      component.showCloseButton = false;
      fixture.detectChanges();
      const closeBtn = fixture.nativeElement.querySelector('.modal-close-btn');
      expect(closeBtn).toBeNull();
    });
  });

  describe('Size Variants', () => {
    it('should apply sm size class', () => {
      component.isOpen = true;
      component.size = 'sm';
      fixture.detectChanges();
      const modal = fixture.nativeElement.querySelector('.modal');
      expect(modal?.classList.contains('modal-sm')).toBe(true);
    });

    it('should apply md size class (default)', () => {
      component.isOpen = true;
      component.size = 'md';
      fixture.detectChanges();
      const modal = fixture.nativeElement.querySelector('.modal');
      expect(modal?.classList.contains('modal-md')).toBe(true);
    });

    it('should apply lg size class', () => {
      component.isOpen = true;
      component.size = 'lg';
      fixture.detectChanges();
      const modal = fixture.nativeElement.querySelector('.modal');
      expect(modal?.classList.contains('modal-lg')).toBe(true);
    });

    it('should apply xl size class', () => {
      component.isOpen = true;
      component.size = 'xl';
      fixture.detectChanges();
      const modal = fixture.nativeElement.querySelector('.modal');
      expect(modal?.classList.contains('modal-xl')).toBe(true);
    });
  });

  describe('Custom Classes', () => {
    it('should apply custom class to modal', () => {
      component.isOpen = true;
      component.customClass = 'custom-modal-class';
      fixture.detectChanges();
      const modal = fixture.nativeElement.querySelector('.modal');
      expect(modal?.classList.contains('custom-modal-class')).toBe(true);
    });
  });

  describe('Events', () => {
    it('should emit close event when close button is clicked', () => {
      spyOn(component.close, 'emit');
      component.isOpen = true;
      component.showCloseButton = true;
      fixture.detectChanges();
      const closeBtn = fixture.nativeElement.querySelector('.modal-close-btn');
      closeBtn.click();
      expect(component.close.emit).toHaveBeenCalled();
    });

    it('should emit close event when onClose is called', () => {
      spyOn(component.close, 'emit');
      component.onClose();
      expect(component.close.emit).toHaveBeenCalled();
    });

    it('should emit confirm event when onConfirm is called', () => {
      spyOn(component.confirm, 'emit');
      component.onConfirm();
      expect(component.confirm.emit).toHaveBeenCalled();
    });

    it('should close modal when backdrop is clicked and closeOnBackdropClick is true', () => {
      spyOn(component.close, 'emit');
      component.isOpen = true;
      component.closeOnBackdropClick = true;
      fixture.detectChanges();
      const overlay = fixture.nativeElement.querySelector('.modal-overlay');
      overlay.click();
      expect(component.close.emit).toHaveBeenCalled();
    });

    it('should not close modal when backdrop is clicked and closeOnBackdropClick is false', () => {
      spyOn(component.close, 'emit');
      component.isOpen = true;
      component.closeOnBackdropClick = false;
      fixture.detectChanges();
      const overlay = fixture.nativeElement.querySelector('.modal-overlay');
      overlay.click();
      expect(component.close.emit).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard Shortcuts', () => {
    it('should close modal when Escape key is pressed and closeOnEsc is true', () => {
      spyOn(component.close, 'emit');
      component.isOpen = true;
      component.closeOnEsc = true;
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      spyOn(event, 'preventDefault');
      component.handleEscapeKey(event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.close.emit).toHaveBeenCalled();
    });

    it('should not close modal when Escape key is pressed and closeOnEsc is false', () => {
      spyOn(component.close, 'emit');
      component.isOpen = true;
      component.closeOnEsc = false;
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.handleEscapeKey(event);
      expect(component.close.emit).not.toHaveBeenCalled();
    });

    it('should not close modal when Escape key is pressed and isOpen is false', () => {
      spyOn(component.close, 'emit');
      component.isOpen = false;
      component.closeOnEsc = true;
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.handleEscapeKey(event);
      expect(component.close.emit).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-modal attribute set to true', () => {
      component.isOpen = true;
      fixture.detectChanges();
      const modal = fixture.nativeElement.querySelector('.modal');
      expect(modal?.getAttribute('aria-modal')).toBe('true');
    });

    it('should have role="dialog" on modal', () => {
      component.isOpen = true;
      fixture.detectChanges();
      const modal = fixture.nativeElement.querySelector('.modal');
      expect(modal?.getAttribute('role')).toBe('dialog');
    });

    it('should have aria-labelledby pointing to title', () => {
      component.isOpen = true;
      component.title = 'Modal Title';
      fixture.detectChanges();
      const modal = fixture.nativeElement.querySelector('.modal');
      expect(modal?.getAttribute('aria-labelledby')).toBe('modal-title');
    });

    it('close button should have aria-label', () => {
      component.isOpen = true;
      component.showCloseButton = true;
      fixture.detectChanges();
      const closeBtn = fixture.nativeElement.querySelector('.modal-close-btn');
      expect(closeBtn?.getAttribute('aria-label')).toBe('Close modal');
    });

    it('close button × should have aria-hidden', () => {
      component.isOpen = true;
      component.showCloseButton = true;
      fixture.detectChanges();
      const span = fixture.nativeElement.querySelector('.modal-close-btn span');
      expect(span?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have role="presentation" on overlay', () => {
      component.isOpen = true;
      fixture.detectChanges();
      const overlay = fixture.nativeElement.querySelector('.modal-overlay');
      expect(overlay?.getAttribute('role')).toBe('presentation');
    });
  });

  describe('Content Projection', () => {
    it('should project body content', () => {
      component.isOpen = true;
      fixture.detectChanges();
      const body = fixture.nativeElement.querySelector('.modal-body');
      expect(body).toBeTruthy();
    });

    it('should have modal-footer element', () => {
      component.isOpen = true;
      fixture.detectChanges();
      const footer = fixture.nativeElement.querySelector('.modal-footer');
      expect(footer).toBeTruthy();
    });
  });

  describe('Default Values', () => {
    it('should have isOpen default to false', () => {
      expect(component.isOpen).toBe(false);
    });

    it('should have title default to empty string', () => {
      expect(component.title).toBe('');
    });

    it('should have size default to md', () => {
      expect(component.size).toBe('md');
    });

    it('should have closeOnBackdropClick default to true', () => {
      expect(component.closeOnBackdropClick).toBe(true);
    });

    it('should have closeOnEsc default to true', () => {
      expect(component.closeOnEsc).toBe(true);
    });

    it('should have showCloseButton default to true', () => {
      expect(component.showCloseButton).toBe(true);
    });

    it('should have customClass default to empty string', () => {
      expect(component.customClass).toBe('');
    });
  });
});
