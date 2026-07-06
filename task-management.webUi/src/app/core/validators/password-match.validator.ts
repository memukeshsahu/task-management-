import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  if (!newPassword || !confirmPassword) {
    return null;
  }

  if (newPassword.value === confirmPassword.value) {
    if (confirmPassword.hasError('passwordMismatch')) {
      const remainingErrors = { ...confirmPassword.errors };
      delete remainingErrors['passwordMismatch'];
      confirmPassword.setErrors(Object.keys(remainingErrors).length ? remainingErrors : null);
    }
    return null;
  } else {
    confirmPassword.setErrors({ ...confirmPassword.errors, passwordMismatch: true });
    return { passwordMismatch: true };
  }
};
