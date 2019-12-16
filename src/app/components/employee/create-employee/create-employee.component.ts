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
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      skill: this.fb.group({
        name: [null, Validators.required],
        experience: [null, Validators.required],
      }),
      proficiency: this.fb.group({
        beginner: [null, Validators.required],
        intermediate: [null, Validators.required],
        advanced: [null, Validators.required],
      }),
    });
  }

  onSubmit(): void {
    if (this.employeeCreateForm.valid) {
      const { name, email } = this.employeeCreateForm.value;
      console.log(this.employeeCreateForm);
    }
  }
}
