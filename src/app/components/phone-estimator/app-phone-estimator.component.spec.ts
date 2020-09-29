import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppPhoneEstimatorComponent } from './app-phone-estimator.component';

describe('AppPhoneEstimatorComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppPhoneEstimatorComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppPhoneEstimatorComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'sellphone-ng'`, () => {
    const fixture = TestBed.createComponent(AppPhoneEstimatorComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('sellphone-ng');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppPhoneEstimatorComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('sellphone-ng app is running!');
  });
});
