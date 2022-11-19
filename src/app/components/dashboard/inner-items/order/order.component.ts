import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../../../service/customer.service";
import {ProductService} from "../../../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  customerIds:any[]=[];
  productIds:any[]=[];
  selectedCustomer:any;
  selectedProduct:any;

  customerForm = new FormGroup({
    id:new FormControl(null,[
      Validators.required
    ]),
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
  productForm = new FormGroup({
    id:new FormControl(null,[
      Validators.required
    ]),
    description: new FormControl(null, [
      Validators.required
    ]),
    qtyOnHand: new FormControl(0, [
      Validators.required
    ]),
    unitPrice: new FormControl(0, [
      Validators.required
    ]),
    qty: new FormControl(0, [
      Validators.required
    ])
  })

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadAllCustomerIds();
    this.loadAllProductCodes();
  }

  loadAllCustomerIds(){
    this.customerService.getAllCustomerIds().subscribe(response => {
      this.customerIds=response.data.value
    }, error => {
      this.error('Error!');
    })
  }

  loadAllProductCodes(){
    this.productService.getAllProductIds().subscribe(response => {
      this.productIds=response.data.value
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

  setCustomerId() {
    this.customerService.getCustomer(this.customerForm.get('id')?.value).subscribe(response => {
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
  setProductId() {
    this.productService.getProduct(this.productForm.get('id')?.value).subscribe(response => {
      if(response.data.value!==null){
        this.selectedProduct=response.data.value;
        this.productForm.patchValue({
          description:this.selectedProduct.description,
          qtyOnHand:this.selectedProduct.qty,
          unitPrice:this.selectedProduct.unitPrice,
        })

      }else{
        this.error('User not Found');
      }
    }, error => {
      this.error('Error!');
    })
  }
}
