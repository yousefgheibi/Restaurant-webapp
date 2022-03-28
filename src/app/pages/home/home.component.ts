import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogModel } from 'src/app/models/blog.model';
import { ProductModel } from 'src/app/models/product.model';
import { BlogService } from 'src/app/services/blog.service';
import { CartService } from 'src/app/services/cart.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit , OnDestroy {
  subscriptionBlog: Subscription | undefined;
  subscriptionMenu: Subscription | undefined;
  isWaitBlog: boolean = false;
  isWaitProducts: boolean = false;
  blogData: BlogModel[] = [];
  productData: ProductModel[] = [];
  constructor(
    private _blogApi: BlogService,
    private _productApi: ProductService,
    private _cartService: CartService,
    private _notificationService: NotificationService,
    private _favoriteService: FavoriteService
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
    this._favoriteService.addToFavorite(product);
  }

  ngOnDestroy(): void {
    if(this.subscriptionBlog){
      this.subscriptionBlog.unsubscribe();
    }
    if(this.subscriptionMenu){
      this.subscriptionMenu.unsubscribe();
    }
  }
}
