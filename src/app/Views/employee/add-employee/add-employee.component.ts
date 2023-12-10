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

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  maxDate: string = '';
  jobTitles : Job [] = [];
  departments :Department [] = [];
  Image : any
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
      photo: null
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      alert('1');
      const employeeData = this.employeeForm.value;
      employeeData.photo = this.Image;
      employeeData.birthDate = this.datePipe.transform(employeeData.birthDate, 'yyyy-MM-ddTHH:mm:ss');
      //const formData = new FormData();
    // formData.append('fullName', employeeData.fullName);
    // formData.append('jobId', employeeData.jobId);
    // formData.append('departmentId', employeeData.departmentId);
    // formData.append('mobileNumber', employeeData.mobileNumber);
    // formData.append('birthDate', this.datePipe.transform(employeeData.birthDate, 'yyyy-MM-ddTHH:mm:ss')??'')
    // formData.append('adress', employeeData.adress);
    // formData.append('email', employeeData.email);
    console.log(employeeData);
    //formData.append('photo', employeeData.photo);
    // if(this.Image){
    //   formData.append('photo',this.Image,'imageName')
    //  }

    // Object.keys(employeeData).forEach((key) => {
    //   employeeModel.append(key, employeeData[key]);
    // });

      // Perform submission logic (e.g., send data to server)
      console.log('Employee data submitted:', employeeData);
        this.employeeService.createEmployee(employeeData).subscribe(res => {
          if (res.succeeded) {
           // this.toaster.openSuccessToaster('تم الحفظ بنجاح')
            this.router.navigate(['/clients/all-clients'])
          }
          else {
            //this.toaster.openErrorToaster(res.message)
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
            //this.toaster.openErrorToaster(err.error.message)
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
            console.log(this.departments);             
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

    UploadFile(event: any): void {
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        this.Image = fileList[0];
      }
    }
}
