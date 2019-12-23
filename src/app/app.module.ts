import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// MODULES
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// COMPONENTS
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './components/employee/create-employee/create-employee.component';
import { ListEmployeesComponent } from './components/employee/list-employees/list-employees.component';

@NgModule({
  declarations: [AppComponent, CreateEmployeeComponent, ListEmployeesComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
