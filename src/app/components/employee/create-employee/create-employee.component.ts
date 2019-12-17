import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vk-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent implements OnInit {
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
}
