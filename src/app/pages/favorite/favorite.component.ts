import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  favoriteProducts: ProductModel[] = [];
  constructor(
    private _cartService: CartService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites() {
    const val = localStorage.getItem('items');
    if (val !== null) {
      this.favoriteProducts = JSON.parse(val);
      this.hasProduct();
    }
  }

  add2Cart(item: ProductModel) {
    this._cartService.addToCart(item);
    this._notificationService.showSuccess(
      'محصول با موفقیت به سبد خرید اضافه شد.'
    );
  }

  removeFromFavorite(item: ProductModel) {
    const index = this.favoriteProducts.indexOf(item);
    this.favoriteProducts.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(this.favoriteProducts));
    this.hasProduct();
  }

  hasProduct() {
    if (this.favoriteProducts.length != 0) {
      return true;
    } else {
      return false;
    }
  }
}
