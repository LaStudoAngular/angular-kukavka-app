import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTS
import { ListEmployeesComponent } from './components/employee/list-employees/list-employees.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';

const routes: Routes = [
  { path: 'list', component: ListEmployeesComponent },
  { path: 'create/:id', component: CreateEmployeeComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
