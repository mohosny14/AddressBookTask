import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/Core/Models/department';
import { EmployeeModel } from 'src/app/Core/Models/employee';
import { Job } from 'src/app/Core/Models/job';
import { DepartmentService } from 'src/app/Core/Services/department.service';
import { EmployeeService } from 'src/app/Core/Services/employee.service';
import { JobService } from 'src/app/Core/Services/job.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  image : any
  maxDate: string = '';
  jobTitles : Job [] = [];
  departments :Department [] = [];
  employee: EmployeeModel = {} as EmployeeModel


  ngOnInit(): void {
    this.getDepartments();
    this.getJobs();
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private employeeService: EmployeeService,
              private departmentService : DepartmentService,
              private jobService : JobService,
              private activeRoute: ActivatedRoute,
              private datePipe: DatePipe) {
    this.employeeForm = this.fb.group({
      fullName: ['', Validators.required],
      jobId: ['', [Validators.required, Validators.pattern(/^-?\d+\.?\d*$/)]],
      departmentId: ['', [Validators.required, Validators.pattern(/^-?\d+\.?\d*$/)]],
      mobileNumber: ['', Validators.required],
      birthDate: ['', Validators.required],
      adress: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      photo: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
       const employeeData = this.employeeForm.value;
      const formData = new FormData();
    formData.append('fullName', employeeData.fullName);
    formData.append('jobId', employeeData.jobId);
    formData.append('departmentId', employeeData.departmentId);
    formData.append('mobileNumber', employeeData.mobileNumber);
    formData.append('password', employeeData.password);
    formData.append('birthDate', this.datePipe.transform(employeeData.birthDate, 'yyyy-MM-ddTHH:mm:ss')??'')
    formData.append('adress', employeeData.adress);
    formData.append('email', employeeData.email);
    if(this.image){
      formData.set('photo',this.image)
     }

        this.employeeService.createEmployee(formData).subscribe(res => {
          if (res.succeeded) {
            this.router.navigate(['/clients/all-clients'])
          }
          else {
            Swal.fire({
              icon: 'error',
              text: res.message,
            })
          }
        }, err => {

          if (err.error.errors && err.error.errors.length > 0) {
            let arr = []
            for (const key in err.error.errors) {
              if (Array.isArray(err.error.errors[key])) {
                arr.push(err.error.errors[key])
              }
            }
            //this.openErrorToaster(arr.join(','))
          }
          else {
            Swal.fire({
              icon: 'error',
              text: err.error.message,
            })
          }
        })

      }
    }

    getDepartments() {
      this.departmentService.getAllDepartments().subscribe({
        next: (res) => {
          if(res)
          {
            this.departments = res.data;
          }
          else{
           this.departments = []
          }
        },
        error: (err) => {
          this.departments = []
        }
      })
    }

    getJobs() {
      this.jobService.getAllJobs().subscribe({
        next: (res) => {
          if(res.succeeded)
          {
             this.jobTitles = res.data;

          }
          else{
            this.jobTitles = []
          }
        },
        error: (err) => {
           this.jobTitles = []
        }
      })
    }

    UploadFile(event: any) {
      this.image = event.target.files[0];
    }
    // onCancel() {
    //   this.edit = false;
    // }
}
