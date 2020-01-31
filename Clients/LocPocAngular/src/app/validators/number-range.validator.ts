import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';


export interface NumberRange {
  min: number;
  max: number;
}

@Directive({
  selector: '[number-range-validator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NumberRangeValidator,
      multi: true
    }
  ]
})
export class NumberRangeValidator implements Validator {
  private range: NumberRange;

  @Input('number-range-validator')
  set validationContext(range: NumberRange) {
    this.range = range;
  }

  validate(control: AbstractControl): ValidationErrors {
    if (!control.value) {
      return {
        incorrectRange: true
      };
    }
    const numValue = Number(control.value);
    if (Number.isNaN(numValue)) {
      return {
        incorrectRange: true
      };
    } else {
      if (numValue > this.range.max || numValue < this.range.min) {
        return {
          incorrectRange: true
        };
      }
    }
    return null;
  }
}
