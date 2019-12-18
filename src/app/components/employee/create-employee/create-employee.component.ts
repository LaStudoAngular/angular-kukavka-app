import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vk-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {
  public employeeCreateForm: FormGroup;
  // users: FormArray;
  private destroy$ = new Subject();
  private messagesVocabulary = {
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
  public formErrors = {
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
      skills: this.fb.group({
        skillName: ['', Validators.required],
        skillExperience: ['', Validators.required],
        skillProficiency: ['', Validators.required],
      }),
    });
    this.employeeCreateForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.logValidationErrors(this.employeeCreateForm);
        // console.log(this.formErrors);
      });
  }

  public onSubmit(): void {
    console.log(this.employeeCreateForm);
  }

  public logValidationErrors(group: FormGroup = this.employeeCreateForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      // проверяем, является ли abstractControl простым input или группой inputs
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (
          abstractControl &&
          abstractControl.invalid &&
          (abstractControl.dirty || abstractControl.touched)
        ) {
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
    // this.logValidationErrors(this.employeeCreateForm);
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
