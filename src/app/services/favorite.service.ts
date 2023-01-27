import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  myFavArray: ProductModel[] = [];

  constructor(private _notificationService: NotificationService) {
    const val = localStorage.getItem('items');
    if (val !== null) {
      this.myFavArray = JSON.parse(val);
    }
  }

  addToFavorite(product: ProductModel) {
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

  checkFavoritedProduct(product: ProductModel){
    for (var i = 0; i < this.myFavArray.length; i++) {
      if (product.id == this.myFavArray[i].id) {
        return false;
      }
    }
    return true;
  }
}

