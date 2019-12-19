import { AbstractControl } from '@angular/forms';

export function emailDomain(control: AbstractControl): { [key: string]: any } | null {
  const email: string = control.value;
  const domain: string = email.slice(email.lastIndexOf('@') + 1).toLowerCase();

  if (email === '' || domain === 'gmail.com') {
    return null;
  } else {
    return { emailDomainError: true };
  }
}
