import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render badge with content', () => {
    fixture.nativeElement.innerHTML = '<app-badge>New</app-badge>';
    fixture.detectChanges();
    
    const badge = fixture.nativeElement.querySelector('span');
    expect(badge.textContent).toContain('New');
  });

  it('should apply variant classes', () => {
    component.variant = 'success';
    fixture.detectChanges();
    
    const badge = fixture.nativeElement.querySelector('span');
    expect(badge.classList.contains('badge-success')).toBeTruthy();
  });

  it('should apply size classes', () => {
    component.size = 'lg';
    fixture.detectChanges();
    
    const badge = fixture.nativeElement.querySelector('span');
    expect(badge.classList.contains('badge-lg')).toBeTruthy();
  });

  it('should apply custom classes', () => {
    component.customClass = 'my-badge';
    fixture.detectChanges();
    
    const badge = fixture.nativeElement.querySelector('span');
    expect(badge.classList.contains('my-badge')).toBeTruthy();
  });
});
