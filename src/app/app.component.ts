import { Component } from '@angular/core';
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

  constructor(private productService: ProductService) {
    this.products = productService.getProducts();
  }

  addProduct() {
    const product: Product = {
      description: "coffee mug",
      purchasePrice: 2.50,
      salePrice: 9,
      stock: 100,
      picture: "https://cdn.pixabay.com/photo/2015/05/07/13/46/cappuccino-756490_960_720.jpg"
    }

    this.productService.addProduct(product);
  }
}
