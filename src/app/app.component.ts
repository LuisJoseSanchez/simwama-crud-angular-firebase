import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  formButtonText: string = "Add product";

  products: Observable<Product[]>;

  productForm = new FormGroup({
    productId: new FormControl(''),
    description: new FormControl(''),
    purchasePrice: new FormControl(0),
    salePrice: new FormControl(0),
    stock: new FormControl(0),
    picture: new FormControl('')
  });

  displayProductForm = false;

  constructor(public productService: ProductService) {
    this.products = productService.getProducts();
  }

  addProduct() {
    this.productService.addProduct(this.productForm.value);
    this.productForm.reset();
  }

  updateProductStep1(id: string) {
    this.displayProductForm = true;

    this.productService.getProduct(id).subscribe(
      data => this.productForm.patchValue(data)
    );
    
    this.formButtonText = "Update product";
  }

  updateProductStep2() {
    this.productService.updateProduct(this.productForm.value);

    setTimeout(() => this.productForm.reset(), 500);
    
    this.formButtonText = "Add product";
  }

  cancel() {
    this.productForm.reset();
    this.formButtonText = "Add product";
    this.displayProductForm = false;
  }

  formSubmit() {
    if (this.formButtonText === 'Add product') {
      this.addProduct();
    } else {
      this.updateProductStep2();
    }
    this.displayProductForm = false;
  }
  
}
