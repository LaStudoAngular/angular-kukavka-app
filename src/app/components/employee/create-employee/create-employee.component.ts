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
      skills: this.fb.group({
        skillName: [null, Validators.required],
        skillExperience: [null, Validators.required],
        skillProficiency: [null, Validators.required],
      }),
    });
  }

  onSubmit(): void {
    if (this.employeeCreateForm.valid) {
      const { name, email } = this.employeeCreateForm.value;
      console.log(this.employeeCreateForm);
    }
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
}
