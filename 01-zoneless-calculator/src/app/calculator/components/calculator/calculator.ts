import { ChangeDetectionStrategy, Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorButton } from '../calculator-button/calculator-button';
import { CalculatorService } from '../../services/calculator';

@Component({
  selector: 'calculator',
  imports: [CalculatorButton],
  templateUrl: './calculator.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  },
  // styles: `
  //   @import "../../../../styles.css";

  //   .is-command {
  //     @apply bg-indigo-700 hover:bg-indigo-700/20;
  //   }
  // `,
})
export class Calculator {

  private calculatorService = inject(CalculatorService);

  calculatorbuttons = viewChildren( CalculatorButton);

  resultText = computed( () => this.calculatorService.resultText() );
  subResultText = computed( () => this.calculatorService.subResultText() );
  lastOperator = computed( () => this.calculatorService.lastOperator() );

  // get resultText() {
  //   return this.calculatorService.resultText();
  // }


  handleClick(key: string) {
    // console.log({ key });
    this.calculatorService.constructNumber(key);
  }

  handleKeyboardEvent( event: KeyboardEvent ) {

    const keyEquivalent: Record<string, string> = {
      Escape : 'C',
      Clear: 'C',
      '*': 'x',
      '/': '÷',
      Enter: '=',
    }

    let key = event.key;

    const keyValue = keyEquivalent[key] ?? key;

    this.handleClick( keyValue);

    this.calculatorbuttons().forEach( button => {
      button.keyboardPressedStyle(keyValue);
    });
  }

}
