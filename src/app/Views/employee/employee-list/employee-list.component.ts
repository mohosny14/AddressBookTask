import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/Core/Models/department';
import { Employee } from 'src/app/Core/Models/employee';
import { Job } from 'src/app/Core/Models/job';
import { DepartmentService } from 'src/app/Core/Services/department.service';
import { EmployeeService } from 'src/app/Core/Services/employee.service';
import { JobService } from 'src/app/Core/Services/job.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  jobTitles : Job [] = [];
  departments :Department [] = [];
  //cols: any[] = [];
  
  constructor(private employeeService: EmployeeService,
    private departmentService : DepartmentService,
    private jobService : JobService,
    //public dialog: MatDialog
    ) {}
  ngOnInit(): void {
    this.getEmployees();
    // this.getDepartments();
    // this.getJobs();

  }

  getEmployees() {
    this.employeeService.getAllEmployeess().subscribe({
      next: (res) => {
        if(res.succeeded)
        {
           this.employees = res.data;      
           console.log(this.employees) 
     
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

  editEmployee(employee: Employee) {
    // const dialogRef = this.dialog.open(EditEmployeeComponent, {
    //   width: '400px',
    //   data: { ...employee }, // Pass a copy of the employee data to the dialog
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   // Handle the result after the dialog is closed
    //   if (result) {
    //     // Update the employee data in your list
    //     const index = this.employees.findIndex((e) => e.id === result.id);
    //     if (index !== -1) {
    //       this.employees[index] = result;
    //     }
    //   }
    // });
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
}