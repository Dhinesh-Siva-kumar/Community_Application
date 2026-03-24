import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render an input element', () => {
      const input = fixture.nativeElement.querySelector('input');
      expect(input).toBeTruthy();
    });

    it('should render label when provided', () => {
      component.label = 'Email';
      fixture.detectChanges();
      
      const label = fixture.nativeElement.querySelector('label');
      expect(label.textContent).toContain('Email');
    });

    it('should not render label when not provided', () => {
      component.label = '';
      fixture.detectChanges();
      
      const label = fixture.nativeElement.querySelector('label');
      expect(label).toBeFalsy();
    });
  });

  describe('Input Types', () => {
    it('should set input type to text by default', () => {
      const input = fixture.nativeElement.querySelector('input');
      expect(input.type).toBe('text');
    });

    it('should set input type to email when specified', () => {
      component.type = 'email';
      fixture.detectChanges();
      
      const input = fixture.nativeElement.querySelector('input');
      expect(input.type).toBe('email');
    });

    it('should set input type to password when specified', () => {
      component.type = 'password';
      fixture.detectChanges();
      
      const input = fixture.nativeElement.querySelector('input');
      expect(input.type).toBe('password');
    });
  });

  describe('Attributes', () => {
    it('should set placeholder', () => {
      component.placeholder = 'Enter email';
      fixture.detectChanges();
      
      const input = fixture.nativeElement.querySelector('input');
      expect(input.placeholder).toBe('Enter email');
    });

    it('should set disabled state', () => {
      component.disabled = true;
      fixture.detectChanges();
      
      const input = fixture.nativeElement.querySelector('input');
      expect(input.disabled).toBeTruthy();
    });

    it('should set required attribute', () => {
      component.required = true;
      fixture.detectChanges();
      
      const input = fixture.nativeElement.querySelector('input');
      expect(input.required).toBeTruthy();
    });
  });

  describe('Sizing', () => {
    it('should apply default size (md)', () => {
      const input = fixture.nativeElement.querySelector('input');
      expect(input.classList.contains('input-md')).toBeFalsy();
    });

    it('should apply sm size when specified', () => {
      component.size = 'sm';
      fixture.detectChanges();
      
      const input = fixture.nativeElement.querySelector('input');
      expect(input.classList.contains('input-sm')).toBeTruthy();
    });

    it('should apply lg size when specified', () => {
      component.size = 'lg';
      fixture.detectChanges();
      
      const input = fixture.nativeElement.querySelector('input');
      expect(input.classList.contains('input-lg')).toBeTruthy();
    });
  });

  describe('States', () => {
    it('should show error message when errorMessage is provided', () => {
      component.errorMessage = 'Email is required';
      fixture.detectChanges();
      
      const error = fixture.nativeElement.querySelector('.form-error-message');
      expect(error.textContent).toContain('Email is required');
    });

    it('should show helper text when provided and no error', () => {
      component.helperText = 'Enter a valid email';
      fixture.detectChanges();
      
      const helper = fixture.nativeElement.querySelector('.form-helper-text');
      expect(helper.textContent).toContain('Enter a valid email');
    });

    it('should show success message when provided', () => {
      component.successMessage = 'Email verified';
      fixture.detectChanges();
      
      const success = fixture.nativeElement.querySelector('.form-success-message');
      expect(success.textContent).toContain('Email verified');
    });

    it('should apply error class to input when error message exists', () => {
      component.errorMessage = 'Invalid email';
      fixture.detectChanges();
      
      const input = fixture.nativeElement.querySelector('input');
      expect(input.classList.contains('input-error')).toBeTruthy();
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value', () => {
      component.writeValue('test@example.com');
      expect(component.value).toBe('test@example.com');
    });

    it('should emit valueChange on input change', () => {
      spyOn(component.valueChange, 'emit');
      const input = fixture.nativeElement.querySelector('input');
      
      input.value = 'new@example.com';
      input.dispatchEvent(new Event('input'));
      
      expect(component.valueChange.emit).toHaveBeenCalledWith('new@example.com');
    });

    it('should emit focused event on focus', () => {
      spyOn(component.focused, 'emit');
      const input = fixture.nativeElement.querySelector('input');
      
      input.focus();
      
      expect(component.focused.emit).toHaveBeenCalled();
    });

    it('should emit blurred event on blur', () => {
      spyOn(component.blurred, 'emit');
      const input = fixture.nativeElement.querySelector('input');
      
      input.focus();
      input.blur();
      
      expect(component.blurred.emit).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label', () => {
      component.label = 'Email Address';
      fixture.detectChanges();
      
      const input = fixture.nativeElement.querySelector('input');
      expect(input.getAttribute('aria-label')).toBe('Email Address');
    });

    it('should have aria-describedby pointing to error message', () => {
      component.errorMessage = 'Error text';
      fixture.detectChanges();
      
      const input = fixture.nativeElement.querySelector('input');
      expect(input.getAttribute('aria-describedby')).toBe('error-message');
    });

    it('should show required indicator', () => {
      component.label = 'Email';
      component.required = true;
      fixture.detectChanges();
      
      const label = fixture.nativeElement.querySelector('label');
      expect(label.classList.contains('required-indicator')).toBeTruthy();
    });
  });
});
