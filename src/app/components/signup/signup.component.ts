import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required, Validators.email
    ]),
    fullName: new FormControl(null, [
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.required
    ])
  })

  constructor(private userService: UserService,
              private cookieService: AuthService,
              private Router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  signup() {
    this.userService.signup(
      this.signupForm.get('fullName')?.value,
      this.signupForm.get('email')?.value,
      this.signupForm.get('password')?.value,
    ).subscribe(response => {
      this.success(response.data.message);
      this.cookieService.createUser(response.data.token);
      this.Router.navigateByUrl('/dashboard');
    }, error => {
      this.error('Error!');
    })
  }

  private success(message: string) {
    this.toastr.success(message, 'Success!', {
      timeOut: 2000
    })
  }

  private error(message: string) {
    this.toastr.error(message, 'Error!', {
      timeOut: 2000
    })
  }

}
