import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vk-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {
  count = 0;
  destroy$ = new Subject();
  employeeCreateForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.employeeCreateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      skills: this.fb.group({
        skillName: ['', Validators.requiredTrue],
        skillExperience: ['', Validators.requiredTrue],
        skillProficiency: ['beginner', Validators.requiredTrue],
      }),
    });
    this.name.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((name: string) => (this.count = name.length));
    // ПОДПИСКА ИДЕТ НА ВСЕ КОНТРОЛЫ, КАКИЕ ЕСТЬ У ФОРМЫ
    this.employeeCreateForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((v: any) => console.log(v));
    // ПОДПИСКА ИДЕТ НА ВСЕХ КОНТРОЛЫ ПОДГРУППЫ ФОРМЫ
    this.employeeCreateForm
      .get('skills')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((v: any) => console.log(v));
  }

  onSubmit(): void {
    console.log(this.employeeCreateForm);
  }

  loadData(): void {
    this.employeeCreateForm.setValue({
      name: 'Green Mouse',
      email: 'greem.mouse@gmail.com',
      skills: {
        skillName: 'HTML',
        skillExperience: '2',
        skillProficiency: 'beginner',
      },
    });
  }

  get name() {
    return this.employeeCreateForm.get('name');
  }

  get email() {
    return this.employeeCreateForm.get('email');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
