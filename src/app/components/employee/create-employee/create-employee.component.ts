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
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      users: this.fb.array([this.createNewFormSection()]),
      skills: this.fb.group({
        skillName: ['', Validators.requiredTrue],
        skillExperience: ['', Validators.requiredTrue],
        skillProficiency: ['beginner', Validators.requiredTrue],
      }),
    });
  }

  public onSubmit(): void {
    console.log(this.employeeCreateForm);
  }

  private logPairs(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      // проверяем, является ли abstractControl простым input или группой inputs
      if (abstractControl instanceof FormGroup) {
        this.logPairs(abstractControl);
        // abstractControl.disable() - деактивирует все input данной группы
      } else {
        // abstractControl.disable() - деактивирует выбранный input
        // abstractControl.markAsDirty() - программно обозначает input как dirty - в поле вводились данные
        console.log(`Key :: ${key} Value :: ${abstractControl.value}`);
      }
    });
  }

  public loadData(): void {
    this.logPairs(this.employeeCreateForm);
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
