import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../../../shared/services/employee.service';
import { IEmployee } from '../../../shared/interfaces/IEmployee';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'vk-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss'],
})
export class ListEmployeesComponent implements OnInit, OnDestroy {
  constructor(private employeeService: EmployeeService, private router: Router) {}
  public employees: IEmployee[] = [];
  private destroy$ = new Subject();

  // editEmployee(index: number): void {
  //   this.employeeService
  //     .getEmployee(index)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((employee: IEmployee) => console.log(employee));
  // }

  editEmployee(index: number): void {
    this.router.navigate(['create', index]);
  }

  ngOnInit(): void {
    this.employeeService
      .getEmployees()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (employees: IEmployee[]) => (this.employees = employees),
        error => console.log(error)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
