import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render a button element', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button).toBeTruthy();
    });

    it('should project content into button', () => {
      fixture.componentInstance.customClass = '';
      fixture.nativeElement.innerHTML = '<app-button>Click Me</app-button>';
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button');
      expect(button.textContent).toContain('Click Me');
    });
  });

  describe('Variants', () => {
    it('should apply primary variant by default', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('btn-primary')).toBeTruthy();
    });

    it('should apply secondary variant when specified', () => {
      component.variant = 'secondary';
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('btn-secondary')).toBeTruthy();
    });

    it('should apply outline variant when specified', () => {
      component.variant = 'outline';
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('btn-outline')).toBeTruthy();
    });

    it('should apply fab variant when specified', () => {
      component.variant = 'fab';
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('btn-fab')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('should apply default size (md)', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('btn-md')).toBeFalsy(); // md is default, not added
    });

    it('should apply sm size when specified', () => {
      component.size = 'sm';
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('btn-sm')).toBeTruthy();
    });

    it('should apply lg size when specified', () => {
      component.size = 'lg';
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('btn-lg')).toBeTruthy();
    });
  });

  describe('States', () => {
    it('should be disabled when disabled input is true', () => {
      component.disabled = true;
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button');
      expect(button.disabled).toBeTruthy();
      expect(button.getAttribute('aria-disabled')).toBe('true');
    });

    it('should show loading state when loading is true', () => {
      component.loading = true;
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('loading')).toBeTruthy();
      expect(button.disabled).toBeTruthy();
      expect(button.getAttribute('aria-busy')).toBe('true');
    });

    it('should disable click when loading', () => {
      component.loading = true;
      fixture.detectChanges();
      
      spyOn(component.clicked, 'emit');
      component.onClick();
      
      expect(component.clicked.emit).not.toHaveBeenCalled();
    });

    it('should disable click when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      
      spyOn(component.clicked, 'emit');
      component.onClick();
      
      expect(component.clicked.emit).not.toHaveBeenCalled();
    });

    it('should apply full-width class when fullWidth is true', () => {
      component.fullWidth = true;
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('btn-full-width')).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('should emit click event when clicked', () => {
      spyOn(component.clicked, 'emit');
      component.onClick();
      
      expect(component.clicked.emit).toHaveBeenCalled();
    });

    it('should emit click event on button click', () => {
      spyOn(component.clicked, 'emit');
      const button = fixture.nativeElement.querySelector('button');
      
      button.click();
      
      expect(component.clicked.emit).toHaveBeenCalled();
    });

    it('should not emit click when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      
      spyOn(component.clicked, 'emit');
      component.onClick();
      
      expect(component.clicked.emit).not.toHaveBeenCalled();
    });

    it('should apply custom classes', () => {
      component.customClass = 'custom-button my-custom-class';
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('custom-button')).toBeTruthy();
      expect(button.classList.contains('my-custom-class')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have type="button" by default', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button.type).toBe('button');
    });

    it('should have aria-disabled when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button');
      expect(button.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have aria-busy when loading', () => {
      component.loading = true;
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button');
      expect(button.getAttribute('aria-busy')).toBe('true');
    });
  });
});
