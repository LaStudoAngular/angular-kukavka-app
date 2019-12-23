import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import CustomValidators from '../../../shared/validators/custom.validators';
import { ActivatedRoute, Params } from '@angular/router';
import { EmployeeService } from '../../../shared/services/employee.service';
import { IEmployee } from '../../../shared/interfaces/IEmployee';

@Component({
  selector: 'vk-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {
  public employeeCreateForm: FormGroup;
  private destroy$ = new Subject();
  private messagesVocabulary = {
    name: {
      required: 'Name is required',
      minlength: 'Name must be greater than 2 characters',
      maxlength: 'Name must be less than 20 characters',
    },
    email: {
      required: 'Email is required',
      emailDomainError: 'Email must be gmail.com at the end',
    },
    confirmEmail: {
      required: 'Confirm email is required',
    },
    emailGroup: {
      matchEmailError: 'Email and Confirm Email fields do not match',
    },
    phone: {
      required: 'Phone is required',
    },
  };
  public formErrors = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.employeeService.getEmployee(params.id).subscribe((employee: IEmployee) => {
        this.employeeCreateForm.setValue(employee);
      });
    });

    this.employeeCreateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      emailGroup: this.fb.group(
        {
          email: ['', [Validators.required, CustomValidators.emailDomain('gmail.com')]],
          confirmEmail: ['', [Validators.required]],
        },
        { validator: matchEmail }
      ),
      contactPreference: ['email'],
      phone: [''],
      skills: this.fb.array([this.addSkillFormGroup()]),
    });

    this.employeeCreateForm
      .get('contactPreference')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((response: string) => {
        this.contactPreferenceHandler(response);
      });

    this.employeeCreateForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.logValidationErrors(this.employeeCreateForm);
    });
  }

  public onSubmit(): void {
    console.log(this.employeeCreateForm);
  }

  private addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      skillExperience: ['', Validators.required],
      skillProficiency: ['', Validators.required],
    });
  }

  public addNewSkillGroup(): void {
    (this.employeeCreateForm.get('skills') as FormArray).push(this.addSkillFormGroup());
  }

  public removeSkillGroup(index: number): void {
    (this.employeeCreateForm.get('skills') as FormArray).removeAt(index);
  }

  private contactPreferenceHandler(value: string): void {
    const phoneControl: FormControl = this.employeeCreateForm.get('phone') as FormControl;
    if (phoneControl && value === 'phone') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  public logValidationErrors(group: FormGroup = this.employeeCreateForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (
        abstractControl &&
        abstractControl.invalid &&
        (abstractControl.dirty || abstractControl.touched)
      ) {
        const messages = this.messagesVocabulary[key];
        for (const errorKey in abstractControl.errors) {
          if (abstractControl.errors.hasOwnProperty(errorKey)) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  public loadData(): void {
    /*
    const formArray = this.fb.array([
      this.fb.control('Mark', Validators.required),
      this.fb.group({
        country: ['Austria', Validators.required],
      }),
      this.fb.array([]),
    ]);
    formArray.push(this.fb.control('Greenberg', Validators.required));
    console.log(formArray.at(0).value + ' ' + formArray.at(formArray.length - 1).value);

    for (const control of formArray.controls) {
      if (control instanceof FormControl) {
        console.log(`form control`);
      }
      if (control instanceof FormGroup) {
        console.log(`form group`);
      }
      if (control instanceof FormArray) {
        console.log(`form array`);
      }
    }
    */
  }

  createNewFormSection(): FormGroup {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
    });
  }

  onAddNewUser(): void {
    const users = this.employeeCreateForm.get('users') as FormArray;
    users.push(this.createNewFormSection());
  }

  public get name(): FormControl {
    return this.employeeCreateForm.get('name') as FormControl;
  }

  public get email(): FormControl {
    return this.employeeCreateForm.get('email') as FormControl;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

function matchEmail(group: AbstractControl): { [key: string]: any } | null {
  const emailControl: FormControl = group.get('email') as FormControl;
  const confirmEmailControl: FormControl = group.get('confirmEmail') as FormControl;

  if (
    emailControl.value.toLowerCase() === confirmEmailControl.value.toLowerCase() ||
    confirmEmailControl.pristine
  ) {
    return null;
  } else {
    return { matchEmailError: true };
  }
}
