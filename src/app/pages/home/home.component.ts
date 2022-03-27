import { Component, OnInit } from '@angular/core';
import { BlogModel } from 'src/app/models/blog.model';
import { ProductModel } from 'src/app/models/product.model';
import { BlogService } from 'src/app/services/blog.service';
import { CartService } from 'src/app/services/cart.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isWaitBlog: boolean = false;
  isWaitProducts: boolean = false;
  blogData: BlogModel[] = [];
  productData: ProductModel[] = [];
  myFavArray: ProductModel[] = [];
  constructor(
    private _blogApi: BlogService,
    private _productApi: ProductService,
    private _cartService: CartService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getBlog();
    this.getProducts();
  }
  getBlog() {
    this._blogApi.getBlogs().subscribe((res) => {
      this.blogData = res;
      this.isWaitBlog = true;
    });
  }

  getProducts() {
    this._productApi.getAllProduct().subscribe((res) => {
      this.productData = res;
      this.isWaitProducts = true;
    });
  }

  add2Cart(item: ProductModel) {
    this._cartService.addToCart(item);
    this._notificationService.showSuccess(
      'محصول با موفقیت به سبد خرید اضافه شد.'
    );
  }

  add2Favorite(product: ProductModel) {
    const val = localStorage.getItem('items');

    if (val !== null) {
      this.myFavArray = JSON.parse(val);
    }

    let checkExists: boolean = false;
    for (var i = 0; i < this.myFavArray.length; i++) {
      if (product.id == this.myFavArray[i].id) {
        checkExists = true;
        this._notificationService.showWarning(
          'محصول مورد نظر در علاقه مندی وجود دارد!!'
        );
      }
    }
    if (checkExists == false) {
      this.myFavArray.push(product);
      this._notificationService.showSuccess(
        'محصول با موفقیت به علاقه مندی ها اضافه شد.'
      );
    }
    localStorage.setItem('items', JSON.stringify(this.myFavArray));
  }
}
