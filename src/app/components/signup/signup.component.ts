import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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

  constructor() { }

  ngOnInit(): void {
  }

  signup() {

  }
}
