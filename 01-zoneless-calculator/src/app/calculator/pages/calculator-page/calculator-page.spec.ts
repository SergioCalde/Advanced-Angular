import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorPage from './calculator-page';
import { Component } from '@angular/core';


@Component({
  selector: 'calculator',
  template: '<div>Mock Calculator Component</div>'
})
class MockCalculatorComponent {}


describe('CalculatorPage', () => {

  let component: CalculatorPage;

  let fixture: ComponentFixture<CalculatorPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [CalculatorPage],
    })
      .overrideComponent(CalculatorPage, {
        set: {
          imports: [MockCalculatorComponent],
        }
      });

    fixture = TestBed.createComponent(CalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Important
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render calculator component', () => {

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('calculator')).toBeTruthy();
  });

  it('should contain the specific CSS classes in the wrapper div', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const divElement = compiled.querySelector('div');

    const expectedClasses = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');

    expectedClasses.forEach(className => {
      expect(divElement?.classList).toContain(className);
    });
  });

});