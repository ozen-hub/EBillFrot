import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../../service/product.service";
import {AuthService} from "../../../../service/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productList:any[]=[];
  productForm = new FormGroup({
    description: new FormControl('', Validators.required),
    qty: new FormControl(0, Validators.required),
    unitPrice: new FormControl(0, Validators.required),
  })

  constructor(
    private productService:ProductService,
    private cookieService: AuthService,
    private router: Router,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  saveProduct() {
    this.productService.saveProduct(
        this.productForm.get('description')?.value,
        this.productForm.get('qty')?.value,
        this.productForm.get('unitPrice')?.value
    ).subscribe(response => {
      this.success(response.data.message);
      this.clearData();
      this.loadProducts();
    }, error => {
      this.error('Error!');
    })
  }

  public clearData() {
    this.productForm.patchValue({
      description:'',
      qty:0,
      unitPrice:0
    });
  }

  private loadProducts(){
    this.productService.loadProducts().subscribe(response => {
      this.productList=response.data.value
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
