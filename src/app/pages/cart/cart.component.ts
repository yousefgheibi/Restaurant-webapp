import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FactorModel } from 'src/app/models/factor.model';
import { ProductModel } from 'src/app/models/product.model';
import { ProductListModel } from 'src/app/models/productList.model';
import { UserModel } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart.service';
import { FactorsService } from 'src/app/services/factors.service';
import { NotificationService } from 'src/app/services/notification.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  products: ProductListModel = {};
  count: number = 0;
  totalPrice: number = 0;
  date: Date = new Date();
  created_at: string = new Intl.DateTimeFormat('fa-IR').format(this.date);
  loginedUser!: UserModel;

  constructor(
    public router: Router,
    private cartService: CartService,
    private _notificationService: NotificationService,
    private _factorService : FactorsService
  ) {}

  ngOnInit(): void {
    this.subscription = this.cartService.productList.subscribe((res) => {
      this.products = res;
      for (let id in res) {
        let value = res[id];
      }
      this.calcualteCount();
      this.calculatePrice();
    });

    const val = localStorage.getItem('token');
    if (val !== null) {
      this.loginedUser = JSON.parse(val);
    }
  }

  removeItem(product: ProductModel) {
    this._notificationService.showWarning(
      'محصول با موفقیت از سبد خرید حذف شد!'
    );
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


  postFactor() {
    if(this.loginedUser){
    const factor : FactorModel = {
      id: uuidv4(),
      userId: this.loginedUser.id,
      name : this.loginedUser.firstName + " " + this.loginedUser.lastName,
      items : this.products,
      created_at : this.created_at,
      totalPrice : this.totalPrice
    }

    this._factorService.postInvoice(factor).subscribe(res => {
      this._notificationService.showSuccess('خرید با موفقیت انجام شد.');
      this.products = [];
    },
    (err) =>{
      this._notificationService.showError('مشکلی پیش آمد.');
      console.log(err);
    });

    }
    else{
        this.router.navigate(['my-account']);
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
