import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Views/auth/login/login.component';
import  {AuthGuard}   from './Core/Guards/auth.guard';
import { AddEmployeeComponent } from './Views/employee/add-employee/add-employee.component';
import { RegisterComponent } from './Views/auth/register/register.component';
import { EmployeeListComponent } from './Views/employee/employee-list/employee-list.component';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./home/home.module').then((m) => m.HomeModule),
  // },
  { path: 'add-employee', component: AddEmployeeComponent ,canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'employees', component: EmployeeListComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
