import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../service/user.service";
import {AuthService} from "../../../../service/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CustomerService} from "../../../../service/customer.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customerForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required
    ]),
    address: new FormControl(null, [
      Validators.required
    ]),
    salary: new FormControl('', [
      Validators.required
    ])
  })

  constructor(private customerService: CustomerService,
              private cookieService: AuthService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  saveCustomer() {

    this.customerService.saveCustomer({
      name:this.customerForm.get('name')?.value,
      address:this.customerForm.get('address')?.value,
        // @ts-ignore
      salary:Number.parseInt(this.customerForm.get('salary')?.value.toString())
    }
    ).subscribe(response => {
      this.success(response.data.message);
     this.clearData();
    }, error => {
      this.error('Error!');
    })
  }

  private clearData() {
    this.customerForm.patchValue({
      name:null,
      address:null,
      salary:null,
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
