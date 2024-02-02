import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let date = new Date(control.value);
    if (date >= today) {
      return null;
    } else {
      return { date: 'Date should be in the future' };
    }
  };
}
