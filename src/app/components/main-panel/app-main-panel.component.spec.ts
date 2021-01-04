import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMainPanelComponent } from './app-main-panel.component';

describe('AppMainPanelComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppMainPanelComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppMainPanelComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'sellphone-ng'`, () => {
  //   const fixture = TestBed.createComponent(AppMainPanelComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('sellphone-ng');
  // });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppMainPanelComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('sellphone-ng app is running!');
  });
});
