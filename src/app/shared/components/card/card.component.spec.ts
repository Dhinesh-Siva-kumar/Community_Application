import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render a div element', () => {
      const card = fixture.nativeElement.querySelector('div');
      expect(card).toBeTruthy();
    });

    it('should project content into card', () => {
      // Create a test host component to properly test content projection
      @Component({
        selector: 'app-test-host',
        template: '<app-card><p>Card Content</p></app-card>',
        standalone: true,
        imports: [CardComponent]
      })
      class TestHostComponent {}
      
      const hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.detectChanges();
      
      const card = hostFixture.nativeElement.querySelector('div');
      expect(card?.textContent).toContain('Card Content');
    });
  });

  describe('Variants', () => {
    it('should apply default variant by default', () => {
      const card = fixture.nativeElement.querySelector('div');
      expect(card.classList.contains('card')).toBeTruthy();
      expect(card.classList.contains('card-default')).toBeFalsy();
    });

    it('should apply elevated variant when specified', () => {
      component.variant = 'elevated';
      fixture.detectChanges();
      
      const card = fixture.nativeElement.querySelector('div');
      expect(card.classList.contains('card-elevated')).toBeTruthy();
    });

    it('should apply interactive variant when specified', () => {
      component.variant = 'interactive';
      fixture.detectChanges();
      
      const card = fixture.nativeElement.querySelector('div');
      expect(card.classList.contains('card-interactive')).toBeTruthy();
      expect(card.classList.contains('cursor-pointer')).toBeTruthy();
    });

    it('should apply flat variant when specified', () => {
      component.variant = 'flat';
      fixture.detectChanges();
      
      const card = fixture.nativeElement.querySelector('div');
      expect(card.classList.contains('card-flat')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('should apply default size by default', () => {
      const card = fixture.nativeElement.querySelector('div');
      expect(card.classList.contains('card-default')).toBeFalsy();
    });

    it('should apply compact size when specified', () => {
      component.size = 'compact';
      fixture.detectChanges();
      
      const card = fixture.nativeElement.querySelector('div');
      expect(card.classList.contains('card-compact')).toBeTruthy();
    });

    it('should apply large size when specified', () => {
      component.size = 'large';
      fixture.detectChanges();
      
      const card = fixture.nativeElement.querySelector('div');
      expect(card.classList.contains('card-large')).toBeTruthy();
    });
  });

  describe('Color Variants', () => {
    it('should not apply color class when colorVariant is none', () => {
      const card = fixture.nativeElement.querySelector('div');
      expect(card.classList.contains('card-none')).toBeFalsy();
    });

    it('should apply primary color variant when specified', () => {
      component.colorVariant = 'primary';
      fixture.detectChanges();
      
      const card = fixture.nativeElement.querySelector('div');
      expect(card.classList.contains('card-primary')).toBeTruthy();
    });

    it('should apply success color variant when specified', () => {
      component.colorVariant = 'success';
      fixture.detectChanges();
      
      const card = fixture.nativeElement.querySelector('div');
      expect(card.classList.contains('card-success')).toBeTruthy();
    });

    it('should apply error color variant when specified', () => {
      component.colorVariant = 'error';
      fixture.detectChanges();
      
      const card = fixture.nativeElement.querySelector('div');
      expect(card.classList.contains('card-error')).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('should emit click event only for interactive variant', () => {
      component.variant = 'interactive';
      fixture.detectChanges();
      
      spyOn(component.clicked, 'emit');
      component.onClick();
      
      expect(component.clicked.emit).toHaveBeenCalled();
    });

    it('should not emit click event for non-interactive variants', () => {
      component.variant = 'default';
      fixture.detectChanges();
      
      spyOn(component.clicked, 'emit');
      component.onClick();
      
      expect(component.clicked.emit).not.toHaveBeenCalled();
    });

    it('should apply custom classes', () => {
      component.customClass = 'my-custom-card custom-style';
      fixture.detectChanges();
      
      const card = fixture.nativeElement.querySelector('div');
      expect(card.classList.contains('my-custom-card')).toBeTruthy();
      expect(card.classList.contains('custom-style')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have role="button" for interactive cards', () => {
      component.variant = 'interactive';
      fixture.detectChanges();
      
      const card = fixture.nativeElement.querySelector('div');
      expect(card.getAttribute('role')).toBe('button');
    });

    it('should have tabindex="0" for interactive cards', () => {
      component.variant = 'interactive';
      fixture.detectChanges();
      
      const card = fixture.nativeElement.querySelector('div');
      expect(card.getAttribute('tabindex')).toBe('0');
    });

    it('should not have role or tabindex for non-interactive cards', () => {
      component.variant = 'default';
      fixture.detectChanges();
      
      const card = fixture.nativeElement.querySelector('div');
      expect(card.getAttribute('role')).toBeNull();
      expect(card.getAttribute('tabindex')).toBeNull();
    });
  });
});
