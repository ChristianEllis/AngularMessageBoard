//Library Imports
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//Custom Components
import { User } from './user.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent {
  signinForm: FormGroup;

  constructor(private authService:AuthService, private router: Router) {
  }

  onSubmit(){
    //console.log(this.signinForm);
    const user = new User(this.signinForm.value.email, this.signinForm.value.password);
    this.authService.signin(user)
      .subscribe(
        data => {
          //store user login info via token method
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          this.router.navigateByUrl('/'); //bring back to messages page
        },
        error => console.error(error)
      );
    this.signinForm.reset();
  }

  ngOnInit(){
    this.signinForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, Validators.required),
    });
  }
}
