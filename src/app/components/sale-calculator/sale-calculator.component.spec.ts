import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCalculatorComponent } from './sale-calculator.component';

describe('SaleCalculatorComponent', () => {
  let component: SaleCalculatorComponent;
  let fixture: ComponentFixture<SaleCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // view to model test for control element
  it('should update the value of the input field', () => {
    const input = fixture.nativeElement.querySelector('input');
    // const event = createNewEvent('input');

    input.value = 'Red';
    input.dispatchEvent(event);

    expect(fixture.componentInstance.phoneCondition.value).toEqual('Red');
  });
});
