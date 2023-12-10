import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from 'src/app/Core/Models/job';
import { JobService } from 'src/app/Core/Services/job.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {
  jobTitles : Job [] = [];
  job: Job = {} as Job
  edit:boolean=false

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
        id: ['', Validators.required],

      });
    }
  ngOnInit(): void {
    this.getJobs();
  }

  editJob(item : any){
      this.edit=true
      this.jobForm.patchValue({
        name: item.name,
        description: item.description,
        id: item.id,
      })
  }

  deleteJob(id: number) {
    const index = this.jobTitles.findIndex((job) => job.id === id);
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
        this.jobService.deleteJob(id).subscribe(
          (response) => {
            this.jobTitles.splice(index, 1);
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

  onSubmit() {
    if (this.jobForm.valid) {
      this.edit=false
      this.jobService.editJob(this.jobForm.value).subscribe(res => {
          if (res.succeeded) {
            this.getJobs()
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
      this.router.navigate(['/add-job']);
    }
}
