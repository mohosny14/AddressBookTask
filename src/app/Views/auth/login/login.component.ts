import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  loginForm: FormGroup;

  constructor(private authService:AuthService,private fb: FormBuilder,private toastr: ToastrService) {
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
        this.toastr.success('Login successful!', 'Success');
      }else{
        this.toastr.error('Login failed. Please check your credentials.', 'Error');
      }
    }, error => {
      console.error('Error:', error);
    });
  }

}
