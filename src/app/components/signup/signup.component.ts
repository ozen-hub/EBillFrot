import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm= new FormGroup({
    email: new FormControl(null,[
      Validators.required,Validators.email
    ]),
    fullName: new FormControl(null,[
      Validators.required
    ]),
    password: new FormControl(null,[
      Validators.required
    ])
  })

  constructor(private userService:UserService ) { }

  ngOnInit(): void {
  }

  signup() {
    this.userService.signup(
      this.signupForm.get('fullName')?.value,
      this.signupForm.get('email')?.value,
      this.signupForm.get('password')?.value,
    ).subscribe(response=>{
        console.log(response);
    }, error => {
      console.log(error);
    })
  }
}
