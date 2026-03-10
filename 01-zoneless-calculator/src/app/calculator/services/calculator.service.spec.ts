import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator';
import { vi } from 'vitest';

describe('CalculatorService', () => {

  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
    vi.resetAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText, subResultText to "0" when C is pressed', () => {
    // Arrange
    service.resultText.set('123');
    service.subResultText.set('456');
    service.lastOperator.set('-');

    // Act
    service.constructNumber('C');

    // Assert
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should update resultText with number input', () => {
    service.constructNumber('1');
    service.constructNumber('2');

    // console.log( 'ResultText', service.resultText() );
    
    expect(service.resultText()).toBe('12');

  });

  it('should handle operators correctly', () => {
    //Arrange
    service.resultText.set('12345');
    
    // Act
    service.constructNumber('-');

    // Assert
    expect(service.resultText()).toBe('0');
    expect(service.lastOperator()).toBe('-');
    expect(service.subResultText()).toBe('12345');
    
    service.resultText.set('12');
    service.constructNumber('*');
    
    expect(service.resultText()).toBe('0');
    expect(service.lastOperator()).toBe('*');


  });

  it('should handle operators correctly', () => {
    const operators = ['+', '-', '*', '/'];

    operators.forEach( operator => {
      // Arrange
      service.resultText.set('123');
      // Act
      service.constructNumber(operator);
      // Assert
      expect(service.resultText()).toBe('0');
      expect(service.lastOperator()).toBe(operator);
    });

  });

  it('should calculate result correctly for addition', () => {
    // Arrange
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');

    // Act
    service.constructNumber('=');

    // Assert
    expect(service.resultText()).toBe('3');
  });

  it('should calculate result correctly for subtraction', () => {
    // Arrange
    service.constructNumber('4');
    service.constructNumber('-');
    service.constructNumber('1');

    // Act
    service.constructNumber('=');

    // Assert
    expect(service.resultText()).toBe('3');
  });

  it('should calculate result correctly for multiplication', () => {
    // Arrange
    service.constructNumber('1');
    service.constructNumber('*');
    service.constructNumber('3');

    // Act
    service.constructNumber('=');

    // Assert
    expect(service.resultText()).toBe('3');
  });

  it('should calculate result correctly for division', () => {
    // Arrange
    service.constructNumber('1');
    service.constructNumber('0');
    service.constructNumber('/');
    service.constructNumber('2');

    // Act
    service.constructNumber('=');

    // Assert
    expect(service.resultText()).toBe('5');
  });

  it('should handle decimal point correctly', () => {
    // Arrange
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('5');
    
    // Assert
    expect(service.resultText()).toBe('12.5');
    service.constructNumber('.');
    expect(service.resultText()).toBe('12.5');

  });

  it('should handle decimal point starting with 0', () => {
    // Arrange
    service.constructNumber('.');
    service.constructNumber('.');
    expect(service.resultText()).toBe('0.');

    service.constructNumber('5');
    
    // Assert
    expect(service.resultText()).toBe('0.5');
    service.constructNumber('.');
    expect(service.resultText()).toBe('0.5');
  });

  it('should handle sign change +/-', () => {
    // Arrange
    service.resultText.set('15');

    // Act
    service.constructNumber('+/-');
    
    // Assert
    expect(service.resultText()).toBe('-15');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('15');
  });

  it('should handle backspace', () => {
    // Arrange
    service.constructNumber('1');
    service.constructNumber('2');
    service.constructNumber('3');
    
    // Act
    service.constructNumber('Backspace');

    // Assert
    expect(service.resultText()).toBe('12');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('1');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle backspace with negative numbers', () => {
    // Arrange
    service.resultText.set('-123');

    // Act
    service.constructNumber('Backspace');
    
    // Assert
    expect(service.resultText()).toBe('-12');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('-1');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle max length', () => {

    const consoleSpy = vi.spyOn(console, 'warn');

    consoleSpy.mockImplementation(() => {});

    for (let i = 0; i < 15; i++) {
      service.constructNumber('1');
    }
    expect(service.resultText().length).toBe(10);
    expect(service.resultText()).toBe('1111111111');

    expect(consoleSpy).toHaveBeenCalled();   

    expect(consoleSpy).toHaveBeenCalledTimes(5);
  });

  it('should handle invalid input', () => {

    const consoleSpy = vi.spyOn(console, 'warn');

    service.resultText.set('15');
    service.constructNumber('ABC');
    // expect(service.resultText()).toBe('15');

    expect(consoleSpy).toHaveBeenCalled(); 
    expect(consoleSpy).toHaveBeenCalledWith('Invalid input: ', 'ABC');

  });

  it('should handle negative zero input correctly', () => {
    service.resultText.set('-0');
    service.constructNumber('1');
    expect(service.resultText()).toBe('-1');
  });

});
