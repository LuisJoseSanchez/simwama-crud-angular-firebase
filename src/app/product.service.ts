import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: Firestore) { }

  public async addProduct(product: Product) {
    try {
      const docRef = await addDoc(collection(this.firestore, "products"), product);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }    
  }

  public getProducts(): Observable<Product[]> {
    return collectionData(collection(this.firestore, 'products'), {idField: 'productId'}) as Observable<Product[]>;
  }

  async deleteProduct(id: string) {
    await deleteDoc(doc(this.firestore, `products/${id}`));
  }
}
