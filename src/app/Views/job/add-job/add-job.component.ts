import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/Core/Models/department';
import { EmployeeModel } from 'src/app/Core/Models/employee';
import { Job } from 'src/app/Core/Models/job';
import { DepartmentService } from 'src/app/Core/Services/department.service';
import { EmployeeService } from 'src/app/Core/Services/employee.service';
import { JobService } from 'src/app/Core/Services/job.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent {

  jobTitles : Job [] = [];
  job: Job = {} as Job

  jobForm: FormGroup;
  maxDate: string = '';


  constructor(
    private jobService : JobService,
    private datePipe: DatePipe,
    private fb:FormBuilder,
    private router:Router
    ) {
      this.jobForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', [Validators.required]],
      });
    }
  ngOnInit(): void {
  }
  onSubmit() {
    if (this.jobForm.valid) {

      console.log(this.jobForm.value);
      this.jobService.createJob(this.jobForm.value).subscribe(res => {
          if (res.succeeded) {
            console.log(res);
            Swal.fire({
              icon: 'success',
              text: 'Added Successfully!',
            })
            this.router.navigate(['/jobs']);

          }
          else {
            Swal.fire({
              icon: 'error',
              text: res.message,
            })
          }
        })

      }
    }
}
