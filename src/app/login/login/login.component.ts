import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConstants } from 'src/app/api.constant';
import { ApiServiceService } from 'src/app/core/api-services/api-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;


  constructor(private fb: FormBuilder,public apiService:ApiServiceService,  private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }
showPassword: boolean = false;

togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted:', this.loginForm.value);
     this.getLoginDetails();
    }
  }
  getLoginDetails() {
    const loginBody = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

  
    this.apiService.postRequestedResponse(`${ApiConstants.login}`,loginBody).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Handle successful login here
        if(response?.type==='user'){
          localStorage.setItem('userId', response.user_id);
         localStorage.setItem('type', response.type);
          this.router.navigate(['/user']);
        } else if (response?.type==='superuser'){
           localStorage.setItem('userId', response.user_id);  
          localStorage.setItem('type', response.type);
          this.router.navigate(['/superuser']);
        } else {
          console.error('Unknown user type:', response?.type);
          // Handle unknown user type here
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Handle login error here
        if (error.status === 401) {
          alert('Invalid email or password. Please try again.');
        } else {
          alert('An error occurred during login. Please try again later.');
        }

      }
    })  
  }
}
