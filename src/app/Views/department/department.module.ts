import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentListComponent } from './department-list/department-list.component';
import { AddDepartmentComponent } from './add-department/add-department.component';



@NgModule({
  declarations: [
    DepartmentListComponent,
    AddDepartmentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DepartmentModule { }
