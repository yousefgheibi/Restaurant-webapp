import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isWait: boolean = false;
  p: any;
  searchKey!: string;
  productData: ProductModel[] = [];
  constructor(
    private _productApi: ProductService,
    private _cartService: CartService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productApi.getAllProduct().subscribe((res) => {
      this.productData = res;
      console.log(this.productData);
      this.isWait = true;
    });
  }

  doSearch(searchKey: string) {
    let result: ProductModel[] = [];
    if (searchKey.length > 2) {
      result = this.productData.filter((item) => {
        return !(item.name.trim().indexOf(this.searchKey.trim()) <= -1);
      });
    }
    if (result.length > 0) {
      this.productData = result;
    } else {
      this.getProducts();
    }
  }

  add2Cart(item: ProductModel) {
    this._cartService.addToCart(item);
    this._notificationService.showSuccess('محصول با موفقیت به سبد خرید اضافه شد.');
  }
}
