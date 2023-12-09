import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from 'src/app/Core/Models/department';
import { Job } from 'src/app/Core/Models/job';
import { DepartmentService } from 'src/app/Core/Services/department.service';
import { JobService } from 'src/app/Core/Services/job.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent {
  departments : Department [] = [];

  departmentForm: FormGroup;
  maxDate: string = '';


  constructor(
    private departmentService : DepartmentService,
    private datePipe: DatePipe,
    private fb:FormBuilder,
    private router:Router
    ) {
      this.departmentForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', [Validators.required]],
      });
    }
  ngOnInit(): void {
  }
  onSubmit() {
    if (this.departmentForm.valid) {
      console.log(this.departmentForm.value);
      this.departmentService.createDepartment(this.departmentForm.value).subscribe(res => {
          if (res.succeeded) {
            console.log(res);
            Swal.fire({
              icon: 'success',
              text: 'Added Successfully!',
            })
            this.router.navigate(['/departments']);

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
