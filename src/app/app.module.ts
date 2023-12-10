import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Views/auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { EmployeeModule } from './Views/employee/employee.module';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { AuthModule } from './Views/auth/auth.module';
import { JobModule } from './Views/job/job.module';
import { DepartmentModule } from './Views/department/department.module';
import { AuthGuard } from './Core/Guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    EmployeeModule,
    CommonModule,
    AuthModule,
    JobModule,
    DepartmentModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
