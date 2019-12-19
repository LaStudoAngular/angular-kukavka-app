import { AbstractControl } from '@angular/forms';

export default class CustomValidators {
  static emailDomain(domainName: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email: string = control.value;
      const domain: string = email.slice(email.lastIndexOf('@') + 1).toLowerCase();

      return email === '' || domain === domainName.toLowerCase()
        ? null
        : { emailDomainError: true };
    };
  }
}
