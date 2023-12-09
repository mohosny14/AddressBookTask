import { Register } from './../../../Core/Models/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/Services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private authService:AuthService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.registerForm.value).subscribe(response => {
      if(response.succeeded == true){
        this.router.navigate(['/add-employee']);
        Swal.fire({
          icon: 'success',
          text:'Login successful!',
        })
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId', response.data.userId)
        localStorage.setItem('lastName', response.data.lastName)
        localStorage.setItem('firstName', response.data.firstName)
        this.router.navigate(['/add-employee']);
      }else{
        Swal.fire({
          icon: 'error',
          text: response.message,
        })
      }
    }, error => {
      console.error('Error:', error);
    });
  }
}
