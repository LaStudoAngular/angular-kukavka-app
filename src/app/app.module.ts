import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// COMPONENTS
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { ListEmployeesComponent } from './components/employee/list-employees/list-employees.component';

@NgModule({
  declarations: [AppComponent, CreateEmployeeComponent, ListEmployeesComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
