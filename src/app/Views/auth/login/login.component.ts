import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  loginForm: FormGroup;

  constructor(private authService:AuthService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe(response => {
      if(response.succeeded == true){
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
      Swal.fire({
        icon: 'error',
        text: error.error.message,
      })
    });
  }

  navi(){
    this.router.navigate(['/add-employee']);
  }

}
