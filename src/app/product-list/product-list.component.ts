import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

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

  displayConfirmDelete = false;
  idForDeletion = '';
  descriptionForDeletion = '';
  
  constructor(
    public productService: ProductService,
    public authService: AuthService
  ) {
    this.products = productService.getProducts();
  }

  ngOnInit(): void { }

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

  confirmDeleteProduct(product: Product) {
    this.idForDeletion = product.productId;
    this.descriptionForDeletion = product.description;
    this.displayConfirmDelete = true;
  }

  deleteProduct() {
    this.productService.deleteProduct(this.idForDeletion);
    this.displayConfirmDelete = false;
  }

}
