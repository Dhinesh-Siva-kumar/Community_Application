import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyStateComponent } from './empty-state.component';

describe('EmptyStateComponent', () => {
  let component: EmptyStateComponent;
  let fixture: ComponentFixture<EmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyStateComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render icon', () => {
    component.icon = '📭';
    fixture.detectChanges();
    
    const icon = fixture.nativeElement.querySelector('.empty-state-icon');
    expect(icon.textContent).toBe('📭');
  });

  it('should render title', () => {
    component.title = 'No results';
    fixture.detectChanges();
    
    const title = fixture.nativeElement.querySelector('.empty-state-title');
    expect(title.textContent).toBe('No results');
  });

  it('should render description if provided', () => {
    component.description = 'Try a different search';
    fixture.detectChanges();
    
    const description = fixture.nativeElement.querySelector('.empty-state-description');
    expect(description.textContent).toBe('Try a different search');
  });

  it('should project content', () => {
    fixture.nativeElement.innerHTML = '<app-empty-state><p>Custom content</p></app-empty-state>';
    fixture.detectChanges();
    
    expect(fixture.nativeElement.textContent).toContain('Custom content');
  });
});
