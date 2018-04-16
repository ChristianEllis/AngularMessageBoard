//Library Imports
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//Custom Components
import { AuthService } from './auth.service';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router){
  }

  onSubmit(){
    //console.log(this.signupForm);
    const user = new User(
      this.signupForm.value.email,
      this.signupForm.value.password,
      this.signupForm.value.fName,
      this.signupForm.value.lName);
    this.authService.signup(user)
      .subscribe(
        data => console.log(data),
        error => console.error(error)
      );
    this.router.navigateByUrl('/auth/signin');
    this.signupForm.reset();
  }

  ngOnInit(){
    this.signupForm = new FormGroup({
      fName: new FormControl(null, Validators.required),
      lName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, Validators.required),
    });
  }
}
