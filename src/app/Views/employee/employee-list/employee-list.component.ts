import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/Core/Models/department';
import { Employee, EmployeeModel } from 'src/app/Core/Models/employee';
import { Job } from 'src/app/Core/Models/job';
import { DepartmentService } from 'src/app/Core/Services/department.service';
import { EmployeeService } from 'src/app/Core/Services/employee.service';
import { JobService } from 'src/app/Core/Services/job.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss','../add-employee/add-employee.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  jobTitles : Job [] = [];
  departments :Department [] = [];
  edit:boolean=false

  employeeForm: FormGroup;
  image : any
  maxDate: string = '';


  constructor(private employeeService: EmployeeService,
    private departmentService : DepartmentService,
    private jobService : JobService,
    private datePipe: DatePipe,
    private fb:FormBuilder
    ) {
      this.employeeForm = this.fb.group({
        fullName: ['', Validators.required],
        jobId: ['', [Validators.required, Validators.pattern(/^-?\d+\.?\d*$/)]],
        departmentId: ['', [Validators.required, Validators.pattern(/^-?\d+\.?\d*$/)]],
        mobileNumber: ['', Validators.required],
        birthDate: ['', Validators.required],
        adress: ['',Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        id: ['', Validators.required],
        photo: [null, Validators.required],
      });
    }
  ngOnInit(): void {
    this.getEmployees();
    this.getDepartments();
    this.getJobs();

  }

  getEmployees() {
    this.employeeService.getAllEmployeess().subscribe({
      next: (res) => {
        if(res.succeeded)
        {
          res.data.forEach((item: { photoUrl: string; }) => {
            item.photoUrl = 'https://localhost:44318'+item.photoUrl.split('wwwroot')[1];
            item.photoUrl = item.photoUrl.replace(/\\/g, "/");
          });
           this.employees = res.data;
        }
        else{
          this.employees = []
        }
      },
      error: (err) => {
         this.employees = []
      }
    })
  }
  onCancel() {
    this.edit = false;
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

  editEmployee(employee: any) {
    this.edit=true
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      jobId: employee.jobId,
      departmentId: employee.departmentId,
      mobileNumber: employee.mobileNumber,
      birthDate: employee.birthDate,
      adress: employee.adress,
      email: employee.email,
      password: employee.password,
      photo: employee.photo,
      id: employee.id,
    })
  }

  deleteEmployee(employeeId: number) {
    const index = this.employees.findIndex((employee) => employee.id === employeeId);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(employeeId).subscribe(
          (response) => {
            this.employees.splice(index, 1);
            Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
          },
          (error) => {
            Swal.fire('Error!', 'Failed to delete employee.', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your employee is safe :)', 'info');
      }
    });
  }


  exportToExcel(data: any[]): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'employeesList' + '.xlsx');
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
    formData.append('id', employeeData.id);
    if(this.image){
      formData.set('photo',this.image)
     }

      this.edit=false
      this.employeeService.editEmployee(formData).subscribe(res => {
          if (res.succeeded) {
            this.getEmployees()
            Swal.fire({
              icon: 'success',
              text: 'Updated Successfully!',
            })
            this.employeeForm.patchValue({

            })

          }
          else {
            Swal.fire({
              icon: 'error',
              text: res.message,
            })
          }
        }, err => {

          // if (err.error.errors && err.error.errors.length > 0) {
          //   let arr = []
          //   for (const key in err.error.errors) {
          //     if (Array.isArray(err.error.errors[key])) {
          //       arr.push(err.error.errors[key])
          //     }
          //   }
          //   //this.openErrorToaster(arr.join(','))
          // }
          // else {
          //   Swal.fire({
          //     icon: 'error',
          //     text: err.error.message,
          //   })
          // }
        })

      }
    }

  UploadFile(event: any) {
    this.image = event.target.files[0];
  }
}
