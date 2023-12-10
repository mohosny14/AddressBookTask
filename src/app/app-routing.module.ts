import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Views/auth/login/login.component';
import  {AuthGuard}   from './Core/Guards/auth.guard';
import { AddEmployeeComponent } from './Views/employee/add-employee/add-employee.component';
import { RegisterComponent } from './Views/auth/register/register.component';
import { EmployeeListComponent } from './Views/employee/employee-list/employee-list.component';
import { JobListComponent } from './Views/job/job-list/job-list.component';
import { AddJobComponent } from './Views/job/add-job/add-job.component';
import { DepartmentListComponent } from './Views/department/department-list/department-list.component';
import { AddDepartmentComponent } from './Views/department/add-department/add-department.component';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./home/home.module').then((m) => m.HomeModule),
  // },
  { path: 'add-employee', component: AddEmployeeComponent},
  { path: 'jobs', component: JobListComponent,canActivate:[AuthGuard] },
  { path: 'add-job', component: AddJobComponent,canActivate:[AuthGuard] },
  { path: 'departments', component: DepartmentListComponent },
  { path: 'add-department', component: AddDepartmentComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'employees', component: EmployeeListComponent },
  {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
