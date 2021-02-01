import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PhoneEstimatorComponent } from './phone-estimator.component';

describe('AppPhoneEstimatorComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        PhoneEstimatorComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PhoneEstimatorComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'sellphone-ng'`, () => {
  //   const fixture = TestBed.createComponent(AppPhoneEstimatorComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('sellphone-ng');
  // });

  it('should render title', () => {
    const fixture = TestBed.createComponent(PhoneEstimatorComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('sellphone-ng app is running!');
  });
});
