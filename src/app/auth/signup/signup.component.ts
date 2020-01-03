import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string;
  constructor(private authService: AuthService, private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  createNewUser() {
     const email = this.signupForm.get('email').value;
     const password = this.signupForm.get('password').value;
     this.authService.createUser(email, password).then(
       () => {
          this.router.navigate(['/auth/sign-in']);
       },
       (error) => {
          this.errorMessage = error;
       }
     )
  }

  

}
