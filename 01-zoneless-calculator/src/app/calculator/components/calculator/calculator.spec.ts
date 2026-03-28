import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Calculator } from './calculator';
import { CalculatorService } from '../../services/calculator';
import { CalculatorButton } from '../calculator-button/calculator-button';
import { By } from '@angular/platform-browser';

class MockCalculatorService {
  resultText = signal('100');
  subResultText = signal('20');
  lastOperator = signal('-');

  constructNumber = vi.fn();

}

describe('Calculator', () => {

  let component: Calculator;

  let fixture: ComponentFixture<Calculator>;

  let mockCalculatorService: MockCalculatorService;

  beforeEach(() => {

    mockCalculatorService = new MockCalculatorService();

    TestBed.configureTestingModule({
      imports: [Calculator],
      providers: [
        { provide: CalculatorService, useValue: mockCalculatorService }
      ]
    });

    fixture = TestBed.createComponent(Calculator);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Important
  });

  it('should create', () => {

    // const compile = fixture.nativeElement as HTMLElement;
    // // console.log(compile.innerHTML);

    // console.log({
    //   resultText: component.resultText(),
    //   subResultText: component.subResultText(),
    //   lastOperator: component.lastOperator(),
    // })

    expect(component).toBeTruthy();
  });

  it('should have initial values from service', () => {
    
    expect(component.resultText()).toBe('100');
    expect(component.subResultText()).toBe('20');
    expect(component.lastOperator()).toBe('-');

  });

  it('should display values in the template', () => {
    
    mockCalculatorService.resultText.set('50');
    mockCalculatorService.subResultText.set('10');
    mockCalculatorService.lastOperator.set('*');

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const resultTextElement = compiled
      .querySelector('[test-id="result-text"]');

    const subResultTextElement = compiled
      .querySelector('[test-id="subResultText"]');

    
    // console.log('resultTextElement', resultTextElement?.innerHTML);
    // console.log('subResultTextElement', subResultTextElement?.innerHTML);

    expect(resultTextElement?.innerHTML).toBe('50');
    expect(subResultTextElement?.innerHTML).toContain('10 *');

  });

  it('should call constructNumber when handleClick is called', () => {
    component.handleClick('5');

    expect(mockCalculatorService.constructNumber).toHaveBeenCalled();
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('5');

  });

  it('should handle keyboard events correctly', () => {
    const event = new KeyboardEvent('keyup', { key: '1' });
    document.dispatchEvent(event);

    expect(mockCalculatorService.constructNumber).toHaveBeenCalled();
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('1');

  });

  it('should handle special keyboard events (Enter -> =)', () => {
        const event = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(event);

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');
  });

  it('should handle special keyboard events (Escape -> C)', () => {
    const event = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should call constructNumber when button is clicked', () => {
    const buttons = fixture.debugElement.queryAll( 
      By.directive(CalculatorButton) 
    );

    const button = buttons[0];

    button.triggerEventHandler('onClick', 'C');

    expect(buttons.length).toBe(19);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');

  });

  it('should update resultText signal when service updates', () => {
    mockCalculatorService.resultText.set('999');
    fixture.detectChanges();
    expect(component.resultText()).toBe('999');
  });

  it('should have 19 calculator-button components with content projected', () => {
    
    const compile = fixture.nativeElement as HTMLElement;

    const buttons = compile.querySelectorAll('calculator-button');

    expect(buttons.length).toBe(19);


    const expectedButtons = ['C', '+/-', '%', '÷', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];

    buttons.forEach( (button, index) => {
      expect(button.querySelector('button')?.innerHTML).toContain(expectedButtons[index]);
    });

    // expect(buttons[0].querySelector('button')?.innerHTML).toContain('C');
    // expect(buttons[1].querySelector('button')?.innerHTML).toContain('+/-');
    // expect(buttons[2].querySelector('button')?.innerHTML).toContain('%');
    // expect(buttons[3].querySelector('button')?.innerHTML).toContain('÷');
    // expect(buttons[4].querySelector('button')?.innerHTML).toContain('7');
    // expect(buttons[5].querySelector('button')?.innerHTML).toContain('8');
    // expect(buttons[6].querySelector('button')?.innerHTML).toContain('9');
    // expect(buttons[7].querySelector('button')?.innerHTML).toContain('x');
    // expect(buttons[8].querySelector('button')?.innerHTML).toContain('4');
    // expect(buttons[9].querySelector('button')?.innerHTML).toContain('5');
    // expect(buttons[10].querySelector('button')?.innerHTML).toContain('6');
    // expect(buttons[11].querySelector('button')?.innerHTML).toContain('-');
    // expect(buttons[12].querySelector('button')?.innerHTML).toContain('1');
    // expect(buttons[13].querySelector('button')?.innerHTML).toContain('2');
    // expect(buttons[14].querySelector('button')?.innerHTML).toContain('3');
    // expect(buttons[15].querySelector('button')?.innerHTML).toContain('+');
    // expect(buttons[16].querySelector('button')?.innerHTML).toContain('0');
    // expect(buttons[17].querySelector('button')?.innerHTML).toContain('.');
    // expect(buttons[18].querySelector('button')?.innerHTML).toContain('=');

  });

});