import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show image when src is provided', () => {
    component.src = 'https://example.com/avatar.jpg';
    fixture.detectChanges();
    
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.src).toContain('avatar.jpg');
  });

  it('should show initials when name is provided but no src', () => {
    component.name = 'John Doe';
    fixture.detectChanges();
    
    const initials = fixture.nativeElement.querySelector('.avatar-initials');
    expect(initials.textContent).toBe('JD');
  });

  it('should apply correct size class', () => {
    component.size = 'lg';
    fixture.detectChanges();
    
    const avatar = fixture.nativeElement.querySelector('.avatar');
    expect(avatar.classList.contains('avatar-lg')).toBeTruthy();
  });

  it('should apply correct background color class', () => {
    component.backgroundColor = 'success';
    fixture.detectChanges();
    
    const avatar = fixture.nativeElement.querySelector('.avatar');
    expect(avatar.classList.contains('avatar-bg-success')).toBeTruthy();
  });

  it('should have proper aria role and label', () => {
    component.alt = 'User avatar';
    fixture.detectChanges();
    
    const avatar = fixture.nativeElement.querySelector('.avatar');
    expect(avatar.getAttribute('role')).toBe('img');
    expect(avatar.getAttribute('aria-label')).toBe('User avatar');
  });
});
