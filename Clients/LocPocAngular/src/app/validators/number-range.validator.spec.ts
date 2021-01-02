import { NumberRangeValidator, NumberRange } from './number-range.validator';
import { AbstractControl } from '@angular/forms';

describe('NumberRangeValidator', () => {
    let validator: NumberRangeValidator;

    beforeEach(() => {
        validator = new NumberRangeValidator();
    });

    it('should detect incorrect range when value is a number', () => {
        const range: NumberRange = {
            min: -10,
            max: 10
        };

        validator.validationContext = range;
        let control = { value: 11 };
        expect(validator.validate(control as AbstractControl).incorrectRange).toBeTruthy();
        control = { value: -11 };
        expect(validator.validate(control as AbstractControl).incorrectRange).toBeTruthy();
        control = { value: 0 };
        expect(validator.validate(control as AbstractControl)).toBeNull();
        control = { value: 10 };
        expect(validator.validate(control as AbstractControl)).toBeNull();
        control = { value: -10 };
        expect(validator.validate(control as AbstractControl)).toBeNull();
        const control2 = { value: '-10' };
        expect(validator.validate(control2 as AbstractControl)).toBeNull();
    });

    it('should detect incorrect range when value is not a number', () => {
        const range: NumberRange = {
            min: -10,
            max: 10
        };

        validator.validationContext = range;
        let control = { value: 'ABC' };
        expect(validator.validate(control as AbstractControl).incorrectRange).toBeTruthy();
        control = { value: null };
        expect(validator.validate(control as AbstractControl).incorrectRange).toBeTruthy();
    });
});
