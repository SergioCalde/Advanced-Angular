import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButton } from './calculator-button';
import { vi } from 'vitest';
import { Component } from '@angular/core';

@Component({
  imports: [CalculatorButton],
  template: `
  <calculator-button>
    <span class="projected-content"> 7 </span>
  </calculator-button>`
})
class TestHostComponent {}


describe('CalculatorButton', () => {

  let component: CalculatorButton;

  let fixture: ComponentFixture<CalculatorButton>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [CalculatorButton],
    });

    fixture = TestBed.createComponent(CalculatorButton);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Important
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 double size is false', () => {
    const htmlElement = fixture.nativeElement as HTMLElement;
    const hostCss = htmlElement.classList.value;

    expect(hostCss).toContain('w-1/4');
    expect(hostCss).not.toContain('w-2/4');
  });

  it('should apply w-2/4 double size is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();

    const htmlElement = fixture.nativeElement as HTMLElement;
    const hostCss = htmlElement.classList.value;

    
    expect(hostCss).toContain('w-2/4');
    expect(hostCss).not.toContain('w-1/4');
  });

  it('should apply is-command class when isCommand is true', () => {
    fixture.componentRef.setInput('isCommand', true);
    fixture.detectChanges();

    const htmlElement = fixture.nativeElement as HTMLElement;
    const hostCss = htmlElement.classList.value;

    expect(hostCss).toContain('is-command');
  });

  it('should emit onClick when handleClick is called', () => {
    
    const spy = vi.spyOn(component.onClick, 'emit');

    const buttonElement = (fixture.nativeElement as HTMLElement).querySelector('button');

    expect(buttonElement).toBeTruthy();

    buttonElement!.innerText = '  9  ';

    buttonElement!.click();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('9');

  });


  it('should set isPressed to true and then false when keyboardPressedStyle is called with matching key', async() => {
    // const buttonElement = (fixture.nativeElement as HTMLElement).querySelector('button');
    // buttonElement!.innerText = '9';
    component.contentValue()!.nativeElement.innerText = '9';

    component.keyboardPressedStyle('9');

    expect(component.isPressed()).toBe(true);


    // setTimeout(() => {
    //   expect(true).toBe(false);
    //   done();
    // },101);

    await new Promise((resolve) => setTimeout(resolve, 201));

    expect(component.isPressed()).toBe(false);

  });

  it('should NOT set isPressed if key does not match', () => {
    
    component.contentValue()!.nativeElement.innerText = '9';
    component.keyboardPressedStyle('8');

    expect(component.isPressed()).toBe(false);
    


  });

  it('should display projected content', () => {
    
    const fixtureHost = TestBed.createComponent(TestHostComponent);
    fixtureHost.detectChanges();

    const compiled = fixtureHost.nativeElement as HTMLElement;


    expect(compiled.querySelector('.projected-content')).toBeTruthy();
    expect(compiled.textContent.trim()).toBe('7');
    // expect(compiled.querySelector('.projected-content')?.textContent?.trim()).toBe('7');

  });
  

});