import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';



@NgModule({
  declarations: [
    EmployeeListComponent,
    AddEmployeeComponent,
    EditEmployeeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EmployeeModule { }
