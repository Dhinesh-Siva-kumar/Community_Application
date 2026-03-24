import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render spinner', () => {
    const spinner = fixture.nativeElement.querySelector('.spinner');
    expect(spinner).toBeTruthy();
  });

  it('should have proper accessibility attributes', () => {
    component.label = 'Loading content';
    fixture.detectChanges();
    
    const spinner = fixture.nativeElement.querySelector('.spinner');
    expect(spinner.getAttribute('role')).toBe('status');
    expect(spinner.getAttribute('aria-busy')).toBe('true');
  });

  it('should apply size classes', () => {
    component.size = 'lg';
    fixture.detectChanges();
    
    const spinner = fixture.nativeElement.querySelector('.spinner');
    expect(spinner.classList.contains('spinner-lg')).toBeTruthy();
  });

  it('should apply color classes', () => {
    component.color = 'white';
    fixture.detectChanges();
    
    const spinner = fixture.nativeElement.querySelector('.spinner');
    expect(spinner.classList.contains('spinner-white')).toBeTruthy();
  });
});
