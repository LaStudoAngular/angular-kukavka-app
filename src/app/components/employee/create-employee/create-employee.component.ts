import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'vk-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {
  count = 0;
  employeeCreateForm: FormGroup;
  users: FormArray;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.employeeCreateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      users: this.fb.array([this.createNewFormSection()]),
      skills: this.fb.group({
        skillName: ['', Validators.requiredTrue],
        skillExperience: ['', Validators.requiredTrue],
        skillProficiency: ['beginner', Validators.requiredTrue],
      }),
    });
  }

  onSubmit(): void {
    console.log(this.employeeCreateForm);
  }

  loadData(): void {
    this.employeeCreateForm.patchValue({
      name: 'Green Mouse',
      email: 'greem.mouse@gmail.com',
      skills: {
        skillName: 'HTML',
        skillExperience: '2',
        skillProficiency: 'beginner',
      },
    });
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

  get name(): FormControl {
    return this.employeeCreateForm.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.employeeCreateForm.get('email') as FormControl;
  }

  ngOnDestroy(): void {}
}
