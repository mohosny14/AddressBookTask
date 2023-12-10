import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { AddJobComponent } from './add-job/add-job.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    JobListComponent,
    AddJobComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class JobModule { }
