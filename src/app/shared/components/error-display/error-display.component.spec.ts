import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorDisplayComponent } from './error-display.component';

describe('ErrorDisplayComponent', () => {
  let component: ErrorDisplayComponent;
  let fixture: ComponentFixture<ErrorDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorDisplayComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render error title', () => {
    component.title = 'Error occurred';
    fixture.detectChanges();
    
    const title = fixture.nativeElement.querySelector('.error-title');
    expect(title.textContent).toBe('Error occurred');
  });

  it('should render error message', () => {
    component.message = 'Something went wrong';
    fixture.detectChanges();
    
    const message = fixture.nativeElement.querySelector('.error-message');
    expect(message.textContent).toBe('Something went wrong');
  });

  it('should render error details list', () => {
    component.details = ['Error 1', 'Error 2'];
    fixture.detectChanges();
    
    const details = fixture.nativeElement.querySelectorAll('.error-details li');
    expect(details.length).toBe(2);
    expect(details[0].textContent).toBe('Error 1');
  });

  it('should show close button when dismissible is true', () => {
    component.dismissible = true;
    fixture.detectChanges();
    
    const closeBtn = fixture.nativeElement.querySelector('.error-close');
    expect(closeBtn).toBeTruthy();
  });

  it('should hide error when dismissed', () => {
    component.dismissed.subscribe(() => {});
    spyOn(component.dismissed, 'emit');
    
    component.dismiss();
    fixture.detectChanges();
    
    const errorDisplay = fixture.nativeElement.querySelector('.error-display');
    expect(errorDisplay).toBeFalsy();
    expect(component.dismissed.emit).toHaveBeenCalled();
  });

  it('should have proper accessibility role', () => {
    const errorDisplay = fixture.nativeElement.querySelector('.error-display');
    expect(errorDisplay.getAttribute('role')).toBe('alert');
  });
});
