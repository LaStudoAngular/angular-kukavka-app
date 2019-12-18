import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vk-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {
  employeeCreateForm: FormGroup;
  users: FormArray;
  messagesVocabulary = {
    name: {
      required: 'Name is required',
      minlength: 'Name must be greater than 2 characters',
      maxlength: 'Name must be less than 20 characters',
    },
    email: {
      required: 'Email is required',
      email: 'Input must be valid email',
    },
    skillName: {
      required: 'Name is required',
    },
    skillExperience: {
      required: 'Experience is required',
    },
    skillProficiency: {
      required: 'Proficiency is required',
    },
  };
  formErrors = {
    name: '',
    email: '',
    skillName: '',
    skillExperience: '',
    skillProficiency: '',
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.employeeCreateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      // users: this.fb.array([this.createNewFormSection()]),
      skills: this.fb.group({
        skillName: ['', Validators.required],
        skillExperience: ['', Validators.required],
        skillProficiency: ['', Validators.required],
      }),
    });
  }

  public onSubmit(): void {
    console.log(this.employeeCreateForm);
  }

  private logValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      // проверяем, является ли abstractControl простым input или группой inputs
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && abstractControl.invalid) {
          const messages = this.messagesVocabulary[key];
          // abstractControl.errors - перебираем все существующие на данный момент ошибки валидации в контроле
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }

  public loadData(): void {
    this.logValidationErrors(this.employeeCreateForm);
    console.log(this.formErrors);
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

  ngOnDestroy(): void {}
}
