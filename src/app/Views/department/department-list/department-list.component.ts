import { Department } from './../../../Core/Models/department';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/Core/Services/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent {
  departments : Department [] = [];
  edit:boolean=false

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
        id: ['', Validators.required],

      });
    }
  ngOnInit(): void {
    this.getDepartment();
  }

  editDepartment(item : any){
      this.edit=true
      this.departmentForm.patchValue({
        name: item.name,
        description: item.description,
        id: item.id,
      })
  }

  deleteDepartment(id: number) {
    const index = this.departments.findIndex((d) => d.id === id);
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
        this.departmentService.deleteDepartment(id).subscribe(
          (response) => {
            this.departments.splice(index, 1);
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
  getDepartment() {
    this.departmentService.getAllDepartments().subscribe({
      next: (res) => {
        if(res.succeeded)
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

  onSubmit() {
    if (this.departmentForm.valid) {
      this.edit=false
      this.departmentService.editDepartment(this.departmentForm.value).subscribe(res => {
          if (res.succeeded) {
            this.getDepartment()
            Swal.fire({
              icon: 'success',
              text: 'Updated Successfully!',
            })
            // this.jobForm.patchValue({

            // })
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

    addNew(){
      this.router.navigate(['/add-department']);
    }
    onCancel() {
      this.edit = false;
    }
}
