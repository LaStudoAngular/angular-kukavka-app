import { AbstractControl } from '@angular/forms';

export default class CustomValidators {
  static emailDomain(domainName: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email: string = control.value;
      const domain: string = email.slice(email.lastIndexOf('@') + 1).toLowerCase();

      if (email === '' || domain === domainName.toLowerCase()) {
        return null;
      } else {
        return { emailDomainError: true };
      }
    };
  }
}
