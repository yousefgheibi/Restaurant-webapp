import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { ProductListModel } from '../models/productList.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  private productList$ = new BehaviorSubject<ProductListModel>({});
  productList = this.productList$.asObservable();

  list: ProductListModel = {};
  constructor() {}

  addToCart(product: ProductModel) {
    if (!this.list[product.id]) {
      this.list[product.id] = [];
    }
    this.list[product.id] = this.list[product.id].concat(product);
    this.productList$.next(this.list);
  }

  removeCartItem(product: ProductModel) {
    this.list[product.id] = [];
    delete this.list[product.id];
    this.productList$.next(this.list);
  }


  addMore(product: ProductModel) {
    this.list[product.id].push(product);
    this.productList$.next(this.list);
  }

  removeFromProductList(product: ProductModel) {
    if (this.list[product.id].length) {
      this.list[product.id].pop();
      if (!this.list[product.id].length) {
        delete this.list[product.id];
      }
      this.productList$.next(this.list);
    }
  }
}
