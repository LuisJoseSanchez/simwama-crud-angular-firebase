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

  products: Observable<Product[]>;

  productForm = new FormGroup({
    description: new FormControl(''),
    purchasePrice: new FormControl(0),
    salePrice: new FormControl(0),
    stock: new FormControl(0),
    picture: new FormControl('')
  });

  constructor(public productService: ProductService) {
    this.products = productService.getProducts();
  }

  addProduct() {
    this.productService.addProduct(this.productForm.value);
    this.productForm.reset();
  }
}
