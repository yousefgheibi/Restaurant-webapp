import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { ProductListModel } from 'src/app/models/productList.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public products: ProductListModel = {};
  count: number = 0;
  totalPrice: number = 0;
  constructor(public router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.productList.subscribe((res) => {
      this.products = res;
      for (let id in res) {
        let value = res[id];
      }
      this.calcualteCount();
      this.calculatePrice();
    });
  }

  removeItem(product: ProductModel) {
    this.cartService.removeCartItem(product);
  }

  addMore(product: ProductModel) {
    this.cartService.addMore(product);
  }

  removeFromProductList(product: ProductModel) {
    this.cartService.removeFromProductList(product);
  }

  private calculatePrice() {
    this.totalPrice = 0;
    for (let id in this.products) {
      if (
        this.products[id] &&
        this.products[id][0] &&
        this.products[id].length
      ) {
        this.totalPrice =
          this.totalPrice +
          this.products[id][0].price * this.products[id].length;
      }
    }
  }

  calcualteCount() {
    this.count = 0;
    for (let id in this.products) {
      this.count = this.count + this.products[id].length;
    }
  }

  hasProducts(): boolean {
    return this.products && Object.keys(this.products).length > 0;
  }
}
