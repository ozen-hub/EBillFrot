import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {AuthService} from "../../service/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
              private cookieService: AuthService,
              private router: Router,
              private toastr: ToastrService) {
  }

  loginForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required, Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required
    ])
  })

  ngOnInit(): void {

    if (this.cookieService.isExists()){
      this.router.navigate(['/dashboard']).then();
    }
  }
  login() {
    this.userService.login(
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value,
    ).subscribe(response => {
      this.success(response.data.message);
      this.cookieService.createUser(response.data.token);
      this.router.navigateByUrl('/dashboard');
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
