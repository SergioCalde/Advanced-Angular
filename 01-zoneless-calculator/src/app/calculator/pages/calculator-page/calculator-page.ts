import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Calculator } from "../../components/calculator/calculator";

@Component({
  selector: 'calculator-page',
  imports: [Calculator],
  templateUrl: './calculator-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalculatorPage { }
