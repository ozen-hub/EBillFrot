import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../../../service/customer.service";
import {ProductService} from "../../../../service/product.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  customerIds:string[]=[];
  productIds:string[]=[];

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

}
