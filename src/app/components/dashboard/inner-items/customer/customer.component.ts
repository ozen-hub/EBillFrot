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

  customerList:any[]=[];
  selectedCustomer:any;

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
    this.loadCustomers();
  }

  saveCustomer() {

    if (this.selectedCustomer){
      this.customerService.updateCustomer({
          name:this.customerForm.get('name')?.value,
          address:this.customerForm.get('address')?.value,
          // @ts-ignore
          salary:Number.parseInt(this.customerForm.get('salary')?.value.toString())
        },this.selectedCustomer._id
      ).subscribe(response => {
        this.success(response.data.message);
        this.loadCustomers();
        this.clearData();
      }, error => {
        this.error('Error!');
      })
    }else{
      this.customerService.saveCustomer({
          name:this.customerForm.get('name')?.value,
          address:this.customerForm.get('address')?.value,
          // @ts-ignore
          salary:Number.parseInt(this.customerForm.get('salary')?.value.toString())
        }
      ).subscribe(response => {
        this.success(response.data.message);
        this.loadCustomers();
        this.clearData();
      }, error => {
        this.error('Error!');
      })
    }

  }

  public clearData() {
    this.customerForm.patchValue({
      name:null,
      address:null,
      salary:null,
    });
    this.selectedCustomer=null;
  }

  private loadCustomers(){
    this.customerService.customerList().subscribe(response => {
     this.customerList=response.data.value
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

  setUpdateData(id: any) {
    this.customerService.getCustomer(id).subscribe(response => {
      if(response.data.value!==null){
        this.selectedCustomer=response.data.value;
        this.customerForm.patchValue({
          name:this.selectedCustomer.name,
          address:this.selectedCustomer.address,
          salary:this.selectedCustomer.salary,
        })

      }else{
        this.error('User not Found');
      }
    }, error => {
      this.error('Error!');
    })
  }

  deleteCustomer(id: any) {
    if (confirm('are your sure?')){
      this.customerService.deleteCustomer(id).subscribe(response => {
        this.success("Deleted!");
        this.loadCustomers();
      }, error => {
        this.error('Error!');
      })
    }

  }
}
